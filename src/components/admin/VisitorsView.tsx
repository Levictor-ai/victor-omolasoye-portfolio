import Link from 'next/link';
import type { ReactNode } from 'react';
import { eventLabel } from '@/lib/analytics-events';
import { formatDateTime, formatNumber, pageLabel, timeAgo } from '@/lib/analytics-format';
import type { AnalyticsRange } from '@/lib/analytics-range';
import type { VisitorRow, VisitorsData } from '@/lib/analytics-store';
import { countryFlag, countryName } from '@/lib/countries';
import { adminHref } from './DashboardShell';
import { Card, DataTable, EmptyState, MetricNote, Pill, SectionHeading, StatCard } from './ui';

export function VisitorsView({ data, range }: { data: VisitorsData; range: AnalyticsRange }) {
  const visitor = data.selectedVisitorId ? data.visitors[0] ?? null : null;

  if (visitor) {
    return <VisitorDetail range={range} visitor={visitor} />;
  }

  return <VisitorList data={data} range={range} />;
}

function VisitorList({ data, range }: { data: VisitorsData; range: AnalyticsRange }) {
  const visitors = data.visitors;

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Visitors"
        description="Every anonymous visitor tracked in the selected range, with the details of the visit they made. No names or IP addresses are stored."
      />

      {!data.hasData || visitors.length === 0 ? (
        <EmptyState
          title="No visitors in this range"
          description="Visitor details appear here as visits are tracked. Try a wider range."
        />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Visitors"
              value={formatNumber(visitors.length)}
              description="Unique visitors with tracked visits in the selected range."
            />
            <StatCard
              label="New visitors"
              value={formatNumber(visitors.filter((visitor) => visitor.newVisitor).length)}
              description="First-ever visits inside the selected range."
            />
            <StatCard
              label="Returning visitors"
              value={formatNumber(
                visitors.filter((visitor) => !visitor.newVisitor).length,
              )}
              description="People who had been seen before the selected range."
            />
            <StatCard
              label="Tracked events"
              value={formatNumber(visitors.reduce((total, visitor) => total + visitor.events, 0))}
              description="All visit events attributed to these visitors."
            />
          </div>

          <Card title="Visitors" subtitle={`${formatNumber(visitors.length)} visitors in the selected range`}>
            <DataTable
              columns={[
                { key: 'visitor', label: 'Visitor' },
                { key: 'firstSeen', label: 'First seen' },
                { key: 'lastActive', label: 'Last active' },
                { key: 'type', label: 'Type' },
                { key: 'sessions', label: 'Sessions', align: 'right' },
                { key: 'events', label: 'Events', align: 'right' },
                { key: 'pages', label: 'Pages' },
                { key: 'location', label: 'Location' },
                { key: 'device', label: 'Device' },
                { key: 'source', label: 'Source' },
              ]}
              emptyLabel="No visitors match this filter."
              rows={visitors.map((visitor) => ({
                visitor: (
                  <a
                    href={adminHref('visitors', range, { visitor: visitor.visitorId })}
                    className="font-mono text-xs font-semibold text-ios-blue underline-offset-2 hover:underline"
                  >
                    {visitor.visitorId.slice(0, 8)}
                  </a>
                ),
                firstSeen: visitor.firstSeen ? formatDateTime(visitor.firstSeen) : '—',
                lastActive: visitor.lastSeen ? timeAgo(visitor.lastSeen, Date.now()) : '—',
                type: (
                  <Pill tone={visitor.newVisitor ? 'green' : 'neutral'}>
                    {visitor.newVisitor ? 'New' : 'Returning'}
                  </Pill>
                ),
                sessions: formatNumber(visitor.sessions),
                events: formatNumber(visitor.events),
                pages: visitor.pages[0] ? `${pageLabel(visitor.pages[0].label)} · ${formatNumber(visitor.pages[0].count)}` : '—',
                location: (
                  <span className="whitespace-nowrap">
                    {countryFlag(visitor.country)} {visitor.city !== 'Unknown' ? `${visitor.city}, ` : ''}
                    {countryName(visitor.country)}
                  </span>
                ),
                device: visitor.device,
                source: visitor.source,
              }))}
            />
          </Card>

          <MetricNote>
            The list is built from the same anonymous visit events as the activity feed, grouped by
            the visitor ID stored in the browser. Data is kept for 180 days.
          </MetricNote>
        </>
      )}
    </div>
  );
}

