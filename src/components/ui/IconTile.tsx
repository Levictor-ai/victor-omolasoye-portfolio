import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type IconTileVariant = 'default' | 'soft' | 'accent' | 'ink';
export type IconTileSize = 'sm' | 'md' | 'lg';

const TILE_VARIANT: Record<IconTileVariant, string> = {
  default: 'bg-ios-fill text-ios-label border border-ios-separator',
  soft: 'bg-ios-blue/10 text-ios-blue border border-transparent',
  accent: 'bg-ios-blue text-white border border-transparent shadow-ios-button',
  ink: 'bg-ios-label text-white border border-transparent',
};

const TILE_SIZE: Record<IconTileSize, string> = {
  sm: 'size-10 rounded-ios',
  md: 'size-14 rounded-ios-lg',
  lg: 'size-16 rounded-ios-lg',
};

export interface IconTileProps {
  children: ReactNode;
  variant?: IconTileVariant;
  size?: IconTileSize;
  className?: string;
}

export function IconTile({ children, variant = 'default', size = 'md', className }: IconTileProps) {
  return (
    <span
      className={cn(
        'grid flex-none place-items-center transition-colors duration-200',
        TILE_VARIANT[variant],
        TILE_SIZE[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
