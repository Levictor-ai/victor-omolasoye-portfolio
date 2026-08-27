'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { ProjectCard } from '@/components/ProjectCard';
import { BackToTop } from '@/components/BackToTop';
import type { ProjectData } from '@/types/project';

export function ProjectsContent({ projects }: { projects: ProjectData[] }) {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main id="projects" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-1 text-heading-lg font-bold tracking-tight text-gray-900">
            Projects
          </h1>
          <p className="mb-8 text-label-sm uppercase tracking-wider text-gray-400">
            A selection of work I&rsquo;m proud of
          </p>
        </motion.div>
        {projects.length > 0 ? (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-500">No projects yet.</p>
        )}
      </main>
      <BackToTop />
    </>
  );
}