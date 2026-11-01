const names = new Map<string, string>();

/** Turns an ISO 3166-1 alpha-2 code into a readable country name. */
export function countryName(code: string): string {
  if (!code || code === 'XX') return 'Unknown';
  if (!/^[A-Z]{2}$/.test(code)) return code;

  const cached = names.get(code);
  if (cached) return cached;

  let label = code;
  try {
    label = new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code;
  } catch {
    label = code;
  }

  names.set(code, label);
  return label;
}

/** Builds the flag emoji for an ISO country code. */
export function countryFlag(code: string): string {
  if (!/^[A-Z]{2}$/.test(code)) return '🌐';

  const points = code
    .split('')
    .map((letter) => 0x1f1e6 + (letter.charCodeAt(0) - 65));

  return String.fromCodePoint(...points);
}
