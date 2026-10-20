import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Badge';

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  display?: boolean;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  display = false,
  action,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex gap-6',
        action && !centered ? 'flex-col sm:flex-row sm:items-end sm:justify-between' : 'flex-col',
        centered && 'items-center text-center',
        className,
      )}
    >
      <div className={cn('flex max-w-3xl flex-col gap-3', centered && 'items-center')}>
        {eyebrow &&
          (typeof eyebrow === 'string' ? <Eyebrow accent>{eyebrow}</Eyebrow> : eyebrow)}
        <h2
          className={cn(
            'text-balance',
            display
              ? 'font-display text-6xl font-bold leading-none tracking-wide text-ios-label sm:text-7xl'
              : 'text-3xl font-bold tracking-tight text-ios-label sm:text-4xl',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {lead && (
          <p className="max-w-2xl text-lg leading-relaxed text-ios-secondary">{lead}</p>
        )}
      </div>
      {action && <div className={cn('flex-none', centered && 'mt-2')}>{action}</div>}
    </div>
  );
}
