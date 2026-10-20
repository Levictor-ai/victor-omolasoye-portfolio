'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';
import { track } from '@/lib/analytics';
import type { ProjectData } from '@/types/project';

interface PersonalProjectCardProps {
  project: ProjectData;
  index?: number;
}

export function PersonalProjectCard({ project, index = 0 }: PersonalProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const isUpcoming = !project.period;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        onClick={() => track('project_open', { project: project.slug })}
        className="group relative grid overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white/85 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-24px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.08] hover:bg-white md:grid-cols-[2fr_5fr]"
      >
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden bg-white md:aspect-auto md:min-h-[150px]">
          {project.coverImage && !imgError ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className={`object-cover transition-transform duration-300 ${isUpcoming ? '' : 'group-hover:scale-105'}`}
              sizes="(max-width: 768px) 100vw, 40vw"
              onError={() => setImgError(true)}
            />
          ) : null}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(ellipse at center, ${project.color ?? '#1A1A1A'}33 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col p-5 sm:p-6">
          {/* Meta */}
          <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {project.period}
            </span>
            {project.regions.length > 0 && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {project.regions[0]}
                {project.regions.length > 1 && ` +${project.regions.length - 1}`}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-1 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="mb-2 text-sm text-gray-500">{project.subtitle}</p>

          {/* Overview */}
          <p className="mb-3 line-clamp-2 text-body-md leading-relaxed text-gray-600">
            {project.overview}
          </p>

          {/* Tags + action */}
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech.name}
                className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-gray-600"
              >
                {tech.name}
              </span>
            ))}
            {isUpcoming ? (
              <span className="ml-auto inline-flex shrink-0 items-center rounded-full bg-black/[0.04] px-3 py-1.5 text-[11px] font-medium text-gray-500">
                Coming soon
              </span>
            ) : (
              <span className="ml-auto inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-gray-500 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(37,99,235,0.35)]">
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}