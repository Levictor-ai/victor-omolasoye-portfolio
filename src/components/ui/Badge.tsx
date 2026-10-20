import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'accent' | 'subtle' | 'outline' | 'muted' | 'dark';
export type BadgeSize = 'sm' | 'md';

const BADGE_VARIANT: Record<BadgeVariant, string> = {
  accent: 'bg-ios-blue text-white border-transparent',
  subtle: 'bg-ios-blue/10 text-ios-blue border-transparent',
  outline: 'bg-white/70 text-ios-label border-ios-separator',
  muted: 'bg-ios-fill text-ios-secondary border-transparent',
  dark: 'bg-ios-label text-white border-transparent',
};

const BADGE_SIZE: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
};

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ children, variant = 'accent', size = 'md', icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1.5 rounded-full border font-ios font-medium leading-tight tracking-[-0.01em]',
        BADGE_VARIANT[variant],
        BADGE_SIZE[size],
        className,
      )}
    >
      {icon && <span className="inline-flex text-[1.1em]">{icon}</span>}
      {children}
    </span>
  );
}

export interface EyebrowProps {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}

export function Eyebrow({ children, accent = false, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-ios font-semibold uppercase tracking-[0.08em]',
        accent ? 'text-ios-blue' : 'text-ios-tertiary',
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface ChipProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function Chip({ children, icon, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-ios-separator bg-ios-fill px-3 py-1 text-xs font-ios font-medium leading-tight text-ios-secondary',
        className,
      )}
    >
      {icon && <span className="inline-flex text-[1.1em]">{icon}</span>}
      {children}
    </span>
  );
}
