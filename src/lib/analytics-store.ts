import { isStoreConfigured, redisPipeline, type RedisCommand } from './redis';
import {
  ACTIVE_WINDOW_SECONDS,
  RETENTION_DAYS,
  RETENTION_SECONDS,
  SESSION_TIMEOUT_MINUTES,
  SESSION_TIMEOUT_SECONDS,
  analyticsTimeZone,
  currentDay,
  dayInZone,
  dayListBetween,
  hourKeyFor,
  lastTenMinuteBuckets,
  pageKey,
  tenMinuteBucket,
  type AnalyticsRange,
} from './analytics-range';
import {
  CONVERSION_EVENTS,
  EVENT_TYPES,
  SCROLL_DEPTHS,
  isConversionEvent,
  isInteractionEvent,
  isScrollDepth,
} from './analytics-events';
import { getAllProjects } from './projects';
import { projectCategories } from './projectCategories';
import type { ProjectData } from '@/types/project';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface BreakdownRow {
  label: string;
  count: number;
}

export interface DailyPoint {
  date: string;
  views: number;
  visitors: number;
  sessions: number;
  interactions: number;
  conversions: number;
}

export interface OverviewData {
  range: AnalyticsRange;
  totalViews: number;
  totalVisitors: number;
  rangeViews: number;
  rangeVisitors: number;
  previousViews: number;
  previousVisitors: number;
  sessions: number;
  previousSessions: number;
  newVisitors: number;
  previousNewVisitors: number;
  returningVisitors: number;
  previousReturningVisitors: number;
  avgEngagementMs: number;
  previousAvgEngagementMs: number;
  pagesPerSession: number;
  previousPagesPerSession: number;
  interactions: number;
  previousInteractions: number;
  conversions: number;
  previousConversions: number;
  conversionRate: number;
  previousConversionRate: number;
  daily: DailyPoint[];
  countries: BreakdownRow[];
  cities: BreakdownRow[];
  pages: BreakdownRow[];
  referrers: BreakdownRow[];
  devices: BreakdownRow[];
  v2Since: string | null;
  v2Covered: boolean;
  previousV2Covered: boolean;
  hasDetailedData: boolean;
  lastUpdated: number;
}

export type ProjectCategoryLabel = 'Brand Design' | 'Product Design' | 'Web Design' | 'Other';

export interface ProjectRow {
  slug: string;
  name: string;
  url: string;
  category: ProjectCategoryLabel;
  categories: ProjectCategoryLabel[];
  views: number;
  visitors: number;
  engagementMs: number;
  avgEngagementMs: number;
  cardClicks: number;
  scrollDepth: number;
  scrollEvents: number;
  externalClicks: number;
  conversions: number;
}

export interface PageRow {
  path: string;
  views: number;
  visitors: number;
  engagementMs: number;
  avgEngagementMs: number;
  interactions: number;
  conversions: number;
  isProject: boolean;
  projectSlug: string | null;
  projectName: string | null;
}

export interface PagesProjectsData {
  range: AnalyticsRange;
  pages: PageRow[];
  projects: ProjectRow[];
  mostViewed: ProjectRow[];
  mostEngaging: ProjectRow[];
  landingPages: BreakdownRow[];
  exitPages: BreakdownRow[];
  category: string;
  metric: string;
  categories: string[];
  hasData: boolean;
}

export interface ElementRow {
  label: string;
  event: string;
  count: number;
}

export interface EngagementPageRow {
  path: string;
  interactions: number;
  engagementMs: number;
  avgEngagementMs: number;
}

export interface ScrollDayPoint {
  date: string;
  depth25: number;
  depth50: number;
  depth75: number;
  depth100: number;
}

export interface EngagementData {
  range: AnalyticsRange;
  totalInteractions: number;
  previousInteractions: number;
  avgEngagementMs: number;
  previousAvgEngagementMs: number;
  avgPagesPerSession: number;
  previousAvgPagesPerSession: number;
  totalSessions: number;
  previousSessions: number;
  totalViews: number;
  previousViews: number;
  eventBreakdown: BreakdownRow[];
  topElements: ElementRow[];
  topPages: EngagementPageRow[];
  scrollDepth: BreakdownRow[];
  scrollDaily: ScrollDayPoint[];
  daily: DailyPoint[];
  hasData: boolean;
}

export interface SourceRow {
  source: string;
  visitors: number;
  sessions: number;
  views: number;
  interactions: number;
  conversions: number;
  conversionRate: number;
  landingPages: BreakdownRow[];
}

export interface CampaignRow {
  campaign: string;
  source: string;
  views: number;
  sessions: number;
  conversions: number;
  conversionRate: number;
}

export interface AcquisitionData {
  range: AnalyticsRange;
  sources: SourceRow[];
  campaigns: CampaignRow[];
  utm: UtmRow[];
  referrers: BreakdownRow[];
  totalSessions: number;
  hasData: boolean;
}

export interface UtmRow {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  views: number;
  sessions: number;
}

export interface AudienceData {
  range: AnalyticsRange;
  countries: BreakdownRow[];
  cities: BreakdownRow[];
  devices: BreakdownRow[];
  browsers: BreakdownRow[];
  operatingSystems: BreakdownRow[];
  geoMethods: BreakdownRow[];
  hasData: boolean;
}

export interface ActivityItem {
  id: string;
  ts: number;
  type: string;
  event: string;
  path: string;
  project: string;
  label: string;
  depth: number | null;
  country: string;
  city: string;
  device: string;
  source: string;
}

export interface ActivityData {
  range: AnalyticsRange;
  items: ActivityItem[];
  eventFilter: string;
  hasData: boolean;
}

export interface ConversionSourceRow {
  source: string;
  conversions: number;
  sessions: number;
  rate: number;
}

export interface ConversionsData {
  range: AnalyticsRange;
  totalConversions: number;
  previousConversions: number;
  sessions: number;
  previousSessions: number;
  conversionRate: number;
  previousConversionRate: number;
  byType: BreakdownRow[];
  byPage: BreakdownRow[];
  bySource: ConversionSourceRow[];
  byCampaign: BreakdownRow[];
  daily: DailyPoint[];
  hasData: boolean;
}

export interface SettingsData {
  storeConfigured: boolean;
  geoEnabled: boolean;
  timezone: string;
  retentionDays: number;
  sessionTimeoutMinutes: number;
  v2Since: string | null;
  lastEventAt: number | null;
  lastPath: string;
  eventsToday: number;
  sessionsToday: number;
  activityToday: number;
  newVisitorsToday: number;
  returningVisitorsToday: number;
}

export interface LiveStats {
  activeVisitors: number;
  last60mViews: number;
  hourViews: number;
  todayViews: number;
  sessionsToday: number;
  interactionsToday: number;
  mostActivePages: BreakdownRow[];
  recent: ActivityItem[];
  lastActivity: ActivityItem | null;
}

export interface RecordAnalyticsInput {
  type: 'pageview' | 'event';
  event: string;
  path: string;
  project: string;
  label: string;
  depth: number | null;
  durationMs: number;
  visitorId: string;
  sessionId: string;
  eventId: string;
  pageviewId: string;
  referrerHost: string;
  source: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  };
  geo: { country: string; city: string; method: string };
  device: string;
  browser: string;
  os: string;
  timestamp?: number;
}

/* -------------------------------------------------------------------------- */
/* Redis key helpers                                                          */
/* -------------------------------------------------------------------------- */

interface LegacyKeys {
  views: string;
  visitors: string;
  pages: string;
  countries: string;
  cities: string;
  referrers: string;
  devices: string;
  audience: string;
}

function legacyKeys(day: string): LegacyKeys {
  return {
    views: `pv:day:${day}`,
    visitors: `hll:day:${day}`,
    pages: `pages:${day}`,
    countries: `countries:${day}`,
    cities: `cities:${day}`,
    referrers: `referrers:${day}`,
    devices: `devices:${day}`,
    audience: `audience:${day}`,
  };
}

