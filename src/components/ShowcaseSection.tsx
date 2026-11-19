'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { ProjectData } from '@/types/project';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';

/**
 * A separate shelf for things that are not client or shipped project work —
 * early builds and experiments in progress. Currently showcases DocIntel.
 */
export function ShowcaseSection({ project }: { project: ProjectData }) {
  const live = project.links.find((link) => link.type === 'live');
  const caseStudyHref = `/showcase/${project.slug}`;

  return (
    <motion.section
      id="lab"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="mb-20 scroll-mt-28"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-6"
      >
        <SectionHeading title="In the Lab" eyebrow="Currently building" />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="overflow-hidden rounded-[2rem] bg-[#0F1115] text-white shadow-ios-lg"
      >
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-12 lg:p-12">
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 ring-1 ring-inset ring-white/10">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
                </span>
                In development
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                MVP
              </span>
            </div>

            <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h3>
            <p className="mt-2 text-lg text-white/80">{project.subtitle}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-white/55">
              {project.overview}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech.name}
                  className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/60"
                >
                  {tech.name}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={caseStudyHref} variant="light" className="gap-2">
                Read the case study
                <ArrowUpRight className="size-4" />
              </ButtonLink>
              {live && (
                <a
                  href={live.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <ExternalLink className="size-4" />
                  {live.label}
                </a>
              )}
            </div>
          </div>

          <Link
            href={caseStudyHref}
            aria-label={`View the ${project.title} case study`}
            className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={project.coverImage}
                alt={`${project.title} — ${project.subtitle}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-xs font-medium text-white/80">
              Product showcase
              <span className="inline-flex items-center gap-1 text-white">
                Case study
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}
