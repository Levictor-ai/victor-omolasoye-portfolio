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
  'group relative flex h-full flex-col overflow-hidden rounded-ios-xl border border-ios-separator bg-white/80 font-ios shadow-ios backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ios-separator-strong hover:bg-white hover:shadow-ios-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40';

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const isUpcoming = !project.period;

  const cardContent = (
    <>
      {/* Cover Image */}
      <div className="relative m-1.5 mb-0 aspect-[16/10] overflow-hidden rounded-ios-lg bg-ios-fill">
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
          className="pointer-events-none absolute inset-0 rounded-ios-lg ring-1 ring-inset ring-ios-separator"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-ios-tertiary">
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
          <span className="ml-auto font-mono text-[11px] text-ios-quaternary">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title & subtitle */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ios-label transition-colors duration-300 group-hover:text-ios-blue">
            {project.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ios-secondary">{project.subtitle}</p>
        </div>

        {/* Role */}
        {project.role && (
          <p className="text-xs font-medium text-ios-tertiary">
            {project.role}
            {project.company ? ` @ ${project.company}` : ''}
          </p>
        )}

        {/* Tags + action */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech.name}
              className="rounded-full bg-ios-fill px-2.5 py-1 text-[11px] font-medium text-ios-secondary"
            >
              {tech.name}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="rounded-full bg-ios-fill px-2.5 py-1 text-[11px] font-medium text-ios-tertiary">
              +{project.techStack.length - 3}
            </span>
          )}
          {isUpcoming ? (
            <span className="ml-auto inline-flex shrink-0 items-center rounded-full bg-ios-fill px-3 py-1.5 text-[11px] font-medium text-ios-secondary">
              Coming soon
            </span>
          ) : (
            <span className="ml-auto inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-ios-fill text-ios-secondary transition-all duration-300 group-hover:bg-ios-blue group-hover:text-white group-hover:shadow-ios-button">
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
