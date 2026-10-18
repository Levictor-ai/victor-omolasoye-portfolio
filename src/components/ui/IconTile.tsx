import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type IconTileVariant = 'default' | 'soft' | 'accent' | 'ink';
export type IconTileSize = 'sm' | 'md' | 'lg';

const TILE_VARIANT: Record<IconTileVariant, string> = {
  default: 'bg-gray-50 text-gray-900 border border-gray-200',
  soft: 'bg-blue-50 text-blue-600 border border-blue-100',
  accent: 'bg-blue-600 text-white border border-transparent',
  ink: 'bg-gray-900 text-white border border-gray-800',
};

const TILE_SIZE: Record<IconTileSize, string> = {
  sm: 'size-10 rounded-xl',
  md: 'size-14 rounded-2xl',
  lg: 'size-16 rounded-2xl',
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
        'grid flex-none place-items-center',
        TILE_VARIANT[variant],
        TILE_SIZE[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
