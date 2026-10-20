import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface LogoTickerProps {
  items: Array<{ label: string; icon?: ReactNode }>;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const SPEED: Record<NonNullable<LogoTickerProps['speed']>, string> = {
  slow: '[animation-duration:60s]',
  normal: '[animation-duration:40s]',
  fast: '[animation-duration:24s]',
};

export function LogoTicker({ items, speed = 'normal', className }: LogoTickerProps) {
  const loop = [...items, ...items];

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]',
        className,
      )}
    >
      <div className={cn('flex w-max animate-logo-scroll items-center gap-12', SPEED[speed])}>
        {loop.map((item, index) => (
          <span
            key={index}
            className="flex flex-none items-center gap-2 font-ios text-base font-semibold text-ios-tertiary transition-colors hover:text-ios-secondary"
          >
            {item.icon}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
