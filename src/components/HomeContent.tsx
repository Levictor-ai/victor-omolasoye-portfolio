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

function HeroFrame({ avatar, name, priority = false }: { avatar: string; name: string; priority?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem] xl:max-w-[24rem]">
      <div
        className="pointer-events-none absolute -inset-8 rounded-[3.5rem] bg-gradient-to-br from-ios-blue/25 via-ios-purple/20 to-ios-teal/25 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.75rem] border-[6px] border-white bg-ios-fill shadow-ios-lg">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
          style={{ objectPosition: 'top' }}
          sizes="(max-width: 768px) 60vw, 24vw"
          priority={priority}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10"
          aria-hidden="true"
        />
        <div className="absolute inset-x-3 bottom-3 rounded-[1.4rem] border border-white/40 bg-white/25 px-4 py-3 backdrop-blur-2xl">
          <p className="text-sm font-semibold text-white drop-shadow-sm">{name}</p>
          <p className="text-xs text-white/80">Product Designer · Lagos, NG</p>
        </div>
      </div>

      <div
        className="absolute -right-4 top-8 w-[8.5rem] rounded-[1.4rem] border border-white/70 bg-white/75 p-3 font-ios shadow-ios backdrop-blur-2xl"
        style={{ animation: 'chip-sway 6s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ios-tertiary">
          Status
        </span>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-ios-green" />
          <span className="text-xs font-semibold text-ios-label">Open to work</span>
        </div>
      </div>

      <div
        className="absolute -left-5 bottom-20 flex items-center gap-2 rounded-[1.4rem] border border-white/70 bg-white/75 px-3 py-2.5 font-ios shadow-ios backdrop-blur-2xl"
        style={{ animation: 'chip-sway 7s ease-in-out 0.8s infinite' }}
        aria-hidden="true"
      >
        <span className="flex size-7 items-center justify-center rounded-[0.6rem] bg-ios-blue text-white shadow-ios-button">
          <PenTool className="size-3.5" strokeWidth={2.2} />
        </span>
        <span className="text-xs font-semibold text-ios-label">Design &amp; Code</span>
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
        fontWeight: 700,
        fontSize: 'clamp(2.75rem,6.5vw,5.25rem)',
        lineHeight: 1.02,
        letterSpacing: '-0.045em',
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
