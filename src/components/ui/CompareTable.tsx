import { Fragment, type ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CompareColumn {
  name: string;
  highlight?: boolean;
}

export interface CompareRow {
  label: ReactNode;
  values: Array<ReactNode | boolean>;
}

export interface CompareGroup {
  title: string;
  rows: CompareRow[];
}

export interface CompareTableProps {
  columns: CompareColumn[];
  groups: CompareGroup[];
  className?: string;
}

function Cell({ value }: { value: ReactNode | boolean }) {
  if (value === true) {
    return <Check className="mx-auto size-4 text-ios-blue" strokeWidth={3} />;
  }
  if (value === false || value == null) {
    return <Minus className="mx-auto size-4 text-ios-quaternary" strokeWidth={3} />;
  }
  return <span className="text-sm text-ios-secondary">{value}</span>;
}

export function CompareTable({ columns, groups, className }: CompareTableProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="hidden overflow-hidden rounded-ios-xl border border-ios-separator bg-white/80 shadow-ios backdrop-blur-xl md:block">
        <table className="w-full table-fixed border-collapse text-left font-ios">
          <thead>
            <tr className="border-b border-ios-separator">
              <th className="w-2/5 px-6 py-5 text-xs font-semibold uppercase tracking-[0.08em] text-ios-tertiary">
                Features
              </th>
              {columns.map((column) => (
                <th
                  key={column.name}
                  className={cn(
                    'px-6 py-5 text-center text-sm font-bold tracking-tight',
                    column.highlight ? 'bg-ios-blue/5 text-ios-blue' : 'text-ios-label',
                  )}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.title}>
                <tr className="border-b border-ios-separator bg-ios-fill">
                  <th
                    colSpan={columns.length + 1}
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-ios-secondary"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-ios-separator last:border-0">
                    <th className="px-6 py-4 text-sm font-medium text-ios-label">{row.label}</th>
                    {columns.map((column, columnIndex) => (
                      <td
                        key={column.name}
                        className={cn(
                          'px-6 py-4 text-center',
                          column.highlight && 'bg-ios-blue/5',
                        )}
                      >
                        <Cell value={row.values[columnIndex]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-ios-tertiary">
              {group.title}
            </h3>
            {group.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="rounded-ios-lg border border-ios-separator bg-white/80 p-4 shadow-ios">
                <p className="mb-3 text-sm font-semibold text-ios-label">{row.label}</p>
                <div className="flex flex-col gap-2">
                  {columns.map((column, columnIndex) => (
                    <div
                      key={column.name}
                      className="flex items-center justify-between gap-4 border-t border-ios-separator pt-2 first:border-0 first:pt-0"
                    >
                      <span className="text-xs font-medium uppercase tracking-wide text-ios-tertiary">
                        {column.name}
                      </span>
                      <Cell value={row.values[columnIndex]} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
