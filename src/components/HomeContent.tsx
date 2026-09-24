'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import type { ProfileData } from '@/context/PortfolioContext';
import type { ProjectData, ProjectCategory } from '@/types/project';
import { ProjectCard } from '@/components/ProjectCard';
import { FAQAccordion } from '@/components/FAQAccordion';
import { BackToTop } from '@/components/BackToTop';
import { Nav } from '@/components/Nav';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { renderInline } from '@/lib/inline';

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      if (!deleting) {
        if (i < text.length) {
          i++;
          setDisplayedText(text.slice(0, i));
          timeout = setTimeout(step, 80);
        } else {
          timeout = setTimeout(() => {
            deleting = true;
            step();
          }, 1800);
        }
      } else {
        if (i > 0) {
          i--;
          setDisplayedText(text.slice(0, i));
          timeout = setTimeout(step, 40);
        } else {
          deleting = false;
          timeout = setTimeout(step, 500);
        }
      }
    };

    step();
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <span className={className}>
      {displayedText}
      <span
        className="ml-[2px] inline-block w-[1.5px] bg-gray-900"
        style={{ height: '1em', verticalAlign: 'text-bottom', animation: 'cursor-blink 1s step-end infinite' }}
      />
    </span>
  );
}

const PIXEL_COLORS: Record<string, string> = {
  '@': '#1f2937',
  's': '#f6c79b',
  'e': '#111827',
  'b': '#2563eb',
  'w': '#ffffff',
};

const PIXEL_MAP = [
  '..@@@@@@@..',
  '.@@@@@@@@@.',
  '@@@@@@@@@@@',
  '@@sssssss@@',
  '@@ssessess@',
  '@@sssssss@@',
  '@@sssssss@@',
  '@@@sssss@@@',
  '@bbbbbbbbb@',
  '.bbbbbbbbb.',
  '.bb...bbbb.',
  '.bb...wwbb.',
];

function PixelCharacter() {
  return (
    <span
      className="grid select-none"
      role="img"
      aria-label="Pixel designer character"
      style={{
        gridTemplateColumns: `repeat(${PIXEL_MAP[0].length}, 5px)`,
        imageRendering: 'pixelated',
      }}
    >
      {PIXEL_MAP.map((row, y) =>
        Array.from(row).map((cell, x) => (
          <span
            key={`${x}-${y}`}
            style={{
              width: 5,
              height: 5,
              backgroundColor: PIXEL_COLORS[cell] ?? 'transparent',
            }}
          />
        )),
      )}
    </span>
  );
}

