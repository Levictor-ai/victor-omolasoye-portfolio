import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { TrackIndexContent } from '@/components/site/TrackIndexContent';
import { breadcrumbSchema, collectionSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { getTrackProjects, isUpcoming, tracks, workPath } from '@/lib/work';

const track = 'brand-design' as const;
const config = tracks[track];

export const metadata: Metadata = pageMetadata({
  title: config.metaTitle,
  description: config.metaDescription,
  path: `/${track}`,
  keywords: config.keywords,
});

export default function BrandDesignPage() {
  const projects = getTrackProjects(track);
  const items = projects
    .filter((project) => !isUpcoming(project))
    .map((project) => ({
      name: project.title,
      path: workPath(track, project.slug),
    }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: config.label, path: `/${track}` },
          ]),
          collectionSchema({
            name: `${config.label} Portfolio`,
            description: config.metaDescription,
            path: `/${track}`,
            items,
          }),
        ]}
      />
      <TrackIndexContent track={track} projects={projects} />
    </>
  );
}
