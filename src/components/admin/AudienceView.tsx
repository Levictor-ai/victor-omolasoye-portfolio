import { formatNumber, formatPercent } from '@/lib/analytics-format';
import type { AudienceData } from '@/lib/analytics-store';
import { countryFlag, countryName } from '@/lib/countries';
import { Breakdown, Card, EmptyState, MetricNote, SectionHeading, StatCard } from './ui';

export function AudienceView({ data }: { data: AudienceData }) {
  const topCountry = data.countries[0];
  const topCity = data.cities[0];
  const topDevice = data.devices[0];
  const totalCountries = data.countries.reduce((total, row) => total + row.count, 0);

  return (
    <div className="space-y-4">
      <SectionHeading
        title="Audience"
        description="A privacy-safe view of where visitors are, what they browse on, and how reliable the approximate location signal is."
      />

      {!data.hasData ? (
        <EmptyState
          title="No audience data in this range"
          description="Country, city, device and browser data will appear after visits. Location is approximate and never stores an IP address."
        />
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Top country"
          value={topCountry ? `${countryFlag(topCountry.label)} ${countryName(topCountry.label)}` : '—'}
          description={
            topCountry
              ? `${formatNumber(topCountry.count)} page views · ${formatPercent(
                  totalCountries > 0 ? (topCountry.count / totalCountries) * 100 : 0,
                )}`
              : 'No country data yet'
          }
          hint="Approximate country from IP geolocation, with an edge-header fallback."
        />
        <StatCard
          label="Top city"
          value={topCity ? topCity.label : '—'}
          description={topCity ? `${formatNumber(topCity.count)} page views` : 'No city data yet'}
          hint="Cities are estimated from IP geolocation and may be the nearest network hub, not an exact location."
        />
        <StatCard
          label="Top device"
          value={topDevice ? topDevice.label : '—'}
          description={topDevice ? `${formatNumber(topDevice.count)} page views` : 'No device data yet'}
          hint="Derived from the browser user agent: mobile, tablet or desktop."
        />
        <StatCard
          label="Countries"
          value={formatNumber(data.countries.length)}
          description="Distinct countries in the selected range."
          hint="Only the top 12 are shown in the breakdown below."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Countries" subtitle="Approximate, by page views">
          <Breakdown
            rows={data.countries}
            emptyLabel="No country data yet."
            renderLabel={(row) => (
              <span className="truncate">
                {countryFlag(row.label)} {countryName(row.label)}
              </span>
            )}
          />
        </Card>
        <Card title="Cities" subtitle="Estimated from IP, by page views">
          <Breakdown
            rows={data.cities}
            emptyLabel="No city data yet."
            limit={12}
            renderLabel={(row) => <span className="truncate">{row.label}</span>}
          />
        </Card>
        <Card title="Devices" subtitle="Mobile, tablet and desktop">
          <Breakdown rows={data.devices} emptyLabel="No device data yet." limit={4} />
        </Card>
        <Card title="Browsers" subtitle="By tracked event">
          <Breakdown rows={data.browsers} emptyLabel="No browser data yet." limit={8} />
        </Card>
        <Card title="Operating systems" subtitle="By tracked event">
          <Breakdown rows={data.operatingSystems} emptyLabel="No OS data yet." limit={8} />
        </Card>
        <Card title="Location method" subtitle="How each location was estimated">
          <Breakdown
            rows={data.geoMethods}
            emptyLabel="No geolocation data yet."
            limit={3}
            showPercent={false}
          />
          <MetricNote>
            IP geolocation is the preferred signal; edge headers are only a fallback. Raw IP
            addresses are hashed for a short-lived cache and never stored with analytics events.
          </MetricNote>
        </Card>
      </div>
    </div>
  );
}
