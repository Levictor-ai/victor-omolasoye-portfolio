import { NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-auth';
import { isStoreConfigured } from '@/lib/redis';
import { getLiveStats } from '@/lib/analytics-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isStoreConfigured()) {
    return NextResponse.json({ error: 'Analytics store is not configured' }, { status: 503 });
  }

  try {
    const stats = await getLiveStats();
    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Unavailable' }, { status: 500 });
  }
}
