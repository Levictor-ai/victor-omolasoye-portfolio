import { PortfolioProvider } from '@/context/PortfolioContext';
import { ProjectsContent } from '@/components/ProjectsContent';
import { getAllProjects } from '@/lib/projects';

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <PortfolioProvider>
      <ProjectsContent projects={projects} />
    </PortfolioProvider>
  );
}