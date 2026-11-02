'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { parseUtm, sanitizeUtm, type UtmParams } from '@/lib/attribution';
import { isKnownEvent } from '@/lib/analytics-events';

const VISITOR_KEY = 'vo:vid';
const SESSION_KEY = 'vo:sid';
const ATTR_KEY = 'vo:attr';
const OPTOUT_KEY = 'vo:no-track';
const SESSION_TIMEOUT_MS = 30 * 60_000;
const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

interface StoredSession {
  id: string;
  last: number;
}

interface StoredAttribution {
  referrer: string;
  utm: UtmParams;
  last: number;
}

interface Identity {
  visitorId: string;
  sessionId: string;
  referrer: string;
  utm: UtmParams;
}

interface TrackerState {
  path: string;
  pageviewId: string;
  activeMs: number;
  lastTick: number;
  visible: boolean;
  engagementSeq: number;
  scrollSent: Set<number>;
}

function randomId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID().replace(/-/g, '');
    }
  } catch {
    // Fall through to the random string.
  }

  const bytes = new Uint8Array(16);
  try {
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  } catch {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
  }
}

function safeGet(storage: 'local' | 'session', key: string): string | null {
  try {
    return (storage === 'local' ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage: 'local' | 'session', key: string, value: string): void {
  try {
    (storage === 'local' ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {
    // Storage can be unavailable in private modes.
  }
}

function getVisitorId(): string {
  const existing = safeGet('local', VISITOR_KEY);
  if (existing) return existing;

  const id = randomId();
  safeSet('local', VISITOR_KEY, id);
  return id;
}

function getSessionId(): string {
  const raw = safeGet('session', SESSION_KEY);
  const now = Date.now();

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as StoredSession;
      if (parsed.id && now - parsed.last < SESSION_TIMEOUT_MS) {
        safeSet('session', SESSION_KEY, JSON.stringify({ id: parsed.id, last: now }));
        return parsed.id;
      }
    } catch {
      // Fall through to a new session.
    }
  }

  const id = randomId();
  safeSet('session', SESSION_KEY, JSON.stringify({ id, last: now }));
  return id;
}

function getAttribution(): StoredAttribution {
  const raw = safeGet('session', ATTR_KEY);
  const now = Date.now();

  let stored: StoredAttribution | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as StoredAttribution;
      if (
        parsed &&
        parsed.utm &&
        typeof parsed.last === 'number' &&
        now - parsed.last < SESSION_TIMEOUT_MS
      ) {
        stored = parsed;
      }
    } catch {
      stored = null;
    }
  }

  const url = new URL(window.location.href);
  const utm = parseUtm(url.searchParams);
  const referrer = document.referrer || '';
  let externalReferrer = referrer;

  try {
    if (referrer && new URL(referrer).hostname === window.location.hostname) {
      externalReferrer = '';
    }
  } catch {
    externalReferrer = '';
  }

  const persist = (value: { referrer: string; utm: UtmParams }): StoredAttribution => {
    const next = { ...value, last: now };
    safeSet('session', ATTR_KEY, JSON.stringify(next));
    return next;
  };

  // A new campaign entry always wins; otherwise keep the original entry source
  // for the whole session so internal navigation is not misclassified as direct.
  if (utm.source || utm.medium || utm.campaign || utm.content || utm.term) {
    return persist({ referrer: externalReferrer, utm });
  }

  if (stored) {
    return persist({ referrer: stored.referrer, utm: sanitizeUtm(stored.utm) });
  }

  return persist({ referrer: externalReferrer, utm });
}

function optedOut(): boolean {
  const params = new URLSearchParams(window.location.search);
  if (params.get('no-track') === '1') {
    safeSet('session', OPTOUT_KEY, '1');
    return true;
  }

  if (safeGet('session', OPTOUT_KEY) === '1' || safeGet('local', OPTOUT_KEY) === '1') {
    return true;
  }

  return (
    navigator.doNotTrack === '1' ||
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  );
}

function sameOrigin(href: string): boolean {
  try {
    return new URL(href, window.location.href).origin === window.location.origin;
  } catch {
    return true;
  }
}

