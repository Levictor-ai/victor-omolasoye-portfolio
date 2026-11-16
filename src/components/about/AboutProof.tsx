'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Quote } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import type { ProjectData } from '@/types/project';
import { Reveal } from '@/components/ui/Reveal';

const selectedSlugs = ['payvo', 'bunkie-ui', 'veyra', 'hapnin'];

function testimonialIdentity(item: ProfileData['testimonials'][number]) {
  if (item.author.trim().toLowerCase() === 'ceo' && item.company) {
    return { name: item.company, role: item.role };
  }
  return {
    name: item.author,
    role: [item.role, item.company].filter(Boolean).join(' · '),
  };
}

export function AboutProof({
  profile,
  projects,
}: {
  profile: ProfileData;
  projects: ProjectData[];
}) {
  const [featured, ...rest] = profile.testimonials;
  const selected = selectedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is ProjectData => Boolean(project));

  if (!featured) return null;

  const featuredIdentity = testimonialIdentity(featured);

  return (
    <section id="proof" className="scroll-mt-32 bg-[#F6F2EA]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
                04 &mdash; The proof
              </p>
              <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-ios-ink sm:text-4xl lg:text-5xl">
                Good work travels by word of mouth.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ios-secondary lg:justify-self-end">
              A few notes from the people I&rsquo;ve built with, and a small
              selection of the work those collaborations produced.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <figure className="relative mt-12 overflow-hidden rounded-ios-2xl border border-ios-ink/10 bg-white p-7 shadow-ios sm:p-10">
            <Quote
              className="size-8 text-ios-electric"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <blockquote className="mt-6 max-w-4xl font-ios text-lg leading-relaxed text-ios-ink sm:text-2xl lg:text-3xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-4 border-t border-ios-separator pt-5">
              <span className="relative size-12 overflow-hidden rounded-full bg-ios-electric">
                {featured.avatar ? (
                  <Image
                    src={featured.avatar}
                    alt={featuredIdentity.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <span className="grid h-full place-items-center text-sm font-semibold text-white">
                    {featuredIdentity.name.slice(0, 1)}
                  </span>
                )}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ios-ink">
                  {featuredIdentity.name}
                </span>
                <span className="block text-xs text-ios-tertiary">
                  {featuredIdentity.role}
                </span>
              </span>
              <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.16em] text-ios-tertiary">
                Featured note
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {rest.map((item, index) => {
              const identity = testimonialIdentity(item);
              return (
                <Reveal key={item.author} delay={0.05 * index}>
                  <figure className="flex h-full flex-col border-t border-ios-ink/15 pt-5">
                    <blockquote className="flex-1 text-sm leading-relaxed text-ios-secondary">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      <span className="relative size-9 overflow-hidden rounded-full bg-ios-fill">
                        {item.avatar ? (
                          <Image
                            src={item.avatar}
                            alt={identity.name}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        ) : (
                          <span className="grid h-full place-items-center text-xs font-semibold text-ios-secondary">
                            {identity.name.slice(0, 1)}
                          </span>
                        )}
                      </span>
                      <span>
                        <span className="block text-xs font-semibold text-ios-ink">
                          {identity.name}
                        </span>
                        <span className="block text-[11px] text-ios-tertiary">
                          {identity.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        )}

        {selected.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
                    Selected work
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-ios-ink sm:text-3xl">
                    A few things I&rsquo;ve made.
                  </h3>
                </div>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ios-electric"
                >
                  View all work
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {selected.map((project, index) => (
                <Reveal key={project.slug} delay={0.04 * index}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-electric/40"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-ios-xl border border-ios-separator bg-white">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute inset-x-4 bottom-4 text-white">
                        <p className="text-sm font-semibold">{project.title}</p>
                        <p className="mt-0.5 line-clamp-1 text-[11px] text-white/70">
                          {project.subtitle}
                        </p>
                      </div>
                      <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
