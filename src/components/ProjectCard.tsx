'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';
import { track } from '@/lib/analytics';
import type { ProjectData } from '@/types/project';

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
}

const CARD_CLASSES =
  'group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white/85 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-24px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.08] hover:bg-white hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_28px_60px_-28px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50';

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const isUpcoming = !project.period;

  const cardContent = (
    <>
      {/* Cover Image */}
      <div className="relative m-1.5 mb-0 aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-gray-100">
        {project.coverImage && !imgError ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-500 ${isUpcoming ? '' : 'group-hover:scale-[1.04]'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : null}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, ${project.color ?? '#1A1A1A'}33 0%, transparent 70%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-black/[0.05]"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {project.period && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-3" />
              {project.period}
            </span>
          )}
          {project.regions.length > 0 && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3" />
              {project.regions[0]}
              {project.regions.length > 1 && ` +${project.regions.length - 1}`}
            </span>
          )}
          <span className="ml-auto font-mono text-[11px] text-gray-300">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title & subtitle */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
            {project.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">{project.subtitle}</p>
        </div>

        {/* Role */}
        {project.role && (
          <p className="text-xs font-medium text-gray-400">
            {project.role}
            {project.company ? ` @ ${project.company}` : ''}
          </p>
        )}

        {/* Tags + action */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech.name}
              className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-gray-600"
            >
              {tech.name}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-gray-400">
              +{project.techStack.length - 3}
            </span>
          )}
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
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      {isUpcoming ? (
        <div className={CARD_CLASSES}>{cardContent}</div>
      ) : (
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          onClick={() => track('project_open', { project: project.slug })}
          className={CARD_CLASSES}
        >
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}
