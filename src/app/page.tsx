import { PortfolioProvider } from '@/context/PortfolioContext';
import { HomeContent } from '@/components/HomeContent';
import { getAllProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getAllProjects();
  return (
    <PortfolioProvider>
      <HomeContent projects={projects} />
    </PortfolioProvider>
  );
}
