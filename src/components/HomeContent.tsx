'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import type { ProfileData } from '@/context/PortfolioContext';
import type { ProjectData } from '@/types/project';
import { ProjectCard } from '@/components/ProjectCard';
import { FAQAccordion } from '@/components/FAQAccordion';

const levelColors: Record<string, { bg: string; text: string; dot: string }> = {
  Expert: { bg: 'bg-indigo-500/15', text: 'text-indigo-300', dot: 'bg-indigo-400' },
  Proficient: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', dot: 'bg-emerald-400' },
  Familiar: { bg: 'bg-slate-500/15', text: 'text-slate-400', dot: 'bg-slate-500' },
};

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(end / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-2xl font-bold text-white sm:text-3xl">
        {count}{suffix}
      </span>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="mb-24">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-lg border border-slate-700/30 bg-slate-800/30 p-2 text-center sm:p-4">
          <AnimatedCounter end={52} />
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">Clients</p>
        </div>
        <div className="rounded-lg border border-slate-700/30 bg-slate-800/30 p-2 text-center sm:p-4">
          <AnimatedCounter end={2000} suffix="+" />
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">Projects</p>
        </div>
        <div className="rounded-lg border border-slate-700/30 bg-slate-800/30 p-2 text-center sm:p-4">
          <AnimatedCounter end={99} suffix="%" />
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">Satisfied Clients</p>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ label, level }: { label: string; level: string }) {
  const colors = levelColors[level] ?? levelColors.Familiar;

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-slate-200">{label}</span>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${colors.bg} ${colors.text}`}>
        <span className={`size-1.5 rounded-full ${colors.dot}`} />
        {level}
      </span>
    </div>
  );
}

