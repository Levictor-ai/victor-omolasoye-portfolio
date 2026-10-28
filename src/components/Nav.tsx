'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const workLinks = [
  {
    href: '/brand-design',
    label: 'Brand Design',
    description: 'Identity, visual systems and art direction',
  },
  {
    href: '/product-design',
    label: 'Product Design',
    description: 'Research, interfaces and digital products',
  },
];

const primaryLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Nav(_props: { avatar?: string } = {}) {
  const pathname = usePathname();
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);

  const onWorkRoute =
    pathname.startsWith('/brand-design') || pathname.startsWith('/product-design');

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setWorkOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setWorkOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (workRef.current && !workRef.current.contains(event.target as Node)) {
        setWorkOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[-0.01em] text-ink transition-opacity hover:opacity-60 sm:text-base"
        >
          Victor Omolasoye
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <div
            ref={workRef}
            className="relative"
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
          >
            <button
              type="button"
              aria-expanded={workOpen}
              aria-haspopup="true"
              aria-current={onWorkRoute ? 'true' : undefined}
              onClick={() => setWorkOpen((open) => !open)}
              className={cn(
                'flex items-center gap-1 text-sm transition-colors',
                onWorkRoute
                  ? 'text-ink underline decoration-ink/40 decoration-1 underline-offset-[7px]'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              Work
              <ChevronDown
                className={cn(
                  'size-3.5 transition-transform duration-200',
                  workOpen && 'rotate-180',
                )}
                strokeWidth={1.8}
              />
            </button>

            {workOpen && (
              <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4">
                <div className="overflow-hidden rounded-lg border border-line bg-paper-raised p-1.5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)]">
                  {workLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-start justify-between gap-3 rounded-md px-3 py-3 transition-colors hover:bg-paper-sunken"
                    >
                      <span>
                        <span className="block text-sm font-medium text-ink">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                          {link.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="mt-0.5 size-4 shrink-0 text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.6}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {primaryLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'text-sm transition-colors',
                  active
                    ? 'text-ink underline decoration-ink/40 decoration-1 underline-offset-[7px]'
                    : 'text-ink-muted hover:text-ink',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="-mr-2 flex size-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="size-5" strokeWidth={1.8} />
          ) : (
            <Menu className="size-5" strokeWidth={1.8} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-paper px-5 pb-8 pt-4 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            <p className="pb-2 text-xs font-medium uppercase tracking-[0.12em] text-ink-faint">
              Work
            </p>
            {workLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="flex items-center justify-between border-b border-line py-4 text-lg text-ink"
              >
                {link.label}
                <ArrowUpRight className="size-4 text-ink-faint" strokeWidth={1.6} />
              </Link>
            ))}
            <div className="mt-6 flex flex-col">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="border-b border-line py-4 text-lg text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
