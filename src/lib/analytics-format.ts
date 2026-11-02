import { analyticsTimeZone } from './analytics-range';

const numberFormatter = new Intl.NumberFormat('en-US');

export function formatNumber(value: number): string {
  return numberFormatter.format(Math.round(value));
}

export function formatPercent(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return '0%';
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded}%`;
}

export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '0s';

  const totalSeconds = Math.round(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatDecimal(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return '0';
  return value.toFixed(digits);
}

export type DeltaTone = 'up' | 'down' | 'flat' | 'unknown';

export interface Delta {
  label: string;
  tone: DeltaTone;
  available: boolean;
}

/**
 * Compares two periods. A zero previous value does not invent a percentage;
 * it is shown as "New" so the dashboard never fabricates a trend.
 */
export function formatDelta(current: number, previous: number): Delta {
  if (!Number.isFinite(current) || !Number.isFinite(previous)) {
    return { label: '—', tone: 'unknown', available: false };
  }

  if (previous === 0) {
    if (current === 0) return { label: '—', tone: 'flat', available: false };
    return { label: 'New', tone: 'up', available: true };
  }

  const change = ((current - previous) / previous) * 100;
  if (Math.abs(change) < 0.5) return { label: '0%', tone: 'flat', available: true };

  return {
    label: `${change > 0 ? '+' : ''}${Math.round(change)}%`,
    tone: change > 0 ? 'up' : 'down',
    available: true,
  };
}

export function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: analyticsTimeZone(),
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function formatTime(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: analyticsTimeZone(),
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(timestamp));
}

export function formatDay(day: string): string {
  const parsed = new Date(`${day}T12:00:00.000Z`);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
  }).format(parsed);
}

export function formatDayLong(day: string): string {
  const parsed = new Date(`${day}T12:00:00.000Z`);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsed);
}

export function timeAgo(timestamp: number, now = Date.now()): string {
  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));
  if (seconds < 45) return 'just now';

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export function pageLabel(path: string): string {
  if (!path) return 'Unknown page';
  if (path === '/') return 'Home';
  if (path === '/projects') return 'Projects';
  if (path === '/about') return 'About';
  if (path === '/contact') return 'Contact';
  if (path === '/blog') return 'Blog';
  if (path.startsWith('/projects/')) {
    return path.replace('/projects/', '').replace(/-/g, ' ');
  }
  return path;
}
