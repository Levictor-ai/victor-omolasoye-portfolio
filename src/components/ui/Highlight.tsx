import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('ns-highlight', className)}>{children}</span>;
}