function hostFromHref(href: string): string {
  try {
    return new URL(href, window.location.href).hostname.replace(/^www\./, '');
  } catch {
    return 'external';
  }
}

function projectFromHref(href: string): string {
  const match = /^\/projects\/([a-z0-9-]+)/i.exec(href);
  return match ? match[1] : '';
}

function readIdentity(): Identity {
  const attr = getAttribution();
  return {
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    referrer: attr.referrer,
    utm: attr.utm,
  };
}

/**
 * First-party, cookieless page-view and interaction tracker.
 *
 * - Anonymous visitor ID stored locally; anonymous session ID per 30-minute session.
 * - Keeps the original entry source for the session, so internal navigation is not "direct".
 * - Honours Do Not Track / Global Privacy Control and ?no-track=1.
 * - Uses sendBeacon so tracking never blocks navigation.
 */
export function VisitTracker() {
  const pathname = usePathname();
  const lastKey = useRef('');
  const state = useRef<TrackerState>({
    path: '',
    pageviewId: '',
    activeMs: 0,
    lastTick: 0,
    visible: true,
    engagementSeq: 0,
    scrollSent: new Set(),
  });
  const identity = useRef<Identity | null>(null);
  const sendRef = useRef<(payload: Record<string, unknown>) => void>(() => {});
  const flushRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const send = (payload: Record<string, unknown>) => {
      const body = JSON.stringify(payload);
      const blob = new Blob([body], { type: 'application/json' });

      try {
        if (navigator.sendBeacon?.('/api/track', blob)) return;
      } catch {
        // Fall through to fetch.
      }

      void fetch('/api/track', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        cache: 'no-store',
      }).catch(() => {});
    };

    const sendEvent = (payload: Record<string, unknown>) => {
      const current = identity.current ?? readIdentity();
      identity.current = current;
      send({
        ...current,
        ...payload,
        eventId:
          typeof payload.eventId === 'string'
            ? payload.eventId
            : `${current.sessionId}:${randomId()}`,
      });
    };

    sendRef.current = sendEvent;

    const tick = () => {
      const current = state.current;
      if (!current.visible || current.lastTick <= 0) return;
      const now = performance.now();
      current.activeMs += Math.max(0, now - current.lastTick);
      current.lastTick = now;
    };

    const flushEngagement = () => {
      const current = state.current;
      tick();
      if (!current.pageviewId || current.activeMs < 1000) return;

      const durationMs = Math.round(current.activeMs);
      current.activeMs = 0;
      current.engagementSeq += 1;

      sendEvent({
        type: 'event',
        event: 'engagement',
        path: current.path,
        pageviewId: current.pageviewId,
        durationMs,
        eventId: `${current.pageviewId}:engagement:${current.engagementSeq}`,
      });
    };

    flushRef.current = flushEngagement;

    const checkScroll = () => {
      const current = state.current;
      if (!current.pageviewId) return;

      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const percent = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;
      const nearBottom = window.scrollY >= scrollable - 2;

      for (const threshold of SCROLL_THRESHOLDS) {
        const reached = threshold === 100 ? nearBottom || percent >= 99.5 : percent >= threshold;
        if (!reached || current.scrollSent.has(threshold)) continue;

        current.scrollSent.add(threshold);
        sendEvent({
          type: 'event',
          event: 'scroll_depth',
          depth: threshold,
          label: `${threshold}%`,
          path: current.path,
          pageviewId: current.pageviewId,
          eventId: `${current.pageviewId}:scroll:${threshold}`,
        });
      }
    };

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        checkScroll();
      });
    };

    const onVisibility = () => {
      const current = state.current;
      if (document.visibilityState === 'hidden') {
        tick();
        current.visible = false;
        flushEngagement();
        return;
      }

      current.visible = true;
      current.lastTick = performance.now();
    };

    const onPageHide = () => {
      tick();
      flushEngagement();
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest('a,button,[data-vo-track]') as HTMLElement | null;
      if (!element || element.closest('[data-vo-skip]')) return;

      // Form submission is tracked after a successful response, not on the click.
      if (element instanceof HTMLButtonElement && element.type === 'submit') return;

      const explicit = element.getAttribute('data-vo-track') ?? '';
      const explicitLabel = element.getAttribute('data-vo-label') ?? '';
      const explicitProject = element.getAttribute('data-vo-project') ?? '';
      const href = element instanceof HTMLAnchorElement ? element.getAttribute('href') ?? '' : '';
      const label = (
        explicitLabel ||
        (element.textContent ?? '').replace(/\s+/g, ' ').trim()
      ).slice(0, 120);

      if (href.startsWith('/admin') || href.startsWith('/api')) return;

      let eventName = explicit;
      let project = explicitProject;
      let finalLabel = label;

      if (!eventName) {
        if (href.startsWith('mailto:')) {
          eventName = 'email_click';
          finalLabel = 'Email';
        } else if (/linkedin\.com/i.test(href)) {
          eventName = 'linkedin_click';
          finalLabel = 'LinkedIn';
        } else if (/resume|cv|curriculum/i.test(label) || /resume|cv/i.test(href)) {
          eventName = 'cv_download';
          finalLabel = 'CV / Resume';
        } else if (/calendly\.com|cal\.com|savvycal\.com/i.test(href) || /book (a )?call|schedule/i.test(label)) {
          eventName = 'booking_click';
          finalLabel = 'Booking';
        } else if (/^\/contact(?:[#?]|$)/.test(href)) {
          eventName = 'contact_button_click';
        } else if (/^\/projects\//.test(href)) {
          eventName = 'project_card_click';
          project = projectFromHref(href);
        } else if (/^https?:\/\//.test(href) && !sameOrigin(href)) {
          eventName = 'external_link_click';
          finalLabel = hostFromHref(href);
        } else if (element.closest('nav')) {
          eventName = 'nav_click';
        }
      }

      if (!eventName || !isKnownEvent(eventName)) return;

      const current = state.current;
      sendEvent({
        type: 'event',
        event: eventName,
        path: current.path,
        pageviewId: current.pageviewId,
        project,
        label: finalLabel,
        eventId: `${current.pageviewId || 'page'}:click:${randomId()}`,
      });
    };

    const onCustomTrack = (event: Event) => {
      const detail = (event as CustomEvent).detail as
        | { name?: unknown; params?: Record<string, unknown> }
        | undefined;
      const name = typeof detail?.name === 'string' ? detail.name : '';
      if (!name || !isKnownEvent(name)) return;

      const params = detail?.params ?? {};
      const current = state.current;
      sendEvent({
        type: 'event',
        event: name,
        path: current.path,
        pageviewId: current.pageviewId,
        project: typeof params.project === 'string' ? params.project : '',
        label: typeof params.label === 'string' ? params.label : '',
        eventId: `${current.pageviewId || 'page'}:${name}:${randomId()}`,
      });
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('vo:track', onCustomTrack as EventListener);
    const engagementTimer = window.setInterval(flushEngagement, 60_000);

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('vo:track', onCustomTrack as EventListener);
      window.clearInterval(engagementTimer);
    };
  }, []);

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/api')) return;
    if (typeof window === 'undefined') return;
    if (optedOut()) return;

    const key = `${pathname}${window.location.search}`;
    if (lastKey.current === key) return;
    lastKey.current = key;

    flushRef.current();

    const currentIdentity = readIdentity();
    identity.current = currentIdentity;

    const pageviewId = randomId();
    state.current = {
      path: pathname,
      pageviewId,
      activeMs: 0,
      lastTick: performance.now(),
      visible: document.visibilityState === 'visible',
      engagementSeq: 0,
      scrollSent: new Set(),
    };

    sendRef.current({
      type: 'pageview',
      path: pathname,
      pageviewId,
      eventId: pageviewId,
    });

    const scrollTimer = window.setTimeout(() => {
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      if (window.scrollY >= scrollable - 2 && !state.current.scrollSent.has(100)) {
        state.current.scrollSent.add(100);
        sendRef.current({
          type: 'event',
          event: 'scroll_depth',
          depth: 100,
          label: '100%',
          path: pathname,
          pageviewId,
          eventId: `${pageviewId}:scroll:100`,
        });
      }
    }, 700);

    return () => window.clearTimeout(scrollTimer);
  }, [pathname]);

  return null;
}
