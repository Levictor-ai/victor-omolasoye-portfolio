/** Shared range + time helpers for the private analytics dashboard. */

export const RANGE_OPTIONS = [7, 30, 90] as const;
export type RangeDays = (typeof RANGE_OPTIONS)[number];

/** How long daily analytics buckets are kept. */
export const RETENTION_DAYS = 180;
export const MAX_RANGE_DAYS = 180;

/** A visitor is considered to be in the same session for this long. */
export const SESSION_TIMEOUT_MINUTES = 30;
export const SESSION_TIMEOUT_SECONDS = SESSION_TIMEOUT_MINUTES * 60;

/** "Active now" window used by the live card. */
export const ACTIVE_WINDOW_SECONDS = 300;

const DAY_MS = 86_400_000;
const DAY_SECONDS = 86_400;
export const RETENTION_SECONDS = RETENTION_DAYS * DAY_SECONDS;

export interface AnalyticsRange {
  days: number;
  from: string;
  to: string;
  previousFrom: string;
  previousTo: string;
  label: string;
  isCustom: boolean;
  /** Number of days in the previous comparison period. */
  previousDays: number;
}

export function analyticsTimeZone(): string {
  return process.env.ANALYTICS_TIMEZONE?.trim() || 'Africa/Lagos';
}

interface DateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

function partsInZone(date: Date, withTime = false): DateParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: analyticsTimeZone(),
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(withTime
      ? { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' as const }
      : {}),
  }).formatToParts(date);

  const pick = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: pick('year'),
    month: pick('month'),
    day: pick('day'),
    hour: pick('hour'),
    minute: pick('minute'),
  };
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** Calendar date in the configured timezone, as YYYY-MM-DD. */
export function dayInZone(date: Date): string {
  const { year, month, day } = partsInZone(date);
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function currentDay(): string {
  return dayInZone(new Date());
}

export function isDay(value: string | undefined | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function addDays(day: string, amount: number): string {
  const base = Date.parse(`${day}T00:00:00.000Z`);
  return new Date(base + amount * DAY_MS).toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00.000Z`) - Date.parse(`${from}T00:00:00.000Z`)) / DAY_MS);
}

export function dayListBetween(from: string, to: string): string[] {
  const total = Math.max(1, daysBetween(from, to) + 1);
  return Array.from({ length: total }, (_, index) => addDays(from, index));
}

/** The last `days` calendar dates ending today. */
export function dayList(days: number, offset = 0): string[] {
  const today = currentDay();
  const end = addDays(today, -offset);
  return Array.from({ length: days }, (_, index) => addDays(end, -(days - 1 - index)));
}

export function parseRangeNumber(value: string | string[] | undefined): RangeDays {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return RANGE_OPTIONS.includes(parsed as RangeDays) ? (parsed as RangeDays) : 30;
}

export interface RangeSearchParams {
  range?: string | string[];
  from?: string | string[];
  to?: string | string[];
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Resolves either a preset (7/30/90 days) or a custom from/to range.
 * The previous period is always the same number of days immediately before it.
 */
export function resolveRange(params: RangeSearchParams = {}): AnalyticsRange {
  const rawFrom = first(params.from);
  const rawTo = first(params.to);

  if (isDay(rawFrom) && isDay(rawTo) && rawFrom <= rawTo) {
    const days = daysBetween(rawFrom, rawTo) + 1;
    if (days >= 1 && days <= MAX_RANGE_DAYS) {
      const previousTo = addDays(rawFrom, -1);
      const previousFrom = addDays(previousTo, -(days - 1));
      return {
        days,
        from: rawFrom,
        to: rawTo,
        previousFrom,
        previousTo,
        label: `${rawFrom} → ${rawTo}`,
        isCustom: true,
        previousDays: days,
      };
    }
  }

  const days = parseRangeNumber(params.range);
  const to = currentDay();
  const from = addDays(to, -(days - 1));
  const previousTo = addDays(from, -1);
  const previousFrom = addDays(previousTo, -(days - 1));

  return {
    days,
    from,
    to,
    previousFrom,
    previousTo,
    label: `Last ${days} days`,
    isCustom: false,
    previousDays: days,
  };
}

export function hourKeyFor(date: Date): string {
  const { year, month, day, hour } = partsInZone(date, true);
  const current = Date.UTC(year, month - 1, day, hour);
  return `pv:hour:${new Date(current).toISOString().slice(0, 13)}`;
}

/** 10-minute bucket used for the "most active pages" live list. */
export function tenMinuteBucket(date: Date): string {
  const { year, month, day, hour, minute } = partsInZone(date, true);
  const bucketMinute = Math.floor(minute / 10) * 10;
  return `${year}${pad(month)}${pad(day)}${pad(hour)}${pad(bucketMinute)}`;
}

export function lastTenMinuteBuckets(count: number, date = new Date()): string[] {
  return Array.from({ length: count }, (_, index) =>
    tenMinuteBucket(new Date(date.getTime() - index * 10 * 60_000)),
  );
}

/** Safe key fragment for a page path. Redis keys may contain slashes, but keep them bounded. */
export function pageKey(path: string): string {
  return path.replace(/[^\w\-./]/g, '_').slice(0, 300) || '/';
}
