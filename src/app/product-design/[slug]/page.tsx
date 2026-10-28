import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { CaseStudyView } from '@/components/site/CaseStudyView';
import { breadcrumbSchema, projectSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { getCaseStudies, getWorkProject, isUpcoming, tracks, workPath } from '@/lib/work';

const track = 'product-design' as const;
const config = tracks[track];

export function generateStaticParams() {
  return getCaseStudies(track).map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  const project = getWorkProject(track, slug);
  if (!project || isUpcoming(project)) return null;
  return project;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.title} — ${config.label} Case Study`,
    description: project.overview,
    path: workPath(track, project.slug),
    keywords: [project.title, config.label, ...project.techStack.map((item) => item.name)],
    image: project.coverImage,
  });
}

export default async function ProductCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: config.label, path: `/${track}` },
            { name: project.title, path: workPath(track, project.slug) },
          ]),
          projectSchema({ ...project, path: workPath(track, project.slug) }),
        ]}
      />
      <CaseStudyView project={project} track={track} />
    </>
  );
}
