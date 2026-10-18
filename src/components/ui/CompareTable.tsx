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
    return <Check className="mx-auto size-4 text-blue-600" strokeWidth={3} />;
  }
  if (value === false || value == null) {
    return <Minus className="mx-auto size-4 text-gray-300" strokeWidth={3} />;
  }
  return <span className="text-sm text-gray-600">{value}</span>;
}

export function CompareTable({ columns, groups, className }: CompareTableProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-2/5 px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Features
              </th>
              {columns.map((column) => (
                <th
                  key={column.name}
                  className={cn(
                    'px-6 py-5 text-center text-sm font-bold tracking-tight',
                    column.highlight ? 'bg-blue-50/70 text-blue-700' : 'text-gray-900',
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
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th
                    colSpan={columns.length + 1}
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-100 last:border-0">
                    <th className="px-6 py-4 text-sm font-medium text-gray-700">{row.label}</th>
                    {columns.map((column, columnIndex) => (
                      <td
                        key={column.name}
                        className={cn(
                          'px-6 py-4 text-center',
                          column.highlight && 'bg-blue-50/40',
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {group.title}
            </h3>
            {group.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="mb-3 text-sm font-semibold text-gray-900">{row.label}</p>
                <div className="flex flex-col gap-2">
                  {columns.map((column, columnIndex) => (
                    <div
                      key={column.name}
                      className="flex items-center justify-between gap-4 border-t border-gray-100 pt-2 first:border-0 first:pt-0"
                    >
                      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
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
