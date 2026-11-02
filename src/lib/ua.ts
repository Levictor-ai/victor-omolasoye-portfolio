/** Lightweight user-agent parsing. No fingerprinting, no external service. */

export type DeviceCategory = 'Mobile' | 'Tablet' | 'Desktop';

export function deviceFromUserAgent(userAgent: string): DeviceCategory {
  if (/ipad|tablet|playbook|silk|android(?!.*mobile)/i.test(userAgent)) return 'Tablet';
  if (/mobi|iphone|ipod|android.*mobile|windows phone|blackberry|opera mini/i.test(userAgent)) {
    return 'Mobile';
  }
  return 'Desktop';
}

export function browserFromUserAgent(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (ua.includes('edg/') || ua.includes('edge/')) return 'Edge';
  if (ua.includes('opr/') || ua.includes('opera mini')) return 'Opera';
  if (ua.includes('samsungbrowser')) return 'Samsung Internet';
  if (ua.includes('firefox/') || ua.includes('fxios/')) return 'Firefox';
  if (ua.includes('chrome/') || ua.includes('crios/')) return 'Chrome';
  if (ua.includes('safari/')) return 'Safari';
  if (ua.includes('msie') || ua.includes('trident/')) return 'Internet Explorer';

  return 'Other';
}

export function osFromUserAgent(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return 'iOS';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac os x') || ua.includes('macintosh')) return 'macOS';
  if (ua.includes('cros')) return 'ChromeOS';
  if (ua.includes('linux')) return 'Linux';

  return 'Other';
}