function v2DayKey(day: string): string {
  return `v2:day:${day}`;
}

function v2NewKey(day: string): string {
  return `v2:daynew:${day}`;
}

function v2ReturningKey(day: string): string {
  return `v2:dayret:${day}`;
}

function v2SourceVisitorKey(day: string, source: string): string {
  return `v2:srcvis:${day}:${source}`;
}

function v2ProjectVisitorKey(day: string, slug: string): string {
  return `v2:projvis:${day}:${slug}`;
}

function v2PageVisitorKey(day: string, path: string): string {
  return `v2:pagevis:${day}:${pageKey(path)}`;
}

/* -------------------------------------------------------------------------- */
/* Parsing helpers                                                            */
/* -------------------------------------------------------------------------- */

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

function hashToMap(value: unknown): Map<string, number> {
  return new Map(parseHash(value));
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

function parseActivity(value: unknown): ActivityItem | null {
  if (typeof value !== 'string') return null;

  try {
    const parsed = JSON.parse(value) as Partial<ActivityItem>;
    if (!parsed || typeof parsed.ts !== 'number') return null;

    return {
      id: typeof parsed.id === 'string' ? parsed.id : String(parsed.ts),
      ts: parsed.ts,
      type: typeof parsed.type === 'string' ? parsed.type : 'event',
      event: typeof parsed.event === 'string' ? parsed.event : 'pageview',
      path: typeof parsed.path === 'string' ? parsed.path : '/',
      project: typeof parsed.project === 'string' ? parsed.project : '',
      label: typeof parsed.label === 'string' ? parsed.label : '',
      depth: typeof parsed.depth === 'number' ? parsed.depth : null,
      country: typeof parsed.country === 'string' ? parsed.country : 'XX',
      city: typeof parsed.city === 'string' ? parsed.city : 'Unknown',
      device: typeof parsed.device === 'string' ? parsed.device : 'Desktop',
      source: typeof parsed.source === 'string' ? parsed.source : 'Direct',
    };
  } catch {
    return null;
  }
}

function parseActivityList(value: unknown): ActivityItem[] {
  if (!Array.isArray(value)) return [];
  return value.map(parseActivity).filter((item): item is ActivityItem => item !== null);
}

function projectFromPath(path: string): string {
  const match = /^\/projects\/([a-z0-9-]+)/i.exec(path);
  return match ? match[1] : '';
}

const CATEGORY_LABELS: Record<ProjectData['category'], ProjectCategoryLabel> = {
  brand: 'Brand Design',
  product: 'Product Design',
  engineering: 'Web Design',
};

function projectCategoryLabels(project: ProjectData): ProjectCategoryLabel[] {
  return Array.from(new Set(projectCategories(project).map((category) => CATEGORY_LABELS[category])));
}

function splitField(field: string): [string, string] {
  const index = field.indexOf('|');
  if (index === -1) return [field, ''];
  return [field.slice(0, index), field.slice(index + 1)];
}

function percent(part: number, total: number): number {
  return total > 0 ? (part / total) * 100 : 0;
}

/* -------------------------------------------------------------------------- */
/* Recording                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Records one page view or interaction event.
 *
 * Writes the v2 model (sessions, events, attribution, projects) and the legacy
 * daily keys used by earlier dashboard versions. The dual write keeps existing
 * historical totals readable while new metrics start collecting immediately.
 */
export async function recordAnalyticsEvent(input: RecordAnalyticsInput): Promise<void> {
  if (!isStoreConfigured()) return;

  const now = input.timestamp ?? Date.now();
  const date = new Date(now);
  const day = dayInZone(date);
  const keys = legacyKeys(day);
  const currentHour = hourKeyFor(date);
  const bucket = tenMinuteBucket(date);
  const sessionKey = `v2:session:${input.sessionId}`;
  const isPageView = input.type === 'pageview';
  const isEngagement = input.event === 'engagement';
  const isScroll = input.event === 'scroll_depth' && input.depth !== null;
  const isConversion = isConversionEvent(input.event);
  const interaction = input.type === 'event' && isInteractionEvent(input.event);
  const durationMs = isEngagement
    ? Math.max(0, Math.min(input.durationMs, 30 * 60_000))
    : 0;
  const pathProject = projectFromPath(input.path);
  const viewProject = isPageView ? pathProject : '';
  const eventProject = input.project || '';
  const projectKey = eventProject || pathProject;
  const campaign = input.utm.campaign;
  const utm = input.utm;
  const hasUtm = Boolean(utm.source || utm.medium || utm.campaign || utm.content || utm.term);
  const utmKey = [utm.source, utm.medium, utm.campaign, utm.content, utm.term].join('|');

  const first = await redisPipeline<string | null>([
    ['SET', `v2:first:${input.visitorId}`, day, 'NX', 'EX', RETENTION_SECONDS],
    ['GET', `v2:first:${input.visitorId}`],
    ['SET', `v2:sessstart:${input.sessionId}`, '1', 'NX', 'EX', SESSION_TIMEOUT_SECONDS],
    ['EXPIRE', `v2:sessstart:${input.sessionId}`, SESSION_TIMEOUT_SECONDS],
    ['SET', `v2:dedupe:${input.eventId}`, '1', 'NX', 'EX', 3600],
    ['HGET', sessionKey, 'exit'],
    ['HGET', sessionKey, 'exitday'],
  ]);

  const firstDay = typeof first[1] === 'string' ? first[1] : '';
  const isNewSession = first[2] === 'OK';
  const isDuplicate = first[4] !== 'OK';
  const previousExit = typeof first[5] === 'string' ? first[5] : '';
  const previousExitDay = typeof first[6] === 'string' ? first[6] : '';

  if (isDuplicate) return;

  const isNewVisitor = !firstDay || firstDay === day;
  const activity: ActivityItem = {
    id: input.eventId,
    ts: now,
    type: input.type,
    event: isPageView ? 'pageview' : input.event,
    path: input.path,
    project: eventProject || viewProject,
    label: input.label,
    depth: isScroll ? input.depth : null,
    country: input.geo.country,
    city: input.geo.city,
    device: input.device,
    source: input.source,
  };

  const commands: RedisCommand[] = [
    ['SET', 'v2:since', day, 'NX'],
    ['HSET', 'v2:meta', 'last', String(now), 'lastPath', input.path],
    ['ZADD', 'v2:active', String(now), input.visitorId],
    ['ZREMRANGEBYSCORE', 'v2:active', '-inf', String(now - ACTIVE_WINDOW_SECONDS * 1000)],
    ['EXPIRE', 'v2:active', String(ACTIVE_WINDOW_SECONDS * 2)],
    ['LPUSH', `v2:activity:${day}`, JSON.stringify(activity)],
    ['LTRIM', `v2:activity:${day}`, '0', '499'],
    ['EXPIRE', `v2:activity:${day}`, RETENTION_SECONDS],
    ['HINCRBY', v2DayKey(day), 'interactions', interaction ? 1 : 0],
    ['HINCRBY', v2DayKey(day), 'conversions', isConversion ? 1 : 0],
    ['HINCRBY', v2DayKey(day), 'engaged_ms', durationMs],
    ['HINCRBY', v2DayKey(day), 'sessions', isNewSession ? 1 : 0],
    ['EXPIRE', v2DayKey(day), RETENTION_SECONDS],
    ['HINCRBY', `v2:src:${day}`, input.source, isPageView ? 1 : 0],
    ['HINCRBY', `v2:srcsess:${day}`, input.source, isNewSession ? 1 : 0],
    ['HINCRBY', `v2:srcevt:${day}`, input.source, interaction ? 1 : 0],
    ['PFADD', v2SourceVisitorKey(day, input.source), input.visitorId],
    ['HINCRBY', `v2:geomethod:${day}`, input.geo.method, 1],
    ['HINCRBY', `v2:browser:${day}`, input.browser, 1],
    ['HINCRBY', `v2:os:${day}`, input.os, 1],
    ['EXPIRE', `v2:src:${day}`, RETENTION_SECONDS],
    ['EXPIRE', v2NewKey(day), RETENTION_SECONDS],
    ['EXPIRE', v2ReturningKey(day), RETENTION_SECONDS],
    ['EXPIRE', v2SourceVisitorKey(day, input.source), RETENTION_SECONDS],
    ['EXPIRE', `v2:srcsess:${day}`, RETENTION_SECONDS],
    ['EXPIRE', `v2:srcevt:${day}`, RETENTION_SECONDS],
    ['EXPIRE', `v2:geomethod:${day}`, RETENTION_SECONDS],
    ['EXPIRE', `v2:browser:${day}`, RETENTION_SECONDS],
    ['EXPIRE', `v2:os:${day}`, RETENTION_SECONDS],
    ['HSETNX', sessionKey, 'start', String(now)],
    ['HSETNX', sessionKey, 'landing', input.path],
    ['HSETNX', sessionKey, 'source', input.source],
    ['HSETNX', sessionKey, 'medium', input.utm.medium],
    ['HSETNX', sessionKey, 'campaign', campaign],
    ['HSETNX', sessionKey, 'content', input.utm.content],
    ['HSETNX', sessionKey, 'term', input.utm.term],
    ['HSETNX', sessionKey, 'device', input.device],
    ['HSETNX', sessionKey, 'country', input.geo.country],
    ['HSETNX', sessionKey, 'city', input.geo.city],
    ['HSET', sessionKey, 'last', String(now), 'exit', input.path, 'exitday', day],
    ['EXPIRE', sessionKey, SESSION_TIMEOUT_SECONDS],
  ];

  if (isNewVisitor) {
    commands.push(['PFADD', v2NewKey(day), input.visitorId]);
  } else {
    commands.push(['PFADD', v2ReturningKey(day), input.visitorId]);
  }

  if (isPageView) {
    commands.push(
      ['HINCRBY', sessionKey, 'pages', 1],
      ['HINCRBY', `v2:exit:${day}`, input.path, 1],
      ['EXPIRE', `v2:exit:${day}`, RETENTION_SECONDS],
      ['HINCRBY', `v2:landing:${day}`, `${input.source}|${input.path}`, isNewSession ? 1 : 0],
      ['EXPIRE', `v2:landing:${day}`, RETENTION_SECONDS],
      ['ZADD', 'v2:recent', String(now), input.eventId],
      ['ZREMRANGEBYSCORE', 'v2:recent', '-inf', String(now - 2 * 60 * 60_000)],
      ['EXPIRE', 'v2:recent', '7200'],
      ['HINCRBY', `v2:pv10:${bucket}`, input.path, 1],
      ['EXPIRE', `v2:pv10:${bucket}`, '10800'],
      ['PFADD', v2PageVisitorKey(day, input.path), input.visitorId],
      ['EXPIRE', v2PageVisitorKey(day, input.path), RETENTION_SECONDS],
    );

    if (previousExit && previousExit !== input.path && previousExitDay === day) {
      commands.push(['HINCRBY', `v2:exit:${day}`, previousExit, -1]);
    }

    if (campaign) {
      commands.push(
        ['HINCRBY', `v2:campaign:${day}`, campaign, 1],
        ['HINCRBY', `v2:campaignsess:${day}`, campaign, isNewSession ? 1 : 0],
        ['HINCRBY', `v2:campaignsrc:${day}`, `${campaign}|${input.source}`, 1],
        ['EXPIRE', `v2:campaign:${day}`, RETENTION_SECONDS],
        ['EXPIRE', `v2:campaignsess:${day}`, RETENTION_SECONDS],
        ['EXPIRE', `v2:campaignsrc:${day}`, RETENTION_SECONDS],
      );
    }

    if (hasUtm) {
      commands.push(
        ['HINCRBY', `v2:utm:${day}`, utmKey, 1],
        ['HINCRBY', `v2:utmsess:${day}`, utmKey, isNewSession ? 1 : 0],
        ['EXPIRE', `v2:utm:${day}`, RETENTION_SECONDS],
        ['EXPIRE', `v2:utmsess:${day}`, RETENTION_SECONDS],
      );
    }

    if (viewProject) {
      commands.push(
        ['HINCRBY', `v2:proj:${day}`, `${viewProject}|views`, 1],
        ['PFADD', v2ProjectVisitorKey(day, viewProject), input.visitorId],
        ['EXPIRE', v2ProjectVisitorKey(day, viewProject), RETENTION_SECONDS],
        ['EXPIRE', `v2:proj:${day}`, RETENTION_SECONDS],
      );
    }
  }

  if (input.type === 'event') {
    commands.push(
      ['HINCRBY', `v2:evt:${day}`, input.event, 1],
      ['EXPIRE', `v2:evt:${day}`, RETENTION_SECONDS],
      ['HINCRBY', `v2:evtlabel:${day}`, `${input.event}|${input.label || input.path}`, 1],
      ['EXPIRE', `v2:evtlabel:${day}`, RETENTION_SECONDS],
    );

    if (interaction) {
      commands.push(
        ['HINCRBY', `v2:engpage:${day}`, input.path, 1],
        ['EXPIRE', `v2:engpage:${day}`, RETENTION_SECONDS],
      );
    }
  }

  if (isScroll && input.depth !== null && isScrollDepth(input.depth)) {
    commands.push(
      ['HINCRBY', `v2:scroll:${day}`, String(input.depth), 1],
      ['EXPIRE', `v2:scroll:${day}`, RETENTION_SECONDS],
    );
    if (projectKey) {
      commands.push(
        ['HINCRBY', `v2:proj:${day}`, `${projectKey}|scroll${input.depth}`, 1],
        ['EXPIRE', `v2:proj:${day}`, RETENTION_SECONDS],
      );
    }
  }

  if (durationMs > 0) {
    commands.push(
      ['HINCRBY', `v2:engtime:${day}`, input.path, durationMs],
      ['EXPIRE', `v2:engtime:${day}`, RETENTION_SECONDS],
    );
    if (projectKey) {
      commands.push(
        ['HINCRBY', `v2:proj:${day}`, `${projectKey}|engaged_ms`, durationMs],
        ['EXPIRE', `v2:proj:${day}`, RETENTION_SECONDS],
      );
    }
  }

  if (input.event === 'project_card_click' && eventProject) {
    commands.push(['HINCRBY', `v2:proj:${day}`, `${eventProject}|clicks`, 1]);
    commands.push(['EXPIRE', `v2:proj:${day}`, RETENTION_SECONDS]);
  }

  if (input.event === 'external_link_click' && projectKey) {
    commands.push(
      ['HINCRBY', `v2:proj:${day}`, `${projectKey}|external`, 1],
      ['EXPIRE', `v2:proj:${day}`, RETENTION_SECONDS],
    );
  }

  if (isConversion) {
    commands.push(
      ['HINCRBY', `v2:conv:${day}`, input.event, 1],
      ['HINCRBY', `v2:convpage:${day}`, `${input.event}|${input.path}`, 1],
      ['HINCRBY', `v2:convsources:${day}`, `${input.event}|${input.source}`, 1],
      ['EXPIRE', `v2:conv:${day}`, RETENTION_SECONDS],
      ['EXPIRE', `v2:convpage:${day}`, RETENTION_SECONDS],
      ['EXPIRE', `v2:convsources:${day}`, RETENTION_SECONDS],
    );
    if (projectKey) {
      commands.push(
        ['HINCRBY', `v2:proj:${day}`, `${projectKey}|conversions`, 1],
        ['EXPIRE', `v2:proj:${day}`, RETENTION_SECONDS],
      );
    }
    if (campaign) {
      commands.push(
        ['HINCRBY', `v2:campaignconv:${day}`, campaign, 1],
        ['EXPIRE', `v2:campaignconv:${day}`, RETENTION_SECONDS],
      );
    }
  }

  if (isPageView) {
    commands.push(
      ['INCR', 'pv:total'],
      ['INCR', keys.views],
      ['INCR', currentHour],
      ['HINCRBY', keys.pages, input.path, 1],
      ['HINCRBY', keys.countries, input.geo.country, 1],
      ['HINCRBY', keys.cities, input.geo.city, 1],
      ['HINCRBY', keys.referrers, input.referrerHost || 'Direct', 1],
      ['HINCRBY', keys.devices, input.device, 1],
      ['HINCRBY', keys.audience, isNewVisitor ? 'new' : 'returning', 1],
      ['PFADD', keys.visitors, input.visitorId],
      ['PFADD', 'visitors:all', input.visitorId],
      [
        'HSET',
        'last:visit',
        'ts',
        String(now),
        'path',
        input.path,
        'country',
        input.geo.country,
        'city',
        input.geo.city,
      ],
      ['EXPIRE', currentHour, 2 * 86_400],
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

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

interface DayIndex {
  views: number;
  visitors: number;
  pages: number;
  countries: number;
  cities: number;
  referrers: number;
  devices: number;
  v2: number;
}

export async function getOverview(range: AnalyticsRange): Promise<OverviewData> {
  const dates = dayListBetween(range.from, range.to);
  const previousDates = dayListBetween(range.previousFrom, range.previousTo);
  const commands: RedisCommand[] = [];
  const push = (command: RedisCommand) => {
    commands.push(command);
    return commands.length - 1;
  };

  const header = {
    totalViews: push(['GET', 'pv:total']),
    totalVisitors: push(['PFCOUNT', 'visitors:all']),
    since: push(['GET', 'v2:since']),
  };

  const currentIndex: DayIndex[] = dates.map((day) => {
    const keys = legacyKeys(day);
    return {
      views: push(['GET', keys.views]),
      visitors: push(['PFCOUNT', keys.visitors]),
      pages: push(['HGETALL', keys.pages]),
      countries: push(['HGETALL', keys.countries]),
      cities: push(['HGETALL', keys.cities]),
      referrers: push(['HGETALL', keys.referrers]),
      devices: push(['HGETALL', keys.devices]),
      v2: push(['HGETALL', v2DayKey(day)]),
    };
  });

  const previousIndex: DayIndex[] = previousDates.map((day) => {
    const keys = legacyKeys(day);
    return {
      views: push(['GET', keys.views]),
      visitors: 0,
      pages: 0,
      countries: 0,
      cities: 0,
      referrers: 0,
      devices: 0,
      v2: push(['HGETALL', v2DayKey(day)]),
    };
  });

  const union = {
    currentVisitors: push(['PFCOUNT', ...dates.map((day) => legacyKeys(day).visitors)]),
    currentNew: push(['PFCOUNT', ...dates.map((day) => v2NewKey(day))]),
    currentReturning: push(['PFCOUNT', ...dates.map((day) => v2ReturningKey(day))]),
    previousVisitors: push(['PFCOUNT', ...previousDates.map((day) => legacyKeys(day).visitors)]),
    previousNew: push(['PFCOUNT', ...previousDates.map((day) => v2NewKey(day))]),
    previousReturning: push(['PFCOUNT', ...previousDates.map((day) => v2ReturningKey(day))]),
  };

  const results = await redisPipeline(commands);

  const totalViews = asNumber(results[header.totalViews]);
  const totalVisitors = asNumber(results[header.totalVisitors]);
  const sinceValue = results[header.since];
  const v2Since = typeof sinceValue === 'string' ? sinceValue : null;

  const pageMap = new Map<string, number>();
  const countryMap = new Map<string, number>();
  const cityMap = new Map<string, number>();
  const referrerMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const daily: DailyPoint[] = [];

  let rangeViews = 0;
  let sessions = 0;
  let interactions = 0;
  let conversions = 0;
  let engagedMs = 0;

  dates.forEach((date, index) => {
    const idx = currentIndex[index];
    const views = asNumber(results[idx.views]);
    const visitors = asNumber(results[idx.visitors]);
    const v2 = hashToMap(results[idx.v2]);

    rangeViews += views;
    sessions += asNumber(v2.get('sessions'));
    interactions += asNumber(v2.get('interactions'));
    conversions += asNumber(v2.get('conversions'));
    engagedMs += asNumber(v2.get('engaged_ms'));

    daily.push({
      date,
      views,
      visitors,
      sessions: asNumber(v2.get('sessions')),
      interactions: asNumber(v2.get('interactions')),
      conversions: asNumber(v2.get('conversions')),
    });

    mergeBreakdown(pageMap, parseHash(results[idx.pages]));
    mergeBreakdown(countryMap, parseHash(results[idx.countries]));
    mergeBreakdown(cityMap, parseHash(results[idx.cities]));
    mergeBreakdown(referrerMap, parseHash(results[idx.referrers]));
    mergeBreakdown(deviceMap, parseHash(results[idx.devices]));
  });

  let previousViews = 0;
  let previousSessions = 0;
  let previousInteractions = 0;
  let previousConversions = 0;
  let previousEngagedMs = 0;

  previousDates.forEach((_, index) => {
    const idx = previousIndex[index];
    const v2 = hashToMap(results[idx.v2]);
    previousViews += asNumber(results[idx.views]);
    previousSessions += asNumber(v2.get('sessions'));
    previousInteractions += asNumber(v2.get('interactions'));
    previousConversions += asNumber(v2.get('conversions'));
    previousEngagedMs += asNumber(v2.get('engaged_ms'));
  });

  const rangeVisitors = asNumber(results[union.currentVisitors]);
  const previousVisitors = asNumber(results[union.previousVisitors]);
  const firstTimeVisitors = asNumber(results[union.currentNew]);
  const firstTimePreviousVisitors = asNumber(results[union.previousNew]);
  const returningSetVisitors = asNumber(results[union.currentReturning]);
  const returningSetPreviousVisitors = asNumber(results[union.previousReturning]);

  const v2Covered = Boolean(v2Since && dates[0] >= v2Since);
  const previousV2Covered = Boolean(v2Since && previousDates[0] >= v2Since);

  // When the whole range uses persistent browser IDs, new visitors are the
  // first-ever visits inside the range and everyone else is returning. This
  // keeps the two buckets mutually exclusive and summing to range visitors.
  const newVisitors = v2Covered
    ? Math.min(firstTimeVisitors, rangeVisitors)
    : firstTimeVisitors;
  const returningVisitors = v2Covered
    ? Math.max(0, rangeVisitors - newVisitors)
    : returningSetVisitors;

  const previousNewVisitors = previousV2Covered
    ? Math.min(firstTimePreviousVisitors, previousVisitors)
    : firstTimePreviousVisitors;
  const previousReturningVisitors = previousV2Covered
    ? Math.max(0, previousVisitors - previousNewVisitors)
    : returningSetPreviousVisitors;

  const avgEngagementMs = sessions > 0 ? engagedMs / sessions : 0;
  const previousAvgEngagementMs = previousSessions > 0 ? previousEngagedMs / previousSessions : 0;
  const pagesPerSession = sessions > 0 ? rangeViews / sessions : 0;
  const previousPagesPerSession = previousSessions > 0 ? previousViews / previousSessions : 0;
  const conversionRate = sessions > 0 ? (conversions / sessions) * 100 : 0;
  const previousConversionRate =
    previousSessions > 0 ? (previousConversions / previousSessions) * 100 : 0;

  return {
    range,
    totalViews,
    totalVisitors,
    rangeViews,
    rangeVisitors,
    previousViews,
    previousVisitors,
    sessions,
    previousSessions,
    newVisitors,
    previousNewVisitors,
    returningVisitors,
    previousReturningVisitors,
    avgEngagementMs,
    previousAvgEngagementMs,
    pagesPerSession,
    previousPagesPerSession,
    interactions,
    previousInteractions,
    conversions,
    previousConversions,
    conversionRate,
    previousConversionRate,
    daily,
    countries: toBreakdown(countryMap, 8),
    cities: toBreakdown(cityMap, 8),
    pages: toBreakdown(pageMap, 10),
    referrers: toBreakdown(referrerMap, 8),
    devices: toBreakdown(deviceMap, 4),
    v2Since,
    v2Covered,
    previousV2Covered,
    hasDetailedData: sessions > 0 || Boolean(v2Since),
    lastUpdated: Date.now(),
  };
}

/* -------------------------------------------------------------------------- */
/* Pages & projects                                                           */
/* -------------------------------------------------------------------------- */

export async function getPagesProjects(
  range: AnalyticsRange,
  category = 'all',
  metric = 'views',
): Promise<PagesProjectsData> {
  const dates = dayListBetween(range.from, range.to);
  const commands: RedisCommand[] = [];
  const push = (command: RedisCommand) => {
    commands.push(command);
    return commands.length - 1;
  };

  const dayIndex = dates.map((day) => ({
    pages: push(['HGETALL', `pages:${day}`]),
    engagement: push(['HGETALL', `v2:engpage:${day}`]),
    engagementTime: push(['HGETALL', `v2:engtime:${day}`]),
    conversions: push(['HGETALL', `v2:convpage:${day}`]),
    projects: push(['HGETALL', `v2:proj:${day}`]),
    landing: push(['HGETALL', `v2:landing:${day}`]),
    exits: push(['HGETALL', `v2:exit:${day}`]),
  }));

  const results = await redisPipeline(commands);

  const pageViews = new Map<string, number>();
  const pageInteractions = new Map<string, number>();
  const pageEngagement = new Map<string, number>();
  const pageConversions = new Map<string, number>();
  const projectMetrics = new Map<string, Map<string, number>>();
  const landingMap = new Map<string, number>();
  const exitMap = new Map<string, number>();

  dates.forEach((_, index) => {
    const idx = dayIndex[index];
    mergeBreakdown(pageViews, parseHash(results[idx.pages]));
    mergeBreakdown(pageInteractions, parseHash(results[idx.engagement]));
    mergeBreakdown(pageEngagement, parseHash(results[idx.engagementTime]));

    for (const [field, count] of parseHash(results[idx.landing])) {
      const [, path] = splitField(field);
      if (path) landingMap.set(path, (landingMap.get(path) ?? 0) + count);
    }

    for (const [path, count] of parseHash(results[idx.exits])) {
      if (count > 0) exitMap.set(path, (exitMap.get(path) ?? 0) + count);
    }

    for (const [field, count] of parseHash(results[idx.conversions])) {
      const [, path] = splitField(field);
      if (path) pageConversions.set(path, (pageConversions.get(path) ?? 0) + count);
    }

    for (const [field, count] of parseHash(results[idx.projects])) {
      const [slug, name] = splitField(field);
      if (!slug || !name) continue;
      const metrics = projectMetrics.get(slug) ?? new Map<string, number>();
      metrics.set(name, (metrics.get(name) ?? 0) + count);
      projectMetrics.set(slug, metrics);
    }
  });

  const allPaths = Array.from(new Set<string>([...pageViews.keys(), ...pageInteractions.keys()]))
    .sort(
      (a, b) =>
        (pageViews.get(b) ?? 0) - (pageViews.get(a) ?? 0) ||
        (pageInteractions.get(b) ?? 0) - (pageInteractions.get(a) ?? 0),
    )
    .slice(0, 100);
  const projects = getAllProjects();
  const projectMap = new Map(projects.map((project) => [project.slug, project]));

  const pathVisitorCommands: RedisCommand[] = [];
  const pathOrder: string[] = [];
  allPaths.forEach((path) => {
    pathOrder.push(path);
    pathVisitorCommands.push([
      'PFCOUNT',
      ...dates.map((day) => v2PageVisitorKey(day, path)),
    ]);
  });

  const projectVisitorCommands: RedisCommand[] = [];
  const projectOrder: string[] = [];
  projectMetrics.forEach((_, slug) => {
    projectOrder.push(slug);
    projectVisitorCommands.push([
      'PFCOUNT',
      ...dates.map((day) => v2ProjectVisitorKey(day, slug)),
    ]);
  });

  const [pathVisitorResults, projectVisitorResults] = await Promise.all([
    pathVisitorCommands.length > 0 ? redisPipeline(pathVisitorCommands) : Promise.resolve([]),
    projectVisitorCommands.length > 0 ? redisPipeline(projectVisitorCommands) : Promise.resolve([]),
  ]);

  const pathVisitors = new Map<string, number>();
  pathOrder.forEach((path, index) => pathVisitors.set(path, asNumber(pathVisitorResults[index])));

  const projectVisitors = new Map<string, number>();
  projectOrder.forEach((slug, index) =>
    projectVisitors.set(slug, asNumber(projectVisitorResults[index])),
  );

  const pages: PageRow[] = Array.from(allPaths)
    .map((path) => {
      const views = pageViews.get(path) ?? 0;
      const engagementMs = pageEngagement.get(path) ?? 0;
      const slug = projectFromPath(path);
      const project = slug ? projectMap.get(slug) : undefined;

      return {
        path,
        views,
        visitors: pathVisitors.get(path) ?? 0,
        engagementMs,
        avgEngagementMs: views > 0 ? engagementMs / views : 0,
        interactions: pageInteractions.get(path) ?? 0,
        conversions: pageConversions.get(path) ?? 0,
        isProject: Boolean(slug),
        projectSlug: slug || null,
        projectName: project?.title ?? null,
      };
    })
    .filter((page) => page.views > 0 || page.interactions > 0 || page.conversions > 0);

  const projectRows: ProjectRow[] = projects.map((project) => {
    const metrics = projectMetrics.get(project.slug) ?? new Map<string, number>();
    const categories = projectCategoryLabels(project);
    const views = metrics.get('views') ?? 0;
    const engagementMs = metrics.get('engaged_ms') ?? 0;
    const scrollEvents = SCROLL_DEPTHS.reduce(
      (total, depth) => total + (metrics.get(`scroll${depth}`) ?? 0),
      0,
    );
    const weightedScroll = SCROLL_DEPTHS.reduce(
      (total, depth) => total + depth * (metrics.get(`scroll${depth}`) ?? 0),
      0,
    );

    return {
      slug: project.slug,
      name: project.title,
      url: `/projects/${project.slug}`,
      category: categories[0] ?? 'Other',
      categories,
      views,
      visitors: projectVisitors.get(project.slug) ?? 0,
      engagementMs,
      avgEngagementMs: views > 0 ? engagementMs / views : 0,
      cardClicks: metrics.get('clicks') ?? 0,
      scrollDepth: scrollEvents > 0 ? weightedScroll / scrollEvents : 0,
      scrollEvents,
      externalClicks: metrics.get('external') ?? 0,
      conversions: metrics.get('conversions') ?? 0,
    };
  });

  const filteredProjects =
    category === 'all'
      ? projectRows
      : projectRows.filter((project) =>
          project.categories.includes(category as ProjectCategoryLabel),
        );

  const metricKey = ['views', 'visitors', 'engagement', 'clicks', 'conversions'].includes(metric)
    ? metric
    : 'views';

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (metricKey) {
      case 'visitors':
        return b.visitors - a.visitors || b.views - a.views;
      case 'engagement':
        return b.avgEngagementMs - a.avgEngagementMs || b.views - a.views;
      case 'clicks':
        return b.cardClicks - a.cardClicks || b.views - a.views;
      case 'conversions':
        return b.conversions - a.conversions || b.views - a.views;
      default:
        return b.views - a.views || b.visitors - a.visitors;
    }
  });

  const sortedPages = [...pages].sort((a, b) => {
    switch (metricKey) {
      case 'visitors':
        return b.visitors - a.visitors || b.views - a.views;
      case 'engagement':
        return b.avgEngagementMs - a.avgEngagementMs || b.views - a.views;
      case 'clicks':
      case 'conversions':
        return b.conversions - a.conversions || b.interactions - a.interactions;
      default:
        return b.views - a.views || b.visitors - a.visitors;
    }
  });

  const mostViewed = [...filteredProjects]
    .filter((project) => project.views > 0)
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const mostEngaging = [...filteredProjects]
    .filter((project) => project.views > 0)
    .sort((a, b) => b.avgEngagementMs - a.avgEngagementMs || b.views - a.views)
    .slice(0, 5);

  return {
    range,
    pages: sortedPages,
    projects: sortedProjects,
    mostViewed,
    mostEngaging,
    landingPages: toBreakdown(landingMap, 10),
    exitPages: toBreakdown(exitMap, 10),
    category,
    metric: metricKey,
    categories: ['all', 'Brand Design', 'Product Design', 'Web Design', 'Other'],
    hasData: pages.some((page) => page.views > 0) || projectRows.some((project) => project.views > 0),
  };
}

/* -------------------------------------------------------------------------- */
/* Engagement                                                                 */
/* -------------------------------------------------------------------------- */

export async function getEngagement(range: AnalyticsRange): Promise<EngagementData> {
  const dates = dayListBetween(range.from, range.to);
  const previousDates = dayListBetween(range.previousFrom, range.previousTo);
  const commands: RedisCommand[] = [];
  const push = (command: RedisCommand) => {
    commands.push(command);
    return commands.length - 1;
  };

  const currentIndex = dates.map((day) => ({
    views: push(['GET', `pv:day:${day}`]),
    day: push(['HGETALL', v2DayKey(day)]),
    events: push(['HGETALL', `v2:evt:${day}`]),
    labels: push(['HGETALL', `v2:evtlabel:${day}`]),
    pages: push(['HGETALL', `v2:engpage:${day}`]),
    times: push(['HGETALL', `v2:engtime:${day}`]),
    scroll: push(['HGETALL', `v2:scroll:${day}`]),
  }));

  const previousIndex = previousDates.map((day) => ({
    views: push(['GET', `pv:day:${day}`]),
    day: push(['HGETALL', v2DayKey(day)]),
  }));

  const results = await redisPipeline(commands);

  const eventMap = new Map<string, number>();
  const labelMap = new Map<string, number>();
  const pageInteractionMap = new Map<string, number>();
  const pageTimeMap = new Map<string, number>();
  const scrollMap = new Map<string, number>();
  const scrollDaily: ScrollDayPoint[] = [];
  const daily: DailyPoint[] = [];

  let totalInteractions = 0;
  let totalViews = 0;
  let totalSessions = 0;
  let engagedMs = 0;

  dates.forEach((date, index) => {
    const idx = currentIndex[index];
    const day = hashToMap(results[idx.day]);
    const views = asNumber(results[idx.views]);
    const sessions = asNumber(day.get('sessions'));
    const interactions = asNumber(day.get('interactions'));

    totalViews += views;
    totalSessions += sessions;
    totalInteractions += interactions;
    engagedMs += asNumber(day.get('engaged_ms'));

    daily.push({
      date,
      views,
      visitors: 0,
      sessions,
      interactions,
      conversions: asNumber(day.get('conversions')),
    });

    mergeBreakdown(eventMap, parseHash(results[idx.events]));
    mergeBreakdown(labelMap, parseHash(results[idx.labels]));
    mergeBreakdown(pageInteractionMap, parseHash(results[idx.pages]));
    mergeBreakdown(pageTimeMap, parseHash(results[idx.times]));
    mergeBreakdown(scrollMap, parseHash(results[idx.scroll]));

    const dayScroll = hashToMap(results[idx.scroll]);
    scrollDaily.push({
      date,
      depth25: dayScroll.get('25') ?? 0,
      depth50: dayScroll.get('50') ?? 0,
      depth75: dayScroll.get('75') ?? 0,
      depth100: dayScroll.get('100') ?? 0,
    });
  });

  let previousInteractions = 0;
  let previousViews = 0;
  let previousSessions = 0;
  let previousEngagedMs = 0;

  previousDates.forEach((_, index) => {
    const idx = previousIndex[index];
    const day = hashToMap(results[idx.day]);
    previousViews += asNumber(results[idx.views]);
    previousSessions += asNumber(day.get('sessions'));
    previousInteractions += asNumber(day.get('interactions'));
    previousEngagedMs += asNumber(day.get('engaged_ms'));
  });

  const topElements: ElementRow[] = Array.from(labelMap.entries())
    .map(([field, count]) => {
      const [event, label] = splitField(field);
      return { event, label: label || event, count };
    })
    .filter((row) => row.event !== 'engagement' && row.event !== 'scroll_depth')
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 12);

  const topPages: EngagementPageRow[] = Array.from(pageInteractionMap.entries())
    .map(([path, interactions]) => {
      const engagementMs = pageTimeMap.get(path) ?? 0;
      return {
        path,
        interactions,
        engagementMs,
        avgEngagementMs: interactions > 0 ? engagementMs / interactions : 0,
      };
    })
    .sort((a, b) => b.interactions - a.interactions || b.engagementMs - a.engagementMs)
    .slice(0, 10);

  const scrollDepth: BreakdownRow[] = SCROLL_DEPTHS.map((depth) => ({
    label: `${depth}%`,
    count: scrollMap.get(String(depth)) ?? 0,
  }));

  const avgEngagementMs = totalSessions > 0 ? engagedMs / totalSessions : 0;
  const previousAvgEngagementMs =
    previousSessions > 0 ? previousEngagedMs / previousSessions : 0;

  return {
    range,
    totalInteractions,
    previousInteractions,
    avgEngagementMs,
    previousAvgEngagementMs,
    avgPagesPerSession: totalSessions > 0 ? totalViews / totalSessions : 0,
    previousAvgPagesPerSession: previousSessions > 0 ? previousViews / previousSessions : 0,
    totalSessions,
    previousSessions,
    totalViews,
    previousViews,
    eventBreakdown: toBreakdown(eventMap, 12),
    topElements,
    topPages,
    scrollDepth,
    scrollDaily,
    daily,
    hasData: totalInteractions > 0 || engagedMs > 0 || totalSessions > 0,
  };
}

/* -------------------------------------------------------------------------- */
/* Acquisition                                                                */
/* -------------------------------------------------------------------------- */

export async function getAcquisition(range: AnalyticsRange): Promise<AcquisitionData> {
  const dates = dayListBetween(range.from, range.to);
  const commands: RedisCommand[] = [];
  const push = (command: RedisCommand) => {
    commands.push(command);
    return commands.length - 1;
  };

  const dayIndex = dates.map((day) => ({
    views: push(['HGETALL', `v2:src:${day}`]),
    sessions: push(['HGETALL', `v2:srcsess:${day}`]),
    interactions: push(['HGETALL', `v2:srcevt:${day}`]),
    conversions: push(['HGETALL', `v2:convsources:${day}`]),
    landing: push(['HGETALL', `v2:landing:${day}`]),
    campaigns: push(['HGETALL', `v2:campaign:${day}`]),
    campaignSessions: push(['HGETALL', `v2:campaignsess:${day}`]),
    campaignConversions: push(['HGETALL', `v2:campaignconv:${day}`]),
    campaignSources: push(['HGETALL', `v2:campaignsrc:${day}`]),
    utm: push(['HGETALL', `v2:utm:${day}`]),
    utmSessions: push(['HGETALL', `v2:utmsess:${day}`]),
    referrers: push(['HGETALL', `referrers:${day}`]),
  }));

  const results = await redisPipeline(commands);

  const viewMap = new Map<string, number>();
  const sessionMap = new Map<string, number>();
  const interactionMap = new Map<string, number>();
  const conversionMap = new Map<string, number>();
  const landingMap = new Map<string, number>();
  const campaignViewMap = new Map<string, number>();
  const campaignSessionMap = new Map<string, number>();
  const campaignConversionMap = new Map<string, number>();
  const campaignSourceMap = new Map<string, number>();
  const utmViewMap = new Map<string, number>();
  const utmSessionMap = new Map<string, number>();
  const referrerMap = new Map<string, number>();

  dates.forEach((_, index) => {
    const idx = dayIndex[index];
    mergeBreakdown(viewMap, parseHash(results[idx.views]));
    mergeBreakdown(sessionMap, parseHash(results[idx.sessions]));
    mergeBreakdown(interactionMap, parseHash(results[idx.interactions]));
    mergeBreakdown(landingMap, parseHash(results[idx.landing]));
    mergeBreakdown(campaignViewMap, parseHash(results[idx.campaigns]));
    mergeBreakdown(campaignSessionMap, parseHash(results[idx.campaignSessions]));
    mergeBreakdown(campaignConversionMap, parseHash(results[idx.campaignConversions]));
    mergeBreakdown(campaignSourceMap, parseHash(results[idx.campaignSources]));
    mergeBreakdown(utmViewMap, parseHash(results[idx.utm]));
    mergeBreakdown(utmSessionMap, parseHash(results[idx.utmSessions]));
    mergeBreakdown(referrerMap, parseHash(results[idx.referrers]));

    for (const [field, count] of parseHash(results[idx.conversions])) {
      const [, source] = splitField(field);
      if (source) conversionMap.set(source, (conversionMap.get(source) ?? 0) + count);
    }
  });

  const sources = Array.from(
    new Set([...viewMap.keys(), ...sessionMap.keys(), ...conversionMap.keys()]),
  )
    .sort(
      (a, b) =>
        (sessionMap.get(b) ?? 0) - (sessionMap.get(a) ?? 0) ||
        (viewMap.get(b) ?? 0) - (viewMap.get(a) ?? 0),
    )
    .slice(0, 24);

  const visitorCommands: RedisCommand[] = sources.map((source) => [
    'PFCOUNT',
    ...dates.map((day) => v2SourceVisitorKey(day, source)),
  ]);

  const visitorResults =
    visitorCommands.length > 0 ? await redisPipeline(visitorCommands) : [];

  const sourceRows: SourceRow[] = sources.map((source, index) => {
    const sessions = sessionMap.get(source) ?? 0;
    const conversions = conversionMap.get(source) ?? 0;

    const landingPages = Array.from(landingMap.entries())
      .filter(([field]) => field.startsWith(`${source}|`))
      .map(([field, count]) => ({ label: field.slice(source.length + 1), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return {
      source,
      visitors: asNumber(visitorResults[index]),
      sessions,
      views: viewMap.get(source) ?? 0,
      interactions: interactionMap.get(source) ?? 0,
      conversions,
      conversionRate: sessions > 0 ? (conversions / sessions) * 100 : 0,
      landingPages,
    };
  });

  sourceRows.sort((a, b) => b.sessions - a.sessions || b.views - a.views);

  const campaignSources = new Map<string, string>();
  campaignSourceMap.forEach((_, field) => {
    const [campaign, source] = splitField(field);
    if (campaign && source && !campaignSources.has(campaign)) {
      campaignSources.set(campaign, source);
    }
  });

  const campaigns: CampaignRow[] = Array.from(
    new Set([
      ...campaignViewMap.keys(),
      ...campaignSessionMap.keys(),
      ...campaignConversionMap.keys(),
    ]),
  )
    .map((campaign) => {
      const sessions = campaignSessionMap.get(campaign) ?? 0;
      const conversions = campaignConversionMap.get(campaign) ?? 0;
      return {
        campaign,
        source: campaignSources.get(campaign) ?? 'Other',
        views: campaignViewMap.get(campaign) ?? 0,
        sessions,
        conversions,
        conversionRate: sessions > 0 ? (conversions / sessions) * 100 : 0,
      };
    })
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  const totalSessions = sourceRows.reduce((total, row) => total + row.sessions, 0);

  const utm: UtmRow[] = Array.from(
    new Set([...utmViewMap.keys(), ...utmSessionMap.keys()]),
  )
    .map((field) => {
      const [source = '', medium = '', campaign = '', content = '', term = ''] = field.split('|');
      return {
        source,
        medium,
        campaign,
        content,
        term,
        views: utmViewMap.get(field) ?? 0,
        sessions: utmSessionMap.get(field) ?? 0,
      };
    })
    .sort((a, b) => b.views - a.views || b.sessions - a.sessions)
    .slice(0, 20);

  return {
    range,
    sources: sourceRows,
    campaigns,
    utm,
    referrers: toBreakdown(referrerMap, 12),
    totalSessions,
    hasData: sourceRows.some((row) => row.views > 0 || row.sessions > 0),
  };
}

/* -------------------------------------------------------------------------- */
/* Audience                                                                   */
/* -------------------------------------------------------------------------- */

export async function getAudience(range: AnalyticsRange): Promise<AudienceData> {
  const dates = dayListBetween(range.from, range.to);
  const commands: RedisCommand[] = [];
  const push = (command: RedisCommand) => {
    commands.push(command);
    return commands.length - 1;
  };

  const dayIndex = dates.map((day) => ({
    countries: push(['HGETALL', `countries:${day}`]),
    cities: push(['HGETALL', `cities:${day}`]),
    devices: push(['HGETALL', `devices:${day}`]),
    browsers: push(['HGETALL', `v2:browser:${day}`]),
    operatingSystems: push(['HGETALL', `v2:os:${day}`]),
    geoMethods: push(['HGETALL', `v2:geomethod:${day}`]),
  }));

  const results = await redisPipeline(commands);

  const countryMap = new Map<string, number>();
  const cityMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const browserMap = new Map<string, number>();
  const osMap = new Map<string, number>();
  const geoMap = new Map<string, number>();

  dates.forEach((_, index) => {
    const idx = dayIndex[index];
    mergeBreakdown(countryMap, parseHash(results[idx.countries]));
    mergeBreakdown(cityMap, parseHash(results[idx.cities]));
    mergeBreakdown(deviceMap, parseHash(results[idx.devices]));
    mergeBreakdown(browserMap, parseHash(results[idx.browsers]));
    mergeBreakdown(osMap, parseHash(results[idx.operatingSystems]));
    mergeBreakdown(geoMap, parseHash(results[idx.geoMethods]));
  });

  const geoLabels: Record<string, string> = {
    ip: 'IP geolocation',
    edge: 'Edge fallback',
    none: 'Unknown',
  };

  const geoMethods = Array.from(geoMap.entries()).map(([label, count]) => ({
    label: geoLabels[label] ?? label,
    count,
  }));

  return {
    range,
    countries: toBreakdown(countryMap, 12),
    cities: toBreakdown(cityMap, 12),
    devices: toBreakdown(deviceMap, 4),
    browsers: toBreakdown(browserMap, 8),
    operatingSystems: toBreakdown(osMap, 8),
    geoMethods: geoMethods.sort((a, b) => b.count - a.count),
    hasData: countryMap.size > 0 || deviceMap.size > 0 || browserMap.size > 0,
  };
}

/* -------------------------------------------------------------------------- */
/* Activity                                                                   */
/* -------------------------------------------------------------------------- */

export async function getActivity(
  range: AnalyticsRange,
  eventFilter = 'all',
): Promise<ActivityData> {
  const dates = dayListBetween(range.from, range.to);
  // Reading every day of a 180-day range would be expensive for a feed that
  // only shows the latest events. Keep the selected range but cap the window.
  const activityDates = dates.slice(-60);
  const commands: RedisCommand[] = activityDates.map((day) => [
    'LRANGE',
    `v2:activity:${day}`,
    '0',
    '99',
  ]);

  const results = commands.length > 0 ? await redisPipeline(commands) : [];

  const items = results
    .flatMap(parseActivityList)
    .filter((item) => eventFilter === 'all' || item.event === eventFilter)
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 300);

  return {
    range,
    items,
    eventFilter,
    hasData: items.length > 0,
  };
}

/* -------------------------------------------------------------------------- */
/* Conversions                                                                */
/* -------------------------------------------------------------------------- */

export async function getConversions(range: AnalyticsRange): Promise<ConversionsData> {
  const dates = dayListBetween(range.from, range.to);
  const previousDates = dayListBetween(range.previousFrom, range.previousTo);
  const commands: RedisCommand[] = [];
  const push = (command: RedisCommand) => {
    commands.push(command);
    return commands.length - 1;
  };

  const currentIndex = dates.map((day) => ({
    conversions: push(['HGETALL', `v2:conv:${day}`]),
    pages: push(['HGETALL', `v2:convpage:${day}`]),
    sources: push(['HGETALL', `v2:convsources:${day}`]),
    campaigns: push(['HGETALL', `v2:campaignconv:${day}`]),
    day: push(['HGETALL', v2DayKey(day)]),
    sourceSessions: push(['HGETALL', `v2:srcsess:${day}`]),
  }));

  const previousIndex = previousDates.map((day) => ({
    day: push(['HGETALL', v2DayKey(day)]),
  }));

  const results = await redisPipeline(commands);

  const typeMap = new Map<string, number>();
  const pageMap = new Map<string, number>();
  const sourceConversionMap = new Map<string, number>();
  const sourceSessionMap = new Map<string, number>();
  const campaignMap = new Map<string, number>();
  const daily: DailyPoint[] = [];

  let totalConversions = 0;
  let sessions = 0;

  dates.forEach((date, index) => {
    const idx = currentIndex[index];
    const day = hashToMap(results[idx.day]);
    const conversions = asNumber(day.get('conversions'));
    const daySessions = asNumber(day.get('sessions'));

    totalConversions += conversions;
    sessions += daySessions;

    daily.push({
      date,
      views: 0,
      visitors: 0,
      sessions: daySessions,
      interactions: 0,
      conversions,
    });

    mergeBreakdown(typeMap, parseHash(results[idx.conversions]));
    mergeBreakdown(campaignMap, parseHash(results[idx.campaigns]));
    mergeBreakdown(sourceSessionMap, parseHash(results[idx.sourceSessions]));

    for (const [field, count] of parseHash(results[idx.pages])) {
      const [, path] = splitField(field);
      if (path) pageMap.set(path, (pageMap.get(path) ?? 0) + count);
    }

    for (const [field, count] of parseHash(results[idx.sources])) {
      const [, source] = splitField(field);
      if (source) sourceConversionMap.set(source, (sourceConversionMap.get(source) ?? 0) + count);
    }
  });

  let previousConversions = 0;
  let previousSessions = 0;

  previousDates.forEach((_, index) => {
    const idx = previousIndex[index];
    const day = hashToMap(results[idx.day]);
    previousConversions += asNumber(day.get('conversions'));
    previousSessions += asNumber(day.get('sessions'));
  });

  const bySource: ConversionSourceRow[] = Array.from(sourceConversionMap.entries())
    .map(([source, conversions]) => {
      const sourceSessions = sourceSessionMap.get(source) ?? 0;
      return {
        source,
        conversions,
        sessions: sourceSessions,
        rate: sourceSessions > 0 ? (conversions / sourceSessions) * 100 : 0,
      };
    })
    .sort((a, b) => b.conversions - a.conversions || b.rate - a.rate)
    .slice(0, 24);

  return {
    range,
    totalConversions,
    previousConversions,
    sessions,
    previousSessions,
    conversionRate: sessions > 0 ? (totalConversions / sessions) * 100 : 0,
    previousConversionRate:
      previousSessions > 0 ? (previousConversions / previousSessions) * 100 : 0,
    byType: toBreakdown(typeMap, 12),
    byPage: toBreakdown(pageMap, 12),
    bySource,
    byCampaign: toBreakdown(campaignMap, 12),
    daily,
    hasData: totalConversions > 0,
  };
}

/* -------------------------------------------------------------------------- */
/* Settings                                                                   */
/* -------------------------------------------------------------------------- */

export async function getSettings(): Promise<SettingsData> {
  const today = currentDay();
  const results = await redisPipeline([
    ['GET', 'v2:since'],
    ['HGETALL', 'v2:meta'],
    ['HGETALL', v2DayKey(today)],
    ['LLEN', `v2:activity:${today}`],
    ['PFCOUNT', v2NewKey(today)],
    ['PFCOUNT', v2ReturningKey(today)],
  ]);

  const meta = new Map<string, string>();
  if (Array.isArray(results[1])) {
    for (let index = 0; index < results[1].length; index += 2) {
      meta.set(String(results[1][index]), String(results[1][index + 1]));
    }
  }

  const day = hashToMap(results[2]);
  const lastEventAt = Number(meta.get('last') ?? 0);
  const sinceValue = results[0];

  return {
    storeConfigured: isStoreConfigured(),
    geoEnabled: process.env.GEOLOCATION_ENABLED !== 'false',
    timezone: analyticsTimeZone(),
    retentionDays: RETENTION_DAYS,
    sessionTimeoutMinutes: SESSION_TIMEOUT_MINUTES,
    v2Since: typeof sinceValue === 'string' ? sinceValue : null,
    lastEventAt: Number.isFinite(lastEventAt) && lastEventAt > 0 ? lastEventAt : null,
    lastPath: meta.get('lastPath') ?? '',
    eventsToday: asNumber(day.get('interactions')),
    sessionsToday: asNumber(day.get('sessions')),
    activityToday: asNumber(results[3]),
    newVisitorsToday: asNumber(results[4]),
    returningVisitorsToday: asNumber(results[5]),
  };
}

/* -------------------------------------------------------------------------- */
/* Live                                                                       */
/* -------------------------------------------------------------------------- */

export async function getLiveStats(): Promise<LiveStats> {
  const now = Date.now();
  const today = currentDay();
  const hour = hourKeyFor(new Date(now));
  const buckets = lastTenMinuteBuckets(6, new Date(now));

  const commands: RedisCommand[] = [
    ['ZREMRANGEBYSCORE', 'v2:active', '-inf', String(now - ACTIVE_WINDOW_SECONDS * 1000)],
    ['ZCARD', 'v2:active'],
    ['ZREMRANGEBYSCORE', 'v2:recent', '-inf', String(now - 2 * 60 * 60_000)],
    ['ZCOUNT', 'v2:recent', String(now - 60 * 60_000), String(now)],
    ['GET', hour],
    ['GET', `pv:day:${today}`],
    ['HGETALL', v2DayKey(today)],
    ['LRANGE', `v2:activity:${today}`, '0', '4'],
    ['HGETALL', 'v2:meta'],
    ...buckets.map((bucket): RedisCommand => ['HGETALL', `v2:pv10:${bucket}`]),
  ];

  const results = await redisPipeline(commands);
  const bucketOffset = 9;
  const pageMap = new Map<string, number>();

  buckets.forEach((_, index) => {
    mergeBreakdown(pageMap, parseHash(results[bucketOffset + index]));
  });

  const day = hashToMap(results[6]);
  const recent = parseActivityList(results[7]);
  const meta = new Map<string, string>();
  if (Array.isArray(results[8])) {
    for (let index = 0; index < results[8].length; index += 2) {
      meta.set(String(results[8][index]), String(results[8][index + 1]));
    }
  }

  const lastActivity = recent[0] ?? null;

  return {
    activeVisitors: asNumber(results[1]),
    last60mViews: asNumber(results[3]),
    hourViews: asNumber(results[4]),
    todayViews: asNumber(results[5]),
    sessionsToday: asNumber(day.get('sessions')),
    interactionsToday: asNumber(day.get('interactions')),
    mostActivePages: toBreakdown(pageMap, 5),
    recent,
    lastActivity: lastActivity ?? (meta.get('last') ? {
      id: 'meta',
      ts: asNumber(meta.get('last')),
      type: 'pageview',
      event: 'pageview',
      path: meta.get('lastPath') ?? '/',
      project: '',
      label: '',
      depth: null,
      country: 'XX',
      city: 'Unknown',
      device: 'Desktop',
      source: 'Direct',
    } : null),
  };
}

/* -------------------------------------------------------------------------- */
/* Constants re-exported for views                                            */
/* -------------------------------------------------------------------------- */

export { CONVERSION_EVENTS, EVENT_TYPES, SCROLL_DEPTHS };
