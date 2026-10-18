import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface FooterProps {
  brand: { name: string; tagline?: string; href?: string; avatar?: string };
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  legal?: ReactNode;
  wordmark?: string;
  className?: string;
}

export function Footer({
  brand,
  columns = [],
  socials = [],
  legal,
  wordmark,
  className,
}: FooterProps) {
  return (
    <footer className={cn('border-t border-gray-200 bg-white', className)}>
      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="lg:grid lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-12">
          <div className="flex flex-col gap-4">
            <Link href={brand.href ?? '/'} className="flex w-fit items-center gap-3">
              {brand.avatar && (
                <Image
                  src={brand.avatar}
                  alt={brand.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover ring-1 ring-black/10"
                />
              )}
              <span className="text-lg font-bold tracking-tight text-gray-900">{brand.name}</span>
            </Link>
            {brand.tagline && (
              <p className="max-w-xs text-sm leading-relaxed text-gray-500">{brand.tagline}</p>
            )}
            {socials.length > 0 && (
              <div className="flex gap-2">
                {socials.map((social) => (
                  <Link
                    key={social.href}
                    href={social.href}
                    aria-label={social.label}
                    title={social.label}
                    className="grid size-10 place-items-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 lg:mt-0 lg:contents">
            {columns.map((column, index) => (
              <div
                key={column.title}
                className={cn(
                  'flex flex-col gap-3',
                  index === columns.length - 1 && 'col-span-2 sm:col-span-1 lg:col-span-1',
                )}
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-gray-200 pt-8 sm:mt-12">
          {wordmark && (
            <span
              aria-hidden="true"
              className="select-none font-display text-4xl font-bold leading-none tracking-wide text-gray-200 break-words sm:text-6xl lg:text-8xl"
            >
              {wordmark}
            </span>
          )}
          {legal && (
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
              {legal}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
