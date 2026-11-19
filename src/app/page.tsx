import type { Metadata } from 'next';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { HomeContent } from '@/components/HomeContent';
import { JsonLd } from '@/components/JsonLd';
import { getAllProjects, getProject } from '@/lib/projects';
import { pageMetadata, site } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import { defaultProfile } from '@/data/profile';

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | ${site.role} in Lagos, Nigeria`,
  description: site.description,
  path: '/',
});

export default function HomePage() {
  const projects = getAllProjects();
  const showcase = getProject('docintel');
  return (
    <>
      <JsonLd data={faqSchema(defaultProfile.faqs)} />
      <PortfolioProvider>
        <HomeContent projects={projects} showcase={showcase} />
      </PortfolioProvider>
    </>
  );
}
