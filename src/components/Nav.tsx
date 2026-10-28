'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Projects', href: '/projects', id: 'projects', hiddenMobile: false },
  { label: 'About', href: '/about', id: 'about', hiddenMobile: false },
  { label: 'Blog', href: '/blog', id: 'blog', hiddenMobile: false },
  { label: 'Contact', href: '/contact', id: 'contact', hiddenMobile: false },
];

export function Nav({ avatar }: { avatar: string }) {
  const pathname = usePathname();
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (pathname === '/about') {
      setActive('about');
      return;
    }
    if (
      pathname === '/projects' ||
      pathname === '/brand' ||
      pathname === '/product'
    ) {
      setActive('projects');
      return;
    }
    if (pathname === '/contact') {
      setActive('contact');
      return;
    }
    if (pathname === '/blog' || pathname.startsWith('/blog/')) {
      setActive('blog');
      return;
    }
    setActive('home');

    const tracked = ['home', 'contact'];
    const sections = tracked
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-ios-separator bg-ios-grouped/80 font-ios backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-2.5 sm:px-8">
        <div className="relative flex w-auto items-center justify-between gap-3 rounded-full border border-ios-separator bg-white/80 px-3 py-2 shadow-ios backdrop-blur-xl sm:px-4 sm:py-2">
          <Link
            href="/#home"
            aria-label="Home"
            title="Home"
            className="flex shrink-0 items-center"
          >
            <Image
              src={avatar}
              alt="Victor Omolasoye"
              width={36}
              height={36}
              className="size-8 rounded-full object-cover ring-1 ring-ios-separator"
              style={{ objectPosition: 'top' }}
              priority
            />
          </Link>
          <div className="flex items-center gap-0.5">
            {links.map((link) => {
              const base = `shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
                link.hiddenMobile ? 'hidden md:block' : ''
              }`;
              return link.label === 'Contact' ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${base} bg-ios-blue text-white shadow-ios-button hover:bg-ios-bluePressed`}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${base} ${
                    active === link.id
                      ? 'bg-ios-fill text-ios-label'
                      : 'text-ios-secondary hover:bg-ios-fill hover:text-ios-label'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}