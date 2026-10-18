import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: 'section' | 'div' | 'article' | 'aside';
  id?: string;
  container?: boolean;
  spaced?: boolean;
  gridLines?: boolean;
  noise?: boolean;
  className?: string;
}

export function Section({
  children,
  as: Tag = 'section',
  id,
  container = true,
  spaced = true,
  gridLines = false,
  noise = false,
  className,
  ...rest
}: SectionProps) {
  const Component = Tag as ElementType;

  return (
    <Component
      id={id}
      className={cn(
        'relative',
        spaced && 'py-16 sm:py-20',
        gridLines && 'fx-grid-lines',
        noise && 'fx-noise',
        className,
      )}
      {...rest}
    >
      {container ? (
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}
