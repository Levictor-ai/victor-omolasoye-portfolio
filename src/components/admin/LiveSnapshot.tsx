'use client';

import { useEffect, useState } from 'react';
import { eventLabel } from '@/lib/analytics-events';
import { formatDateTime, formatNumber, pageLabel, timeAgo } from '@/lib/analytics-format';
import type { LiveStats } from '@/lib/analytics-store';
import { countryFlag, countryName } from '@/lib/countries';
import { Breakdown } from './ui';

const POLL_MS = 60_000;

export function LiveSnapshot({ initial }: { initial: LiveStats }) {
  const [stats, setStats] = useState<LiveStats>(initial);
  const [now, setNow] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (document.visibilityState !== 'visible') return;

      try {
        const response = await fetch('/api/admin/live', { cache: 'no-store' });
        if (!response.ok || cancelled) return;

        const data = (await response.json()) as Partial<LiveStats>;
        if (cancelled || typeof data.activeVisitors !== 'number') return;

        setStats((current) => ({ ...current, ...data }));
        setFailed(false);
        setNow(Date.now());
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    const timer = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <LiveMetric value={formatNumber(stats.activeVisitors)} label="active now" />
        <LiveMetric value={formatNumber(stats.last60mViews)} label="views · 60 min" />
        <LiveMetric value={formatNumber(stats.hourViews)} label="views · this hour" />
      </div>

      <div className="mt-4 border-t border-ios-separator pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
          Most active pages
        </p>
        <div className="mt-2">
          <Breakdown
            rows={stats.mostActivePages}
            emptyLabel="No page views in the last hour."
            showPercent={false}
            limit={4}
            renderLabel={(row) => (
              <span className="truncate" title={row.label}>
                {pageLabel(row.label)}
              </span>
            )}
          />
        </div>
      </div>

      <div className="mt-4 border-t border-ios-separator pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
          Recent activity
        </p>
        {stats.recent.length > 0 ? (
          <ul className="mt-2 space-y-2.5">
            {stats.recent.slice(0, 5).map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ios-label">
                    {eventLabel(item.event)}
                    <span className="font-normal text-ios-tertiary"> · {pageLabel(item.path)}</span>
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-ios-tertiary">
                    {countryFlag(item.country)} {countryName(item.country)} · {item.device}
                  </p>
                </div>
                <span
                  className="shrink-0 text-[11px] tabular-nums text-ios-tertiary"
                  title={formatDateTime(item.ts)}
                >
                  {now ? timeAgo(item.ts, now) : formatDateTime(item.ts)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-ios-tertiary">No activity recorded yet today.</p>
        )}
      </div>

      <p className="mt-4 text-[11px] text-ios-tertiary">
        {failed ? 'Live updates paused — showing the last known values.' : 'Updates every 60 seconds while this tab is visible.'}
      </p>
    </div>
  );
}

function LiveMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-ios border border-ios-separator bg-ios-grouped/70 px-2.5 py-2">
      <p className="text-xl font-semibold tracking-[-0.02em] text-ios-label">{value}</p>
      <p className="mt-0.5 text-[10px] leading-tight text-ios-tertiary">{label}</p>
    </div>
  );
}
