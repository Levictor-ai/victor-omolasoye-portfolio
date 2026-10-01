import type { Metadata } from 'next';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { ProjectsContent } from '@/components/ProjectsContent';
import { JsonLd } from '@/components/JsonLd';
import { getAllProjects } from '@/lib/projects';
import { breadcrumbSchema, collectionSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

const title = 'Design Portfolio & Project Case Studies | Product & Brand Designer';

const description =
  'Selected product design, UI/UX and brand design projects by Victor Omolasoye — case studies covering UX research, design systems, fintech, logistics and consumer apps built for Nigeria, Africa and global users.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/projects',
  keywords: [
    'design portfolio',
    'ui ux portfolio',
    'product design case study',
    'brand design projects',
    'ux case studies',
    'design agency portfolio nigeria',
  ],
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const items = projects.map((p) => ({ name: p.title, path: `/projects/${p.slug}` }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
          ]),
          collectionSchema({
            name: 'Design Portfolio',
            description,
            path: '/projects',
            items,
          }),
        ]}
      />
      <PortfolioProvider>
        <ProjectsContent projects={projects} />
      </PortfolioProvider>
    </>
  );
}
