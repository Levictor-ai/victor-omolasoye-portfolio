import { PortfolioProvider } from '@/context/PortfolioContext';
import { ProjectsContent } from '@/components/ProjectsContent';
import { getAllProjects } from '@/lib/projects';

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <>
      <link rel="canonical" href="https://omolasoyevictor.com/projects" />
      <PortfolioProvider>
        <ProjectsContent projects={projects} />
      </PortfolioProvider>
    </>
  );
}