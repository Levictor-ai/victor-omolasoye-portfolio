'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';
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
        className="group grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-black/20 hover:shadow-[0_0_30px_-12px] hover:shadow-black/[0.08] md:grid-cols-[2fr_5fr]"
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

          {/* Tags */}
          {project.techStack.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech.name}
                  className="rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-500"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-blue-600">
            {isUpcoming ? 'Coming Soon' : 'View Case Study'}
            {!isUpcoming && (
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}