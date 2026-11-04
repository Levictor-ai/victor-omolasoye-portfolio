'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Smartphone, type Icon } from 'lucide-react';
import type { ProjectData } from '@/types/project';
import { projectInCategory } from '@/lib/projectCategories';

export type FilterValue = 'brand' | 'product';

export const projectCategories: {
  value: FilterValue;
  label: string;
  icon: Icon;
}[] = [
  { value: 'brand', label: 'Brand Design', icon: PenTool },
  { value: 'product', label: 'Product Design', icon: Smartphone },
];

function isFilterValue(value: string | null): value is FilterValue {
  return value === 'brand' || value === 'product';
}

export function useProjectFilter(projects: ProjectData[]) {
  const [activeCategory, setActiveCategory] = useState<FilterValue>('brand');

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('category');
    if (isFilterValue(param)) {
      setActiveCategory(param);
    } else {
      try {
        const stored = window.localStorage.getItem(`projectFilterCategory:${window.location.pathname}`);
        if (isFilterValue(stored)) setActiveCategory(stored);
      } catch {}
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(`projectFilterCategory:${window.location.pathname}`, activeCategory);
    } catch {}
  }, [activeCategory]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', activeCategory);
    window.history.replaceState({}, '', url.toString());
  }, [activeCategory]);

  useEffect(() => {
    const onPopState = () => {
      const param = new URLSearchParams(window.location.search).get('category');
      if (isFilterValue(param)) {
        setActiveCategory(param);
      } else {
        try {
          const stored = window.localStorage.getItem(`projectFilterCategory:${window.location.pathname}`);
          setActiveCategory(isFilterValue(stored) ? stored : 'brand');
        } catch {
          setActiveCategory('brand');
        }
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const pool = projects.filter((p) => !p.personal).sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const filtered = pool.filter((project) => projectInCategory(project, activeCategory));

  const activeLabel =
    projectCategories.find((category) => category.value === activeCategory)?.label ?? activeCategory;

  return { activeCategory, setActiveCategory, filtered, activeLabel };
}

export function ProjectFilterTabs({
  activeCategory,
  onChange,
  className = '',
}: {
  activeCategory: FilterValue;
  onChange: (value: FilterValue) => void;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center gap-1 overflow-x-auto rounded-full bg-ios-fill p-1 font-ios sm:inline-flex sm:w-auto sm:max-w-full ${className}`}
      role="group"
      aria-label="Filter projects by category"
    >
      {projectCategories.map((category) => {
        const isActive = activeCategory === category.value;
        const CategoryIcon = category.icon;
        return (
          <button
            key={category.value}
            onClick={() => onChange(category.value)}
            aria-pressed={isActive}
            className={`relative flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40 sm:flex-none sm:gap-2 sm:px-6 sm:py-3.5 sm:text-sm ${
              isActive ? 'text-white' : 'text-ios-secondary hover:text-ios-label'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="projectsCategoryToggle"
                className="absolute inset-0 rounded-full bg-ios-blue shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-6px_rgba(0,0,0,0.18)]"
                transition={{ type: 'spring', stiffness: 450, damping: 34 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <CategoryIcon className="hidden size-4 shrink-0 sm:block" strokeWidth={2.2} />
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ProjectFilterStatus({
  activeCategory,
  count,
}: {
  activeCategory: FilterValue;
  count: number;
}) {
  const label =
    projectCategories.find((category) => category.value === activeCategory)?.label ?? activeCategory;

  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 font-ios text-sm text-ios-secondary"
    >
      Showing {count} {label} {count === 1 ? 'project' : 'projects'}
    </motion.p>
  );
}
