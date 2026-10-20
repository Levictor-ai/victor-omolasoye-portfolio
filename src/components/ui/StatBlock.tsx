import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type StatVariant = 'default' | 'dark' | 'accent';

const STAT_VARIANT: Record<StatVariant, string> = {
  default: 'text-ios-label',
  dark: 'text-white',
  accent: 'text-ios-blue',
};

export interface StatBlockProps {
  value: ReactNode;
  label: ReactNode;
  sublabel?: ReactNode;
  variant?: StatVariant;
  align?: 'left' | 'center';
  icon?: ReactNode;
  className?: string;
}

export function StatBlock({
  value,
  label,
  sublabel,
  variant = 'default',
  align = 'left',
  icon,
  className,
}: StatBlockProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 font-ios',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {icon && <span className="mb-1 text-ios-blue">{icon}</span>}
      <span
        className={cn(
          'font-ios text-5xl font-bold leading-none tracking-tight sm:text-6xl',
          STAT_VARIANT[variant],
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          'text-sm font-semibold',
          variant === 'dark' ? 'text-white/70' : 'text-ios-label',
        )}
      >
        {label}
      </span>
      {sublabel && (
        <span className={cn('text-sm', variant === 'dark' ? 'text-white/50' : 'text-ios-secondary')}>
          {sublabel}
        </span>
      )}
    </div>
  );
}

export interface StatGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatGrid({ children, columns = 3, className }: StatGridProps) {
  return (
    <div
      className={cn(
        'grid gap-x-8 gap-y-10 sm:grid-cols-2',
        columns === 3 && 'lg:grid-cols-3',
        columns === 4 && 'lg:grid-cols-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
