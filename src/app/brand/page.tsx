import type { Metadata } from 'next';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { TrackProjectsContent } from '@/components/TrackProjectsContent';
import { JsonLd } from '@/components/JsonLd';
import { getAllProjects } from '@/lib/projects';
import { breadcrumbSchema, collectionSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { getTrack } from '@/lib/tracks';

const track = getTrack('brand');

export const metadata: Metadata = pageMetadata({
  title: track.meta.title,
  description: track.meta.description,
  path: '/brand',
  keywords: track.meta.keywords,
});

export default function BrandTrackPage() {
  const projects = getAllProjects();
  const items = projects
    .filter((project) => project.category === 'brand')
    .map((project) => ({ name: project.title, path: `/projects/${project.slug}` }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/projects' },
            { name: 'Brand Design', path: '/brand' },
          ]),
          collectionSchema({
            name: 'Brand Design Portfolio',
            description: track.meta.description,
            path: '/brand',
            items,
          }),
        ]}
      />
      <PortfolioProvider>
        <TrackProjectsContent track={track} projects={projects} />
      </PortfolioProvider>
    </>
  );
}
