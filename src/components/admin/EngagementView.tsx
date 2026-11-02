import { eventLabel } from '@/lib/analytics-events';
import {
  formatDecimal,
  formatDelta,
  formatDuration,
  formatNumber,
  pageLabel,
} from '@/lib/analytics-format';
import type { EngagementData } from '@/lib/analytics-store';
import { TrendChart } from './TrendChart';
import { Breakdown, Card, DataTable, EmptyState, MetricNote, SectionHeading, StatCard } from './ui';

export function EngagementView({ data }: { data: EngagementData }) {
  return (
    <div className="space-y-4">
      <SectionHeading
        title="Engagement"
        description="How deeply visitors interact with the portfolio: time on page, clicks, scroll depth and the elements that get used."
      />

      {!data.hasData ? (
        <EmptyState
          title="No engagement data in this range"
          description="Engagement events start collecting as soon as the tracker is live. Try a wider range or check back after more visits."
        />
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Interactions"
          value={formatNumber(data.totalInteractions)}
          description="Clicks and events, excluding page views."
          delta={formatDelta(data.totalInteractions, data.previousInteractions)}
          hint="Project cards, navigation, contact, email, LinkedIn, CV, booking and external links."
        />
        <StatCard
          label="Avg. engagement"
          value={formatDuration(data.avgEngagementMs)}
          description="Active time per session."
          delta={formatDelta(data.avgEngagementMs, data.previousAvgEngagementMs)}
          hint="Only visible, active time is counted. Background tabs are paused."
        />
        <StatCard
          label="Pages / session"
          value={formatDecimal(data.avgPagesPerSession, 2)}
          description="How many pages a typical visit covers."
          delta={formatDelta(data.avgPagesPerSession, data.previousAvgPagesPerSession)}
          hint="Page views divided by sessions."
        />
        <StatCard
          label="Sessions"
          value={formatNumber(data.totalSessions)}
          description="Sessions with at least one page view."
          delta={formatDelta(data.totalSessions, data.previousSessions)}
          hint="A session ends after 30 minutes of inactivity."
        />
      </div>

      <Card title="Engagement trend" subtitle="Daily interactions compared with sessions">
        <TrendChart
          data={data.daily}
          series={[
            { key: 'interactions', label: 'Interactions', color: '#314CB6' },
            { key: 'sessions', label: 'Sessions', color: '#FF9500' },
          ]}
          height={200}
          ariaLabel="Daily interactions and sessions"
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Event breakdown" subtitle="What visitors do most">
          <Breakdown
            rows={data.eventBreakdown}
            emptyLabel="No events recorded yet."
            limit={12}
            renderLabel={(row) => <span className="truncate">{eventLabel(row.label)}</span>}
          />
        </Card>

        <Card title="Scroll depth" subtitle="How far visitors reach on a page">
          <Breakdown
            rows={data.scrollDepth}
            emptyLabel="No scroll data yet."
            limit={4}
            renderLabel={(row) => <span>{row.label} of the page</span>}
          />
          <MetricNote>
            Each threshold is counted once per page view. 100% means the visitor reached the bottom
            of the page.
          </MetricNote>
        </Card>
      </div>

      <Card title="Scroll trend" subtitle="Daily scroll events by depth">
        <TrendChart
          data={data.scrollDaily.map((point) => ({
            date: point.date,
            depth25: point.depth25,
            depth50: point.depth50,
            depth75: point.depth75,
            depth100: point.depth100,
          }))}
          series={[
            { key: 'depth25', label: '25%', color: '#5AC8FA' },
            { key: 'depth50', label: '50%', color: '#34C759' },
            { key: 'depth75', label: '75%', color: '#FF9500' },
            { key: 'depth100', label: '100%', color: '#AF52DE' },
          ]}
          height={180}
          ariaLabel="Daily scroll depth events"
        />
      </Card>

      <Card title="Top elements" subtitle="The specific links, buttons and cards visitors use">
        <DataTable
          columns={[
            { key: 'element', label: 'Element' },
            { key: 'event', label: 'Event' },
            { key: 'count', label: 'Count', align: 'right' },
          ]}
          emptyLabel="No element interactions yet."
          rows={data.topElements.map((row) => ({
            element: <span className="font-medium text-ios-label">{row.label}</span>,
            event: eventLabel(row.event),
            count: formatNumber(row.count),
          }))}
        />
      </Card>

      <Card title="Most engaging pages" subtitle="Ranked by interactions">
        <DataTable
          columns={[
            { key: 'page', label: 'Page' },
            { key: 'interactions', label: 'Interactions', align: 'right' },
            { key: 'engagement', label: 'Engagement time', align: 'right' },
            { key: 'average', label: 'Avg. per interaction', align: 'right' },
          ]}
          emptyLabel="No page interactions yet."
          rows={data.topPages.map((row) => ({
            page: (
              <div className="min-w-0">
                <p className="font-medium text-ios-label">{pageLabel(row.path)}</p>
                <p className="mt-0.5 truncate font-mono text-[11px] text-ios-tertiary">{row.path}</p>
              </div>
            ),
            interactions: formatNumber(row.interactions),
            engagement: formatDuration(row.engagementMs),
            average: formatDuration(row.avgEngagementMs),
          }))}
        />
      </Card>
    </div>
  );
}
