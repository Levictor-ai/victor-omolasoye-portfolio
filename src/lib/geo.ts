import { redisCommand } from './redis';
import { sha256Hex } from './hash';

/**
 * Approximate visitor geolocation.
 *
 * - Prefers an IP geolocation lookup (cached by hashed IP, never storing the IP).
 * - Falls back to Vercel's edge headers only when the lookup is unavailable.
 * - Never stores a raw IP address.
 */

export type GeoMethod = 'ip' | 'edge' | 'none';

export interface GeoResult {
  country: string;
  city: string;
  region: string;
  method: GeoMethod;
}

const PRIVATE_IP_RE =
  /^(?:10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|::1$|f[cd][0-9a-f]{2}:|fe80:)/i;

const IPV4_RE = /^\d{1,3}(?:\.\d{1,3}){3}$/;
const IPV6_RE = /^[0-9a-f:]+$/i;

export function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for') ?? '';
  const candidate = forwarded.split(',')[0]?.trim() || req.headers.get('x-real-ip')?.trim() || '';
  return candidate.slice(0, 64);
}

function isUsableIp(ip: string): boolean {
  if (!ip || PRIVATE_IP_RE.test(ip)) return false;
  if (IPV4_RE.test(ip)) {
    return ip.split('.').every((part) => Number(part) >= 0 && Number(part) <= 255);
  }
  return ip.includes(':') && IPV6_RE.test(ip);
}

function decodeHeader(value: string | null): string {
  if (!value) return '';
  try {
    return decodeURIComponent(value).trim().slice(0, 80);
  } catch {
    return value.trim().slice(0, 80);
  }
}

function edgeGeo(req: Request): GeoResult {
  const country = req.headers.get('x-vercel-ip-country')?.trim().toUpperCase() ?? '';
  const city = decodeHeader(req.headers.get('x-vercel-ip-city'));
  const region = decodeHeader(req.headers.get('x-vercel-ip-country-region'));

  return {
    country: /^[A-Z]{2}$/.test(country) ? country : 'XX',
    city: city || 'Unknown',
    region,
    method: country || city ? 'edge' : 'none',
  };
}

function normaliseCountry(value: unknown): string {
  if (typeof value !== 'string') return 'XX';
  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : 'XX';
}

/**
 * Normalises a free-form place name. Some geolocation providers return
 * compound values such as "Falkenstein/Vogtl.", where the first segment is the
 * real place name; keep only that so dashboards render clean labels.
 */
function normalisePlace(value: unknown): string {
  const cleaned = typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, 80) : '';
  const primary = cleaned.split('/')[0]?.trim() ?? '';
  return primary || cleaned;
}

async function lookupIp(ip: string): Promise<GeoResult | null> {
  if (process.env.GEOLOCATION_ENABLED === 'false') return null;

  const base = process.env.GEOLOCATION_API_URL?.trim() || 'https://ipwho.is';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1400);

  try {
    const url = new URL(`${base.replace(/\/$/, '')}/${encodeURIComponent(ip)}`);
    url.searchParams.set('fields', 'success,country,country_code,city,region');

    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as {
      success?: boolean;
      country?: string;
      country_code?: string;
      city?: string;
      region?: string;
    };

    if (data.success === false) return null;

    const country = normaliseCountry(data.country_code);
    const city = normalisePlace(data.city) || 'Unknown';
    const region = normalisePlace(data.region);

    if (country === 'XX' && city === 'Unknown' && !region) return null;

    return { country, city, region, method: 'ip' };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function resolveGeo(req: Request): Promise<GeoResult> {
  const ip = clientIp(req);

  if (!isUsableIp(ip)) {
    return edgeGeo(req);
  }

  const cacheKey = `geo:ip:${(await sha256Hex(ip)).slice(0, 32)}`;

  try {
    const cached = await redisCommand<string>(['GET', cacheKey]);
    if (cached) {
      const parsed = JSON.parse(cached) as GeoResult;
      if (parsed && parsed.country) return parsed;
    }
  } catch {
    // Cache is an optimisation only.
  }

  const lookedUp = await lookupIp(ip);
  if (lookedUp) {
    try {
      await redisCommand(['SET', cacheKey, JSON.stringify(lookedUp), 'EX', 86_400]);
    } catch {
      // Ignore cache failures.
    }
    return lookedUp;
  }

  return edgeGeo(req);
}
