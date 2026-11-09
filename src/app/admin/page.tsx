import type { Metadata } from 'next';
import { LoginForm } from '@/components/admin/LoginForm';
import { SetupNotice } from '@/components/admin/SetupNotice';
import {
  DashboardShell,
  VIEWS,
  type DashboardView,
} from '@/components/admin/DashboardShell';
import { OverviewView } from '@/components/admin/OverviewView';
import { PagesView } from '@/components/admin/PagesView';
import { EngagementView } from '@/components/admin/EngagementView';
import { AcquisitionView } from '@/components/admin/AcquisitionView';
import { AudienceView } from '@/components/admin/AudienceView';
import { ActivityView } from '@/components/admin/ActivityView';
import { VisitorsView } from '@/components/admin/VisitorsView';
import { ConversionsView } from '@/components/admin/ConversionsView';
import { SettingsView } from '@/components/admin/SettingsView';
import { Card, EmptyState } from '@/components/admin/ui';
import { hasAdminSession, isAdminConfigured } from '@/lib/admin-auth';
import { isStoreConfigured } from '@/lib/redis';
import { resolveRange } from '@/lib/analytics-range';
import { EVENT_TYPES } from '@/lib/analytics-events';
import {
  getAcquisition,
  getActivity,
  getAudience,
  getConversions,
  getEngagement,
  getLiveStats,
  getOverview,
  getPagesProjects,
  getSettings,
  getVisitors,
  type AcquisitionData,
  type ActivityData,
  type AudienceData,
  type ConversionsData,
  type EngagementData,
  type LiveStats,
  type OverviewData,
  type PagesProjectsData,
  type SettingsData,
  type VisitorsData,
} from '@/lib/analytics-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Private portfolio analytics',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

interface AdminPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseView(value: string | undefined): DashboardView {
  return (VIEWS.find((view) => view.id === value)?.id ?? 'overview') as DashboardView;
}

const CATEGORIES = ['all', 'Brand Design', 'Product Design', 'Web Design', 'Other'];
const METRICS = ['views', 'visitors', 'engagement', 'clicks', 'conversions'];
const EVENT_FILTERS = ['all', 'pageview', ...EVENT_TYPES];

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

  const params = await searchParams;
  const range = resolveRange({
    range: params.range,
    from: params.from,
    to: params.to,
  });
  const view = parseView(first(params.view));
  const category = CATEGORIES.includes(first(params.category) ?? '')
    ? (first(params.category) as string)
    : 'all';
  const metric = METRICS.includes(first(params.metric) ?? '')
    ? (first(params.metric) as string)
    : 'views';
  const eventFilter = EVENT_FILTERS.includes(first(params.event) ?? '')
    ? (first(params.event) as string)
    : 'all';
  const visitorFilterRaw = first(params.visitor);
  const visitorFilter =
    typeof visitorFilterRaw === 'string' && visitorFilterRaw.trim() ? visitorFilterRaw.trim() : '';

  let error: string | null = null;
  let lastUpdated: number | undefined;

  let overview: OverviewData | null = null;
  let live: LiveStats | null = null;
  let pages: PagesProjectsData | null = null;
  let engagement: EngagementData | null = null;
  let acquisition: AcquisitionData | null = null;
  let audience: AudienceData | null = null;
  let activity: ActivityData | null = null;
  let conversions: ConversionsData | null = null;
  let visitors: VisitorsData | null = null;
  let settings: SettingsData | null = null;

  if (storeConfigured) {
    try {
      switch (view) {
        case 'overview': {
          const [overviewData, liveData] = await Promise.all([
            getOverview(range),
            getLiveStats().catch(() => null),
          ]);
          overview = overviewData;
          live = liveData;
          lastUpdated = overviewData.lastUpdated;
          break;
        }
        case 'pages':
          pages = await getPagesProjects(range, category, metric);
          break;
        case 'engagement':
          engagement = await getEngagement(range);
          break;
        case 'acquisition':
          acquisition = await getAcquisition(range);
          break;
        case 'audience':
          audience = await getAudience(range);
          break;
        case 'activity':
          activity = await getActivity(range, eventFilter);
          break;
        case 'visitors': {
          const visitor =
            typeof visitorFilter === 'string' && visitorFilter !== 'all'
              ? visitorFilter
              : undefined;
          visitors = await getVisitors(range, visitor);
          break;
        }
        case 'conversions':
          conversions = await getConversions(range);
          break;
        case 'settings':
          settings = await getSettings();
          break;
      }
      lastUpdated = lastUpdated ?? Date.now();
    } catch {
      error = 'The analytics store returned an error.';
    }
  }

  const filters: Record<string, string | undefined> = {
    category: view === 'pages' ? category : undefined,
    metric: view === 'pages' ? metric : undefined,
    event: view === 'activity' ? eventFilter : undefined,
    visitor: view === 'visitors' && visitorFilter ? visitorFilter : undefined,
  };

  return (
    <main>
      <DashboardShell
        view={view}
        range={range}
        storeConfigured={storeConfigured}
        error={error}
        filters={filters}
        lastUpdated={lastUpdated}
      >
        {!storeConfigured ? (
          <Card title="Analytics storage is not connected">
            <p className="text-sm leading-relaxed text-ios-secondary">
              Add your Upstash Redis REST URL and token, then reload this page. Until then the public
              site keeps working and no analytics are recorded.
            </p>
          </Card>
        ) : error ? null : (
          <>
            {view === 'overview' && overview ? (
              <OverviewView data={overview} live={live} range={range} />
            ) : null}
            {view === 'pages' && pages ? <PagesView data={pages} range={range} /> : null}
            {view === 'engagement' && engagement ? <EngagementView data={engagement} /> : null}
            {view === 'acquisition' && acquisition ? (
              <AcquisitionView data={acquisition} />
            ) : null}
            {view === 'audience' && audience ? <AudienceView data={audience} /> : null}
            {view === 'activity' && activity ? (
              <ActivityView data={activity} range={range} />
            ) : null}
            {view === 'visitors' && visitors ? (
              <VisitorsView data={visitors} range={range} />
            ) : null}
            {view === 'conversions' && conversions ? (
              <ConversionsView data={conversions} />
            ) : null}
            {view === 'settings' && settings ? <SettingsView data={settings} /> : null}
            {!overview &&
            !pages &&
            !engagement &&
            !acquisition &&
            !audience &&
            !activity &&
            !conversions &&
            !visitors &&
            !settings ? (
              <EmptyState
                title="Nothing to show yet"
                description="This section will populate as analytics events arrive."
              />
            ) : null}
          </>
        )}
      </DashboardShell>
    </main>
  );
}
