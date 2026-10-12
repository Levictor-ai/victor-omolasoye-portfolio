import { track as vercelTrack } from '@vercel/analytics';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function track(name: string, params?: EventParams) {
  if (typeof window === 'undefined') return;

  try {
    vercelTrack(name, params);
  } catch {
    // Vercel Analytics is not always available (e.g. local dev without it enabled).
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params ?? {});
  }
}
