'use client';

import { useState, useEffect, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { track } from '@/lib/analytics';
import { usePortfolio } from '@/context/PortfolioContext';
import type { ProfileData } from '@/context/PortfolioContext';
import type { ProjectData } from '@/types/project';
import { ProjectCard } from '@/components/ProjectCard';
import { projectInCategory } from '@/lib/projectCategories';
import { BackToTop } from '@/components/BackToTop';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { ButtonLink, buttonClass } from '@/components/ui/Button';
import { CtaSection } from '@/components/ui/CtaSection';
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



function ProjectFlowRow({
  projects,
  reverse,
  duration,
}: {
  projects: ProjectData[];
  reverse: boolean;
  duration: number;
}) {
  const loop = [...projects, ...projects];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-3 pr-3 ${
          reverse ? 'marquee-track-reverse' : 'marquee-track'
        }`}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {loop.map((project, i) => (
          <Link
            key={`${project.slug}-${i}`}
            href={`/projects/${project.slug}`}
            aria-hidden={i >= projects.length || undefined}
            tabIndex={i >= projects.length ? -1 : undefined}
            aria-label={i < projects.length ? `View ${project.title}` : undefined}
            className="group relative aspect-[4/3] w-[11.5rem] shrink-0 overflow-hidden rounded-ios-lg border border-white/70 bg-ios-fill shadow-ios sm:w-[13.5rem] xl:w-[12rem]"
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 184px, 216px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-3 pb-2.5 pt-6">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold leading-tight text-white">
                  {project.title}
                </p>
                <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.08em] text-white/65">
                  {project.role}
                </p>
              </div>
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProjectFlow({ projects }: { projects: ProjectData[] }) {
  const showcased = projects.filter((project) => project.coverImage).slice(0, 6);
  if (showcased.length === 0) return null;

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-ios-blue/20 to-ios-teal/20 blur-2xl"
        aria-hidden="true"
      />
      <div className="marquee-fade-x relative">
        <ProjectFlowRow projects={showcased} reverse={false} duration={46} />
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
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", var(--font-inter), system-ui, sans-serif',
        color: '#1C1C1E',
        fontWeight: 600,
        fontSize: 'clamp(2.75rem,6.5vw,5.25rem)',
        lineHeight: 1.02,
        letterSpacing: '-0.045em',
      }}
    >
      <span className="sr-only">
        I design products people understand, trust, and use. &mdash; Victor Omolasoye, Product
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

function HeroSection({ profile, projects }: { profile: ProfileData; projects: ProjectData[] }) {
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

  const heroProjects = [
    ...projects.filter((project) => projectInCategory(project, 'product')).slice(0, 3),
    ...projects.filter((project) => projectInCategory(project, 'brand')).slice(0, 3),
  ];

  return (
    <motion.section
      id="home"
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-hero flex min-h-[calc(100dvh-57px)] w-full flex-col justify-center pb-16 pt-10 lg:min-h-[calc(100vh-57px)] lg:py-0 lg:pb-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:gap-10 lg:px-12">
        <div>
          <motion.div variants={item}><AvailableBanner /></motion.div>
          <motion.div variants={item}>
            <div className="mb-3 flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-ios">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'top' }}
                  sizes="48px"
                  priority
                />
              </div>
              <p className="text-2xl font-normal tracking-tight text-ios-label sm:text-3xl">
                Hi, <TypewriterText text="I'm Victor Omolasoye" />
              </p>
            </div>
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
        </div>
        <motion.div variants={item} className="w-full">
          <ProjectFlow projects={heroProjects} />
        </motion.div>
      </div>
    </motion.section>
  );
}

function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  const { activeCategory, setActiveCategory, counts, filtered: filteredProjects, activeLabel } =
    useProjectFilter(projects);
  const visibleProjects = filteredProjects.slice(0, 5);

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {visibleProjects.map((project, i) => (
            <div key={project.slug} className="h-full">
              <ProjectCard project={project} index={i} compactPreview />
            </div>
          ))}
          <div className="h-full">
            <Link
              href="/projects"
              className="group flex h-full min-h-[260px] flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-ios-separator-strong bg-white/80 p-6 text-center shadow-ios transition-all duration-300 hover:-translate-y-1 hover:border-ios-blue/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-white text-ios-blue shadow-ios transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="size-5" strokeWidth={2.2} />
              </span>
              <span className="text-lg font-semibold text-ios-label">View all projects</span>
              <span className="text-sm text-ios-tertiary">
                See the full collection of work
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-body-md text-ios-tertiary">
          No projects in this category yet.
        </p>
      )}
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
          className="max-w-none w-full"
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
      <main className="min-h-screen">
        <HeroSection profile={profile} projects={projects} />
        <div className="w-full px-6 py-6 sm:py-8">
          <ProjectsSection projects={projects} />
          <HomeCtaSection />
        </div>
      </main>
      <SiteFooter profile={profile} />
      <BackToTop />
    </>
  );
}
