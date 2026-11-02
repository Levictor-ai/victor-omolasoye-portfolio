/** Traffic-source and UTM attribution helpers. */

export interface UtmParams {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
}

export interface Attribution {
  /** Normalised, human-readable traffic source. */
  source: string;
  /** Referrer hostname, used for the legacy "Sources" breakdown. */
  referrerHost: string;
  utm: UtmParams;
}

const EMPTY_UTM: UtmParams = { source: '', medium: '', campaign: '', content: '', term: '' };

const SOURCE_ALIASES: Record<string, string> = {
  direct: 'Direct',
  google: 'Google Search',
  'google.com': 'Google Search',
  'google.co.uk': 'Google Search',
  'google.ca': 'Google Search',
  'google.de': 'Google Search',
  'google.ng': 'Google Search',
  bing: 'Bing',
  'bing.com': 'Bing',
  linkedin: 'LinkedIn',
  'linkedin.com': 'LinkedIn',
  lnkd: 'LinkedIn',
  behance: 'Behance',
  'behance.net': 'Behance',
  dribbble: 'Dribbble',
  'dribbble.com': 'Dribbble',
  instagram: 'Instagram',
  'instagram.com': 'Instagram',
  x: 'X',
  twitter: 'X',
  'x.com': 'X',
  'twitter.com': 'X',
  't.co': 'X',
  facebook: 'Facebook',
  'facebook.com': 'Facebook',
  medium: 'Medium',
  'medium.com': 'Medium',
  github: 'GitHub',
  'github.com': 'GitHub',
  contra: 'Contra',
  'contra.com': 'Contra',
};

export function sanitizeParam(value: unknown, maxLength = 120): string {
  if (typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\|/g, '/')
    .slice(0, maxLength);
}

export function normalizeHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, '').trim();
}

export function referrerHost(rawReferrer: string | undefined): string {
  if (!rawReferrer) return '';

  try {
    const url = new URL(rawReferrer);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    return normalizeHost(url.hostname);
  } catch {
    return '';
  }
}

function titleCase(value: string): string {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .slice(0, 80);
}

function sourceFromHost(host: string): string {
  if (!host) return '';

  const normalised = normalizeHost(host);
  const direct = SOURCE_ALIASES[normalised];
  if (direct) return direct;

  for (const [key, label] of Object.entries(SOURCE_ALIASES)) {
    if (key.includes('.') && (normalised === key || normalised.endsWith(`.${key}`))) {
      return label;
    }
  }

  if (/google\./.test(normalised)) return 'Google Search';
  if (/linkedin\./.test(normalised)) return 'LinkedIn';
  if (/behance\./.test(normalised)) return 'Behance';
  if (/dribbble\./.test(normalised)) return 'Dribbble';
  if (/instagram\./.test(normalised)) return 'Instagram';
  if (/(^|\.)x\.com$|(^|\.)twitter\.com$/.test(normalised)) return 'X';

  return 'Other referral';
}

export function sourceFromUtm(value: string): string {
  const cleaned = sanitizeParam(value, 80);
  if (!cleaned) return '';

  const key = cleaned.toLowerCase();
  return SOURCE_ALIASES[key] ?? titleCase(cleaned);
}

export function parseUtm(searchParams: URLSearchParams): UtmParams {
  return {
    source: sanitizeParam(searchParams.get('utm_source'), 80),
    medium: sanitizeParam(searchParams.get('utm_medium'), 80),
    campaign: sanitizeParam(searchParams.get('utm_campaign'), 120),
    content: sanitizeParam(searchParams.get('utm_content'), 120),
    term: sanitizeParam(searchParams.get('utm_term'), 120),
  };
}

export function emptyUtm(): UtmParams {
  return { ...EMPTY_UTM };
}

export function sanitizeUtm(input: unknown): UtmParams {
  if (!input || typeof input !== 'object') return emptyUtm();
  const value = input as Record<string, unknown>;
  return {
    source: sanitizeParam(value.source, 80),
    medium: sanitizeParam(value.medium, 80),
    campaign: sanitizeParam(value.campaign, 120),
    content: sanitizeParam(value.content, 120),
    term: sanitizeParam(value.term, 120),
  };
}

/**
 * Resolves a source without misclassifying internal navigation as direct.
 * A UTM source wins; otherwise the original external referrer is used.
 */
export function resolveAttribution(input: {
  referrer?: string;
  utm?: Partial<UtmParams>;
  requestHost?: string;
}): Attribution {
  const host = referrerHost(input.referrer);
  const selfHost = normalizeHost(input.requestHost ?? '');
  const externalHost = host && host !== selfHost ? host : '';
  const utm: UtmParams = {
    source: sanitizeParam(input.utm?.source, 80),
    medium: sanitizeParam(input.utm?.medium, 80),
    campaign: sanitizeParam(input.utm?.campaign, 120),
    content: sanitizeParam(input.utm?.content, 120),
    term: sanitizeParam(input.utm?.term, 120),
  };

  const utmSource = sourceFromUtm(utm.source);
  const source = utmSource || sourceFromHost(externalHost) || 'Direct';

  return { source, referrerHost: externalHost, utm };
}