function VisitorDetail({
  range,
  visitor,
}: {
  range: AnalyticsRange;
  visitor: VisitorRow;
}) {
  const pagesViewed = visitor.pages.reduce((total, row) => total + row.count, 0);

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Visitor"
        description={`Anonymous visit details for visitor ${visitor.visitorId} within the selected range. No names or IP addresses are stored.`}
        action={
          <Link
            href={adminHref('visitors', range)}
            className="rounded-full border border-ios-separator bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ios-secondary transition-colors hover:border-ios-separator-strong hover:text-ios-label"
          >
            Back to visitors
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Events"
          value={formatNumber(visitor.events)}
          description="Tracked events recorded for this visitor."
        />
        <StatCard
          label="Sessions"
          value={formatNumber(visitor.sessions)}
          description="Sessions within the inactivity window."
        />
        <StatCard
          label="Pages viewed"
          value={formatNumber(pagesViewed)}
          description="Page views across the visitor's visit."
        />
        <StatCard
          label="First seen"
          value={visitor.firstSeen ? formatDateTime(visitor.firstSeen) : '—'}
          description="When this visitor was first tracked."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Visit details" subtitle="Aggregated signals for this visitor">
          <dl className="space-y-3 text-sm">
            <DetailRow label="Visitor ID">{visitor.visitorId}</DetailRow>
            <DetailRow label="First seen">
              {visitor.firstSeen ? formatDateTime(visitor.firstSeen) : '—'}
            </DetailRow>
            <DetailRow label="Last visit">
              {visitor.lastSeen ? formatDateTime(visitor.lastSeen) : '—'}
            </DetailRow>
            <DetailRow label="Type">
              <Pill tone={visitor.newVisitor ? 'green' : 'neutral'}>
                {visitor.newVisitor ? 'New' : 'Returning'}
              </Pill>
            </DetailRow>
            <DetailRow label="Sessions">{formatNumber(visitor.sessions)}</DetailRow>
            <DetailRow label="Events">{formatNumber(visitor.events)}</DetailRow>
            <DetailRow label="Location">
              {`${countryFlag(visitor.country)} ${visitor.city !== 'Unknown' ? `${visitor.city}, ` : ''}${countryName(visitor.country)}`}
            </DetailRow>
            <DetailRow label="Device">{visitor.device}</DetailRow>
            <DetailRow label="Source">{visitor.source}</DetailRow>
          </dl>

          {visitor.pages.length > 0 ? (
            <div className="mt-4 border-t border-ios-separator pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
                Pages visited
              </p>
              <ul className="mt-2 space-y-1.5">
                {visitor.pages.slice(0, 5).map((row) => (
                  <li
                    key={row.label}
                    className="flex items-baseline justify-between gap-3 text-sm text-ios-secondary"
                  >
                    <span className="truncate font-mono text-[11px] text-ios-label">
                      {pageLabel(row.label)}
                    </span>
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-ios-tertiary">
                      {formatNumber(row.count)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Card>

        <Card title="Visit timeline" subtitle="Events recorded for this visitor">
          <DataTable
            columns={[
              { key: 'time', label: 'Time' },
              { key: 'event', label: 'Event' },
              { key: 'page', label: 'Page / project' },
              { key: 'location', label: 'Location' },
              { key: 'device', label: 'Device' },
              { key: 'source', label: 'Source' },
            ]}
            emptyLabel="No events recorded for this visitor."
            rows={visitor.timeline.map((item) => ({
              time: <span className="whitespace-nowrap tabular-nums text-ios-tertiary">{formatDateTime(item.ts)}</span>,
              event: (
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-ios-label">{eventLabel(item.event)}</span>
                  {item.depth !== null ? <Pill tone="blue">{item.depth}% scroll</Pill> : null}
                </div>
              ),
              page: (
                <div className="min-w-0">
                  <p className="font-medium text-ios-label">{item.project || pageLabel(item.path)}</p>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-ios-tertiary">{item.path}</p>
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
            The timeline shows the visit events for this visitor in the selected range. Events older
            than the retention window or trimmed from the daily feed are not shown.
          </MetricNote>
        </Card>
      </div>
    </div>
  );
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ios-separator pb-2 last:border-0 last:pb-0">
      <dt className="text-ios-tertiary">{label}</dt>
      <dd className="font-medium text-ios-label">{children}</dd>
    </div>
  );
}
