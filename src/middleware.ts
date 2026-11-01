import { NextRequest, NextResponse } from 'next/server';

const APEX_HOST = 'omolasoyevictor.com';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.hostname === `www.${APEX_HOST}`) {
    url.hostname = APEX_HOST;
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();

  // The private analytics dashboard must never be indexed or cached.
  if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon-192.png|favicon-512.png|apple-touch-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|xml|txt|json|pdf)$).*)',
  ],
};
