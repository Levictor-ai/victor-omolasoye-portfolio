import { isStoreConfigured, redisPipeline, type RedisCommand } from './redis';

/** How long daily buckets are kept (all-time totals never expire). */
export const RETENTION_DAYS = 180;

/** Days shown by the dashboard range picker. */
export const RANGE_OPTIONS = [7, 30, 90] as const;
export type RangeDays = (typeof RANGE_OPTIONS)[number];

/** A visitor is "returning" if they were seen within this window. */
const RETURNING_WINDOW_DAYS = 30;

const DAY_MS = 86_400_000;
const DAY_SECONDS = 86_400;
const RETENTION_SECONDS = RETENTION_DAYS * DAY_SECONDS;
const RETURNING_WINDOW_SECONDS = RETURNING_WINDOW_DAYS * DAY_SECONDS;

export interface VisitInput {
  path: string;
  country: string;
  city: string;
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

export interface LastVisit {
  timestamp: number;
  path: string;
  country: string;
  city: string;
}

export interface LiveStats {
  hourViews: number;
  lastVisit: LastVisit | null;
}

export interface VisitSummary {
  rangeDays: number;
  totalViews: number;
  totalVisitors: number;
  rangeViews: number;
  rangeVisitors: number;
  previousViews: number;
  previousVisitors: number;
  todayViews: number;
  todayVisitors: number;
  hourViews: number;
  daily: DailyPoint[];
  countries: BreakdownRow[];
  cities: BreakdownRow[];
  pages: BreakdownRow[];
  referrers: BreakdownRow[];
  devices: BreakdownRow[];
  newVisitors: number;
  returningVisitors: number;
  lastVisit: LastVisit | null;
}

function timeZone(): string {
  return process.env.ANALYTICS_TIMEZONE?.trim() || 'Africa/Lagos';
}

interface DateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
}

function partsInZone(date: Date, withHour = false): DateParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timeZone(),
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(withHour ? { hour: '2-digit', hourCycle: 'h23' as const } : {}),
  }).formatToParts(date);

  const pick = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);

  return { year: pick('year'), month: pick('month'), day: pick('day'), hour: pick('hour') };
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** Today's calendar date in the configured timezone, as YYYY-MM-DD. */
export function currentDay(): string {
  const { year, month, day } = partsInZone(new Date());
  return `${year}-${pad(month)}-${pad(day)}`;
}

/**
 * The last `days` calendar dates ending `offset` days before today.
 * Calendar arithmetic is done in UTC so timezone offsets never shift a day.
 */
export function dayList(days: number, offset = 0): string[] {
  const { year, month, day } = partsInZone(new Date());
  const end = Date.UTC(year, month - 1, day) - offset * DAY_MS;

  const dates: string[] = [];
  for (let index = days - 1; index >= 0; index -= 1) {
    dates.push(new Date(end - index * DAY_MS).toISOString().slice(0, 10));
  }
  return dates;
}

function currentHourKey(): string {
  const { year, month, day, hour } = partsInZone(new Date(), true);
  const current = Date.UTC(year, month - 1, day, hour);
  return `pv:hour:${new Date(current).toISOString().slice(0, 13)}`;
}

function keysFor(day: string) {
  return {
    views: `pv:day:${day}`,
    visitors: `hll:day:${day}`,
    pages: `pages:${day}`,
    countries: `countries:${day}`,
    cities: `cities:${day}`,
    referrers: `referrers:${day}`,
    devices: `devices:${day}`,
    audience: `audience:${day}`,
    expiryMarker: `expires:${day}`,
  };
}

