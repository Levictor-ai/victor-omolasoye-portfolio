'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, PenTool, Smartphone, type Icon } from 'lucide-react';
import type { ProjectData } from '@/types/project';

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
    brand: pool.filter((p) => p.category === 'brand').length,
    product: pool.filter((p) => p.category === 'product').length,
  };

  const filtered =
    activeCategory === 'all'
      ? pool
      : pool.filter((project) => project.category === activeCategory);

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
      className={`flex w-full items-center gap-1 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm sm:inline-flex sm:max-w-full sm:w-auto ${className}`}
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
            className={`relative flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 sm:flex-none sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
              isActive ? 'text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="projectsCategoryToggle"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <CategoryIcon className="hidden size-4 shrink-0 sm:block" strokeWidth={2.2} />
              {category.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                  isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
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
      className="mb-4 text-sm text-gray-500"
    >
      Showing {count} {activeLabel} {count === 1 ? 'project' : 'projects'}
    </motion.p>
  );
}
