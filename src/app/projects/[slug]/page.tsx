import { notFound, redirect } from 'next/navigation';
import { getProject } from '@/lib/projects';
import { trackForCategory, workPath } from '@/lib/work';

export default async function LegacyProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  redirect(workPath(trackForCategory(project.category), project.slug));
}
