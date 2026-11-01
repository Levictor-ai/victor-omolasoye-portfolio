import { isStoreConfigured, redisPipeline, type RedisCommand } from './redis';

/** How long daily buckets are kept (totals are kept forever). */
export const RETENTION_DAYS = 180;

/** Days shown by the dashboard range picker. */
export const RANGE_OPTIONS = [7, 30, 90] as const;
export type RangeDays = (typeof RANGE_OPTIONS)[number];

export const UNKNOWN_LABEL = 'Unknown';

export interface VisitInput {
  path: string;
  country: string;
  referrer: string;
  device: string;
  visitorId: string;
}

export interface BreakdownRow {
  label: string;
  count: number;
}

export interface DailyPoint {
  date: string;
  views: number;
  visitors: number;
}

export interface VisitSummary {
  rangeDays: number;
  totalViews: number;
  totalVisitors: number;
  rangeViews: number;
  rangeVisitors: number;
  todayViews: number;
  todayVisitors: number;
  daily: DailyPoint[];
  countries: BreakdownRow[];
  pages: BreakdownRow[];
  referrers: BreakdownRow[];
  devices: BreakdownRow[];
}

const DAY_SECONDS = 86_400;
const RETENTION_SECONDS = RETENTION_DAYS * DAY_SECONDS;
const VISITOR_DEDUPE_SECONDS = 2 * DAY_SECONDS;

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function daysBack(days: number, from = new Date()): string[] {
  const dates: string[] = [];
  for (let index = days - 1; index >= 0; index -= 1) {
    const date = new Date(from);
    date.setUTCDate(date.getUTCDate() - index);
    dates.push(isoDay(date));
  }
  return dates;
}

function keysFor(day: string) {
  return {
    views: `pv:day:${day}`,
    visitors: `uv:day:${day}`,
    pages: `pages:${day}`,
    countries: `countries:${day}`,
    referrers: `referrers:${day}`,
    devices: `devices:${day}`,
    expiryMarker: `expires:${day}`,
  };
}

/** Stores one page view. Silently does nothing when no store is configured. */
export async function recordVisit(input: VisitInput): Promise<void> {
  if (!isStoreConfigured()) return;

  const day = isoDay(new Date());
  const keys = keysFor(day);

  const [dedupeResult, markerResult] = await redisPipeline<string | null>([
    [`SET`, `visitor:${day}:${input.visitorId}`, '1', 'NX', 'EX', VISITOR_DEDUPE_SECONDS],
    ['SET', keys.expiryMarker, '1', 'NX', 'EX', RETENTION_SECONDS],
  ]);

  const isNewVisitor = dedupeResult === 'OK';
  const isNewDay = markerResult === 'OK';

  const commands: RedisCommand[] = [
    ['INCR', 'pv:total'],
    ['INCR', keys.views],
    ['HINCRBY', keys.pages, input.path, 1],
    ['HINCRBY', keys.countries, input.country, 1],
    ['HINCRBY', keys.referrers, input.referrer, 1],
    ['HINCRBY', keys.devices, input.device, 1],
  ];

  if (isNewVisitor) {
    commands.push(['INCR', 'uv:total'], ['INCR', keys.visitors]);
  }

  if (isNewDay) {
    commands.push(
      ['EXPIRE', keys.views, RETENTION_SECONDS],
      ['EXPIRE', keys.pages, RETENTION_SECONDS],
      ['EXPIRE', keys.countries, RETENTION_SECONDS],
      ['EXPIRE', keys.referrers, RETENTION_SECONDS],
      ['EXPIRE', keys.devices, RETENTION_SECONDS],
      ['EXPIRE', keys.visitors, RETENTION_SECONDS],
    );
  }

  await redisPipeline(commands);
}

function asNumber(value: unknown): number {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Upstash returns hashes as a flat [field, value, ...] array. */
function parseHash(value: unknown): Array<[string, number]> {
  if (Array.isArray(value)) {
    const pairs: Array<[string, number]> = [];
    for (let index = 0; index < value.length; index += 2) {
      const field = String(value[index] ?? '');
      if (!field) continue;
      pairs.push([field, asNumber(value[index + 1])]);
    }
    return pairs;
  }

  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).map(([field, count]) => [
      field,
      asNumber(count),
    ]);
  }

  return [];
}

function mergeBreakdown(target: Map<string, number>, rows: Array<[string, number]>): void {
  rows.forEach(([label, count]) => {
    target.set(label, (target.get(label) ?? 0) + count);
  });
}

function toBreakdown(map: Map<string, number>, limit: number): BreakdownRow[] {
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit);
}

/** Aggregates the dashboard data for the last `days` days. */
export async function getSummary(days: number): Promise<VisitSummary> {
  const dates = daysBack(days);
  const commands: RedisCommand[] = [
    ['GET', 'pv:total'],
    ['GET', 'uv:total'],
  ];

  for (const day of dates) {
    const keys = keysFor(day);
    commands.push(
      ['GET', keys.views],
      ['GET', keys.visitors],
      ['HGETALL', keys.pages],
      ['HGETALL', keys.countries],
      ['HGETALL', keys.referrers],
      ['HGETALL', keys.devices],
    );
  }

  const results = await redisPipeline(commands);

  const totalViews = asNumber(results[0]);
  const totalVisitors = asNumber(results[1]);

  const pageMap = new Map<string, number>();
  const countryMap = new Map<string, number>();
  const referrerMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const daily: DailyPoint[] = [];

  let rangeViews = 0;
  let rangeVisitors = 0;

  dates.forEach((date, index) => {
    const offset = 2 + index * 6;
    const views = asNumber(results[offset]);
    const visitors = asNumber(results[offset + 1]);

    rangeViews += views;
    rangeVisitors += visitors;
    daily.push({ date, views, visitors });

    mergeBreakdown(pageMap, parseHash(results[offset + 2]));
    mergeBreakdown(countryMap, parseHash(results[offset + 3]));
    mergeBreakdown(referrerMap, parseHash(results[offset + 4]));
    mergeBreakdown(deviceMap, parseHash(results[offset + 5]));
  });

  const today = daily[daily.length - 1];

  return {
    rangeDays: days,
    totalViews,
    totalVisitors,
    rangeViews,
    rangeVisitors,
    todayViews: today?.views ?? 0,
    todayVisitors: today?.visitors ?? 0,
    daily,
    countries: toBreakdown(countryMap, 8),
    pages: toBreakdown(pageMap, 8),
    referrers: toBreakdown(referrerMap, 6),
    devices: toBreakdown(deviceMap, 4),
  };
}

