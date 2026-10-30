'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, PenTool, Smartphone, type Icon } from 'lucide-react';
import type { ProjectData } from '@/types/project';
import { projectInCategory } from '@/lib/projectCategories';

export type FilterValue = 'all' | 'brand' | 'product';

export const projectCategories: {
  value: FilterValue;
  label: string;
  icon: Icon;
}[] = [
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'brand', label: 'Brand Design', icon: PenTool },
  { value: 'product', label: 'Product Design', icon: Smartphone },
];

function isFilterValue(value: string | null): value is FilterValue {
  return value === 'brand' || value === 'product';
}

export function useProjectFilter(projects: ProjectData[]) {
  const [activeCategory, setActiveCategory] = useState<FilterValue>('all');

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('category');
    if (isFilterValue(param)) setActiveCategory(param);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeCategory === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', activeCategory);
    }
    window.history.replaceState({}, '', url.toString());
  }, [activeCategory]);

  useEffect(() => {
    const onPopState = () => {
      const param = new URLSearchParams(window.location.search).get('category');
      setActiveCategory(isFilterValue(param) ? param : 'all');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const pool = projects.filter((p) => !p.personal);

  const counts = {
    all: pool.length,
    brand: pool.filter((p) => projectInCategory(p, 'brand')).length,
    product: pool.filter((p) => projectInCategory(p, 'product')).length,
  };

  const filtered =
    activeCategory === 'all'
      ? pool
      : pool.filter((project) => projectInCategory(project, activeCategory));

  const activeLabel =
    projectCategories.find((category) => category.value === activeCategory)?.label ?? 'All';

  return { activeCategory, setActiveCategory, counts, filtered, activeLabel };
}

export function ProjectFilterTabs({
  activeCategory,
  onChange,
  counts,
  className = '',
}: {
  activeCategory: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center gap-1 overflow-x-auto rounded-ios bg-ios-fill p-1 font-ios sm:inline-flex sm:w-auto sm:max-w-full ${className}`}
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
            className={`relative flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[9px] px-2 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40 sm:flex-none sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
              isActive ? 'text-ios-label' : 'text-ios-secondary hover:text-ios-label'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="projectsCategoryToggle"
                className="absolute inset-0 rounded-[9px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-6px_rgba(0,0,0,0.18)]"
                transition={{ type: 'spring', stiffness: 450, damping: 34 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <CategoryIcon className="hidden size-4 shrink-0 sm:block" strokeWidth={2.2} />
              {category.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                  isActive ? 'bg-ios-fill text-ios-secondary' : 'bg-ios-fill-strong text-ios-tertiary'
                }`}
              >
                {counts[category.value]}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ProjectFilterStatus({
  activeCategory,
  activeLabel,
  count,
}: {
  activeCategory: FilterValue;
  activeLabel: string;
  count: number;
}) {
  if (activeCategory === 'all') return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 font-ios text-sm text-ios-secondary"
    >
      Showing {count} {activeLabel} {count === 1 ? 'project' : 'projects'}
    </motion.p>
  );
}
