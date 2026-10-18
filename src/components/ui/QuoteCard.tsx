import type { ReactNode } from 'react';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/cn';

export type QuoteVariant = 'default' | 'accent' | 'dark';

const QUOTE_VARIANT: Record<QuoteVariant, string> = {
  default: 'bg-white border border-gray-200 shadow-sm',
  accent: 'bg-blue-50 border border-blue-100',
  dark: 'bg-gray-900 border border-gray-800 text-gray-100',
};

export interface QuoteCardProps {
  quote: ReactNode;
  name: string;
  role?: string;
  avatar?: { src: string; alt?: string };
  initials?: string;
  rating?: number;
  company?: string;
  metric?: { value: string; label: string };
  variant?: QuoteVariant;
  className?: string;
}

export function QuoteCard({
  quote,
  name,
  role,
  avatar,
  initials,
  rating,
  company,
  metric,
  variant = 'default',
  className,
}: QuoteCardProps) {
  const dark = variant === 'dark';

  return (
    <figure
      className={cn(
        'relative flex h-full flex-col gap-5 rounded-2xl p-6 sm:p-7',
        QUOTE_VARIANT[variant],
        className,
      )}
    >
      {rating ? (
        <div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn('size-4', i < rating ? 'fill-blue-600 text-blue-600' : 'text-gray-300')}
            />
          ))}
        </div>
      ) : (
        <Quote className={cn('size-7', dark ? 'text-blue-400' : 'text-blue-600')} />
      )}

      <blockquote
        className={cn(
          'flex-1 text-lg leading-relaxed',
          dark ? 'text-gray-200' : 'text-gray-700',
        )}
      >
        {quote}
      </blockquote>

      {metric && (
        <div className="flex items-baseline gap-2 border-t border-dashed border-current/15 pt-4">
          <span className={cn('font-display text-4xl leading-none', dark ? 'text-white' : 'text-gray-900')}>
            {metric.value}
          </span>
          <span className={cn('text-sm', dark ? 'text-gray-400' : 'text-gray-500')}>
            {metric.label}
          </span>
        </div>
      )}

      <figcaption className="flex items-center gap-3">
        <span className="relative grid size-11 flex-none place-items-center overflow-hidden rounded-full bg-blue-600 text-sm font-semibold text-white">
          {avatar ? (
            <Image src={avatar.src} alt={avatar.alt ?? name} fill className="object-cover" sizes="44px" />
          ) : (
            (initials ?? name.slice(0, 1).toUpperCase())
          )}
        </span>
        <span className="flex flex-col">
          <span className={cn('text-sm font-semibold', dark ? 'text-white' : 'text-gray-900')}>
            {name}
          </span>
          {(role || company) && (
            <span className={cn('text-xs', dark ? 'text-gray-400' : 'text-gray-500')}>
              {[role, company].filter(Boolean).join(' · ')}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
