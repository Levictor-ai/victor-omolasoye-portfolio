import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { formatNumber, formatPercent, type Delta } from '@/lib/analytics-format';
import type { BreakdownRow } from '@/lib/analytics-store';

export function Card({
  title,
  subtitle,
  children,
  className = '',
  action,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <section
      className={`rounded-ios-xl border border-ios-separator bg-white/85 p-5 shadow-ios-soft backdrop-blur-xl sm:p-6 ${className}`}
    >
      {title || subtitle || action ? (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            {title ? (
              <h2 className="text-sm font-semibold tracking-[-0.01em] text-ios-label">{title}</h2>
            ) : null}
            {subtitle ? <p className="mt-0.5 text-xs text-ios-tertiary">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-ios-label sm:text-[1.7rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ios-secondary">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

const TONE: Record<Delta['tone'], string> = {
  up: 'bg-ios-green/10 text-ios-green',
  down: 'bg-ios-red/10 text-ios-red',
  flat: 'bg-ios-fill text-ios-tertiary',
  unknown: 'bg-ios-fill text-ios-tertiary',
};

export function DeltaBadge({ delta, label = 'vs previous period' }: { delta: Delta; label?: string }) {
  const symbol = delta.tone === 'up' ? '↑' : delta.tone === 'down' ? '↓' : '→';
  return (
    <span
      title={`${delta.label} ${label}`}
      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${TONE[delta.tone]}`}
    >
      {symbol} {delta.label}
    </span>
  );
}

export function InfoTip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex align-middle" tabIndex={0}>
      <Info size={13} className="text-ios-tertiary transition-colors group-hover:text-ios-secondary" />
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-56 -translate-x-1/2 rounded-ios border border-ios-separator bg-white p-3 text-left text-[11px] font-normal leading-relaxed text-ios-secondary opacity-0 shadow-ios-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

export function StatCard({
  label,
  value,
  description,
  delta,
  hint,
  note,
}: {
  label: string;
  value: string;
  description: string;
  delta?: Delta;
  hint?: string;
  note?: string;
}) {
  return (
    <div className="rounded-ios-xl border border-ios-separator bg-white/85 p-5 shadow-ios-soft backdrop-blur-xl">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
            {label}
          </p>
          {hint ? <InfoTip text={hint} /> : null}
        </div>
        {delta ? <DeltaBadge delta={delta} /> : null}
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ios-label">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-ios-secondary">{description}</p>
      {note ? <p className="mt-1 text-[11px] text-ios-tertiary">{note}</p> : null}
    </div>
  );
}

export function Breakdown({
  rows,
  emptyLabel,
  renderLabel,
  showPercent = true,
  limit,
}: {
  rows: BreakdownRow[];
  emptyLabel: string;
  renderLabel?: (row: BreakdownRow) => ReactNode;
  showPercent?: boolean;
  limit?: number;
}) {
  const visible = limit ? rows.slice(0, limit) : rows;
  if (visible.length === 0) {
    return <p className="text-sm text-ios-tertiary">{emptyLabel}</p>;
  }

  const max = Math.max(...visible.map((row) => row.count), 1);
  const total = visible.reduce((sum, row) => sum + row.count, 0);

  return (
    <ul className="space-y-3">
      {visible.map((row) => (
        <li key={row.label} className="text-sm">
          <div className="flex items-baseline justify-between gap-3">
            <div className="min-w-0 flex-1 text-ios-label">
              {renderLabel ? renderLabel(row) : <span className="truncate">{row.label}</span>}
            </div>
            <span className="shrink-0 text-xs font-semibold tabular-nums text-ios-tertiary">
              {formatNumber(row.count)}
              {showPercent && total > 0 ? ` · ${formatPercent((row.count / total) * 100)}` : ''}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ios-fill">
            <div
              className="h-full rounded-full bg-ios-blue/70"
              style={{ width: `${Math.max(4, (row.count / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-ios-xl border border-dashed border-ios-separator-strong bg-white/60 p-6 text-center sm:p-8">
      <p className="text-sm font-semibold text-ios-label">{title}</p>
      <p className="mx-auto mt-1.5 max-w-lg text-sm leading-relaxed text-ios-secondary">
        {description}
      </p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'blue' | 'green' | 'orange' | 'red';
}) {
  const tones = {
    neutral: 'bg-ios-fill text-ios-secondary',
    blue: 'bg-ios-blue/10 text-ios-blue',
    green: 'bg-ios-green/10 text-ios-green',
    orange: 'bg-ios-orange/10 text-ios-orange',
    red: 'bg-ios-red/10 text-ios-red',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'right';
}

export function DataTable({
  columns,
  rows,
  emptyLabel,
}: {
  columns: TableColumn[];
  rows: Array<Record<string, ReactNode>>;
  emptyLabel: string;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-ios-tertiary">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-ios-separator">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-2 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ios-tertiary ${
                  column.align === 'right' ? 'text-right' : ''
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-ios-separator last:border-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-2 py-3 align-top text-ios-secondary ${
                    column.align === 'right' ? 'text-right tabular-nums' : ''
                  }`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MetricNote({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[11px] leading-relaxed text-ios-tertiary">{children}</p>;
}
