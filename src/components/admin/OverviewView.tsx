import Link from 'next/link';
import {
  formatDayLong,
  formatDecimal,
  formatDelta,
  formatDuration,
  formatNumber,
  formatPercent,
  pageLabel,
} from '@/lib/analytics-format';
import type { LiveStats, OverviewData } from '@/lib/analytics-store';
import { countryFlag, countryName } from '@/lib/countries';
import { TrendChart } from './TrendChart';
import { LiveSnapshot } from './LiveSnapshot';
import { Breakdown, Card, MetricNote, SectionHeading, StatCard } from './ui';
import { adminHref } from './DashboardShell';
import type { AnalyticsRange } from '@/lib/analytics-range';

export function OverviewView({
  data,
  live,
  range,
}: {
  data: OverviewData;
  live: LiveStats | null;
  range: AnalyticsRange;
}) {
  const detailNote = !data.v2Covered
    ? `Detailed session, engagement and conversion metrics start on ${
        data.v2Since ? formatDayLong(data.v2Since) : 'the first tracked visit'
      }. Older totals below come from page-view history only.`
    : null;

  const newShare = data.rangeVisitors > 0 ? (data.newVisitors / data.rangeVisitors) * 100 : 0;
  const returningShare =
    data.rangeVisitors > 0 ? (data.returningVisitors / data.rangeVisitors) * 100 : 0;

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Overview"
        description={`How the portfolio performed over ${data.range.label.toLowerCase()}, compared with the ${data.range.previousDays}-day period before it.`}
        action={
          <Link
            href={adminHref('pages', range)}
            className="rounded-full border border-ios-separator bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ios-secondary transition-colors hover:border-ios-separator-strong hover:text-ios-label"
          >
            Explore pages & projects
          </Link>
        }
      />

      {detailNote ? (
        <div className="rounded-ios-xl border border-ios-orange/25 bg-white/80 p-4 text-sm leading-relaxed text-ios-secondary shadow-ios-soft">
          <span className="font-semibold text-ios-label">Collection started recently.</span>{' '}
          {detailNote}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Page views"
          value={formatNumber(data.rangeViews)}
          description="Pages viewed in the selected range."
          delta={formatDelta(data.rangeViews, data.previousViews)}
          hint="Every page view is counted, including repeat views in the same session."
          note={`All time: ${formatNumber(data.totalViews)} views`}
        />
        <StatCard
          label="Visitors"
          value={formatNumber(data.rangeVisitors)}
          description="Unique anonymous visitors in the selected range."
          delta={formatDelta(data.rangeVisitors, data.previousVisitors)}
          hint="Counted with a persistent random ID stored in the visitor's browser. No fingerprinting."
          note={`All time: ${formatNumber(data.totalVisitors)} visitors`}
        />
        <StatCard
          label="Sessions"
          value={formatNumber(data.sessions)}
          description="Visits with activity less than 30 minutes apart."
          delta={formatDelta(data.sessions, data.previousSessions)}
          hint="A new session starts after 30 minutes of inactivity or in a new browser tab."
        />
        <StatCard
          label="New visitors"
          value={formatNumber(data.newVisitors)}
          description="First-time anonymous visitors in the range."
          delta={formatDelta(data.newVisitors, data.previousNewVisitors)}
          hint="A visitor is new only when their browser ID is seen for the first time, not on every page or session."
          note={
            data.v2Covered && data.rangeVisitors > 0
              ? `${formatPercent(newShare)} of visitors`
              : undefined
          }
        />
        <StatCard
          label="Returning visitors"
          value={formatNumber(data.returningVisitors)}
          description="Visitors who had been seen before this range."
          delta={formatDelta(data.returningVisitors, data.previousReturningVisitors)}
          hint="Unique visitors in the range minus first-time visitors. The two buckets never overlap."
          note={
            data.v2Covered && data.rangeVisitors > 0
              ? `${formatPercent(returningShare)} of visitors`
              : undefined
          }
        />
        <StatCard
          label="Avg. engagement"
          value={formatDuration(data.avgEngagementMs)}
          description="Active time on page per session."
          delta={formatDelta(data.avgEngagementMs, data.previousAvgEngagementMs)}
          hint="Measured only while the tab is visible. Idle background time is excluded."
        />
        <StatCard
          label="Pages / session"
          value={formatDecimal(data.pagesPerSession, 2)}
          description="Average pages viewed in each session."
          delta={formatDelta(data.pagesPerSession, data.previousPagesPerSession)}
          hint="Page views divided by sessions for the selected range."
        />
        <StatCard
          label="Conversion rate"
          value={formatPercent(data.conversionRate)}
          description="Conversions divided by sessions."
          delta={formatDelta(data.conversionRate, data.previousConversionRate)}
          hint="Conversions include contact form submissions, project enquiries, email clicks, CV downloads and booking clicks."
          note={`${formatNumber(data.conversions)} conversions`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        <Card title="Traffic trend" subtitle="Daily page views, visitors and sessions">
          <TrendChart
            data={data.daily}
            series={[
              { key: 'views', label: 'Views', color: '#314CB6' },
              { key: 'visitors', label: 'Visitors', color: '#34C759' },
              { key: 'sessions', label: 'Sessions', color: '#FF9500' },
            ]}
            height={210}
            ariaLabel="Daily views, visitors and sessions"
          />
          <MetricNote>
            Visitors before detailed collection started are estimated from the page-view history.
          </MetricNote>
        </Card>

        <Card
          title="Right now"
          subtitle="Live activity from the last few minutes"
          action={
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ios-green">
              <span className="size-1.5 animate-pulse rounded-full bg-ios-green" aria-hidden="true" />
              Live
            </span>
          }
        >
          {live ? (
            <LiveSnapshot initial={live} />
          ) : (
            <p className="text-sm text-ios-tertiary">Live activity is unavailable right now.</p>
          )}
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Top pages" subtitle="By page views">
          <Breakdown
            rows={data.pages}
            emptyLabel="No page views yet."
            limit={6}
            renderLabel={(row) => (
              <span className="truncate" title={row.label}>
                {pageLabel(row.label)}
              </span>
            )}
          />
        </Card>
        <Card title="Traffic sources" subtitle="First-touch attribution">
          <Breakdown rows={data.referrers} emptyLabel="No sources yet." limit={6} />
        </Card>
        <Card title="Countries" subtitle="Approximate, from IP geolocation">
          <Breakdown
            rows={data.countries}
            emptyLabel="No location data yet."
            renderLabel={(row) => (
              <span className="truncate">
                {countryFlag(row.label)} {countryName(row.label)}
              </span>
            )}
          />
        </Card>
        <Card title="Devices" subtitle="By page views">
          <Breakdown rows={data.devices} emptyLabel="No device data yet." limit={4} />
        </Card>
      </div>

      <MetricNote>
        Previous period: {data.range.previousFrom} → {data.range.previousTo}. Percent changes compare
        like-for-like periods; when the previous period has no data the badge shows “New” instead of
        inventing a percentage.
      </MetricNote>
    </div>
  );
}