function DesignCursor() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.5 3.2 19 9.4 12 11.6 9.8 16.6 5.5 3.2Z"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12.6 8.6V12.4M10.8 10.5H14.4" stroke="#111111" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HeroFrame({ avatar, name, priority = false }: { avatar: string; name: string; priority?: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[15rem] sm:max-w-[16rem] xl:max-w-[17.5rem]">
      <div
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-blue-600/70"
        style={{ animation: 'stroke-pulse 3s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-blue-600/70"
        style={{ animation: 'stroke-pulse 3s ease-in-out 1.5s infinite' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-8 rounded-full border border-gray-100"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-5 rounded-full border border-dashed border-gray-200/90"
        style={{ animation: 'spin-clock 40s linear infinite' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-3 rounded-full border border-gray-200/80 bg-white/50"
        aria-hidden="true"
      />

      <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-white bg-neutral-100 shadow-[0_24px_60px_-28px] shadow-black/[0.25]">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
          style={{ objectPosition: 'top' }}
          sizes="(max-width: 768px) 40vw, 20vw"
          priority={priority}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -inset-6 z-10 rounded-full border-2 border-dashed border-blue-600/50"
          style={{ animation: 'spin-counter 28s linear infinite' }}
          aria-hidden="true"
        />
      </div>

      <div
        className="absolute inset-0 z-20"
        style={{ animation: 'spin-clock 14s linear infinite' }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div style={{ animation: 'spin-counter 14s linear infinite' }}>
            <div style={{ animation: 'cursor-bob 3.2s ease-in-out infinite' }}>
              <DesignCursor />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -inset-4 z-10"
        style={{ animation: 'spin-counter 34s linear infinite' }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <div style={{ animation: 'spin-clock 34s linear infinite' }}>
            <div style={{ animation: 'pixel-hop 1.1s ease-in-out infinite' }}>
              <PixelCharacter />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -right-3 -top-2 z-30 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-md"
        style={{ animation: 'chip-sway 5s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <span className="grid grid-cols-2 gap-px" aria-hidden="true">
          <span className="size-1.5 bg-blue-600" />
          <span className="size-1.5 bg-blue-600" />
          <span className="size-1.5 bg-blue-600" />
          <span className="size-1.5 bg-blue-600" />
        </span>
        <span className="text-xs font-semibold text-gray-900">Figma</span>
      </div>
      <div
        className="absolute -bottom-2 -left-3 z-30 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-md"
        style={{ animation: 'chip-sway 6s ease-in-out 0.6s infinite' }}
        aria-hidden="true"
      >
        <svg className="size-3 text-blue-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <span className="text-xs font-semibold text-gray-900">Design · Code</span>
      </div>
    </div>
  );
}

function HeroSection({ profile }: { profile: ProfileData }) {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="home"
      variants={container}
      initial="hidden"
      animate="show"
      className="flex min-h-[calc(100dvh-57px)] flex-col justify-center py-8 pb-16 lg:min-h-[calc(100vh-57px)] lg:py-0 lg:pb-24"
    >
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.45fr_0.55fr] lg:gap-10 xl:gap-16">
        <div>
          <motion.div variants={item}><AvailableBanner /></motion.div>
          <motion.div variants={item}>
              <h1 className="mb-4 text-2xl font-normal tracking-tight text-gray-900 sm:text-3xl">
                Hi, <TypewriterText text="I'm Victor Omolasoye" />
              </h1>
          </motion.div>
          <motion.div variants={item} className="my-8 w-full lg:hidden">
            <HeroFrame avatar="/images/hero-portrait.jpg" name={profile.name} />
          </motion.div>
          <motion.div variants={item}>
            <span
              className="mb-4 block w-full font-semibold leading-[0.95] tracking-[-0.06em] text-gray-900"
              style={{
                fontFamily:
                  "var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: '#11131A',
              }}
            >
              <span aria-hidden="true" className="block w-full whitespace-nowrap text-[clamp(1.4rem,7vw,2.25rem)] sm:hidden">Designing ideas into</span>
              <span aria-hidden="true" className="block w-full whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-[clamp(1.4rem,7vw,2.25rem)] sm:hidden">identities, products,</span>
              <span aria-hidden="true" className="block w-full whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-[clamp(1.4rem,7vw,2.25rem)] sm:hidden">and experiences.</span>
              <span className="hidden w-full whitespace-nowrap text-[clamp(2.75rem,7vw,4.75rem)] sm:block lg:text-[clamp(2.9rem,5.8vw,5.5rem)]">Designing ideas into</span>
              <span className="hidden w-full whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-[clamp(2.75rem,7vw,4.75rem)] sm:block lg:text-[clamp(2.9rem,5.8vw,5.5rem)]">identities, products,</span>
              <span className="hidden w-full whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent text-[clamp(2.75rem,7vw,4.75rem)] sm:block lg:text-[clamp(2.9rem,5.8vw,5.5rem)]">and experiences.</span>
            </span>
          </motion.div>
          <motion.div variants={item}>
            <p className="mb-6 w-full text-xl font-normal leading-snug tracking-tight text-gray-900 sm:text-lg">
              Five years in, I&rsquo;m still fascinated by the same thing: taking something
              that exists only as an idea and figuring out what it could become.
            </p>
          </motion.div>
          <motion.div variants={item} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${profile.email}`}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 sm:w-auto sm:px-10 sm:py-3"
            >
              Hire Me
              <span className="flex size-9 items-center justify-center rounded-full bg-white -my-1 transition-transform group-hover:translate-x-0.5">
                <svg className="size-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-transparent px-8 py-4 text-sm font-medium text-gray-900 transition-colors hover:border-black/30 hover:bg-black/10 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 sm:w-auto sm:px-10 sm:py-3"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Resume
            </motion.a>
          </motion.div>
        </div>
        <motion.div variants={item} className="hidden w-full lg:block">
          <HeroFrame avatar="/images/hero-portrait.jpg" name={profile.name} priority />
        </motion.div>
      </div>
    </motion.section>
  );
}

function AvailableBanner() {
  return (
    <div className="mb-6 flex items-center gap-2.5">
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex size-3 rounded-full bg-green-500" />
      </span>
      <span className="text-sm font-medium text-gray-900">
        Open to work
      </span>
    </div>
  );
}

const articles = [
  {
    title:
      'Vibe Coding Has Changed How Software Gets Built',
    url: 'https://medium.com/@omolasoyevictorakinyemi/the-prd-in-vibe-coding-840594221458',
  },
  {
    title:
      'Design System Fundamentals: What They Really Are and Why They Matter',
    url: 'https://medium.com/@omolasoyevictorakinyemi/design-system-fundamentals-what-they-really-are-and-why-they-matter-08df08a9f2d3',
  },
  {
    title:
      'The Quiet Power of UX Writing: Why Microcopy Decides Whether Your Design Works',
    url: 'https://medium.com/@omolasoyevictorakinyemi/the-quiet-power-of-ux-writing-why-microcopy-decides-whether-your-design-works-0eb44fc72b55',
  },
  {
    title:
      'WCAG 2.1 Explained: What Every Product Designer Should Know About Accessibility',
    url: 'https://medium.com/@omolasoyevictorakinyemi/wcag-2-1-explained-what-every-product-designer-should-know-about-accessibility-534cc6fa665a',
  },
  {
    title:
      'Why Most Designers Fail at the Ideate Stage (A Product Designer\u2019s Perspective)',
    url: 'https://medium.com/@omolasoyevictorakinyemi/why-most-designers-fail-at-the-ideate-stage-a-product-designers-perspective-78f9ee120aad',
  },
  {
    title:
      'Scalability Starts on Paper: The Hidden Power of a PRD',
    url: 'https://medium.com/@omolasoyevictorakinyemi/scalability-starts-on-paper-the-hidden-power-of-a-prd-99720508a680',
  },
  {
    title: 'Typography Hierarchy',
    url: 'https://medium.com/@omolasoyevictorakinyemi/typography-hierarchy-cf2d6b619556',
  },
];

function ArticlesSection() {
  return (
    <motion.section
      id="articles"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="mb-20"
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-6 text-heading-lg font-bold tracking-tight text-gray-900"
      >
        Articles
      </motion.h2>
      <div className="space-y-3">
        {articles.map((article, i) => (
          <motion.a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="card flex items-center gap-3 p-4 shadow-none transition-colors hover:border-black/20 hover:bg-gray-50 sm:p-5"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-black/5 text-xs font-bold text-gray-900">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-sm font-medium text-gray-900 transition-colors group-hover:text-black sm:text-base">
              {article.title}
            </span>
            <svg
              className="size-4 shrink-0 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}

function TestimonialsCarousel({ profile }: { profile: ProfileData }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const items = profile.testimonials;
  if (items.length === 0) return null;

  const variants = {
    initial: (dir: number) => ({ x: dir * 90, opacity: 0, rotate: dir * 3 }),
    animate: { x: 0, opacity: 1, rotate: -1 },
    exit: (dir: number) => ({ x: dir * -90, opacity: 0, rotate: dir * -3 }),
  };

  return (
    <section id="testimonials" className="mb-20">
      <h2 className="mb-10 text-heading-lg font-bold tracking-tight text-gray-900">Testimonials</h2>
      <div className="relative mx-auto max-w-2xl lg:sticky lg:top-24">
        <div
          className="pointer-events-none absolute -inset-4 -z-10 rotate-2 rounded-md border border-gray-200 bg-white"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -inset-4 -z-10 -rotate-1 rounded-md border border-gray-200 bg-gray-50"
          aria-hidden="true"
        />
        <AnimatePresence custom={direction} mode="wait">
          <motion.blockquote
            key={index}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const threshold = 60;
              if (info.offset.x < -threshold) {
                setDirection(1);
                setIndex((prev) => (prev + 1) % items.length);
              } else if (info.offset.x > threshold) {
                setDirection(-1);
                setIndex((prev) => (prev - 1 + items.length) % items.length);
              }
            }}
            className="relative flex flex-col rounded-sm border border-gray-200 bg-white p-6 shadow-[0_24px_60px_-28px] shadow-black/[0.15] sm:p-8"
          >
            <div
              className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-3 border border-gray-200/70 bg-gray-100/90 shadow-sm"
              aria-hidden="true"
            />
            <svg
              className="mb-3 size-6 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
            <p className="mb-6 text-lg leading-relaxed text-gray-800 sm:text-xl">
              &ldquo;{items[index].quote}&rdquo;
            </p>
            <footer className="mt-auto border-t border-gray-200 pt-5">
              <cite className="not-italic">
                <span className="block text-sm font-semibold text-gray-900">
                  {items[index].author}
                </span>
                <span className="text-sm text-gray-500">
                  {items[index].role}
                  {items[index].company ? ` @ ${items[index].company}` : ''}
                </span>
              </cite>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === index ? 'h-2 w-6 bg-gray-900' : 'h-2 w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const projectCategories = [
  { value: 'all', label: 'All' },
  { value: 'brand', label: 'Brand Design' },
  { value: 'product', label: 'Product Design' },
] as const;

function ProjectsSection({ projects, behanceUrl }: { projects: ProjectData[]; behanceUrl?: string }) {
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all');

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('category');
    if (param === 'brand' || param === 'product') {
      setActiveCategory(param);
    }
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
      if (param === 'brand' || param === 'product') {
        setActiveCategory(param);
      } else {
        setActiveCategory('all');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const selectedProjects = projects.filter((p) => !p.personal);

  const filteredProjects =
    activeCategory === 'all'
      ? selectedProjects
      : selectedProjects.filter((project) => project.category === activeCategory);

  const activeLabel =
    projectCategories.find((category) => category.value === activeCategory)?.label ?? 'All';

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="mb-20"
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-1 text-heading-lg font-bold tracking-tight text-gray-900"
      >
        Selected Work
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05 } },
        }}
        className="mb-6 text-label-sm uppercase tracking-wider text-gray-400"
      >
        Featured Projects
      </motion.p>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
        }}
        className="mb-6"
      >
        <div className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-gray-200 bg-white p-1 shadow-sm">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category.value;
            return (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                aria-pressed={isActive}
                className={`relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                  isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="projectsCategoryToggle"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
      {activeCategory !== 'all' && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-sm text-gray-500"
        >
          Showing {filteredProjects.length} {activeLabel} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </motion.p>
      )}
      {filteredProjects.length > 0 ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-body-md text-gray-400">
          No projects in this category yet.
        </p>
      )}
      {behanceUrl && (
        <a
          href={behanceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-transparent px-5 py-4 text-sm font-medium text-gray-900 transition-colors hover:border-black/30 hover:bg-black/10 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
        >
          View all projects on Behance
          <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      )}
    </motion.section>
  );
}

function FAQSection({ profile }: { profile: ProfileData }) {
  if (profile.faqs.length === 0) return null;

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="mb-20"
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-6 text-heading-lg font-bold tracking-tight text-gray-900"
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
        }}
      >
        <FAQAccordion items={profile.faqs} />
      </motion.div>
    </motion.section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setStatus('sent');
      form.reset();
    } else {
      setStatus('idle');
    }
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={stagger}
      className="mb-20"
    >
      <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 shadow-xl shadow-blue-900/20 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-3 text-label-sm uppercase tracking-wider text-blue-100"
            >
              Get in touch
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-6 font-display text-6xl font-bold leading-[0.9] tracking-wide text-white sm:text-7xl"
            >
              Let&rsquo;s build something
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body-lg text-blue-50">
              {renderInline(
                'Have a project in mind, need a designer to bring an idea from **0 \u2192 1**, or just want to talk through a design or product challenge? **Let\u2019s talk.**',
                'font-semibold text-white',
              )}
            </motion.p>
          </div>
          <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-100 shadow-none outline-none transition-colors focus:border-white focus-visible:shadow-none focus-visible:ring-0"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-100 shadow-none outline-none transition-colors focus:border-white focus-visible:shadow-none focus-visible:ring-0"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                required
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-100 shadow-none outline-none transition-colors focus:border-white focus-visible:shadow-none focus-visible:ring-0"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-medium text-blue-700 transition-all hover:bg-blue-50 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && (
              <p className="text-center text-sm text-blue-50">Message sent!</p>
            )}
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}

function FooterSection({ socials }: { socials: ProfileData['socials'] }) {
  const socialLinks = [
    socials.linkedin && {
      href: socials.linkedin,
      label: 'LinkedIn',
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
    },
    socials.contra && {
      href: socials.contra,
      label: 'Contra',
      icon: (
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 15.5c0 .828-.672 1.5-1.5 1.5H8c-.828 0-1.5-.672-1.5-1.5v-7c0-.828.672-1.5 1.5-1.5h8c.828 0 1.5.672 1.5 1.5v7z" />
      ),
    },
    socials.behance && {
      href: socials.behance,
      label: 'Behance',
      icon: (
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      ),
    },
    socials.twitter && {
      href: socials.twitter,
      label: 'X',
      icon: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      ),
    },
    socials.medium && {
      href: socials.medium,
      label: 'Medium',
      icon: (
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
      ),
    },
    socials.github && {
      href: socials.github,
      label: 'GitHub',
      icon: (
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      ),
    },
  ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];

  return (
    <footer className="border-t border-gray-200 py-12 text-center">
      <div className="mb-6 flex items-center justify-center gap-5">
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 4 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 transition-colors hover:text-gray-900"
            aria-label={link.label}
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{link.icon}</svg>
          </motion.a>
        ))}
      </div>
      <p className="mx-auto max-w-2xl text-balance text-sm leading-relaxed italic text-gray-500 sm:text-base">
        &ldquo;Good design is expensive because it&rsquo;s created with the most valuable resource we have&mdash;time, which is life.&rdquo;
      </p>
      <p className="mt-2 text-sm text-gray-400 sm:text-base">&mdash; Victor Omolasoye</p>
      <p className="mt-6 text-xs text-gray-400">&copy; {new Date().getFullYear()} Victor Omolasoye. All rights reserved.</p>
    </footer>
  );
}

export function HomeContent({ projects }: { projects: ProjectData[] }) {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-6 sm:py-8 sm:px-8 lg:px-12">
        <HeroSection profile={profile} />
        <ProjectsSection projects={projects} behanceUrl={profile.socials.behance} />
        <AboutSection profile={profile} />
        <ExperienceSection profile={profile} />
        <ArticlesSection />
        <TestimonialsCarousel profile={profile} />
        <FAQSection profile={profile} />
        <ContactForm />
        <FooterSection socials={profile.socials} />
      </main>
      <BackToTop />
    </>
  );
}
