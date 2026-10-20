import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Badge } from './Badge';

export interface PricingTierProps {
  name: string;
  tagline?: string;
  price: ReactNode;
  period?: string;
  features: ReactNode[];
  cta: ReactNode;
  featured?: boolean;
  tag?: string;
  savings?: string;
  footnote?: ReactNode;
  className?: string;
}

export function PricingTier({
  name,
  tagline,
  price,
  period,
  features,
  cta,
  featured = false,
  tag,
  savings,
  footnote,
  className,
}: PricingTierProps) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col gap-6 rounded-ios-xl border p-7 font-ios',
        featured
          ? 'border-ios-blue/30 bg-white shadow-ios-lg'
          : 'border-ios-separator bg-white/80 shadow-ios backdrop-blur-xl',
        className,
      )}
    >
      {tag && (
        <div className="absolute -top-3 left-7">
          <Badge variant={featured ? 'accent' : 'muted'}>{tag}</Badge>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-tight text-ios-label">{name}</h3>
        {tagline && <p className="text-sm text-ios-secondary">{tagline}</p>}
      </div>

      <div className="flex flex-col gap-1 border-y border-dashed border-ios-separator py-5">
        <div className="flex items-baseline gap-2">
          <span className="font-ios text-5xl font-bold leading-none tracking-tight text-ios-label">
            {price}
          </span>
          {period && <span className="text-sm text-ios-secondary">{period}</span>}
        </div>
        {savings && <span className="text-xs font-medium text-ios-green">{savings}</span>}
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2.5 text-sm text-ios-secondary">
            <Check className="mt-0.5 size-4 flex-none text-ios-blue" strokeWidth={2.6} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3">
        {cta}
        {footnote && <p className="text-center text-xs text-ios-tertiary">{footnote}</p>}
      </div>
    </div>
  );
}
