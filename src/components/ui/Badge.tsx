import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'accent' | 'subtle' | 'outline' | 'muted' | 'dark';
export type BadgeSize = 'sm' | 'md';

const BADGE_VARIANT: Record<BadgeVariant, string> = {
  accent: 'bg-blue-600 text-white border-transparent',
  subtle: 'bg-blue-50 text-blue-700 border-blue-100',
  outline: 'bg-white text-gray-700 border-gray-300',
  muted: 'bg-gray-100 text-gray-600 border-transparent',
  dark: 'bg-gray-900 text-white border-transparent',
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
        'inline-flex w-fit items-center gap-1.5 rounded-full border font-medium leading-tight',
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
        'inline-block text-xs font-semibold uppercase tracking-wider',
        accent ? 'text-blue-600' : 'text-gray-400',
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
        'inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-black/[0.04] px-3 py-1 text-xs font-medium leading-tight text-gray-600',
        className,
      )}
    >
      {icon && <span className="inline-flex text-[1.1em]">{icon}</span>}
      {children}
    </span>
  );
}
