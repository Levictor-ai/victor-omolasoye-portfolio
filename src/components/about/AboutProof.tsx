'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Quote } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import type { ProjectData } from '@/types/project';
import { Reveal } from '@/components/ui/Reveal';
import { testimonialIdentity } from '@/lib/testimonial';

const selectedSlugs = ['payvo', 'bunkie-ui', 'veyra', 'hapnin'];

export function AboutProof({
  profile,
  projects,
}: {
  profile: ProfileData;
  projects: ProjectData[];
}) {
  const testimonials = profile.testimonials;
  const selected = selectedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is ProjectData => Boolean(project));

  if (testimonials.length === 0) return null;

  return (
    <section id="proof" className="scroll-mt-32 bg-[#F7F7FA]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
                The proof
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

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {testimonials.map((item, index) => {
            const identity = testimonialIdentity(item);
            return (
              <Reveal key={`${item.author}-${index}`} delay={0.04 * index}>
                <figure className="flex h-full flex-col rounded-ios-2xl border border-ios-ink/10 bg-white p-6 sm:p-7">
                  <Quote
                    className="size-6 text-ios-electric"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ios-ink sm:text-base">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-ios-separator pt-5">
                    <span className="relative size-10 overflow-hidden rounded-full bg-ios-fill">
                      {item.avatar ? (
                        <Image
                          src={item.avatar}
                          alt={identity.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <span className="grid h-full place-items-center text-xs font-semibold text-ios-secondary">
                          {identity.name.slice(0, 1)}
                        </span>
                      )}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ios-ink">
                        {identity.name}
                      </span>
                      <span className="block text-xs text-ios-tertiary">
                        {identity.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>

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
