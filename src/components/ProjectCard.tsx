'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';
import type { ProjectData } from '@/types/project';

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/10 transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-800/30 hover:shadow-[0_0_30px_-5px] hover:shadow-indigo-500/10"
      >
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden bg-slate-800">
          {project.coverImage && !imgError ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30"
            style={{
              background: `radial-gradient(ellipse at center, ${project.color ?? '#6366f1'}33 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {project.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {project.regions[0]}
              {project.regions.length > 1 && ` +${project.regions.length - 1}`}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-indigo-300">
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="mb-3 text-sm text-slate-400">{project.subtitle}</p>

          {/* Role */}
          <p className="mb-3 text-xs text-slate-500">
            {project.role} @ {project.company}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech.name}
                className="rounded-full bg-slate-800/60 px-2.5 py-0.5 text-[11px] font-medium text-slate-400"
              >
                {tech.name}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-full bg-slate-800/60 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* CTA */}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition-colors group-hover:text-indigo-300">
            View Case Study
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
