'use client';

import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { ProjectLink } from '@/types/project';

export interface CaseStudyNavItem {
  id: string;
  label: string;
}

export interface CaseStudyMetaRow {
  label: string;
  value: string;
}

interface CaseStudySidebarProps {
  meta: CaseStudyMetaRow[];
  links: ProjectLink[];
  items: CaseStudyNavItem[];
}

export function CaseStudySidebar({ meta, links, items }: CaseStudySidebarProps) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-12% 0px -75% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-b border-gray-200 pb-6 sm:grid-cols-3 lg:block lg:space-y-5 lg:border-b-0 lg:pb-0">
        {meta.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-medium uppercase tracking-widest text-gray-400">
              {row.label}
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{row.value}</dd>
          </div>
        ))}
      </dl>

      {links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 lg:mt-8 lg:flex-col">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target={link.type !== 'case-study' ? '_blank' : undefined}
              rel={link.type !== 'case-study' ? 'noopener noreferrer' : undefined}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
              {link.label}
            </a>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <nav className="mt-8 hidden lg:block">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
            Contents
          </p>
          <ul className="border-l border-gray-200">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                    active === item.id
                      ? 'border-gray-900 font-medium text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
