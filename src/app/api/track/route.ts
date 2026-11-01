import { recordVisit } from '@/lib/visit-store';
import { isStoreConfigured } from '@/lib/redis';

export const dynamic = 'force-dynamic';

/**
 * Bot/prerender traffic never runs client JavaScript, but some crawlers do,
 * so we still filter obvious automation by user agent.
 */
const BOT_RE =
  /bot\b|bot\/|crawler|spider|crawling|slurp|preview|headless|lighthouse|pingdom|uptime|monitor|curl\/|wget\/|python-requests|python-urllib|go-http-client|node-fetch|axios\/|facebookexternalhit|embedly|quora link preview|whatsapp|telegrambot|discordbot|slackbot|applebot|petalbot|semrush|ahrefs|mj12|dotbot|bytespider/i;

const MAX_PATH_LENGTH = 300;
const MAX_REFERRER_LENGTH = 200;

const encoder = new TextEncoder();

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function normalizeHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, '');
}

function referrerLabel(rawReferrer: string | undefined, requestHost: string): string {
  if (!rawReferrer) return 'Direct';

  try {
    const url = new URL(rawReferrer);
    const referrerHost = normalizeHost(url.hostname);
    const selfHost = normalizeHost(requestHost);

    if (!referrerHost || referrerHost === selfHost) return 'Direct';

    return referrerHost;
  } catch {
    return 'Direct';
  }
}

function deviceFromUserAgent(userAgent: string): string {
  if (/ipad|tablet|playbook|silk|android(?!.*mobile)/i.test(userAgent)) return 'Tablet';
  if (/mobi|iphone|ipod|android.*mobile|windows phone|blackberry|opera mini/i.test(userAgent)) {
    return 'Mobile';
  }
  return 'Desktop';
}

function countryFromRequest(req: Request): string {
  const code = req.headers.get('x-vercel-ip-country')?.trim().toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) ? code : 'XX';
}

export async function POST(req: Request) {
  try {
    if (!isStoreConfigured()) {
      return new Response(null, { status: 204 });
    }

    const contentType = req.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return new Response(null, { status: 204 });
    }

    const body = (await req.json().catch(() => null)) as
      | { path?: unknown; referrer?: unknown }
      | null;

    const path = typeof body?.path === 'string' ? body.path.slice(0, MAX_PATH_LENGTH) : '';

    if (!path.startsWith('/')) {
      return new Response(null, { status: 204 });
    }

    if (path.startsWith('/admin') || path.startsWith('/api')) {
      return new Response(null, { status: 204 });
    }

    const userAgent = req.headers.get('user-agent') ?? '';
    if (!userAgent || BOT_RE.test(userAgent)) {
      return new Response(null, { status: 204 });
    }

    if (req.headers.get('dnt') === '1' || req.headers.get('sec-gpc') === '1') {
      return new Response(null, { status: 204 });
    }

    const forwardedFor = req.headers.get('x-forwarded-for') ?? '';
    const ip = forwardedFor.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '';
    const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? '';

    const day = new Date().toISOString().slice(0, 10);
    const salt = process.env.ANALYTICS_SALT ?? 'portfolio-visits';
    const visitorId = (await sha256Hex(`${ip}|${userAgent}|${day}|${salt}`)).slice(0, 32);

    const rawReferrer =
      typeof body?.referrer === 'string'
        ? body.referrer.slice(0, MAX_REFERRER_LENGTH)
        : req.headers.get('referer') ?? '';

    await recordVisit({
      path,
      country: countryFromRequest(req),
      referrer: referrerLabel(rawReferrer, host),
      device: deviceFromUserAgent(userAgent),
      visitorId,
    });
  } catch {
    // Never surface analytics failures to visitors.
  }

  return new Response(null, { status: 204 });
}

export function GET() {
  return new Response(null, { status: 405 });
}
