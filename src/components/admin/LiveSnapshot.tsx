'use client';

import { useEffect, useState } from 'react';
import { countryFlag, countryName } from '@/lib/countries';
import type { LastVisit } from '@/lib/visit-store';

const number = new Intl.NumberFormat('en-US');

interface LiveSnapshotProps {
  initialHourViews: number;
  initialLastVisit: LastVisit | null;
}

/** Polls a two-command endpoint so the busy card stays fresh cheaply. */
export function LiveSnapshot({ initialHourViews, initialLastVisit }: LiveSnapshotProps) {
  const [hourViews, setHourViews] = useState(initialHourViews);
  const [lastVisit, setLastVisit] = useState<LastVisit | null>(initialLastVisit);
  const [now, setNow] = useState<number | null>(null);

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

        const data = (await response.json()) as {
          hourViews?: number;
          lastVisit?: LastVisit | null;
        };

        if (cancelled) return;
        if (typeof data.hourViews === 'number') setHourViews(data.hourViews);
        setLastVisit(data.lastVisit ?? null);
        setNow(Date.now());
      } catch {
        // Keep the last known values.
      }
    };

    const timer = window.setInterval(load, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p className="text-3xl font-semibold tracking-[-0.03em]">{number.format(hourViews)}</p>
      <p className="mt-1 text-xs text-ios-tertiary">views this hour</p>

      {lastVisit ? (
        <div className="mt-4 border-t border-ios-separator pt-4 text-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
            Last visit
          </p>
          <p className="mt-1.5 font-medium text-ios-label">
            {now === null ? 'just now' : timeAgo(lastVisit.timestamp, now)}
          </p>
          <p className="mt-1 text-ios-secondary">
            {countryFlag(lastVisit.country)}{' '}
            {lastVisit.city !== 'Unknown' ? `${lastVisit.city}, ` : ''}
            {countryName(lastVisit.country)}
          </p>
          <p className="mt-1 truncate font-mono text-xs text-ios-tertiary">{lastVisit.path}</p>
        </div>
      ) : (
        <p className="mt-4 border-t border-ios-separator pt-4 text-sm text-ios-tertiary">
          No visits recorded yet.
        </p>
      )}
    </div>
  );
}

function timeAgo(timestamp: number, now: number): string {
  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (seconds < 45) return 'just now';

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}
