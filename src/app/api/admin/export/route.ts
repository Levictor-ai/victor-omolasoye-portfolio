import { hasAdminSession } from '@/lib/admin-auth';
import { isStoreConfigured } from '@/lib/redis';
import { resolveRange, type AnalyticsRange } from '@/lib/analytics-range';
import {
  getAcquisition,
  getConversions,
  getEngagement,
  getOverview,
  getPagesProjects,
  type AcquisitionData,
  type ConversionsData,
  type EngagementData,
  type OverviewData,
  type PagesProjectsData,
} from '@/lib/analytics-store';

export const dynamic = 'force-dynamic';

const SECTIONS = new Set([
  'all',
  'overview',
  'visitors',
  'sessions',
  'pages',
  'projects',
  'sources',
  'engagement',
  'conversions',
]);

const CATEGORIES = new Set(['all', 'Brand Design', 'Product Design', 'Web Design', 'Other']);
const METRICS = new Set(['views', 'visitors', 'engagement', 'clicks', 'conversions']);

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

function headerBlock(range: AnalyticsRange, section: string): string {
  return [
    'Portfolio performance & intelligence export',
    `Section,${section}`,
    `Range,${range.from} to ${range.to}`,
    `Previous period,${range.previousFrom} to ${range.previousTo}`,
    `Generated,${new Date().toISOString()}`,
    '',
  ].join('\n');
}

function overviewSections(data: OverviewData): string[] {
  return [
    csvRows(
      'Overview',
      ['Metric', 'Current', 'Previous', 'Change'],
      [
        ['Visitors', data.rangeVisitors, data.previousVisitors, change(data.rangeVisitors, data.previousVisitors)],
        ['Page views', data.rangeViews, data.previousViews, change(data.rangeViews, data.previousViews)],
        ['Sessions', data.sessions, data.previousSessions, change(data.sessions, data.previousSessions)],
        ['New visitors', data.newVisitors, data.previousNewVisitors, change(data.newVisitors, data.previousNewVisitors)],
        [
          'Returning visitors',
          data.returningVisitors,
          data.previousReturningVisitors,
          change(data.returningVisitors, data.previousReturningVisitors),
        ],
        [
          'Avg. engagement (ms)',
          Math.round(data.avgEngagementMs),
          Math.round(data.previousAvgEngagementMs),
          change(data.avgEngagementMs, data.previousAvgEngagementMs),
        ],
        [
          'Pages per session',
          round(data.pagesPerSession),
          round(data.previousPagesPerSession),
          change(data.pagesPerSession, data.previousPagesPerSession),
        ],
        [
          'Interactions',
          data.interactions,
          data.previousInteractions,
          change(data.interactions, data.previousInteractions),
        ],
        [
          'Conversions',
          data.conversions,
          data.previousConversions,
          change(data.conversions, data.previousConversions),
        ],
        [
          'Conversion rate (%)',
          round(data.conversionRate),
          round(data.previousConversionRate),
          change(data.conversionRate, data.previousConversionRate),
        ],
        ['All-time page views', data.totalViews, '', ''],
        ['All-time visitors', data.totalVisitors, '', ''],
        ['Detailed data since', data.v2Since ?? 'not recorded', '', ''],
      ],
    ),
    csvRows(
      'Daily overview',
      ['Date', 'Views', 'Visitors', 'Sessions', 'Interactions', 'Conversions'],
      data.daily.map((point) => [
        point.date,
        point.views,
        point.visitors,
        point.sessions,
        point.interactions,
        point.conversions,
      ]),
    ),
    csvRows('Countries', ['Country code', 'Page views'], data.countries.map((row) => [row.label, row.count])),
    csvRows('Cities', ['City', 'Page views'], data.cities.map((row) => [row.label, row.count])),
    csvRows('Pages', ['Path', 'Page views'], data.pages.map((row) => [row.label, row.count])),
    csvRows('Referrers', ['Referrer', 'Page views'], data.referrers.map((row) => [row.label, row.count])),
    csvRows('Devices', ['Device', 'Page views'], data.devices.map((row) => [row.label, row.count])),
  ];
}

