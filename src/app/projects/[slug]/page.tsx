import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Users,
  Calendar,
  ArrowUpRight,
  CheckCircle,
  Quote,
  Layers,
  Server,
  Palette,
  Wrench,
} from 'lucide-react';
import type { ProjectData } from '@/types/project';
import { getProject, getSuggestedProjects } from '@/lib/projects';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, projectSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { ProjectCard } from '@/components/ProjectCard';
import { BackToTop } from '@/components/BackToTop';
import { CaseStudySidebar } from '@/components/CaseStudySidebar';
import type { CaseStudyNavItem, CaseStudyMetaRow } from '@/components/CaseStudySidebar';

export async function generateStaticParams() {
  const { getAllProjects } = await import('@/lib/projects');
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project' };

  const description =
    project.overview ||
    `${project.title} — ${project.subtitle}. A ${project.role.toLowerCase()} project by Victor Omolasoye covering ${project.techStack
      .slice(0, 4)
      .map((t) => t.name)
      .join(', ')}.`;

  const categoryLabel =
    project.category === 'product'
      ? 'Product Design'
      : project.category === 'brand'
        ? 'Brand Design'
        : 'Engineering';

  return pageMetadata({
    title: `${project.title} — ${project.subtitle} | ${categoryLabel} Case Study`,
    description,
    path: `/projects/${slug}`,
    image: project.coverImage,
    imageAlt: `${project.title} — ${project.subtitle} by Victor Omolasoye`,
    keywords: [
      project.title,
      project.subtitle,
      categoryLabel.toLowerCase(),
      `${project.title} case study`,
      ...project.techStack.map((t) => t.name.toLowerCase()),
    ],
  });
}

function techIcon(category: ProjectData['techStack'][number]['category']) {
  switch (category) {
    case 'frontend': return <Layers className="size-4" />;
    case 'backend':  return <Server className="size-4" />;
    case 'infra':    return <Server className="size-4" />;
    case 'design':   return <Palette className="size-4" />;
    case 'tools':    return <Wrench className="size-4" />;
  }
}

