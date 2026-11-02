import { isStoreConfigured } from '@/lib/redis';
import { recordAnalyticsEvent } from '@/lib/analytics-store';
import { isKnownEvent, isScrollDepth } from '@/lib/analytics-events';
import { resolveAttribution, sanitizeUtm, type UtmParams } from '@/lib/attribution';
import { resolveGeo } from '@/lib/geo';
import { sha256Hex } from '@/lib/hash';
import { browserFromUserAgent, deviceFromUserAgent, osFromUserAgent } from '@/lib/ua';
import { currentDay } from '@/lib/analytics-range';

export const dynamic = 'force-dynamic';

/**
 * Bot/prerender traffic never runs client JavaScript, but some crawlers do,
 * so we still filter obvious automation by user agent.
 */
const BOT_RE =
  /bot\b|bot\/|crawler|spider|crawling|slurp|preview|headless|lighthouse|pingdom|uptime|monitor|curl\/|wget\/|python-requests|python-urllib|go-http-client|node-fetch|axios\/|facebookexternalhit|embedly|quora link preview|whatsapp|telegrambot|discordbot|slackbot|applebot|petalbot|semrush|ahrefs|mj12|dotbot|bytespider/i;

const ID_RE = /^[a-zA-Z0-9_-]{8,80}$/;
const EVENT_ID_RE = /^[a-zA-Z0-9_:-]{8,120}$/;
const PROJECT_RE = /^[a-z0-9-]{1,80}$/i;
const MAX_PATH_LENGTH = 300;
const MAX_REFERRER_LENGTH = 500;
const MAX_LABEL_LENGTH = 120;

interface TrackBody {
  type?: unknown;
  event?: unknown;
  path?: unknown;
  project?: unknown;
  label?: unknown;
  depth?: unknown;
  durationMs?: unknown;
  visitorId?: unknown;
  sessionId?: unknown;
  eventId?: unknown;
  pageviewId?: unknown;
  referrer?: unknown;
  utm?: unknown;
}

function text(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, maxLength);
}

function validId(value: unknown): string {
  const candidate = typeof value === 'string' ? value : '';
  return ID_RE.test(candidate) ? candidate : '';
}

function validEventId(value: unknown): string {
  const candidate = typeof value === 'string' ? value : '';
  return EVENT_ID_RE.test(candidate) ? candidate : '';
}

function normalizePath(value: unknown): string {
  const candidate = text(value, MAX_PATH_LENGTH);
  if (!candidate.startsWith('/')) return '';
  if (candidate.startsWith('/admin') || candidate.startsWith('/api')) return '';
  // The event pipeline uses "|" as a field separator.
  return candidate.split('?')[0].replace(/\|/g, '/').slice(0, MAX_PATH_LENGTH);
}

function isInternalHost(host: string): boolean {
  const normalized = host.toLowerCase().split(':')[0];

  if (!normalized) return true;
  if (
    normalized === 'localhost' ||
    normalized === '127.0.0.1' ||
    normalized === '0.0.0.0' ||
    normalized.endsWith('.local')
  ) {
    return process.env.ANALYTICS_ALLOW_LOCAL !== '1';
  }

  const excluded = (process.env.ANALYTICS_EXCLUDE_HOSTS ?? '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return excluded.some((entry) => normalized === entry || normalized.endsWith(`.${entry}`));
}

function projectFromPath(path: string): string {
  const match = /^\/projects\/([a-z0-9-]+)/i.exec(path);
  return match ? match[1] : '';
}

export async function POST(req: Request) {
  try {
    if (!isStoreConfigured()) {
      return new Response(null, { status: 204 });
    }

    const contentLength = Number(req.headers.get('content-length') ?? 0);
    if (contentLength > 16_384) {
      return new Response(null, { status: 204 });
    }

    const contentType = req.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return new Response(null, { status: 204 });
    }

    const body = (await req.json().catch(() => null)) as TrackBody | null;
    if (!body) return new Response(null, { status: 204 });

    const type = body.type === 'event' ? 'event' : body.type === 'pageview' ? 'pageview' : '';
    if (!type) return new Response(null, { status: 204 });

    const event = type === 'pageview' ? 'pageview' : text(body.event, 60);
    if (type === 'event' && !isKnownEvent(event)) {
      return new Response(null, { status: 204 });
    }

    const path = normalizePath(body.path);
    if (!path) return new Response(null, { status: 204 });

    const userAgent = req.headers.get('user-agent') ?? '';
    if (!userAgent || BOT_RE.test(userAgent)) {
      return new Response(null, { status: 204 });
    }

    if (req.headers.get('dnt') === '1' || req.headers.get('sec-gpc') === '1') {
      return new Response(null, { status: 204 });
    }

    const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '';
    if (isInternalHost(host)) {
      return new Response(null, { status: 204 });
    }

    const forwardedFor = req.headers.get('x-forwarded-for') ?? '';
    const ip = forwardedFor.split(',')[0]?.trim() || req.headers.get('x-real-ip')?.trim() || '';
    const salt = process.env.ANALYTICS_SALT ?? 'portfolio-visits';

    const visitorId =
      validId(body.visitorId) ||
      (await sha256Hex(`${ip}|${userAgent}|${currentDay()}|${salt}`)).slice(0, 32);

    const sessionId =
      validId(body.sessionId) ||
      (await sha256Hex(`${visitorId}|session|${currentDay()}|${salt}`)).slice(0, 32);

    const eventId =
      validEventId(body.eventId) ||
      (await sha256Hex(`${visitorId}|${sessionId}|${path}|${event}|${Date.now()}`)).slice(0, 32);

    const pageviewId = validEventId(body.pageviewId) || eventId;

    const rawReferrer = text(body.referrer, MAX_REFERRER_LENGTH) || req.headers.get('referer') || '';
    const utm: UtmParams = sanitizeUtm(body.utm);
    const attribution = resolveAttribution({
      referrer: rawReferrer,
      utm,
      requestHost: host,
    });

    const project =
      text(body.project, 80).match(PROJECT_RE)?.[0] ||
      projectFromPath(path) ||
      '';

    const depthValue = Number(body.depth);
    const depth = isScrollDepth(depthValue) ? depthValue : null;
    const durationValue = Number(body.durationMs);
    const durationMs = Number.isFinite(durationValue)
      ? Math.max(0, Math.min(durationValue, 30 * 60_000))
      : 0;

    const geo = await resolveGeo(req);

    await recordAnalyticsEvent({
      type,
      event,
      path,
      project,
      label: text(body.label, MAX_LABEL_LENGTH),
      depth,
      durationMs,
      visitorId,
      sessionId,
      eventId,
      pageviewId,
      referrerHost: attribution.referrerHost,
      source: attribution.source,
      utm: attribution.utm,
      geo: { country: geo.country, city: geo.city, method: geo.method },
      device: deviceFromUserAgent(userAgent),
      browser: browserFromUserAgent(userAgent),
      os: osFromUserAgent(userAgent),
    });
  } catch {
    // Never surface analytics failures to visitors.
  }

  return new Response(null, { status: 204 });
}

export function GET() {
  return new Response(null, { status: 405 });
}