function visitorSections(data: OverviewData): string[] {
  return [
    csvRows(
      'Visitors',
      ['Date', 'Visitors'],
      data.daily.map((point) => [point.date, point.visitors]),
    ),
    csvRows(
      'Visitor totals',
      ['Metric', 'Value'],
      [
        ['Visitors in range', data.rangeVisitors],
        ['New visitors in range', data.newVisitors],
        ['Returning visitors in range', data.returningVisitors],
        ['All-time visitors', data.totalVisitors],
      ],
    ),
  ];
}

function sessionSections(data: OverviewData): string[] {
  return [
    csvRows(
      'Sessions',
      ['Date', 'Sessions', 'Page views', 'Pages per session', 'Interactions', 'Conversions'],
      data.daily.map((point) => [
        point.date,
        point.sessions,
        point.views,
        point.sessions > 0 ? round(point.views / point.sessions) : 0,
        point.interactions,
        point.conversions,
      ]),
    ),
    csvRows(
      'Session totals',
      ['Metric', 'Value'],
      [
        ['Sessions in range', data.sessions],
        ['Pages per session', round(data.pagesPerSession)],
        ['Avg. engagement (ms)', Math.round(data.avgEngagementMs)],
        ['Conversion rate (%)', round(data.conversionRate)],
      ],
    ),
  ];
}

function pageSections(
  data: PagesProjectsData,
  options: { pages: boolean; projects: boolean },
): string[] {
  const sections: string[] = [];

  if (options.pages) {
    sections.push(
      csvRows(
        'Pages',
        ['Path', 'Views', 'Visitors', 'Avg. engagement (ms)', 'Interactions', 'Conversions'],
        data.pages.map((page) => [
          page.path,
          page.views,
          page.visitors,
          Math.round(page.avgEngagementMs),
          page.interactions,
          page.conversions,
        ]),
      ),
      csvRows(
        'Landing pages',
        ['Path', 'Sessions'],
        data.landingPages.map((row) => [row.label, row.count]),
      ),
      csvRows('Exit pages', ['Path', 'Sessions'], data.exitPages.map((row) => [row.label, row.count])),
    );
  }

  if (options.projects) {
    sections.push(
      csvRows(
        'Projects',
        [
          'Project',
          'Slug',
          'Category',
          'Views',
          'Visitors',
          'Avg. engagement (ms)',
          'Card clicks',
          'Scroll depth (%)',
          'External clicks',
          'Conversions',
        ],
        data.projects.map((project) => [
          project.name,
          project.slug,
          project.categories.join(' / '),
          project.views,
          project.visitors,
          Math.round(project.avgEngagementMs),
          project.cardClicks,
          round(project.scrollDepth),
          project.externalClicks,
          project.conversions,
        ]),
      ),
    );
  }

  return sections;
}

function sourceSections(data: AcquisitionData): string[] {
  return [
    csvRows(
      'Sources',
      ['Source', 'Visitors', 'Sessions', 'Views', 'Interactions', 'Conversions', 'Conversion rate (%)'],
      data.sources.map((row) => [
        row.source,
        row.visitors,
        row.sessions,
        row.views,
        row.interactions,
        row.conversions,
        round(row.conversionRate),
      ]),
    ),
    csvRows(
      'Campaigns',
      ['Campaign', 'Source', 'Views', 'Sessions', 'Conversions', 'Conversion rate (%)'],
      data.campaigns.map((row) => [
        row.campaign,
        row.source,
        row.views,
        row.sessions,
        row.conversions,
        round(row.conversionRate),
      ]),
    ),
    csvRows(
      'UTM parameters',
      ['Source', 'Medium', 'Campaign', 'Content', 'Term', 'Views', 'Sessions'],
      data.utm.map((row) => [
        row.source,
        row.medium,
        row.campaign,
        row.content,
        row.term,
        row.views,
        row.sessions,
      ]),
    ),
    csvRows('Referrers', ['Referrer', 'Views'], data.referrers.map((row) => [row.label, row.count])),
  ];
}

