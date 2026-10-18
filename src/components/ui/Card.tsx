import type { HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export type CardVariant = 'default' | 'flat' | 'muted' | 'accent' | 'dark';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const CARD_VARIANT: Record<CardVariant, string> = {
  default: 'bg-white border border-gray-200',
  flat: 'bg-white border border-gray-200',
  muted: 'bg-gray-50 border border-gray-200',
  accent: 'bg-white border border-blue-200',
  dark: 'bg-gray-900 border border-gray-800 text-gray-100',
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
    'flex flex-col gap-4 rounded-2xl',
    CARD_VARIANT[variant],
    CARD_PADDING[padding],
    variant !== 'dark' && 'shadow-sm',
    hover &&
      'transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_50px_-30px] hover:shadow-blue-900/30',
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
