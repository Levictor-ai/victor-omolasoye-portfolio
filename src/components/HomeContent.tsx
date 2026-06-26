'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePortfolio } from '@/context/PortfolioContext';
import type { ProfileData } from '@/context/PortfolioContext';
import type { ProjectData } from '@/types/project';
import { ProjectCard } from '@/components/ProjectCard';
import { FAQAccordion } from '@/components/FAQAccordion';

function SkillBar({ label, value }: { label: string; value: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-200">{label}</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'rgba(148, 163, 184, 0.12)' }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${value}%`}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${value}%` : '0%', backgroundColor: '#818CF8' }}
        />
      </div>
    </div>
  );
}

function AnimatedTitle({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setFade(true);
      }, 200);
    }, 2500);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="mb-2">
      <span
        className={`inline-block text-2xl font-bold text-indigo-300 transition-opacity duration-200 sm:text-3xl ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {titles[index]}
      </span>
    </div>
  );
}

function HeroSection({ profile }: { profile: ProfileData }) {
  return (
    <section className="mb-14">
      <AvailableBanner />
      <h1 className="mb-2 text-display-md font-bold leading-[0.9] tracking-tight text-white sm:text-display-lg lg:text-display-xl">
        <span className="block">VICTOR</span>
        <span className="block">OMOLASOYE</span>
      </h1>
      <AnimatedTitle titles={profile.titles} />
      <p className="mb-4 max-w-2xl text-body-lg text-slate-300">
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
    <section id="articles" className="mb-16">
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
    <section className="mb-16">
      <h2 className="mb-5 text-heading-lg text-white">Skills & Expertise</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-label-sm uppercase tracking-wider text-indigo-400">
            Tools & Technologies
          </h3>
          <div className="space-y-3">
            {profile.toolSkills.map((skill) => (
              <SkillBar
                key={skill.name}
                label={skill.name}
                value={skill.percentage}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-label-sm uppercase tracking-wider text-emerald-400">
            Disciplines
          </h3>
          <div className="space-y-3">
            {profile.softSkills.map((skill) => (
              <SkillBar
                key={skill.name}
                label={skill.name}
                value={skill.percentage}
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
    <section id="about" className="mb-16">
      <h2 className="mb-6 text-heading-lg text-white">About Me</h2>
      <div className="card overflow-hidden p-0 sm:p-0">
        <div className="relative aspect-[16/9] w-full sm:aspect-[2/1]">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            className="object-cover"
            style={{ objectPosition: 'center 30%' }}
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
          <div className="mt-6 flex flex-wrap gap-3">
          {profile.socials.linkedin && (
            <LinkButton
              href={profile.socials.linkedin}
              label="LinkedIn"
              hoverColor="indigo"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </LinkButton>
          )}
          {profile.socials.contra && (
            <LinkButton
              href={profile.socials.contra}
              label="Contra"
              hoverColor="emerald"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 15.5c0 .828-.672 1.5-1.5 1.5H8c-.828 0-1.5-.672-1.5-1.5v-7c0-.828.672-1.5 1.5-1.5h8c.828 0 1.5.672 1.5 1.5v7z" />
              </svg>
            </LinkButton>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}

function LinkButton({
  href,
  label,
  hoverColor,
  children,
}: {
  href: string;
  label: string;
  hoverColor: 'indigo' | 'emerald';
  children: React.ReactNode;
}) {
  const hoverStyles = {
    indigo:
      'hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-300 focus-visible:ring-indigo-400/50',
    emerald:
      'hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300 focus-visible:ring-emerald-400/50',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg border border-slate-600/40 bg-slate-800/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all focus-visible:outline-none focus-visible:ring-2 ${hoverStyles[hoverColor]}`}
    >
      {children}
      {label}
    </a>
  );
}

function ExperienceSection({ profile }: { profile: ProfileData }) {
  if (profile.experience.length === 0) return null;

  return (
    <section id="experience" className="mb-16">
      <h2 className="mb-8 text-heading-lg text-white">Experience</h2>
      <div className="space-y-4">
        {profile.experience.map((exp, i) => (
          <div key={i} className="card p-4 sm:p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-heading-sm text-white">{exp.role}</h3>
                <p className="text-sm text-indigo-400">{exp.company}</p>
              </div>
              <span className="shrink-0 text-sm text-slate-500">{exp.period}</span>
            </div>
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
    enter: (dir: number) => ({ x: dir * 120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -120, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="mb-16">
      <h2 className="mb-6 text-heading-lg text-white">Testimonials</h2>
      <div className="relative mx-auto max-w-3xl overflow-hidden">
        <div className="relative h-[280px] sm:h-[240px]">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.blockquote
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col rounded-xl border border-slate-600/20 p-5 sm:p-6"
            >
              <svg
                className="mb-3 size-5 text-indigo-500/40"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="mb-6 flex-1 text-body-md leading-relaxed text-slate-300">
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
        </div>
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

function ProjectsSection({ projects }: { projects: ProjectData[] }) {
  return (
    <section id="projects" className="mb-16">
      <h2 className="mb-6 text-heading-lg text-white">Projects</h2>
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
    </section>
  );
}

function FAQSection({ profile }: { profile: ProfileData }) {
  if (profile.faqs.length === 0) return null;

  return (
    <section id="faq" className="mb-16">
      <h2 className="mb-6 text-heading-lg text-white">
        Frequently Asked Questions
      </h2>
      <FAQAccordion items={profile.faqs} />
    </section>
  );
}

function FooterSection({ profile }: { profile: ProfileData }) {
  return (
    <footer className="border-t border-slate-800/60 py-12 text-center">
      <div className="mb-4 flex justify-center gap-4">
        {profile.socials.linkedin && (
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        )}
        {profile.socials.contra && (
          <a
            href={profile.socials.contra}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
            aria-label="Contra"
          >
            Contra
          </a>
        )}
        <a
          href={`mailto:${profile.email}`}
          className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
        >
          Email
        </a>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
        >
          CV
        </a>
      </div>
      <p className="text-sm text-slate-600">
        &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}

export function HomeContent({ projects }: { projects: ProjectData[] }) {
  const profile = usePortfolio();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
      <HeroSection profile={profile} />
      <SkillsSection profile={profile} />
      <ProjectsSection projects={projects} />
      <AboutSection profile={profile} />
      <ExperienceSection profile={profile} />
      <ArticlesSection />
      <TestimonialsCarousel profile={profile} />
      <FAQSection profile={profile} />
      <FooterSection profile={profile} />
    </main>
  );
}