function engagementSections(data: EngagementData): string[] {
  return [
    csvRows(
      'Engagement totals',
      ['Metric', 'Value'],
      [
        ['Interactions', data.totalInteractions],
        ['Avg. engagement (ms)', Math.round(data.avgEngagementMs)],
        ['Pages per session', round(data.avgPagesPerSession)],
        ['Sessions', data.totalSessions],
      ],
    ),
    csvRows(
      'Events',
      ['Event', 'Count'],
      data.eventBreakdown.map((row) => [row.label, row.count]),
    ),
    csvRows(
      'Top elements',
      ['Element', 'Event', 'Count'],
      data.topElements.map((row) => [row.label, row.event, row.count]),
    ),
    csvRows(
      'Top pages',
      ['Path', 'Interactions', 'Engagement (ms)', 'Avg. per interaction (ms)'],
      data.topPages.map((row) => [
        row.path,
        row.interactions,
        row.engagementMs,
        Math.round(row.avgEngagementMs),
      ]),
    ),
    csvRows('Scroll depth', ['Depth', 'Events'], data.scrollDepth.map((row) => [row.label, row.count])),
    csvRows(
      'Daily engagement',
      ['Date', 'Views', 'Sessions', 'Interactions', 'Conversions'],
      data.daily.map((point) => [
        point.date,
        point.views,
        point.sessions,
        point.interactions,
        point.conversions,
      ]),
    ),
  ];
}

function conversionSections(data: ConversionsData): string[] {
  return [
    csvRows(
      'Conversion totals',
      ['Metric', 'Current', 'Previous', 'Change'],
      [
        ['Conversions', data.totalConversions, data.previousConversions, change(data.totalConversions, data.previousConversions)],
        ['Sessions', data.sessions, data.previousSessions, change(data.sessions, data.previousSessions)],
        [
          'Conversion rate (%)',
          round(data.conversionRate),
          round(data.previousConversionRate),
          change(data.conversionRate, data.previousConversionRate),
        ],
      ],
    ),
    csvRows('By type', ['Conversion', 'Count'], data.byType.map((row) => [row.label, row.count])),
    csvRows('By page', ['Path', 'Conversions'], data.byPage.map((row) => [row.label, row.count])),
    csvRows(
      'By source',
      ['Source', 'Conversions', 'Sessions', 'Rate (%)'],
      data.bySource.map((row) => [row.source, row.conversions, row.sessions, round(row.rate)]),
    ),
    csvRows('By campaign', ['Campaign', 'Conversions'], data.byCampaign.map((row) => [row.label, row.count])),
    csvRows(
      'Daily conversions',
      ['Date', 'Conversions', 'Sessions'],
      data.daily.map((point) => [point.date, point.conversions, point.sessions]),
    ),
  ];
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function change(current: number, previous: number): string {
  if (previous === 0) return current === 0 ? '0%' : 'New';
  const delta = ((current - previous) / previous) * 100;
  return `${delta > 0 ? '+' : ''}${Math.round(delta)}%`;
}

export async function GET(req: Request) {
  if (!(await hasAdminSession())) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!isStoreConfigured()) {
    return new Response('Analytics store is not configured', { status: 503 });
  }

  const url = new URL(req.url);
  const params = url.searchParams;
  const range = resolveRange({
    range: params.get('range') ?? undefined,
    from: params.get('from') ?? undefined,
    to: params.get('to') ?? undefined,
  });

  const requested = params.get('section') ?? 'all';
  const section = SECTIONS.has(requested) ? requested : 'all';
  const category = CATEGORIES.has(params.get('category') ?? '') ? (params.get('category') as string) : 'all';
  const metric = METRICS.has(params.get('metric') ?? '') ? (params.get('metric') as string) : 'views';

  const sections: string[] = [];
  const include = (key: string) => section === 'all' || section === key;

  if (include('overview') || include('visitors') || include('sessions')) {
    const overview = await getOverview(range);
    if (include('overview')) sections.push(...overviewSections(overview));
    if (include('visitors')) sections.push(...visitorSections(overview));
    if (include('sessions')) sections.push(...sessionSections(overview));
  }

  if (include('pages') || include('projects')) {
    const pages = await getPagesProjects(range, category, metric);
    sections.push(
      ...pageSections(pages, {
        pages: include('pages'),
        projects: include('projects') || section === 'all',
      }),
    );
  }

  if (include('sources')) {
    sections.push(...sourceSections(await getAcquisition(range)));
  }

  if (include('engagement')) {
    sections.push(...engagementSections(await getEngagement(range)));
  }

  if (include('conversions')) {
    sections.push(...conversionSections(await getConversions(range)));
  }

  const filename = `portfolio-analytics-${section}-${range.from}-to-${range.to}.csv`;

  return new Response([headerBlock(range, section), ...sections].join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
