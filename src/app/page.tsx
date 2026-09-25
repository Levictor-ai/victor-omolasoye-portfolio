import { PortfolioProvider } from '@/context/PortfolioContext';
import { HomeContent } from '@/components/HomeContent';
import { getAllProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getAllProjects();
  return (
    <>
      <link rel="canonical" href="https://omolasoyevictor.com/" />
      <PortfolioProvider>
        <HomeContent projects={projects} />
      </PortfolioProvider>
    </>
  );
}
