import type { ReactNode } from 'react';
import Link from 'next/link';
import { LogOut, ShieldCheck } from 'lucide-react';
import { countryFlag, countryName } from '@/lib/countries';
import {
  RANGE_OPTIONS,
  type BreakdownRow,
  type RangeDays,
  type VisitSummary,
} from '@/lib/visit-store';
import { SetupNotice } from './SetupNotice';
import { TrendChart } from './TrendChart';

const number = new Intl.NumberFormat('en-US');

interface VisitDashboardProps {
  summary: VisitSummary | null;
  range: RangeDays;
  error: string | null;
  storeConfigured: boolean;
}

export function VisitDashboard({ summary, range, error, storeConfigured }: VisitDashboardProps) {
  const topCountry = summary?.countries[0];

  return (
    <div className="min-h-screen bg-ios-grouped font-ios text-ios-label">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-lg">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ios-tertiary">
              <span className="size-1.5 rounded-full bg-ios-green" aria-hidden="true" />
              Private
            </p>
            <h1 className="mt-2 text-[2rem] font-semibold leading-tight tracking-[-0.03em]">
              Portfolio analytics
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-ios-secondary">
              Page views, visitors, countries, and sources. Hidden from visitors and search
              engines — no public counters anywhere on the site.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="inline-flex rounded-full bg-ios-fill p-1">
              {RANGE_OPTIONS.map((option) => (
                <Link
                  key={option}
                  href={`/admin?range=${option}`}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    option === range
                      ? 'bg-white text-ios-label shadow-ios'
                      : 'text-ios-tertiary hover:text-ios-label'
                  }`}
                  aria-current={option === range ? 'page' : undefined}
                >
                  {option}d
                </Link>
              ))}
            </div>

            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ios-tertiary transition-colors hover:bg-ios-fill hover:text-ios-label"
              >
                <LogOut size={14} />
                Log out
              </button>
            </form>
          </div>
        </header>

        <div className="mt-8 space-y-4">
          {!storeConfigured ? <SetupNotice compact /> : null}

          {error ? (
            <div className="rounded-ios-xl border border-ios-red/25 bg-white/80 p-5 text-sm text-ios-secondary shadow-ios">
              <p className="font-semibold text-ios-label">Could not load analytics</p>
              <p className="mt-1">
                {error} Check the Redis URL/token in your environment variables and try again.
              </p>
            </div>
          ) : null}

          {summary ? (
            <>
              <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Summary">
                <StatCard
                  label={`Views · ${range}d`}
                  value={number.format(summary.rangeViews)}
                  note={`${number.format(summary.totalViews)} all time`}
                />
                <StatCard
                  label={`Visitors · ${range}d`}
                  value={number.format(summary.rangeVisitors)}
                  note={`${number.format(summary.totalVisitors)} all time`}
                />
                <StatCard
                  label="Countries"
                  value={number.format(summary.countries.length)}
                  note={
                    topCountry
                      ? `${countryFlag(topCountry.label)} ${countryName(topCountry.label)}`
                      : 'No visits yet'
                  }
                />
                <StatCard
                  label="Today"
                  value={number.format(summary.todayViews)}
                  note={`${number.format(summary.todayVisitors)} visitors today`}
                />
              </section>

              <Card title="Daily views" subtitle={`Last ${range} days`}>
                <TrendChart data={summary.daily} />
              </Card>

              {summary.rangeViews === 0 ? (
                <Card title="No visits in this range yet" subtitle="Your tracker is live">
                  <p className="text-sm leading-relaxed text-ios-secondary">
                    Open the site in another tab or on your phone, then reload this page. If you
                    just deployed, give it a minute and make sure the Redis variables are set.
                  </p>
                  <Link
                    href={`/admin?range=${range}`}
                    className="mt-4 inline-flex w-fit rounded-full bg-ios-blue px-5 py-2.5 text-sm font-semibold text-white shadow-ios-button transition-colors hover:bg-ios-bluePressed"
                  >
                    Refresh
                  </Link>
                </Card>
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card title="Countries" subtitle="Where visitors came from">
                    <Breakdown
                      rows={summary.countries}
                      emptyLabel="No country data yet"
                      renderLabel={(row) => (
                        <span className="flex min-w-0 items-center gap-2">
                          <span aria-hidden="true">{countryFlag(row.label)}</span>
                          <span className="truncate">{countryName(row.label)}</span>
                        </span>
                      )}
                    />
                  </Card>

                  <Card title="Top pages" subtitle="Most visited URLs">
                    <Breakdown
                      rows={summary.pages}
                      emptyLabel="No page data yet"
                      renderLabel={(row) => (
                        <a
                          href={row.label}
                          target="_blank"
                          rel="noreferrer"
                          className="truncate transition-colors hover:text-ios-blue"
                          title={row.label}
                        >
                          {row.label === '/' ? 'Home' : row.label}
                        </a>
                      )}
                    />
                  </Card>

                  <Card title="Sources" subtitle="Referrers">
                    <Breakdown
                      rows={summary.referrers}
                      emptyLabel="All visits were direct"
                      renderLabel={(row) =>
                        row.label === 'Direct' ? (
                          <span>Direct / no referrer</span>
                        ) : (
                          <a
                            href={`https://${row.label}`}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate transition-colors hover:text-ios-blue"
                          >
                            {row.label}
                          </a>
                        )
                      }
                    />
                  </Card>

                  <Card title="Devices" subtitle="Mobile vs desktop">
                    <Breakdown rows={summary.devices} emptyLabel="No device data yet" />
                  </Card>
                </div>
              )}
            </>
          ) : null}
        </div>

        <footer className="mt-10 flex items-start gap-2 border-t border-ios-separator pt-6 text-xs leading-relaxed text-ios-tertiary">
          <ShieldCheck size={14} className="mt-0.5 shrink-0" />
          <p>
            First-party, cookieless tracking. IP addresses are hashed and never stored; country
            comes from Vercel&apos;s edge headers. Data is kept for 180 days, and visitors who send
            Do Not Track or Global Privacy Control are not counted at all.
          </p>
        </footer>
      </div>
    </div>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-ios-xl border border-ios-separator bg-white/85 p-5 shadow-ios backdrop-blur-xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ios-label">{value}</p>
      <p className="mt-1 truncate text-xs text-ios-tertiary">{note}</p>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-ios-xl border border-ios-separator bg-white/85 p-5 shadow-ios backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-[-0.01em] text-ios-label">{title}</h2>
        {subtitle ? <p className="text-xs text-ios-tertiary">{subtitle}</p> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Breakdown({
  rows,
  emptyLabel,
  renderLabel,
}: {
  rows: BreakdownRow[];
  emptyLabel: string;
  renderLabel?: (row: BreakdownRow) => ReactNode;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-ios-tertiary">{emptyLabel}</p>;
  }

  const max = Math.max(...rows.map((row) => row.count), 1);

  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label} className="text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <div className="min-w-0 flex-1 text-ios-label">
              {renderLabel ? renderLabel(row) : <span className="truncate">{row.label}</span>}
            </div>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-ios-tertiary">
              {number.format(row.count)}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ios-fill">
            <div
              className="h-full rounded-full bg-ios-blue/70"
              style={{ width: `${Math.max(4, (row.count / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
