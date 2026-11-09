import type { ReactNode } from 'react';
import Link from 'next/link';
import { Download, LogOut, ShieldCheck } from 'lucide-react';
import type { AnalyticsRange } from '@/lib/analytics-range';
import { SetupNotice } from './SetupNotice';

export const VIEWS = [
  { id: 'overview', label: 'Overview' },
  { id: 'pages', label: 'Pages & Projects' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'acquisition', label: 'Acquisition' },
  { id: 'audience', label: 'Audience' },
  { id: 'activity', label: 'Activity' },
  { id: 'visitors', label: 'Visitors' },
  { id: 'conversions', label: 'Conversions' },
  { id: 'settings', label: 'Settings' },
] as const;

export type DashboardView = (typeof VIEWS)[number]['id'];

export type DashboardFilters = Record<string, string | undefined>;

export function adminHref(
  view: string,
  range: AnalyticsRange,
  filters: DashboardFilters = {},
): string {
  const params = new URLSearchParams();
  if (range.isCustom) {
    params.set('from', range.from);
    params.set('to', range.to);
  } else {
    params.set('range', String(range.days));
  }
  params.set('view', view);

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all') params.set(key, value);
  });

  return `/admin?${params.toString()}`;
}

export function exportHref(
  section: string,
  range: AnalyticsRange,
  filters: DashboardFilters = {},
): string {
  const params = new URLSearchParams();
  if (range.isCustom) {
    params.set('from', range.from);
    params.set('to', range.to);
  } else {
    params.set('range', String(range.days));
  }
  params.set('section', section);

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all') params.set(key, value);
  });

  return `/api/admin/export?${params.toString()}`;
}

interface DashboardShellProps {
  view: DashboardView;
  range: AnalyticsRange;
  storeConfigured: boolean;
  error: string | null;
  filters?: DashboardFilters;
  children: ReactNode;
  lastUpdated?: number;
}

