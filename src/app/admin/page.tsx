import type { Metadata } from 'next';
import { LoginForm } from '@/components/admin/LoginForm';
import { SetupNotice } from '@/components/admin/SetupNotice';
import { VisitDashboard } from '@/components/admin/VisitDashboard';
import { hasAdminSession, isAdminConfigured } from '@/lib/admin-auth';
import { isStoreConfigured } from '@/lib/redis';
import { getSummary, RANGE_OPTIONS, type RangeDays, type VisitSummary } from '@/lib/visit-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Private analytics',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

interface AdminPageProps {
  searchParams: Promise<{ range?: string | string[] }>;
}

function parseRange(value: string | string[] | undefined): RangeDays {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return RANGE_OPTIONS.includes(parsed as RangeDays) ? (parsed as RangeDays) : 30;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const configured = isAdminConfigured();
  const storeConfigured = isStoreConfigured();
  const authenticated = configured && (await hasAdminSession());

  if (!authenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ios-grouped px-5 py-12 font-ios">
        <LoginForm configured={configured} />
        {!storeConfigured ? (
          <div className="w-full max-w-md">
            <SetupNotice />
          </div>
        ) : null}
      </main>
    );
  }

  const range = parseRange((await searchParams).range);

  let summary: VisitSummary | null = null;
  let error: string | null = null;

  if (storeConfigured) {
    try {
      summary = await getSummary(range);
    } catch {
      error = 'The analytics store returned an error.';
    }
  }

  return (
    <main>
      <VisitDashboard
        summary={summary}
        range={range}
        error={error}
        storeConfigured={storeConfigured}
      />
    </main>
  );
}
