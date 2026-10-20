'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, LayoutGrid, Mail, Palette, PenTool } from 'lucide-react';

const tabs = [
  { label: 'Home', href: '/', icon: Palette },
  { label: 'Work', href: '/projects', icon: LayoutGrid },
  { label: 'About', href: '/about', icon: PenTool },
  { label: 'Blog', href: '/blog', icon: FileText },
  { label: 'Contact', href: '/contact', icon: Mail },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Tab bar"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ios-separator bg-white/80 font-ios backdrop-blur-2xl md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;

          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-ios-sm py-1 text-[10px] font-medium transition-colors duration-150 active:opacity-60 ${
                  isActive ? 'text-ios-blue' : 'text-ios-tertiary'
                }`}
              >
                <Icon className="size-[22px]" strokeWidth={isActive ? 2.4 : 1.9} />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
