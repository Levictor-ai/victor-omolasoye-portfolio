import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1.5 font-ios text-sm', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="text-ios-secondary transition-colors hover:text-ios-blue">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-ios-label' : 'text-ios-secondary'}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="size-3.5 text-ios-quaternary" />}
          </span>
        );
      })}
    </nav>
  );
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  makeHref: (page: number) => string;
  className?: string;
}

export function Pagination({ page, totalPages, makeHref, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const itemClass =
    'grid size-10 place-items-center rounded-full border font-ios text-sm font-medium transition-all duration-200 active:scale-95';

  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-center gap-2', className)}>
      <PageLink
        href={makeHref(page - 1)}
        disabled={page <= 1}
        className={itemClass}
        label="Previous page"
      >
        <ChevronRight className="size-4 rotate-180" />
      </PageLink>

      {pages.map((n) => (
        <PageLink
          key={n}
          href={makeHref(n)}
          current={n === page}
          className={itemClass}
          label={`Page ${n}`}
        >
          {n}
        </PageLink>
      ))}

      <PageLink
        href={makeHref(page + 1)}
        disabled={page >= totalPages}
        className={itemClass}
        label="Next page"
      >
        <ChevronRight className="size-4" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  children,
  disabled,
  current,
  className,
  label,
}: {
  href: string;
  children: ReactNode;
  disabled?: boolean;
  current?: boolean;
  className?: string;
  label: string;
}) {
  const classes = cn(
    className,
    current
      ? 'border-transparent bg-ios-blue text-white shadow-ios-button'
      : 'border-ios-separator bg-white/80 text-ios-secondary hover:border-ios-blue/30 hover:text-ios-blue',
    disabled && 'pointer-events-none opacity-40',
  );

  if (disabled) {
    return (
      <span aria-disabled="true" aria-label={label} className={classes}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={classes}>
      {children}
    </Link>
  );
}
