'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const OPT_OUT_KEY = 'vo:no-track';

/**
 * Cookieless first-party page-view tracker.
 *
 * - Never runs on /admin or /api routes.
 * - Honours Do Not Track / Global Privacy Control.
 * - Visit `?no-track=1` once to opt this browser out for the session.
 */
export function VisitTracker() {
  const pathname = usePathname();
  const lastSent = useRef('');

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/api')) return;

    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('no-track') === '1') {
        window.sessionStorage.setItem(OPT_OUT_KEY, '1');
        return;
      }
      if (window.sessionStorage.getItem(OPT_OUT_KEY) === '1') return;
    } catch {
      // Storage can be unavailable in private modes; keep tracking in that case.
    }

    const dnt =
      navigator.doNotTrack === '1' ||
      (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    if (dnt) return;

    const key = `${pathname}${window.location.search}`;
    if (lastSent.current === key) return;
    lastSent.current = key;

    const payload = JSON.stringify({ path: pathname, referrer: document.referrer });
    const blob = new Blob([payload], { type: 'application/json' });

    if (navigator.sendBeacon?.('/api/track', blob)) return;

    void fetch('/api/track', {
      method: 'POST',
      body: payload,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      cache: 'no-store',
    }).catch(() => {});
  }, [pathname]);

  return null;
}
