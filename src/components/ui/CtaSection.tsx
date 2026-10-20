import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Badge';

export type CtaVariant = 'light' | 'dark' | 'accent';

const CTA_VARIANT: Record<CtaVariant, string> = {
  light: 'bg-white/80 border border-ios-separator shadow-ios backdrop-blur-xl',
  dark: 'bg-ios-label border border-white/10',
    accent: 'bg-gradient-to-br from-ios-blue to-ios-bluePressed border border-ios-blue/40 shadow-ios-button',
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
        'relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-ios-2xl px-6 py-16 text-center font-ios sm:px-12',
        CTA_VARIANT[variant],
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow accent={variant === 'light'} className={dark ? 'text-white/70' : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'text-balance font-ios text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl',
          dark ? 'text-white' : 'text-ios-label',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn('max-w-xl text-lg leading-relaxed', dark ? 'text-white/75' : 'text-ios-secondary')}>
          {lead}
        </p>
      )}
      {actions && <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>}
      {note && (
        <p className={cn('text-sm', dark ? 'text-white/60' : 'text-ios-secondary')}>{note}</p>
      )}
    </div>
  );
}