function AnimatedTitle({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<'visible' | 'exiting' | 'entering'>('visible');

  useEffect(() => {
    const interval = setInterval(() => {
      setState('exiting');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setState('entering');
        setTimeout(() => setState('visible'), 400);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="mb-2">
      <span
        className={`inline-block text-2xl font-bold text-indigo-300 transition-all duration-400 sm:text-3xl ${
          state === 'visible'
            ? 'opacity-100 translate-y-0'
            : state === 'exiting'
            ? 'opacity-0 -translate-y-2'
            : 'opacity-0 translate-y-2'
        }`}
        style={{
          transitionTimingFunction:
            state === 'exiting' ? 'cubic-bezier(0.4, 0, 1, 1)' : 'cubic-bezier(0, 0, 0.2, 1)',
        }}
      >
        {titles[index]}
      </span>
    </div>
  );
}

function HeroSection({ profile }: { profile: ProfileData }) {
  return (
    <section className="flex min-h-0 flex-col justify-center py-12 lg:min-h-[calc(100vh-57px)] lg:py-0">
      <AvailableBanner />
      <h1 className="mb-4 text-[clamp(3rem,15vw,10rem)] font-display leading-[0.85] tracking-tight text-white">
        <span className="block">VICTOR</span>
        <span className="block">OMOLASOYE</span>
      </h1>
      <AnimatedTitle titles={profile.titles} />
      <p className="mb-6 max-w-2xl text-body-lg text-slate-300">
        {profile.tagline}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
        >
          Hire Me
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </a>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-600/40 bg-transparent px-5 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Resume
        </a>
      </div>
    </section>
  );
}

function AvailableBanner() {
  return (
    <div className="mb-6 flex items-center gap-2.5">
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-3 rounded-full bg-emerald-400" />
      </span>
      <span className="text-sm font-medium text-emerald-400">
        Available for work
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
    <section id="articles" className="mb-20">
      <h2 className="mb-6 text-heading-lg text-white">Articles</h2>
      <div className="space-y-3">
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-3 p-4 transition-all hover:border-indigo-500/30 hover:bg-slate-800/30 sm:p-5"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-xs font-bold text-indigo-400">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-sm font-medium text-slate-200 transition-colors group-hover:text-indigo-300 sm:text-base">
              {article.title}
            </span>
            <svg
              className="size-4 shrink-0 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ profile }: { profile: ProfileData }) {
  return (
    <section id="skills" className="mb-20">
      <h2 className="mb-5 text-heading-lg text-white">Skills & Expertise</h2>
      <p className="mb-8 max-w-2xl text-body-md leading-relaxed text-slate-400">
        From discovery and strategy to visual execution and developer handoff, I bridge every phase of the product design lifecycle.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="mb-4 text-label-sm uppercase tracking-wider text-indigo-400">
            Core Disciplines
          </h3>
          <div className="space-y-3">
            {profile.coreDisciplines.map((skill) => (
              <SkillBar
                key={skill.name}
                label={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-label-sm uppercase tracking-wider text-emerald-400">
            Tools &amp; Software
          </h3>
          <div className="space-y-3">
            {profile.tools.map((skill) => (
              <SkillBar
                key={skill.name}
                label={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-label-sm uppercase tracking-wider text-violet-400">
            Technical &amp; Handoff
          </h3>
          <div className="space-y-3">
            {profile.technicalHandoff.map((skill) => (
              <SkillBar
                key={skill.name}
                label={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ profile }: { profile: ProfileData }) {
  return (
    <section id="about" className="mb-20">
      <h2 className="mb-6 text-heading-lg text-white">About Me</h2>
      <div className="card overflow-hidden p-0 sm:p-0">
        <div className="relative aspect-[4/5] w-full sm:aspect-[3/2]">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            className="object-cover"
            style={{ objectPosition: 'top' }}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent" />
        </div>
        <div className="p-5 sm:p-6">
          <div className="prose prose-invert max-w-none">
            {profile.about.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="mb-4 last:mb-0 text-body-md leading-relaxed text-slate-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
            >
              Hire Me
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </a>
          </div>
      </div>
      </div>
    </section>
  );
}

function ExperienceSection({ profile }: { profile: ProfileData }) {
  if (profile.experience.length === 0) return null;

  return (
    <section id="experience" className="mb-20">
      <h2 className="mb-6 text-heading-lg text-white">Experience</h2>
      <div className="space-y-2">
        {profile.experience.map((exp, i) => (
          <div key={i}>
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-right text-sm text-slate-200">{exp.role}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">{exp.company}</p>
            </div>
            <p className="text-xs text-slate-500">{exp.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsCarousel({ profile }: { profile: ProfileData }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const items = profile.testimonials;
  if (items.length === 0) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const variants = {
    initial: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="mb-20">
      <h2 className="mb-6 text-heading-lg text-white">Testimonials</h2>
      <div className="relative mx-auto overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.blockquote
            key={index}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex flex-col rounded-xl border border-slate-600/20 p-5 sm:p-6"
          >
            <svg
              className="mb-3 size-5 text-indigo-500/40"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
            <p className="mb-6 text-body-md leading-relaxed text-slate-300">
              &ldquo;{items[index].quote}&rdquo;
            </p>
            <footer>
              <cite className="not-italic">
                <span className="block text-sm font-medium text-white">
                  {items[index].author}
                </span>
                <span className="text-sm text-slate-500">
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
              className={`size-2 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 bg-indigo-400'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ projects, behanceUrl }: { projects: ProjectData[]; behanceUrl?: string }) {
  return (
    <section id="projects" className="mb-20">
      <h2 className="mb-6 text-heading-lg text-white">Featured Projects</h2>
      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-body-md text-slate-500">
          No projects published yet.
        </p>
      )}
      {behanceUrl && (
        <a
          href={behanceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
        >
          View all projects on Behance
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      )}
    </section>
  );
}

function FAQSection({ profile }: { profile: ProfileData }) {
  if (profile.faqs.length === 0) return null;

  return (
    <section id="faq" className="mb-20">
      <h2 className="mb-6 text-heading-lg text-white">
        Frequently Asked Questions
      </h2>
      <FAQAccordion items={profile.faqs} />
    </section>
  );
}

function Nav({ avatar }: { avatar: string }) {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!showPreview) return;
    const close = () => setShowPreview(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [showPreview]);
  const links = [
    { label: 'Skills', href: '#skills', icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' },
    { label: 'Projects', href: '#projects', icon: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
    { label: 'About', href: '#about', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
    { label: 'Experience', href: '#experience', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
    { label: 'Articles', href: '#articles', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' },
    { label: 'Testimonials', href: '#testimonials', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { label: 'FAQ', href: '#faq', icon: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#0B0F19]/80 backdrop-blur-lg">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-8 lg:px-12">
        <button onClick={() => setShowPreview(true)} className="relative flex cursor-pointer items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-indigo-400/30" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-400/40" />
          <Image
            src={avatar}
            alt="Victor Omolasoye"
            width={32}
            height={32}
            className="relative size-8 rounded-full object-cover"
            style={{ objectPosition: 'top' }}
          />
        </button>
        {showPreview && (
          <div
            className="fixed left-0 top-0 z-[100] flex h-screen w-screen cursor-pointer items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
            onScroll={() => setShowPreview(false)}
          >
            <div className="relative size-48 overflow-hidden rounded-full border-4 border-indigo-500/30 shadow-2xl shadow-indigo-500/20 sm:size-64" onClick={(e) => e.stopPropagation()}>
              <Image
                src={avatar}
                alt="Victor Omolasoye"
                fill
                className="object-cover"
                style={{ objectPosition: 'top' }}
              />
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white"
          aria-label="Toggle navigation"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>
        <div className={`absolute right-4 top-full z-50 min-w-[200px] flex-col rounded-xl border border-slate-700/40 bg-gradient-to-b from-[#0B0F19] to-[#111827] p-3 shadow-xl ${
          open ? 'flex' : 'hidden'
        }`}>
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 shrink-0 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-indigo-400"
              >
                <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={link.icon} />
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 flex size-11 items-center justify-center rounded-full border border-slate-700/40 bg-slate-800/80 text-slate-400 shadow-lg backdrop-blur transition-all duration-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
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

  return (
    <section id="contact" className="mb-20">
      <h2 className="mb-6 text-heading-lg text-white">Get In Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full rounded-lg border border-slate-700/40 bg-slate-800/40 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-indigo-500"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full rounded-lg border border-slate-700/40 bg-slate-800/40 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-indigo-500"
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            required
            className="w-full rounded-lg border border-slate-700/40 bg-slate-800/40 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-400 disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'sent' && (
          <p className="text-center text-sm text-emerald-400">Message sent!</p>
        )}
      </form>
    </section>
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
    socials.github && {
      href: socials.github,
      label: 'GitHub',
      icon: (
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      ),
    },
  ].filter(Boolean) as { href: string; label: string; icon: ReactNode }[];

  return (
    <footer className="border-t border-slate-800/60 py-12 text-center">
      <div className="mb-6 flex items-center justify-center gap-5">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-indigo-400"
            aria-label={link.label}
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{link.icon}</svg>
          </a>
        ))}
      </div>
      <p className="mx-auto max-w-2xl text-balance text-sm leading-relaxed italic text-slate-400 sm:text-base">
        &ldquo;Good design is expensive because it&rsquo;s created with the most valuable resource we have&mdash;time, which is life.&rdquo;
      </p>
      <p className="mt-2 text-sm text-slate-500 sm:text-base">&mdash; Victor Omolasoye</p>
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
        <StatsSection />
        <SkillsSection profile={profile} />
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
