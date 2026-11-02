import { formatDateTime, formatDayLong, formatNumber, pageLabel } from '@/lib/analytics-format';
import type { SettingsData } from '@/lib/analytics-store';
import { Card, MetricNote, Pill, SectionHeading, StatCard } from './ui';

export function SettingsView({ data }: { data: SettingsData }) {
  return (
    <div className="space-y-4">
      <SectionHeading
        title="Settings & data health"
        description="How collection is configured, what is stored, and when detailed data started."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Analytics store"
          value={data.storeConfigured ? 'Connected' : 'Not configured'}
          description="Upstash Redis REST storage."
          hint="Configure UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN."
        />
        <StatCard
          label="Geolocation"
          value={data.geoEnabled ? 'Enabled' : 'Disabled'}
          description="Approximate location from IP, with an edge fallback."
          hint="Set GEOLOCATION_ENABLED=false to disable IP lookup. Raw IPs are never stored."
        />
        <StatCard
          label="Retention"
          value={`${data.retentionDays} days`}
          description="Daily analytics keys expire automatically."
          hint="Older data is removed by Redis key expiry, not by a manual cleanup job."
        />
        <StatCard
          label="Session timeout"
          value={`${data.sessionTimeoutMinutes} min`}
          description="Inactivity before a new session starts."
          hint="The same timeout applies to stored first-touch attribution."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Collection status" subtitle="When data started and the latest event">
          <dl className="space-y-3 text-sm">
            <Row label="Detailed data since">
              {data.v2Since ? formatDayLong(data.v2Since) : 'Waiting for the first tracked event'}
            </Row>
            <Row label="Last event">
              {data.lastEventAt ? formatDateTime(data.lastEventAt) : 'No events yet'}
            </Row>
            <Row label="Last page">
              {data.lastPath ? pageLabel(data.lastPath) : '—'}
            </Row>
            <Row label="Timezone">{data.timezone}</Row>
          </dl>
          <MetricNote>
            Session, engagement, scroll, UTM and conversion metrics are collected from the moment
            the upgraded tracker went live. Older page-view totals remain available but are not
            backfilled with metrics that were never recorded.
          </MetricNote>
        </Card>

        <Card title="Today" subtitle="A quick health check of current collection">
          <div className="grid grid-cols-2 gap-3">
            <SmallStat label="Sessions" value={formatNumber(data.sessionsToday)} />
            <SmallStat label="Interactions" value={formatNumber(data.eventsToday)} />
            <SmallStat label="New visitors" value={formatNumber(data.newVisitorsToday)} />
            <SmallStat label="Returning" value={formatNumber(data.returningVisitorsToday)} />
            <SmallStat label="Activity events" value={formatNumber(data.activityToday)} />
            <SmallStat label="Timezone" value={data.timezone} />
          </div>
        </Card>
      </div>

      <Card title="Privacy & security" subtitle="What this dashboard does and does not collect">
        <ul className="grid gap-3 text-sm leading-relaxed text-ios-secondary sm:grid-cols-2">
          <PrivacyItem title="Anonymous IDs">
            A random visitor ID is stored in the browser and a session ID in session storage. No
            fingerprinting, cookies or cross-site tracking.
          </PrivacyItem>
          <PrivacyItem title="No raw IP addresses">
            IP addresses are used transiently for approximate geolocation and hashed for a
            short-lived cache. They are never written to analytics records.
          </PrivacyItem>
          <PrivacyItem title="Privacy signals respected">
            Visitors sending Do Not Track or Global Privacy Control are not tracked, and
            <span className="font-mono text-[11px]"> ?no-track=1 </span>
            opts a browser out.
          </PrivacyItem>
          <PrivacyItem title="Private by default">
            The dashboard and all analytics APIs require the admin session, send noindex headers and
            are excluded from the public site and sitemap.
          </PrivacyItem>
          <PrivacyItem title="Internal traffic excluded">
            Localhost and configured hostnames are ignored so development visits do not pollute the
            data.
          </PrivacyItem>
          <PrivacyItem title="Validated events">
            Event names, paths, IDs, scroll depths and durations are validated and bounded before
            anything is stored.
          </PrivacyItem>
        </ul>
      </Card>

      <Card title="Configuration" subtitle="Environment variables used by analytics">
        <div className="space-y-2 text-sm">
          <ConfigRow name="UPSTASH_REDIS_REST_URL / TOKEN" description="Primary Redis REST credentials." />
          <ConfigRow name="KV_REST_API_URL / TOKEN" description="Fallback Vercel Marketplace Redis credentials." />
          <ConfigRow name="ADMIN_PASSWORD" description="Required to sign in to this dashboard." />
          <ConfigRow name="ADMIN_SESSION_SECRET" description="Optional signing secret for the admin session." />
          <ConfigRow name="ANALYTICS_TIMEZONE" description="Timezone used for day boundaries. Defaults to Africa/Lagos." />
          <ConfigRow name="ANALYTICS_SALT" description="Salt used when hashing fallback visitor IDs." />
          <ConfigRow name="ANALYTICS_EXCLUDE_HOSTS" description="Comma-separated hostnames to exclude from tracking." />
          <ConfigRow name="GEOLOCATION_ENABLED" description="Set to false to disable IP geolocation." />
          <ConfigRow name="GEOLOCATION_API_URL" description="Optional geolocation endpoint. Defaults to ipwho.is." />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone="green">Cookieless</Pill>
          <Pill tone="blue">First-party</Pill>
          <Pill tone="neutral">No PII</Pill>
          <Pill tone="orange">180-day retention</Pill>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ios-separator pb-2 last:border-0 last:pb-0">
      <dt className="text-ios-tertiary">{label}</dt>
      <dd className="font-medium text-ios-label">{children}</dd>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-ios border border-ios-separator bg-ios-grouped/60 p-3">
      <p className="text-lg font-semibold tracking-[-0.02em] text-ios-label">{value}</p>
      <p className="mt-0.5 text-[11px] text-ios-tertiary">{label}</p>
    </div>
  );
}

function PrivacyItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="rounded-ios border border-ios-separator bg-ios-grouped/50 p-3">
      <p className="font-semibold text-ios-label">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-ios-secondary">{children}</p>
    </li>
  );
}

function ConfigRow({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ios-separator pb-2 last:border-0 last:pb-0">
      <code className="font-mono text-[11px] text-ios-label">{name}</code>
      <span className="text-xs text-ios-tertiary">{description}</span>
    </div>
  );
}
