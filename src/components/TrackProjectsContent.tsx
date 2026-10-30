'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { ProjectCard } from '@/components/ProjectCard';
import { SiteFooter } from '@/components/SiteFooter';
import { BackToTop } from '@/components/BackToTop';
import { Eyebrow } from '@/components/ui/Badge';
import { buttonClass } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { getOtherTrack, tracks, type Track, type TrackSlug } from '@/lib/tracks';
import { projectInCategory } from '@/lib/projectCategories';
import type { ProjectData } from '@/types/project';

const trackOrder: TrackSlug[] = ['brand', 'product'];

function TrackSwitch({ active }: { active: TrackSlug }) {
  return (
    <nav
      aria-label="Choose a focus"
      className="inline-flex items-center gap-1 rounded-ios bg-ios-fill p-1 font-ios"
    >
      {trackOrder.map((slug) => {
        const isActive = slug === active;
        return (
          <Link
            key={slug}
            href={`/${slug}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'rounded-[9px] px-3 py-1.5 text-xs font-semibold transition-colors duration-200 sm:text-sm',
              isActive
                ? 'bg-white text-ios-label shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-6px_rgba(0,0,0,0.18)]'
                : 'text-ios-secondary hover:text-ios-label',
            )}
          >
            {tracks[slug].label}
          </Link>
        );
      })}
      <Link
        href="/projects"
        className="rounded-[9px] px-3 py-1.5 text-xs font-semibold text-ios-secondary transition-colors duration-200 hover:text-ios-label sm:text-sm"
      >
        All work
      </Link>
    </nav>
  );
}

export function TrackProjectsContent({
  track,
  projects,
}: {
  track: Track;
  projects: ProjectData[];
}) {
  const profile = usePortfolio();
  const other = getOtherTrack(track);

  const focused = projects.filter((project) => projectInCategory(project, track.category));
  const focusedSlugs = new Set(focused.map((project) => project.slug));
  const crossOver = projects
    .filter(
      (project) =>
        projectInCategory(project, other.category) && !focusedSlugs.has(project.slug),
    )
    .slice(0, 3);

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-ios-secondary transition-colors hover:text-ios-label"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <Eyebrow accent>{track.eyebrow}</Eyebrow>
          <h1 className="mt-3 text-balance font-ios text-5xl font-bold leading-[1.02] tracking-tight text-ios-label sm:text-6xl">
            {track.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ios-secondary sm:text-xl">
            {track.lead}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {track.focus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-ios-separator bg-white/70 px-3 py-1 text-xs font-medium text-ios-secondary"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.header>

        <div className="mt-8">
          <TrackSwitch active={track.slug} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 max-w-3xl border-l-2 border-ios-blue/30 pl-4 text-sm leading-relaxed text-ios-secondary sm:text-base"
        >
          {track.intro}
        </motion.p>

        <section className="mt-14" aria-labelledby="track-projects">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2
                id="track-projects"
                className="font-ios text-2xl font-bold tracking-tight text-ios-label sm:text-3xl"
              >
                {track.label} work
              </h2>
              <p className="mt-1 text-sm text-ios-tertiary">
                {focused.length} {focused.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
          </div>

          {focused.length > 0 ? (
            <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3">
              {focused.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-ios-tertiary">No projects in this track yet.</p>
          )}
        </section>

        {crossOver.length > 0 && (
          <section className="mt-20" aria-labelledby="track-crossover">
            <div className="mb-6 max-w-2xl">
              <Eyebrow accent>Also in the other track</Eyebrow>
              <h2
                id="track-crossover"
                className="mt-2 font-ios text-2xl font-bold tracking-tight text-ios-label sm:text-3xl"
              >
                {track.slug === 'brand'
                  ? 'The identities, in product'
                  : 'The systems behind the brand'}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ios-secondary sm:text-base">
                {track.slug === 'brand'
                  ? 'These interfaces show the brand systems doing real work — the same type, colour and structure, applied to screens people use every day.'
                  : 'These brand systems are where the product language starts. Seeing both together shows how the visual decisions hold from identity through to interface.'}
              </p>
            </div>
            <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3">
              {crossOver.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href={`/${other.slug}`}
                className={buttonClass({ variant: 'outline' })}
              >
                View {other.label} track
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </section>
        )}
      </main>
      <SiteFooter profile={profile} />
      <BackToTop />
    </>
  );
}
