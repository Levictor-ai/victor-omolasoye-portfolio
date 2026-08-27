'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/#home', id: 'home', hiddenMobile: true },
  { label: 'About', href: '/about', id: 'about', hiddenMobile: false },
  { label: 'Projects', href: '/projects', id: 'projects', hiddenMobile: false },
  { label: 'Contact', href: '/#contact', id: 'contact', hiddenMobile: false },
];

export function Nav({ avatar }: { avatar: string }) {
  const pathname = usePathname();
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (pathname === '/about') {
      setActive('about');
      return;
    }
    if (pathname === '/projects') {
      setActive('projects');
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
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-2.5 sm:px-8">
        <div className="relative flex w-auto items-center justify-between gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-lg shadow-gray-900/5 sm:px-4 sm:py-2">
          <Link
            href="/#home"
            className="flex shrink-0 items-center gap-2 text-sm font-bold tracking-tight text-gray-900"
          >
            <Image
              src={avatar}
              alt="Victor Omolasoye"
              width={32}
              height={32}
              className="size-7 rounded-full object-cover"
              style={{ objectPosition: 'top' }}
            />
            <span className="hidden md:inline">Victor Omolasoye</span>
          </Link>
          <div className="flex items-center gap-0.5">
            {links.map((link) => {
              const base = `shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                link.hiddenMobile ? 'hidden md:block' : ''
              }`;
              return link.label === 'Contact' ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${base} bg-gray-900 text-white hover:bg-black`}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${base} ${
                    active === link.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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