export function DashboardShell({
  view,
  range,
  storeConfigured,
  error,
  filters = {},
  children,
  lastUpdated,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-ios-grouped font-ios text-ios-label">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ios-tertiary">
              <span className="size-1.5 rounded-full bg-ios-green" aria-hidden="true" />
              Private · hidden from visitors and search engines
            </p>
            <h1 className="mt-2 text-[2rem] font-semibold leading-tight tracking-[-0.03em]">
              Portfolio intelligence
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ios-secondary">
              Understand who visits, which projects hold attention, where traffic comes from, and
              which interactions create opportunities.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="flex flex-wrap items-center gap-2">
              <RangeControls view={view} range={range} filters={filters} />
              <ExportMenu range={range} filters={filters} />
            </div>

            <div className="flex items-center gap-3">
              {lastUpdated ? (
                <span className="text-[11px] text-ios-tertiary">
                  Updated{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(lastUpdated))}
                </span>
              ) : null}
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
          </div>
        </header>

        <nav
          aria-label="Analytics sections"
          className="mt-7 flex gap-1 overflow-x-auto rounded-ios-xl border border-ios-separator bg-white/70 p-1.5 shadow-ios-soft backdrop-blur-xl"
        >
          {VIEWS.map((item) => {
            const active = item.id === view;
            return (
              <Link
                key={item.id}
                href={adminHref(item.id, range, item.id === 'visitors' ? {} : filters)}
                aria-current={active ? 'page' : undefined}
                className={`shrink-0 rounded-[10px] px-3 py-2 text-xs font-semibold transition-colors sm:px-3.5 ${
                  active
                    ? 'bg-ios-blue text-white shadow-ios-button-soft'
                    : 'text-ios-secondary hover:bg-ios-fill hover:text-ios-label'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 space-y-4">
          {!storeConfigured ? <SetupNotice compact /> : null}

          {error ? (
            <div className="rounded-ios-xl border border-ios-red/25 bg-white/80 p-5 text-sm text-ios-secondary shadow-ios-soft">
              <p className="font-semibold text-ios-label">Could not load analytics</p>
              <p className="mt-1">
                {error} Check the Redis URL/token in your environment variables and try again.
              </p>
            </div>
          ) : null}

          {children}
        </div>

        <footer className="mt-10 flex items-start gap-2 border-t border-ios-separator pt-6 text-xs leading-relaxed text-ios-tertiary">
          <ShieldCheck size={14} className="mt-0.5 shrink-0" />
          <p>
            First-party, cookieless analytics. Visitors are identified by an anonymous random ID, not
            fingerprinting. IP addresses are never stored; location is approximate and uses IP
            geolocation with an edge fallback. Visitors who send Do Not Track or Global Privacy
            Control are not counted. Data is kept for 180 days.
          </p>
        </footer>
      </div>
    </div>
  );
}

function RangeControls({
  view,
  range,
  filters,
}: {
  view: DashboardView;
  range: AnalyticsRange;
  filters: DashboardFilters;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex rounded-full bg-ios-fill p-1">
        {[7, 30, 90].map((option) => {
          const active = !range.isCustom && range.days === option;
          return (
            <Link
              key={option}
              href={adminHref(view, { ...range, isCustom: false, days: option }, filters)}
              aria-current={active ? 'page' : undefined}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? 'bg-white text-ios-label shadow-sm'
                  : 'text-ios-tertiary hover:text-ios-label'
              }`}
            >
              {option}d
            </Link>
          );
        })}
      </div>

      <details className="group relative">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-ios-separator bg-white/80 px-3 py-1.5 text-xs font-semibold text-ios-secondary transition-colors hover:border-ios-separator-strong hover:text-ios-label">
          Custom
        </summary>
        <form
          method="get"
          action="/admin"
          className="absolute right-0 z-30 mt-2 w-64 rounded-ios-xl border border-ios-separator bg-white p-4 shadow-ios-lg"
        >
          <input type="hidden" name="view" value={view} />
          {Object.entries(filters).map(([key, value]) =>
            value && value !== 'all' ? (
              <input key={key} type="hidden" name={key} value={value} />
            ) : null,
          )}
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
            From
            <input
              type="date"
              name="from"
              defaultValue={range.from}
              className="mt-1 w-full rounded-ios border border-ios-separator bg-ios-grouped px-3 py-2 text-sm font-normal text-ios-label outline-none focus:border-ios-blue/50"
            />
          </label>
          <label className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
            To
            <input
              type="date"
              name="to"
              defaultValue={range.to}
              className="mt-1 w-full rounded-ios border border-ios-separator bg-ios-grouped px-3 py-2 text-sm font-normal text-ios-label outline-none focus:border-ios-blue/50"
            />
          </label>
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-ios-blue px-4 py-2 text-xs font-semibold text-white shadow-ios-button-soft transition-colors hover:bg-ios-bluePressed"
          >
            Apply range
          </button>
          <p className="mt-2 text-[10px] leading-relaxed text-ios-tertiary">
            Up to 180 days. The previous period is the same number of days before it.
          </p>
        </form>
      </details>
    </div>
  );
}

const EXPORTS = [
  { section: 'all', label: 'Everything' },
  { section: 'overview', label: 'Overview metrics' },
  { section: 'visitors', label: 'Visitor data' },
  { section: 'sessions', label: 'Session data' },
  { section: 'pages', label: 'Page performance' },
  { section: 'projects', label: 'Project performance' },
  { section: 'sources', label: 'Traffic sources' },
  { section: 'engagement', label: 'Engagement events' },
  { section: 'conversions', label: 'Conversion events' },
];

function ExportMenu({
  range,
  filters,
}: {
  range: AnalyticsRange;
  filters: DashboardFilters;
}) {
  return (
    <details className="group relative">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-ios-separator bg-white/80 px-3 py-1.5 text-xs font-semibold text-ios-secondary transition-colors hover:border-ios-separator-strong hover:text-ios-label">
        <Download size={13} />
        CSV
      </summary>
      <div className="absolute right-0 z-30 mt-2 w-56 rounded-ios-xl border border-ios-separator bg-white p-2 shadow-ios-lg">
        {EXPORTS.map((item) => (
          <a
            key={item.section}
            href={exportHref(item.section, range, filters)}
            className="block rounded-[9px] px-3 py-2 text-xs font-medium text-ios-secondary transition-colors hover:bg-ios-fill hover:text-ios-label"
          >
            {item.label}
          </a>
        ))}
        <p className="px-3 pb-1 pt-2 text-[10px] leading-relaxed text-ios-tertiary">
          Exports follow the current date range and filters.
        </p>
      </div>
    </details>
  );
}
