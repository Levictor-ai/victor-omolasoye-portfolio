import type { HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export type CardVariant = 'default' | 'flat' | 'muted' | 'accent' | 'dark';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const CARD_VARIANT: Record<CardVariant, string> = {
  default: 'bg-white/80 border border-ios-separator backdrop-blur-xl',
  flat: 'bg-white border border-ios-separator',
  muted: 'bg-ios-fill border border-transparent',
  accent: 'bg-white/80 border border-ios-blue/30 backdrop-blur-xl',
  dark: 'bg-ios-label border border-white/10 text-white',
};

const CARD_PADDING: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-5',
  md: 'p-6',
  lg: 'p-8 sm:p-10',
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  href?: string;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  href,
  className,
  ...rest
}: CardProps) {
  const classes = cn(
    'flex flex-col gap-4 rounded-ios-xl font-ios',
    CARD_VARIANT[variant],
    CARD_PADDING[padding],
    variant !== 'dark' && 'shadow-ios',
    hover &&
      'transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-ios-separator-strong hover:bg-white hover:shadow-ios-lg',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'group block')}>
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
