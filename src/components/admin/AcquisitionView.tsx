import {
  formatNumber,
  formatPercent,
  pageLabel,
} from '@/lib/analytics-format';
import type { AcquisitionData } from '@/lib/analytics-store';
import { Breakdown, Card, DataTable, EmptyState, MetricNote, SectionHeading, StatCard } from './ui';

export function AcquisitionView({ data }: { data: AcquisitionData }) {
  const topSource = data.sources[0];
  const direct = data.sources.find((row) => row.source === 'Direct');

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Acquisition"
        description="Where visitors come from, which campaigns bring them in, and how each source converts. The original entry source is kept for the whole session."
      />

      {!data.hasData ? (
        <EmptyState
          title="No acquisition data in this range"
          description="Traffic sources, campaigns and UTM parameters appear after visitors arrive. Try a wider date range."
        />
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Sessions"
          value={formatNumber(data.totalSessions)}
          description="Attributed sessions in the selected range."
          hint="Every session is assigned to one source using a UTM source first, then the external referrer, then Direct."
        />
        <StatCard
          label="Sources"
          value={formatNumber(data.sources.length)}
          description="Distinct traffic sources with activity."
          hint="Direct, Google Search, LinkedIn, Behance, Dribbble, Instagram, X and other referrals."
        />
        <StatCard
          label="Top source"
          value={topSource ? topSource.source : '—'}
          description={topSource ? `${formatNumber(topSource.sessions)} sessions` : 'No sessions yet'}
          hint="Ranked by sessions in the selected range."
        />
        <StatCard
          label="Direct share"
          value={
            direct && data.totalSessions > 0
              ? formatPercent((direct.sessions / data.totalSessions) * 100)
              : '0%'
          }
          description="Sessions with no external referrer or campaign."
          hint="Internal navigation keeps its original source, so returning to the site is not counted as Direct."
        />
      </div>

      <Card title="Traffic sources" subtitle="Visitors, sessions, engagement and conversions by source">
        <DataTable
          columns={[
            { key: 'source', label: 'Source' },
            { key: 'visitors', label: 'Visitors', align: 'right' },
            { key: 'sessions', label: 'Sessions', align: 'right' },
            { key: 'views', label: 'Views', align: 'right' },
            { key: 'interactions', label: 'Interactions', align: 'right' },
            { key: 'conversions', label: 'Conversions', align: 'right' },
            { key: 'rate', label: 'Conv. rate', align: 'right' },
            { key: 'landing', label: 'Landing pages' },
          ]}
          emptyLabel="No traffic sources recorded yet."
          rows={data.sources.map((row) => ({
            source: <span className="font-medium text-ios-label">{row.source}</span>,
            visitors: formatNumber(row.visitors),
            sessions: formatNumber(row.sessions),
            views: formatNumber(row.views),
            interactions: formatNumber(row.interactions),
            conversions: formatNumber(row.conversions),
            rate: formatPercent(row.conversionRate),
            landing:
              row.landingPages.length > 0 ? (
                <ul className="space-y-1 text-[11px] text-ios-tertiary">
                  {row.landingPages.map((page) => (
                    <li key={page.label} className="truncate" title={page.label}>
                      {pageLabel(page.label)} · {formatNumber(page.count)}
                    </li>
                  ))}
                </ul>
              ) : (
                '—'
              ),
          }))}
        />
        <MetricNote>
          Conversion rate is conversions divided by sessions for that source. Landing pages are the
          first page of attributed sessions.
        </MetricNote>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Campaigns" subtitle="Performance by utm_campaign">
          <DataTable
            columns={[
              { key: 'campaign', label: 'Campaign' },
              { key: 'source', label: 'Source' },
              { key: 'views', label: 'Views', align: 'right' },
              { key: 'sessions', label: 'Sessions', align: 'right' },
              { key: 'conversions', label: 'Conv.', align: 'right' },
              { key: 'rate', label: 'Rate', align: 'right' },
            ]}
            emptyLabel="No UTM campaigns recorded yet."
            rows={data.campaigns.map((row) => ({
              campaign: <span className="font-medium text-ios-label">{row.campaign}</span>,
              source: row.source,
              views: formatNumber(row.views),
              sessions: formatNumber(row.sessions),
              conversions: formatNumber(row.conversions),
              rate: formatPercent(row.conversionRate),
            }))}
          />
        </Card>

        <Card title="Referrers" subtitle="External hostnames, including older page-view history">
          <Breakdown rows={data.referrers} emptyLabel="No referrers recorded yet." limit={12} />
        </Card>
      </div>

      <Card title="UTM parameters" subtitle="Source, medium, campaign, content and term combinations">
        <DataTable
          columns={[
            { key: 'source', label: 'Source' },
            { key: 'medium', label: 'Medium' },
            { key: 'campaign', label: 'Campaign' },
            { key: 'content', label: 'Content' },
            { key: 'term', label: 'Term' },
            { key: 'views', label: 'Views', align: 'right' },
            { key: 'sessions', label: 'Sessions', align: 'right' },
          ]}
          emptyLabel="No UTM parameters recorded yet."
          rows={data.utm.map((row) => ({
            source: row.source || '—',
            medium: row.medium || '—',
            campaign: row.campaign || '—',
            content: row.content || '—',
            term: row.term || '—',
            views: formatNumber(row.views),
            sessions: formatNumber(row.sessions),
          }))}
        />
        <MetricNote>
          A new campaign entry wins for that session; otherwise the original entry source is kept.
          This prevents internal navigation from being misclassified as Direct.
        </MetricNote>
      </Card>
    </div>
  );
}