/** Stores one page view. Does nothing when no store is configured. */
export async function recordVisit(input: VisitInput): Promise<void> {
  if (!isStoreConfigured()) return;

  const day = currentDay();
  const keys = keysFor(day);
  const currentHour = currentHourKey();

  const [seenResult, markerResult] = await redisPipeline<string | null>([
    ['SET', `seen:${input.visitorId}`, '1', 'NX', 'EX', RETURNING_WINDOW_SECONDS],
    ['SET', keys.expiryMarker, '1', 'NX', 'EX', RETENTION_SECONDS],
  ]);

  const isReturning = seenResult !== 'OK';
  const isNewDay = markerResult === 'OK';

  const commands: RedisCommand[] = [
    ['INCR', 'pv:total'],
    ['INCR', keys.views],
    ['INCR', currentHour],
    ['HINCRBY', keys.pages, input.path, 1],
    ['HINCRBY', keys.countries, input.country, 1],
    ['HINCRBY', keys.cities, input.city, 1],
    ['HINCRBY', keys.referrers, input.referrer, 1],
    ['HINCRBY', keys.devices, input.device, 1],
    ['HINCRBY', keys.audience, isReturning ? 'returning' : 'new', 1],
    ['PFADD', keys.visitors, input.visitorId],
    ['PFADD', 'visitors:all', input.visitorId],
    [
      'HSET',
      'last:visit',
      'ts',
      String(Date.now()),
      'path',
      input.path,
      'country',
      input.country,
      'city',
      input.city,
    ],
    ['EXPIRE', currentHour, 2 * DAY_SECONDS],
  ];

  if (isNewDay) {
    commands.push(
      ['EXPIRE', keys.views, RETENTION_SECONDS],
      ['EXPIRE', keys.visitors, RETENTION_SECONDS],
      ['EXPIRE', keys.pages, RETENTION_SECONDS],
      ['EXPIRE', keys.countries, RETENTION_SECONDS],
      ['EXPIRE', keys.cities, RETENTION_SECONDS],
      ['EXPIRE', keys.referrers, RETENTION_SECONDS],
      ['EXPIRE', keys.devices, RETENTION_SECONDS],
      ['EXPIRE', keys.audience, RETENTION_SECONDS],
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

function parseLastVisit(value: unknown): LastVisit | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  const fields = new Map<string, string>();
  for (let index = 0; index < value.length; index += 2) {
    fields.set(String(value[index]), String(value[index + 1]));
  }

  const timestamp = Number(fields.get('ts'));
  if (!Number.isFinite(timestamp) || timestamp <= 0) return null;

  return {
    timestamp,
    path: fields.get('path') ?? '/',
    country: fields.get('country') ?? 'XX',
    city: fields.get('city') ?? 'Unknown',
  };
}

/** Very small read used by the dashboard's live card (2 commands per poll). */
export async function getLiveStats(): Promise<LiveStats> {
  const results = await redisPipeline([
    ['GET', currentHourKey()],
    ['HGETALL', 'last:visit'],
  ]);

  return {
    hourViews: asNumber(results[0]),
    lastVisit: parseLastVisit(results[1]),
  };
}

/** Aggregates dashboard data for the last `days` days plus the prior period. */
export async function getSummary(days: number): Promise<VisitSummary> {
  const dates = dayList(days);
  const previousDates = dayList(days, days);
  const currentHour = currentHourKey();

  const commands: RedisCommand[] = [
    ['GET', 'pv:total'],
    ['PFCOUNT', 'visitors:all'],
    ['HGETALL', 'last:visit'],
    ['GET', currentHour],
  ];

  const HEADER = commands.length;

  for (const day of dates) {
    const keys = keysFor(day);
    commands.push(
      ['GET', keys.views],
      ['PFCOUNT', keys.visitors],
      ['HGETALL', keys.pages],
      ['HGETALL', keys.countries],
      ['HGETALL', keys.cities],
      ['HGETALL', keys.referrers],
      ['HGETALL', keys.devices],
      ['HGETALL', keys.audience],
    );
  }

  const rangeUnionIndex = HEADER + dates.length * 8;
  const previousStartOffset = rangeUnionIndex + 1;

  commands.push(['PFCOUNT', ...dates.map((day) => keysFor(day).visitors)]);

  for (const day of previousDates) {
    commands.push(['GET', keysFor(day).views]);
  }

  if (previousDates.length > 0) {
    commands.push(['PFCOUNT', ...previousDates.map((day) => keysFor(day).visitors)]);
  }

  const results = await redisPipeline(commands);

  const totalViews = asNumber(results[0]);
  const totalVisitors = asNumber(results[1]);
  const lastVisit = parseLastVisit(results[2]);
  const hourViews = asNumber(results[3]);

  const pageMap = new Map<string, number>();
  const countryMap = new Map<string, number>();
  const cityMap = new Map<string, number>();
  const referrerMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const daily: DailyPoint[] = [];

  let rangeViews = 0;
  let newVisitors = 0;
  let returningVisitors = 0;

  dates.forEach((date, index) => {
    const offset = HEADER + index * 8;
    const views = asNumber(results[offset]);
    const visitors = asNumber(results[offset + 1]);

    rangeViews += views;
    daily.push({ date, views, visitors });

    mergeBreakdown(pageMap, parseHash(results[offset + 2]));
    mergeBreakdown(countryMap, parseHash(results[offset + 3]));
    mergeBreakdown(cityMap, parseHash(results[offset + 4]));
    mergeBreakdown(referrerMap, parseHash(results[offset + 5]));
    mergeBreakdown(deviceMap, parseHash(results[offset + 6]));

    for (const [label, count] of parseHash(results[offset + 7])) {
      if (label === 'new') newVisitors += count;
      if (label === 'returning') returningVisitors += count;
    }
  });

  let previousViews = 0;
  previousDates.forEach((_, index) => {
    previousViews += asNumber(results[previousStartOffset + index]);
  });

  const previousVisitors = asNumber(results[previousStartOffset + previousDates.length]);
  const rangeVisitors = asNumber(results[rangeUnionIndex]);
  const today = daily[daily.length - 1];

  return {
    rangeDays: days,
    totalViews,
    totalVisitors,
    rangeViews,
    rangeVisitors,
    previousViews,
    previousVisitors,
    todayViews: today?.views ?? 0,
    todayVisitors: today?.visitors ?? 0,
    hourViews,
    daily,
    countries: toBreakdown(countryMap, 8),
    cities: toBreakdown(cityMap, 8),
    pages: toBreakdown(pageMap, 8),
    referrers: toBreakdown(referrerMap, 6),
    devices: toBreakdown(deviceMap, 4),
    newVisitors,
    returningVisitors,
    lastVisit,
  };
}
