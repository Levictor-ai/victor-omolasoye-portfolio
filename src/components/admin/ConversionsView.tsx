import { CONVERSION_LABELS, eventLabel } from '@/lib/analytics-events';
import {
  formatDelta,
  formatNumber,
  formatPercent,
  pageLabel,
} from '@/lib/analytics-format';
import type { ConversionsData } from '@/lib/analytics-store';
import { TrendChart } from './TrendChart';
import { Breakdown, Card, DataTable, EmptyState, MetricNote, SectionHeading, StatCard } from './ui';

export function ConversionsView({ data }: { data: ConversionsData }) {
  const topType = data.byType[0];

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Conversions"
        description="The moments that create an opportunity: contact form submissions, project enquiries, email clicks, CV downloads and booking clicks."
      />

      {!data.hasData ? (
        <EmptyState
          title="No conversions in this range"
          description="Conversions are recorded when a visitor submits the contact form or a project enquiry, clicks an email link, downloads the CV or starts a booking. Try a wider range."
        />
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Conversions"
          value={formatNumber(data.totalConversions)}
          description="Tracked conversion events in the range."
          delta={formatDelta(data.totalConversions, data.previousConversions)}
          hint="Contact form, project enquiry, email, CV download and booking events."
        />
        <StatCard
          label="Conversion rate"
          value={formatPercent(data.conversionRate)}
          description="Conversions divided by sessions."
          delta={formatDelta(data.conversionRate, data.previousConversionRate)}
          hint="A session can produce more than one conversion, so the rate can exceed 100%."
        />
        <StatCard
          label="Sessions"
          value={formatNumber(data.sessions)}
          description="Sessions used as the conversion-rate base."
          delta={formatDelta(data.sessions, data.previousSessions)}
          hint="Sessions end after 30 minutes of inactivity."
        />
        <StatCard
          label="Top conversion"
          value={topType ? CONVERSION_LABELS[topType.label] ?? eventLabel(topType.label) : '—'}
          description={topType ? `${formatNumber(topType.count)} events` : 'No conversions yet'}
          hint="Ranked by number of conversion events in the selected range."
        />
      </div>

      <Card title="Conversion trend" subtitle="Daily conversions compared with sessions">
        <TrendChart
          data={data.daily}
          series={[
            { key: 'conversions', label: 'Conversions', color: '#34C759' },
            { key: 'sessions', label: 'Sessions', color: '#314CB6' },
          ]}
          height={200}
          ariaLabel="Daily conversions and sessions"
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="By conversion type" subtitle="What visitors completed">
          <Breakdown
            rows={data.byType}
            emptyLabel="No conversions recorded yet."
            limit={12}
            renderLabel={(row) => (
              <span className="truncate">{CONVERSION_LABELS[row.label] ?? eventLabel(row.label)}</span>
            )}
          />
        </Card>
        <Card title="By page" subtitle="Where conversions happened">
          <Breakdown
            rows={data.byPage}
            emptyLabel="No conversion pages yet."
            limit={12}
            renderLabel={(row) => (
              <span className="truncate" title={row.label}>
                {pageLabel(row.label)}
              </span>
            )}
          />
        </Card>
      </div>

      <Card title="By source" subtitle="Conversion rate for each traffic source">
        <DataTable
          columns={[
            { key: 'source', label: 'Source' },
            { key: 'conversions', label: 'Conversions', align: 'right' },
            { key: 'sessions', label: 'Sessions', align: 'right' },
            { key: 'rate', label: 'Rate', align: 'right' },
          ]}
          emptyLabel="No conversion sources yet."
          rows={data.bySource.map((row) => ({
            source: <span className="font-medium text-ios-label">{row.source}</span>,
            conversions: formatNumber(row.conversions),
            sessions: formatNumber(row.sessions),
            rate: formatPercent(row.rate),
          }))}
        />
        <MetricNote>
          Conversion rate is conversions divided by sessions for that source. Attribution uses the
          original entry source for the session.
        </MetricNote>
      </Card>

      <Card title="By campaign" subtitle="Conversions attributed to UTM campaigns">
        <Breakdown rows={data.byCampaign} emptyLabel="No campaign conversions yet." limit={12} />
      </Card>
    </div>
  );
}
