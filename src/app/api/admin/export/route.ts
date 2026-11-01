import { hasAdminSession } from '@/lib/admin-auth';
import { isStoreConfigured } from '@/lib/redis';
import { getSummary, RANGE_OPTIONS, type BreakdownRow, type RangeDays } from '@/lib/visit-store';

export const dynamic = 'force-dynamic';

function parseRange(value: string | null): RangeDays {
  const parsed = Number(value);
  return RANGE_OPTIONS.includes(parsed as RangeDays) ? (parsed as RangeDays) : 30;
}

function csvCell(value: string | number): string {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function csvRows(title: string, header: string[], rows: Array<Array<string | number>>): string {
  return [
    title,
    header.map(csvCell).join(','),
    ...rows.map((row) => row.map(csvCell).join(',')),
    '',
  ].join('\n');
}

function breakdownRows(rows: BreakdownRow[]): Array<Array<string | number>> {
  return rows.map((row) => [row.label, row.count]);
}

export async function GET(req: Request) {
  if (!(await hasAdminSession())) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!isStoreConfigured()) {
    return new Response('Analytics store is not configured', { status: 503 });
  }

  const range = parseRange(new URL(req.url).searchParams.get('range'));
  const summary = await getSummary(range);

  const sections = [
    [
      'Portfolio analytics export',
      `Range,Last ${range} days`,
      `Generated,${new Date().toISOString()}`,
      `Views,${summary.rangeViews}`,
      `Visitors,${summary.rangeVisitors}`,
      `New visits,${summary.newVisitors}`,
      `Returning visits,${summary.returningVisitors}`,
      `All-time views,${summary.totalViews}`,
      `All-time visitors,${summary.totalVisitors}`,
      '',
    ].join('\n'),
    csvRows(
      'Daily',
      ['Date', 'Views', 'Visitors'],
      summary.daily.map((point) => [point.date, point.views, point.visitors]),
    ),
    csvRows('Countries', ['Country', 'Views'], breakdownRows(summary.countries)),
    csvRows('Cities', ['City', 'Views'], breakdownRows(summary.cities)),
    csvRows('Pages', ['Path', 'Views'], breakdownRows(summary.pages)),
    csvRows('Sources', ['Referrer', 'Views'], breakdownRows(summary.referrers)),
    csvRows('Devices', ['Device', 'Views'], breakdownRows(summary.devices)),
  ];

  const filename = `portfolio-analytics-${range}d-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
