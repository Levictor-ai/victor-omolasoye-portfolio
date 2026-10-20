'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, PenTool } from 'lucide-react';
import { track } from '@/lib/analytics';
import { usePortfolio } from '@/context/PortfolioContext';
import type { ProfileData } from '@/context/PortfolioContext';
import type { ProjectData } from '@/types/project';
import { ProjectCard } from '@/components/ProjectCard';
import { BackToTop } from '@/components/BackToTop';
import { Nav } from '@/components/Nav';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { SiteFooter } from '@/components/SiteFooter';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink, buttonClass } from '@/components/ui/Button';
import { CtaSection } from '@/components/ui/CtaSection';
import { QuoteCard } from '@/components/ui/QuoteCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  useProjectFilter,
  ProjectFilterTabs,
  ProjectFilterStatus,
} from '@/components/ProjectFilter';

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
        className="ml-[2px] inline-block w-[1.5px] bg-ios-label"
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
    <div className="group relative mx-auto aspect-[4/5] w-full max-w-[18rem] cursor-pointer sm:max-w-[21rem] xl:max-w-[24.5rem]">
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] border-2 border-ios-blue/70"
        style={{ animation: 'stroke-pulse 3s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] border-2 border-ios-blue/70"
        style={{ animation: 'stroke-pulse 3s ease-in-out 1.5s infinite' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-8 rounded-[2.75rem] border border-ios-separator"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-5 rounded-[2.25rem] border border-dashed border-ios-separator-strong"
        style={{ animation: 'spin-clock 40s linear infinite' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-3 rounded-[1.75rem] border border-ios-separator bg-white/50"
        aria-hidden="true"
      />

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border-4 border-white bg-ios-fill shadow-ios-lg transition-transform duration-500 ease-out group-hover:rotate-3 group-hover:scale-[1.06]">
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
          className="pointer-events-none absolute -inset-6 z-10 rounded-[2rem] border-2 border-dashed border-ios-blue/50"
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
        className="absolute -inset-2 z-10"
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
        className="absolute -right-3 -top-2 z-30 flex items-center gap-1.5 rounded-full border border-ios-separator bg-white px-3 py-1.5 shadow-ios"
        style={{ animation: 'chip-sway 5s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <PenTool className="size-3.5 text-ios-blue" strokeWidth={2.2} />
        <span className="text-xs font-semibold text-ios-label">Creative</span>
      </div>
      <div
        className="absolute -bottom-2 -left-3 z-30 flex items-center gap-1.5 rounded-full border border-ios-separator bg-white px-3 py-1.5 shadow-ios"
        style={{ animation: 'chip-sway 6s ease-in-out 0.6s infinite' }}
        aria-hidden="true"
      >
        <svg className="size-3 text-ios-blue" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <span className="text-xs font-semibold text-ios-label">Design Â· Code</span>
      </div>
    </div>
  );
}

const HEADLINE = ['I', 'design', 'products', 'people', 'understand,', 'trust,', 'and', 'use.'];
const HEADLINE_HIGHLIGHT = new Set([4, 5, 7]);

function HeroHeadline() {
  return (
    <h1
      className="mb-5 block w-full"
      style={{
        fontFamily: 'var(--font-jakarta), sans-serif',
        color: '#1C1C1E',
        fontWeight: 700,
        fontSize: 'clamp(2.5rem,6vw,4.75rem)',
        lineHeight: 1.04,
        letterSpacing: '-0.02em',
      }}
    >
      <span className="sr-only">
        I design products people understand, trust, and use. â€” Victor Omolasoye, Product
        Designer in Lagos, Nigeria
      </span>
      <span aria-hidden="true" className="block w-full text-balance">
        {HEADLINE.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className={`mr-[0.28em] inline-block ${
              HEADLINE_HIGHLIGHT.has(i) ? 'text-ios-blue' : ''
            }`}
            initial={{ opacity: 0, y: '0.4em' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
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
      className="bg-hero flex min-h-[calc(100dvh-57px)] flex-col justify-center pb-16 lg:min-h-[calc(100vh-57px)] lg:py-0 lg:pb-24"
    >
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
        <div>
          <motion.div variants={item}><AvailableBanner /></motion.div>
          <motion.div variants={item}>
              <p className="mb-3 text-2xl font-normal tracking-tight text-ios-label sm:text-3xl">
                Hi, <TypewriterText text="I'm Victor Omolasoye" />
              </p>
          </motion.div>
          <motion.div variants={item}>
            <HeroHeadline />
          </motion.div>
          <motion.div variants={item}>
            <p
              className="mb-7 w-full leading-snug tracking-tight text-ios-secondary"
              style={{ fontSize: 'clamp(1.05rem,1.4vw,1.3rem)' }}
            >
              <span className="font-semibold text-ios-label">
                Product Designer + AI-assisted builder
              </span>{' '}
              creating digital products, experiences, and brands.
            </p>
          </motion.div>
          <motion.div variants={item} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <ButtonLink
                href="/contact"
                onClick={() => track('cta_click', { location: 'hero', label: 'get_in_touch' })}
                className="w-full px-8 py-4 sm:w-auto sm:px-10"
              >
                Get in touch
              </ButtonLink>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('resume_click', { location: 'hero' })}
              className={buttonClass({ variant: 'outline', className: 'w-full px-8 py-4 sm:w-auto sm:px-10' })}
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
          <motion.div variants={item} className="mt-14 w-full lg:hidden">
            <HeroFrame avatar="/images/hero-portrait.jpg" name={profile.name} />
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
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ios-green opacity-75" />
        <span className="relative inline-flex size-3 rounded-full bg-ios-green" />
      </span>
      <span className="text-sm font-medium text-ios-label">
        Open to work
      </span>
    </div>
  );
}

function TestimonialsCarousel({ profile }: { profile: ProfileData }) {
  const items = profile.testimonials;
  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <section id="testimonials" className="mb-20">
      <SectionHeading display title="Testimonials" className="mb-10" />
      <div className="marquee-fade-x overflow-hidden">
        <div className="marquee-track flex w-max items-stretch gap-4 py-2 sm:gap-5">
          {loop.map((item, i) => (
            <div
              key={`${item.author}-${i}`}
              aria-hidden={i >= items.length || undefined}
              className="w-[82vw] max-w-[470px] shrink-0"
            >
              <QuoteCard
                quote={<>&ldquo;{item.quote}&rdquo;</>}
                name={item.author}
                role={item.role}
                company={item.company}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  const { activeCategory, setActiveCategory, counts, filtered: filteredProjects, activeLabel } =
    useProjectFilter(projects);
  const visibleProjects = filteredProjects.slice(0, 4);

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
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-6"
      >
        <SectionHeading title="Selected Work" eyebrow="Featured Projects" />
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
        }}
        className="mb-6"
      >
        <ProjectFilterTabs
          activeCategory={activeCategory}
          onChange={setActiveCategory}
          counts={counts}
        />
      </motion.div>
      <ProjectFilterStatus
        activeCategory={activeCategory}
        activeLabel={activeLabel}
        count={filteredProjects.length}
      />
      {filteredProjects.length > 0 ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/projects"
              className="group flex h-full min-h-[260px] flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-ios-separator-strong bg-white/60 p-6 text-center shadow-ios backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-ios-blue/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-white text-ios-blue shadow-ios transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="size-5" strokeWidth={2.2} />
              </span>
              <span className="text-lg font-semibold text-ios-label">View all projects</span>
              <span className="text-sm text-ios-tertiary">
                See the full collection of work
              </span>
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <p className="text-body-md text-ios-tertiary">
          No projects in this category yet.
        </p>
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
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-8"
      >
        <SectionHeading title="Frequently Asked Questions" />
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
        }}
      >
        <Accordion items={profile.faqs} variant="card" />
      </motion.div>
    </motion.section>
  );
}

function HomeCtaSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="mb-20"
    >
      <motion.div variants={fadeUp}>
        <CtaSection
          variant="accent"
          eyebrow="Get in touch"
          title="Let&rsquo;s build something"
          lead="Have an idea? Let&rsquo;s turn it into something people understand, trust, and use."
          actions={
            <ButtonLink
              href="/contact"
              variant="light"
              onClick={() => track('cta_click', { location: 'home_cta', label: 'get_in_touch' })}
              className="px-8 py-4"
            >
              Get in touch
            </ButtonLink>
          }
        />
      </motion.div>
    </motion.section>
  );
}

export function HomeContent({ projects }: { projects: ProjectData[] }) {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-6 sm:py-8 sm:px-8 lg:px-12">
        <HeroSection profile={profile} />
        <ProjectsSection projects={projects} />
        <AboutSection profile={profile} />
        <ExperienceTimeline
          profile={profile}
          eyebrow="Where I’ve worked"
          headingClassName="mb-1 text-heading-lg font-bold tracking-tight text-ios-label"
        />
        <TestimonialsCarousel profile={profile} />
        <FAQSection profile={profile} />
        <HomeCtaSection />
      </main>
      <SiteFooter profile={profile} />
      <BackToTop />
    </>
  );
}
