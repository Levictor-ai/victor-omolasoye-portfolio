import Link from 'next/link';
import { EVENT_TYPES, eventLabel } from '@/lib/analytics-events';
import { formatDateTime, formatNumber, pageLabel } from '@/lib/analytics-format';
import type { ActivityData } from '@/lib/analytics-store';
import type { AnalyticsRange } from '@/lib/analytics-range';
import { countryFlag, countryName } from '@/lib/countries';
import { adminHref } from './DashboardShell';
import { Card, DataTable, EmptyState, MetricNote, Pill, SectionHeading } from './ui';

const FILTERS = ['all', 'pageview', ...EVENT_TYPES];

export function ActivityView({ data, range }: { data: ActivityData; range: AnalyticsRange }) {
  return (
    <div className="space-y-4">
      <SectionHeading
        title="Activity"
        description="A chronological feed of page views and interactions. No names, emails or IP addresses are stored."
      />

      <Card>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
            Event
          </span>
          {FILTERS.map((filter) => {
            const active = data.eventFilter === filter;
            return (
              <Link
                key={filter}
                href={adminHref('activity', range, { event: filter })}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  active
                    ? 'bg-ios-blue text-white'
                    : 'bg-ios-fill text-ios-secondary hover:text-ios-label'
                }`}
              >
                {filter === 'all' ? 'All events' : eventLabel(filter)}
              </Link>
            );
          })}
        </div>
      </Card>

      {!data.hasData ? (
        <EmptyState
          title="No activity in this range"
          description="Activity appears here as visitors browse. The feed shows the latest events across the selected date range."
        />
      ) : (
        <Card
          title="Event feed"
          subtitle={`${formatNumber(data.items.length)} recent events${
            data.eventFilter === 'all' ? '' : ` · ${eventLabel(data.eventFilter)}`
          }`}
        >
          <DataTable
            columns={[
              { key: 'time', label: 'Time' },
              { key: 'event', label: 'Event' },
              { key: 'page', label: 'Page / project' },
              { key: 'location', label: 'Location' },
              { key: 'device', label: 'Device' },
              { key: 'source', label: 'Source' },
            ]}
            emptyLabel="No events match this filter."
            rows={data.items.map((item) => ({
              time: (
                <span className="whitespace-nowrap tabular-nums text-ios-tertiary">
                  {formatDateTime(item.ts)}
                </span>
              ),
              event: (
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-ios-label">{eventLabel(item.event)}</span>
                  {item.depth !== null ? <Pill tone="blue">{item.depth}% scroll</Pill> : null}
                </div>
              ),
              page: (
                <div className="min-w-0">
                  <p className="font-medium text-ios-label">
                    {item.project || pageLabel(item.path)}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-ios-tertiary">
                    {item.path}
                  </p>
                  {item.label ? (
                    <p className="mt-0.5 truncate text-[11px] text-ios-tertiary">{item.label}</p>
                  ) : null}
                </div>
              ),
              location: (
                <span className="whitespace-nowrap">
                  {countryFlag(item.country)} {item.city !== 'Unknown' ? `${item.city}, ` : ''}
                  {countryName(item.country)}
                </span>
              ),
              device: item.device,
              source: item.source,
            }))}
          />
          <MetricNote>
            The feed shows up to 300 events and reads the most recent 60 days of the selected range
            to stay fast. Times use the dashboard timezone.
          </MetricNote>
        </Card>
      )}
    </div>
  );
}