function categoryLabel(category: ProjectData['category']) {
  switch (category) {
    case 'product': return 'Product Design';
    case 'brand': return 'Brand Design';
    case 'engineering': return 'Engineering';
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getNavItems(project: ProjectData): CaseStudyNavItem[] {
  const items: CaseStudyNavItem[] = [];
  if (project.overview) items.push({ id: 'overview', label: 'Overview' });
  if (project.problem || project.solution)
    items.push({ id: 'problem', label: 'Problem & Solution' });
  if (project.targetAudience.length > 0 || project.regions.length > 0)
    items.push({ id: 'audience', label: 'Target & Reach' });
  if (project.features.length > 0) items.push({ id: 'features', label: 'Key Features' });
  if (project.techStack.length > 0) items.push({ id: 'stack', label: 'Tech Stack' });
  if (project.architecture.description || project.architecture.highlights.length > 0)
    items.push({ id: 'architecture', label: 'Architecture' });
  if (project.results.length > 0) items.push({ id: 'results', label: 'Results' });
  if (project.testimonial) items.push({ id: 'testimonial', label: 'Testimonial' });
  if (project.images.length > 0) items.push({ id: 'gallery', label: 'Screens' });
  project.sections?.forEach((section) =>
    items.push({ id: slugify(section.title), label: section.title }),
  );
  return items;
}

function GalleryHeader({ project }: { project: ProjectData }) {
  return (
    <header className="mb-12">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="inline-block size-3 rounded-full"
          style={{ backgroundColor: project.color ?? '#1A1A1A' }}
        />
        <span className="text-sm font-medium uppercase tracking-widest text-gray-900">
          Design Gallery
        </span>
      </div>

      <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
        <span className="sr-only">
          {project.title} case study by Victor Omolasoye, {project.role} —{' '}
        </span>
        <span aria-hidden="true">{project.title}</span>
      </h1>

      <p className="mb-6 text-xl text-gray-500">{project.subtitle}</p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <Users className="size-4" />
          {project.role} @ {project.company}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="size-4" />
          {project.period}
        </span>
      </div>
    </header>
  );
}

function GalleryView({ project }: { project: ProjectData }) {
  return (
    <>
      <GalleryHeader project={project} />
      {project.overview && (
        <p className="mb-12 text-lg leading-relaxed text-gray-700">
          {project.overview}
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {project.images.map((img) => (
          <div key={img.src} className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <Image
              src={img.src}
              alt={img.alt}
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </>
  );
}

function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4 border-b border-gray-200 pb-4">
      <span className="font-mono text-xs text-gray-400">
        {String(index).padStart(2, '0')}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function CaseStudyView({ project }: { project: ProjectData }) {
  const navItems = getNavItems(project);
  const num = (id: string) => {
    const i = navItems.findIndex((item) => item.id === id);
    return i >= 0 ? i + 1 : 0;
  };

  const isStraightLayout = project.category === 'brand' || project.slug === 'veyra';

  const meta: CaseStudyMetaRow[] = [
    { label: 'Role', value: project.role },
    { label: 'Company', value: project.company },
    ...(project.timeline && project.timeline !== project.period
      ? [{ label: 'Timeline', value: project.timeline }]
      : []),
    { label: 'Year', value: project.period },
    ...(project.regions.length > 0
      ? [{ label: 'Location', value: project.regions.join(', ') }]
      : []),
  ];

  return (
    <>
      {/* Hero */}
      <header className="mb-14">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-100">
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={`${project.title} — ${project.subtitle}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white ring-1 ring-inset ring-white/25 backdrop-blur">
              {categoryLabel(project.category)}
            </span>
            <h1 className="mt-4 font-display text-5xl leading-none tracking-wide text-white sm:text-6xl lg:text-7xl">
              <span className="sr-only">
                {project.title} case study by Victor Omolasoye, {project.role} —{' '}
              </span>
              <span aria-hidden="true">{project.title}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">
              {project.subtitle}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-16">
        <CaseStudySidebar meta={meta} links={project.links} items={navItems} />

        <div className="min-w-0 space-y-16">
          {/* Overview */}
          {project.overview && (
            <section id="overview" className="scroll-mt-8">
              <SectionHeading index={num('overview')} title="Overview" />
              <p className="max-w-3xl text-xl leading-relaxed text-gray-700">
                {project.overview}
              </p>
            </section>
          )}

          {/* Problem & Solution */}
          {(project.problem || project.solution) && (
            <section id="problem" className="scroll-mt-8">
              <SectionHeading index={num('problem')} title="Problem & Solution" />
              <div className="grid gap-10 md:grid-cols-2">
                {project.problem && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                      The Problem
                    </p>
                    <p className="leading-relaxed text-gray-700">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                      The Solution
                    </p>
                    <p className="leading-relaxed text-gray-700">{project.solution}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Target & Reach */}
          {(project.targetAudience.length > 0 || project.regions.length > 0) && (
            <section id="audience" className="scroll-mt-8">
              <SectionHeading index={num('audience')} title="Target & Reach" />
              <div className="grid gap-10 sm:grid-cols-2">
                {project.targetAudience.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                      Audience
                    </p>
                    <ul className="space-y-2">
                      {project.targetAudience.map((a) => (
                        <li key={a} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="size-4 shrink-0 text-gray-400" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.regions.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">
                      Regions
                    </p>
                    <ul className="space-y-2">
                      {project.regions.map((r) => (
                        <li key={r} className="flex items-center gap-2 text-gray-700">
                          <span className="size-1.5 shrink-0 rounded-full bg-gray-900" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Features */}
          {project.features.length > 0 && (
            <section id="features" className="scroll-mt-8">
              <SectionHeading index={num('features')} title="Key Features" />
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature.title} className="border-t border-gray-200 pt-5">
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech Stack */}
          {project.techStack.length > 0 && (
            <section id="stack" className="scroll-mt-8">
              <SectionHeading index={num('stack')} title="Technology Stack" />
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {techIcon(tech.category)}
                    {tech.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Architecture */}
          {(project.architecture.description || project.architecture.highlights.length > 0) && (
            <section id="architecture" className="scroll-mt-8">
              <SectionHeading index={num('architecture')} title="Architecture" />
              {project.architecture.title && (
                <p className="mb-3 text-sm font-semibold text-gray-900">
                  {project.architecture.title}
                </p>
              )}
              {project.architecture.description && (
                <p className="mb-6 max-w-3xl leading-relaxed text-gray-700">
                  {project.architecture.description}
                </p>
              )}
              {project.architecture.highlights.length > 0 && (
                <ul className="space-y-2">
                  {project.architecture.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-gray-900" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Results */}
          {project.results.length > 0 && (
            <section id="results" className="scroll-mt-8">
              <SectionHeading index={num('results')} title="Results" />
              <div className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-3">
                {project.results.map((result) => (
                  <div key={result.metric} className="bg-white p-6">
                    <p className="text-3xl font-bold text-gray-900">{result.value}</p>
                    <p className="mt-2 text-sm font-medium text-gray-900">{result.metric}</p>
                    {result.description && (
                      <p className="mt-1 text-xs leading-relaxed text-gray-400">
                        {result.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <section id="testimonial" className="scroll-mt-8">
              <SectionHeading index={num('testimonial')} title="Testimonial" />
              <figure className="rounded-3xl bg-gray-900 p-8 text-white sm:p-10">
                <Quote className="mb-5 size-8 text-white/40" />
                <blockquote className="text-lg leading-relaxed sm:text-xl">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-medium">{project.testimonial.author}</p>
                  <p className="text-sm text-white/60">
                    {project.testimonial.role}
                    {project.testimonial.company && (
                      <> @ {project.testimonial.company}</>
                    )}
                  </p>
                </figcaption>
              </figure>
            </section>
          )}

          {/* Screens Gallery */}
          {project.images.length > 0 && (
            <section id="gallery" className="scroll-mt-8">
              <SectionHeading index={num('gallery')} title="Screens" />
              {isStraightLayout ? (
                <div
                  className={
                    project.galleryColumns === 2
                      ? 'grid grid-cols-1 gap-6 sm:grid-cols-2'
                      : 'space-y-6'
                  }
                >
                  {project.images.map((img) => (
                    <div
                      key={img.src}
                      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={1600}
                        height={2400}
                        className="h-auto w-full"
                        sizes={
                          project.galleryColumns === 2
                            ? '(max-width: 640px) 100vw, 50vw'
                            : '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {project.images.map((img) => (
                    <div
                      key={img.src}
                      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={1200}
                        height={900}
                        className="h-auto w-full object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Additional Sections */}
          {project.sections?.map((section) => (
            <section key={section.title} id={slugify(section.title)} className="scroll-mt-8">
              <SectionHeading index={num(slugify(section.title))} title={section.title} />
              <div className="space-y-5">
                {section.content.split('\n\n').map((paragraph, i) => {
                  const lines = paragraph.split('\n').filter((l) => l.trim());
                  if (lines.every((l) => l.trimStart().startsWith('-'))) {
                    return (
                      <ul key={i} className="space-y-2">
                        {lines.map((line, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 leading-relaxed text-gray-700"
                          >
                            <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-gray-400" />
                            {line.trimStart().replace(/^-\s+/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (lines.every((l) => l.trimStart().startsWith('|')) && lines.length >= 3) {
                    const rows = lines.filter(
                      (l) => !/^[\s|]*[-:]+\s*[-:|]+\s*[-:| ]*$/.test(l),
                    );
                    return (
                      <div key={i} className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              {rows[0]
                                .split('|')
                                .filter((c) => c.trim())
                                .map((cell, ci) => (
                                  <th key={ci} className="px-4 py-3 font-semibold text-gray-900">
                                    {cell.trim()}
                                  </th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.slice(1).map((row, ri) => (
                              <tr key={ri} className="border-b border-gray-100 last:border-0">
                                {row
                                  .split('|')
                                  .filter((c) => c.trim())
                                  .map((cell, ci) => (
                                    <td key={ci} className="px-4 py-3 text-gray-700">
                                      {cell.trim()}
                                    </td>
                                  ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="max-w-3xl leading-relaxed text-gray-700">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
              {section.images && section.images.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {section.images.map((img) => (
                    <figure
                      key={img.src}
                      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={390}
                        height={844}
                        className="h-auto w-full"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {img.caption && (
                        <figcaption className="px-3 py-2 text-xs text-gray-400">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function MoreProjects({ projects }: { projects: ProjectData[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="mt-20 border-t border-gray-200 pt-12">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          More Projects
        </h2>
        <a
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          View all projects
          <ArrowUpRight className="size-4" />
        </a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const isGallery = project.layout === 'gallery';
  const suggestedProjects = getSuggestedProjects(slug, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.title, path: `/projects/${slug}` },
          ]),
          projectSchema({
            title: project.title,
            subtitle: project.subtitle,
            overview: project.overview,
            coverImage: project.coverImage,
            slug,
            role: project.role,
            company: project.company,
            period: project.period,
            techStack: project.techStack,
            links: project.links,
          }),
        ]}
      />
      <main className="min-h-screen bg-[#F8F9FA] text-gray-900">
      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <a
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowUpRight className="size-4 rotate-180" />
          Back to projects
        </a>

        {isGallery ? <GalleryView project={project} /> : <CaseStudyView project={project} />}
        <MoreProjects projects={suggestedProjects} />
      </article>
      <BackToTop />
    </main>
    </>
  );
}
