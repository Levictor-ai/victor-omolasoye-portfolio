import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/site/Reveal';
import { WorkCard } from '@/components/site/WorkCard';
import { defaultProfile } from '@/data/profile';
import { tracks, type WorkTrack } from '@/lib/work';
import type { ProjectData } from '@/types/project';

export function TrackIndexContent({
  track,
  projects,
}: {
  track: WorkTrack;
  projects: ProjectData[];
}) {
  const config = tracks[track];
  const otherTrack: WorkTrack = track === 'brand-design' ? 'product-design' : 'brand-design';
  const other = tracks[otherTrack];

  return (
    <>
      <Nav />
      <main>
        <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24 lg:px-12">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              {config.eyebrow}
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-ink">
                {config.title}
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg lg:pb-2">
                {config.intro}
              </p>
            </div>
          </Reveal>
        </header>

        <section
          aria-label={`${config.label} projects`}
          className="mx-auto max-w-[1400px] border-t border-line px-5 py-14 sm:px-8 sm:py-16 lg:px-12"
        >
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:gap-x-12">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={Math.min(index * 0.06, 0.24)}>
                <WorkCard project={project} track={track} priority={index < 2} />
              </Reveal>
            ))}
          </div>

          {projects.length === 0 && (
            <p className="text-sm text-ink-muted">Projects are being added soon.</p>
          )}
        </section>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <Link
            href={`/${otherTrack}`}
            className="group flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Also explore
              </p>
              <p className="mt-3 font-display text-4xl leading-[1] tracking-[-0.01em] text-ink sm:text-6xl">
                {other.label}
              </p>
            </div>
            <span className="flex items-center gap-3 text-sm text-ink-muted transition-colors group-hover:text-ink">
              View {other.shortLabel.toLowerCase()} work
              <span className="flex size-10 items-center justify-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <ArrowUpRight className="size-4" strokeWidth={1.6} />
              </span>
            </span>
          </Link>
        </section>
      </main>
      <SiteFooter profile={defaultProfile} />
    </>
  );
}
