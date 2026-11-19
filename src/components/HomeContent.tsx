'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { track } from '@/lib/analytics';
import { usePortfolio } from '@/context/PortfolioContext';
import type { ProfileData } from '@/context/PortfolioContext';
import type { ProjectData } from '@/types/project';
import { ProjectCard } from '@/components/ProjectCard';
import { PersonalProjectCard } from '@/components/PersonalProjectCard';
import { HeroCoverCarousel } from '@/components/HeroCoverCarousel';
import { ShowcaseSection } from '@/components/ShowcaseSection';
import { projectInCategory } from '@/lib/projectCategories';
import { BackToTop } from '@/components/BackToTop';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { ButtonLink, buttonClass } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AboutCta } from '@/components/about/AboutCta';
import {
  useProjectFilter,
  ProjectFilterTabs,
  ProjectFilterStatus,
} from '@/components/ProjectFilter';

function TypewriterText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`typewriter ${className ?? ''}`}>
      <span className="typewriter-text">{text}</span>
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}



const HEADLINE = ['Designing', 'identities.', 'Building', 'experiences.'];
const HEADLINE_HIGHLIGHT = new Set<number>([]);

function HeroHeadline() {
  return (
    <h1
      className="mb-5 block w-full"
      style={{
        fontFamily:
          'var(--font-roboto), Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        color: '#101828',
        fontWeight: 600,
        fontSize: 'clamp(2.75rem,6.5vw,5.25rem)',
        lineHeight: 1.02,
        letterSpacing: '-0.018em',
      }}
    >
        <span className="sr-only">
          Designing identities. Building experiences. &mdash; Victor Omolasoye, Brand &amp; Product
          Designer
        </span>
      <span aria-hidden="true" className="block w-full text-balance">
        {HEADLINE.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={`hero-word mr-[0.28em] inline-block ${
              HEADLINE_HIGHLIGHT.has(i) ? 'text-ios-electric' : ''
            }`}
            style={{ animationDelay: `${0.16 + i * 0.055}s` }}
          >
            {word}
          </span>
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
  const heroProjects = [
    ...projects.filter((project) => projectInCategory(project, 'product')).slice(0, 3),
    ...projects.filter((project) => projectInCategory(project, 'brand')).slice(0, 3),
  ].filter((project, i, list) => list.findIndex((item) => item.slug === project.slug) === i);

  return (
    <section
      id="home"
      className="bg-hero flex min-h-[calc(100dvh-57px)] w-full flex-col pt-16 pb-16 lg:min-h-[calc(100vh-57px)] lg:pt-24 lg:pb-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-12 lg:px-12 xl:gap-16">
        <div className="min-w-0 lg:order-2">
          <div className="hero-rise" style={{ animationDelay: '0.02s' }}><AvailableBanner /></div>
          <div className="hero-rise" style={{ animationDelay: '0.07s' }}>
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
          </div>
          <div className="hero-rise" style={{ animationDelay: '0.1s' }}>
            <HeroHeadline />
          </div>
          <div className="hero-rise" style={{ animationDelay: '0.14s' }}>
            <p
              className="mb-7 w-full leading-snug tracking-tight text-ios-secondary"
              style={{ fontSize: 'clamp(1.05rem,1.4vw,1.3rem)' }}
            >
              <span className="font-semibold text-ios-label">
                Brand &amp; Product Designer
              </span>{' '}
              creating distinctive visual identities and intuitive digital products.
            </p>
          </div>
          <div
            className="hero-rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: '0.18s' }}
          >
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
          </div>
        </div>
        <div className="hero-rise w-full min-w-0 lg:order-1" style={{ animationDelay: '0.22s' }}>
          <HeroCoverCarousel projects={heroProjects} />
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  const { activeCategory, setActiveCategory, filtered: filteredProjects } = useProjectFilter(
    projects,
  );
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
        />
      </motion.div>
      <ProjectFilterStatus
        activeCategory={activeCategory}
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
              className="group flex h-full min-h-[260px] flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-ios-separator-strong bg-white/80 p-6 text-center shadow-ios transition-all duration-300 hover:-translate-y-1 hover:border-ios-electric/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-electric/40"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-white text-ios-electric shadow-ios transition-transform duration-300 group-hover:scale-110">
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

function PersonalProjectsSection({ projects }: { projects: ProjectData[] }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const personal = projects
    .filter((p) => p.personal)
    .sort((a, b) => Number(b.slug === 'token-forge') - Number(a.slug === 'token-forge'));

  if (personal.length === 0) return null;

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
        <SectionHeading title="Personal Projects" eyebrow="Built for the love of it" />
      </motion.div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {personal.map((project, i) => (
          <PersonalProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

export function HomeContent({
  projects,
  showcase,
}: {
  projects: ProjectData[];
  showcase?: ProjectData | null;
}) {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="min-h-screen">
        <HeroSection profile={profile} projects={projects} />
        <div className="mx-auto max-w-7xl px-6 py-6 sm:py-8 sm:px-8 lg:px-12">
          <ProjectsSection projects={projects} />
          {showcase && <ShowcaseSection project={showcase} />}
          <PersonalProjectsSection projects={projects} />
        </div>
        <AboutCta profile={profile} />
      </main>
      <SiteFooter profile={profile} />
      <BackToTop />
    </>
  );
}
