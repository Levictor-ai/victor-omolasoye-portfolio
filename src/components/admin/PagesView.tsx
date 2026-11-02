import Link from 'next/link';
import {
  formatDuration,
  formatNumber,
  formatPercent,
  pageLabel,
} from '@/lib/analytics-format';
import type { PagesProjectsData, ProjectRow } from '@/lib/analytics-store';
import type { AnalyticsRange } from '@/lib/analytics-range';
import { adminHref } from './DashboardShell';
import { Breakdown, Card, DataTable, EmptyState, MetricNote, Pill, SectionHeading } from './ui';

const METRICS = [
  { id: 'views', label: 'Views' },
  { id: 'visitors', label: 'Visitors' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'clicks', label: 'Card clicks' },
  { id: 'conversions', label: 'Conversions' },
];

export function PagesView({
  data,
  range,
}: {
  data: PagesProjectsData;
  range: AnalyticsRange;
}) {
  return (
    <div className="space-y-4">
      <SectionHeading
        title="Pages & Projects"
        description="Which pages attract attention, and which projects turn that attention into engagement and enquiries."
      />

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
              Category
            </span>
            {data.categories.map((category) => {
              const active = data.category === category;
              return (
                <Link
                  key={category}
                  href={adminHref('pages', range, { category, metric: data.metric })}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    active
                      ? 'bg-ios-blue text-white'
                      : 'bg-ios-fill text-ios-secondary hover:text-ios-label'
                  }`}
                >
                  {category === 'all' ? 'All categories' : category}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
              Rank by
            </span>
            {METRICS.map((metric) => {
              const active = data.metric === metric.id;
              return (
                <Link
                  key={metric.id}
                  href={adminHref('pages', range, { category: data.category, metric: metric.id })}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    active
                      ? 'bg-ios-label text-white'
                      : 'bg-ios-fill text-ios-secondary hover:text-ios-label'
                  }`}
                >
                  {metric.label}
                </Link>
              );
            })}
          </div>
        </div>
      </Card>

      {!data.hasData ? (
        <EmptyState
          title="No page data in this range"
          description="Page and project performance will appear here after visitors browse the portfolio. Try a wider date range."
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Most viewed projects" subtitle="Top 5 by page views">
          <ProjectRanking rows={data.mostViewed} metric="views" />
        </Card>
        <Card title="Most engaging projects" subtitle="Top 5 by average active time">
          <ProjectRanking rows={data.mostEngaging} metric="engagement" />
        </Card>
      </div>

      <Card
        title="Project performance"
        subtitle="Views, unique visitors and the interactions each project receives"
      >
        <DataTable
          columns={[
            { key: 'project', label: 'Project' },
            { key: 'category', label: 'Category' },
            { key: 'views', label: 'Views', align: 'right' },
            { key: 'visitors', label: 'Visitors', align: 'right' },
            { key: 'engagement', label: 'Avg. time', align: 'right' },
            { key: 'clicks', label: 'Card clicks', align: 'right' },
            { key: 'scroll', label: 'Scroll', align: 'right' },
            { key: 'external', label: 'External', align: 'right' },
            { key: 'conversions', label: 'Conversions', align: 'right' },
          ]}
          emptyLabel="No project views in this range."
          rows={data.projects.map((project) => ({
            project: (
              <div className="min-w-0">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-medium text-ios-label underline-offset-2 hover:underline"
                >
                  {project.name}
                </Link>
                <p className="mt-0.5 truncate font-mono text-[11px] text-ios-tertiary">{project.url}</p>
              </div>
            ),
            category: (
              <div className="flex flex-wrap gap-1">
                {project.categories.map((category) => (
                  <Pill key={category}>{category}</Pill>
                ))}
              </div>
            ),
            views: formatNumber(project.views),
            visitors: formatNumber(project.visitors),
            engagement: formatDuration(project.avgEngagementMs),
            clicks: formatNumber(project.cardClicks),
            scroll: project.scrollEvents > 0 ? formatPercent(project.scrollDepth) : '—',
            external: formatNumber(project.externalClicks),
            conversions: formatNumber(project.conversions),
          }))}
        />
        <MetricNote>
          Scroll is the average depth reached on project pages. Card clicks count clicks on project
          cards; external clicks count outbound links from a project page.
        </MetricNote>
      </Card>

      <Card title="Page performance" subtitle="All tracked pages in the selected range">
        <DataTable
          columns={[
            { key: 'page', label: 'Page' },
            { key: 'views', label: 'Views', align: 'right' },
            { key: 'visitors', label: 'Visitors', align: 'right' },
            { key: 'engagement', label: 'Avg. time', align: 'right' },
            { key: 'interactions', label: 'Interactions', align: 'right' },
            { key: 'conversions', label: 'Conversions', align: 'right' },
          ]}
          emptyLabel="No pages recorded in this range."
          rows={data.pages.map((page) => ({
            page: (
              <div className="min-w-0">
                <p className="font-medium text-ios-label">
                  {page.projectName ?? pageLabel(page.path)}
                </p>
                <p className="mt-0.5 truncate font-mono text-[11px] text-ios-tertiary">
                  {page.path}
                </p>
              </div>
            ),
            views: formatNumber(page.views),
            visitors: formatNumber(page.visitors),
            engagement: formatDuration(page.avgEngagementMs),
            interactions: formatNumber(page.interactions),
            conversions: formatNumber(page.conversions),
          }))}
        />
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Landing pages" subtitle="Where sessions begin">
          <Breakdown
            rows={data.landingPages}
            emptyLabel="No landing pages recorded yet."
            limit={10}
            renderLabel={(row) => (
              <span className="truncate" title={row.label}>
                {pageLabel(row.label)}
              </span>
            )}
          />
        </Card>
        <Card title="Exit pages" subtitle="Where the last page view in a session happened">
          <Breakdown
            rows={data.exitPages}
            emptyLabel="No exit pages recorded yet."
            limit={10}
            renderLabel={(row) => (
              <span className="truncate" title={row.label}>
                {pageLabel(row.label)}
              </span>
            )}
          />
        </Card>
      </div>

      <MetricNote>
        Unique visitors per page use anonymous browser IDs. Detailed project metrics begin when
        collection starts, so older page-view history may show views without engagement.
      </MetricNote>
    </div>
  );
}

function ProjectRanking({ rows, metric }: { rows: ProjectRow[]; metric: 'views' | 'engagement' }) {
  if (rows.length === 0) {
    return <p className="text-sm text-ios-tertiary">No project views in this range.</p>;
  }

  const max = Math.max(
    1,
    ...rows.map((row) => (metric === 'views' ? row.views : row.avgEngagementMs)),
  );

  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const value = metric === 'views' ? row.views : row.avgEngagementMs;
        return (
          <li key={row.slug}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <Link
                href={`/projects/${row.slug}`}
                className="min-w-0 truncate font-medium text-ios-label underline-offset-2 hover:underline"
              >
                {row.name}
              </Link>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-ios-tertiary">
                {metric === 'views' ? formatNumber(row.views) : formatDuration(row.avgEngagementMs)}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ios-fill">
              <div
                className="h-full rounded-full bg-ios-blue/70"
                style={{ width: `${Math.max(4, (value / max) * 100)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
