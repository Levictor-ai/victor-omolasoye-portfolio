'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const chapters = [
  { id: 'story', number: '01', label: 'The person' },
  { id: 'craft', number: '02', label: 'The craft' },
  { id: 'process', number: '03', label: 'The process' },
  { id: 'proof', number: '04', label: 'The proof' },
  { id: 'record', number: '05', label: 'The record' },
  { id: 'faq', number: '06', label: 'Questions' },
];

export function AboutReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-ios-electric"
      style={{ scaleX }}
    />
  );
}

export function AboutChapters() {
  const [active, setActive] = useState('story');

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -72% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[68px] z-40 border-b border-ios-separator bg-white/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-x-6 gap-y-2 overflow-x-auto px-6 py-3 sm:flex-wrap sm:overflow-visible sm:px-8 lg:px-12">
        <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-ios-tertiary sm:inline">
          On this page
        </span>
        {chapters.map((chapter) => {
          const isActive = active === chapter.id;
          return (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] transition-colors sm:text-xs ${
                isActive
                  ? 'font-semibold text-ios-electric'
                  : 'text-ios-secondary hover:text-ios-electric'
              }`}
            >
              <span
                className={`font-mono text-[10px] transition-colors ${
                  isActive ? 'text-ios-electric' : 'text-ios-quaternary group-hover:text-ios-electric'
                }`}
              >
                {chapter.number}
              </span>
              {chapter.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
