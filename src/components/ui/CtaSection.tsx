import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Badge';

export type CtaVariant = 'light' | 'dark' | 'accent';

const CTA_VARIANT: Record<CtaVariant, string> = {
  light: 'bg-white border border-gray-200 shadow-sm',
  dark: 'bg-gray-900 border border-gray-800',
  accent: 'bg-gradient-to-br from-blue-600 to-blue-700 border border-blue-500',
};

export interface CtaSectionProps {
  title: ReactNode;
  lead?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  note?: ReactNode;
  variant?: CtaVariant;
  className?: string;
}

export function CtaSection({
  title,
  lead,
  eyebrow,
  actions,
  note,
  variant = 'dark',
  className,
}: CtaSectionProps) {
  const dark = variant !== 'light';

  return (
    <div
      className={cn(
        'relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12',
        CTA_VARIANT[variant],
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow accent={variant === 'light'} className={dark ? 'text-blue-300' : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'text-balance font-display text-5xl font-bold leading-[0.95] tracking-wide sm:text-6xl',
          dark ? 'text-white' : 'text-gray-900',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn('max-w-xl text-lg leading-relaxed', dark ? 'text-gray-300' : 'text-gray-600')}>
          {lead}
        </p>
      )}
      {actions && <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>}
      {note && (
        <p className={cn('text-sm', dark ? 'text-gray-400' : 'text-gray-500')}>{note}</p>
      )}
    </div>
  );
}
