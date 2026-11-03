import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Users,
  Calendar,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';
import type { ProjectData, ProjectImage } from '@/types/project';
import { getProject, getSuggestedProjects } from '@/lib/projects';
import { JsonLd } from '@/components/JsonLd';
import { projectCategories, projectInCategory } from '@/lib/projectCategories';
import { breadcrumbSchema, projectSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { ProjectCard } from '@/components/ProjectCard';
import { BackToTop } from '@/components/BackToTop';
import { CaseStudySidebar } from '@/components/CaseStudySidebar';
import type { CaseStudyNavItem, CaseStudyMetaRow } from '@/components/CaseStudySidebar';
import { ButtonLink } from '@/components/ui/Button';
import { QuoteCard } from '@/components/ui/QuoteCard';
import { SiteFooter } from '@/components/SiteFooter';
import { defaultProfile } from '@/data/profile';

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

  const cats = projectCategories(project);
  const categoryLabel =
    cats.length > 1
      ? cats
          .map((c) =>
            c === 'product'
              ? 'Product Design'
              : c === 'brand'
                ? 'Brand Design'
                : 'Engineering',
          )
          .join(' & ')
      : project.category === 'product'
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

function categoryLabel(category: ProjectData['category']) {
  switch (category) {
    case 'product': return 'Product Design';
    case 'brand': return 'Brand Design';
    case 'engineering': return 'Engineering';
  }
}

function getNavItems(project: ProjectData): CaseStudyNavItem[] {
  const items: CaseStudyNavItem[] = [];
  const briefStrategy = projectInCategory(project, 'brand');
  if (executiveSummaryContent(project) || project.overview)
    items.push({ id: 'summary', label: 'Summary' });
  if (project.problem || project.solution)
    items.push({ id: 'context', label: 'Context & Problem' });
  if (project.role) items.push({ id: 'my-role', label: 'My Role' });
  if (findSectionContent(project, /empath|research|insight|discover/i))
    items.push({
      id: 'research',
      label: briefStrategy ? 'Brief & Strategy' : 'Research & Discovery',
    });
  if (
    findSectionContent(project, /define|problem statement/i) ||
    findSectionContent(project, /ideate|how might we|direction/i)
  )
    items.push({ id: 'define', label: 'Define & Ideate' });
  if (project.features.length > 0) items.push({ id: 'solution', label: 'The Solution' });
  if (project.architecture.description || project.architecture.highlights.length > 0)
    items.push({ id: 'design', label: 'Design Decisions' });
  if (project.results.length > 0) items.push({ id: 'results', label: 'Results & Reflection' });
  if (project.testimonial) items.push({ id: 'testimonial', label: 'Testimonial' });
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
        <span className="text-sm font-medium uppercase tracking-widest text-ios-label">
          Design Gallery
        </span>
      </div>

      <h1 className="mb-3 text-4xl font-bold tracking-tight text-ios-label sm:text-5xl lg:text-6xl">
        <span className="sr-only">
          {project.title} case study by Victor Omolasoye, {project.role} —{' '}
        </span>
        <span aria-hidden="true">{project.title}</span>
      </h1>

      <p className="mb-6 text-xl text-ios-tertiary">{project.subtitle}</p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-ios-tertiary">
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
        <p className="mb-12 text-lg leading-relaxed text-ios-secondary">
          {project.overview}
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {project.images.map((img) => (
          <div key={img.src} className="overflow-hidden rounded-xl border border-ios-separator bg-ios-fill">
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
    <div className="mb-6 flex items-baseline gap-4 border-b border-ios-separator pb-4">
      <span className="font-mono text-xs text-ios-tertiary">
        {String(index).padStart(2, '0')}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-ios-label sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function findSectionContent(project: ProjectData, pattern: RegExp) {
  return project.sections?.find((s) => pattern.test(s.title))?.content;
}

function executiveSummaryContent(project: ProjectData) {
  return findSectionContent(project, /executive summary|product overview/i);
}

function contentBlocks(content?: string) {
  if (!content) return [];
  return content.split('\n\n').map((paragraph, i) => {
    const lines = paragraph.split('\n').filter((l) => l.trim());
    if (lines.length > 0 && lines.every((l) => l.trimStart().startsWith('-'))) {
      return (
        <ul key={`ul-${i}`} className="max-w-3xl space-y-2">
          {lines.map((line, j) => (
            <li key={j} className="flex items-start gap-2 leading-relaxed text-ios-secondary">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-ios-electric" />
              {line.trimStart().replace(/^-\s+/, '')}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={`p-${i}`} className="max-w-3xl leading-relaxed text-ios-secondary">
        {paragraph}
      </p>
    );
  });
}

type SolutionBlock = {
  key: string;
  title: string;
  description?: string;
  images: ProjectImage[];
};

function getSolutionBlocks(project: ProjectData): { blocks: SolutionBlock[]; remaining: ProjectImage[] } {
  const blocks: SolutionBlock[] = [];
  const usedImageSrcs = new Set<string>();

  if (project.slug === 'hapnan') {
    const onboarding = project.images.filter((img) =>
      /(onboarding|sign[-_]?in|sign[-_]?up|forgot[-_]?pass)/i.test(img.src),
    );
    const discovery = project.images.filter((img) =>
      /(home|trending|event[-_]?details)/i.test(img.src),
    );
    const planning = project.images.filter((img) =>
      /(saved[-_]?events|ticket|payment|notification)/i.test(img.src),
    );
    const featureDescription = (title: string) =>
      project.features.find((f) => f.title.toLowerCase() === title.toLowerCase())?.description;

    blocks.push({ key: 'onboarding', title: 'Onboarding & Account', images: onboarding });
    blocks.push({
      key: 'discovery',
      title: 'Discovery',
      description: featureDescription('Centralized Event Feed'),
      images: discovery,
    });
    blocks.push({
      key: 'planning',
      title: 'Planning & Tickets',
      description: featureDescription('Event Reminders & Notifications'),
      images: planning,
    });

    const used = new Set([...onboarding, ...discovery, ...planning].map((i) => i.src));
    const remaining = project.images.filter((img) => !used.has(img.src));
    return { blocks, remaining };
  }

  const screensByFeature: Record<string, ProjectImage[]> = {};
  for (const feature of project.features) {
    const words = feature.title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 3);
    const matched = project.images.filter(
      (img) =>
        !usedImageSrcs.has(img.src) &&
        words.some((word) => img.src.toLowerCase().includes(word)),
    );
    matched.forEach((img) => usedImageSrcs.add(img.src));
    screensByFeature[feature.title] = matched;
  }

  for (const feature of project.features) {
    blocks.push({
      key: feature.title,
      title: feature.title,
      description: feature.description,
      images: screensByFeature[feature.title] ?? [],
    });
  }

  const remaining = project.images.filter((img) => !usedImageSrcs.has(img.src));
  return { blocks, remaining };
}

function CaseStudyView({ project }: { project: ProjectData }) {
  const navItems = getNavItems(project);
  const num = (id: string) => {
    const i = navItems.findIndex((item) => item.id === id);
    return i >= 0 ? i + 1 : 0;
  };

  const consumedCustomTitles = new Set([
    'executive summary',
    'product overview',
    'design thinking: empathize',
    'design thinking: define',
    'design thinking: ideate',
    'design strengths',
    'growth opportunities',
    // Veyra solution sections now rendered through The Solution with screens attached.
    'hero & value proposition',
    'core service pillars',
    'a team that works with you',
    'why work with us',
    'support & faq',
    'client social proof',
    'conversion & footer',
    // Research & Discovery consumed by the research slot.
    'research & discovery',
  ]);

  const contextExtras = (project.sections ?? []).filter(
    (section) => !consumedCustomTitles.has(section.title.trim().toLowerCase()),
  );

  const executiveSummary = executiveSummaryContent(project);
  const designEmpathize = findSectionContent(project, /empath|research|insight|discover/i);
  const designDefine = findSectionContent(project, /define|problem statement/i);
  const designIdeate = findSectionContent(project, /ideate|how might we|direction/i);
  const designStrengths = findSectionContent(project, /design strengths/i);
  const growthOpportunities = findSectionContent(project, /growth opportunities/i);
  const reflectionContent = designStrengths ?? growthOpportunities;
  const summaryContent = executiveSummary ?? project.overview;

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
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-ios-2xl border border-ios-separator bg-white">
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
            <div className="flex flex-wrap items-center gap-2">
              {projectCategories(project).map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white ring-1 ring-inset ring-white/25 backdrop-blur"
                >
                  {categoryLabel(cat)}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-ios text-5xl leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
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
          {/* Summary */}
          {(summaryContent || project.results.length > 0) && (
            <section id="summary" className="scroll-mt-8">
              <SectionHeading index={num('summary')} title="Summary" />
              <div className="max-w-3xl space-y-6">
                {contentBlocks(summaryContent).map((block, i) => (
                  <div key={i} className={i === 0 ? 'text-xl leading-relaxed text-ios-secondary' : undefined}>
                    {block}
                  </div>
                ))}
              </div>
              {project.results.length > 0 && (
                <div className="mt-8 grid max-w-3xl gap-px overflow-hidden rounded-ios-xl border border-ios-separator bg-ios-separator sm:grid-cols-3">
                  {project.results.slice(0, 3).map((result) => (
                    <div key={result.metric} className="bg-white p-6">
                      <p className="text-3xl font-bold text-ios-ink">{result.value}</p>
                      <p className="mt-2 text-sm font-medium text-ios-ink">{result.metric}</p>
                      {result.description && (
                        <p className="mt-1 text-xs leading-relaxed text-ios-tertiary">
                          {result.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Context & Problem */}
          {(project.problem || project.solution) && (
            <section id="context" className="scroll-mt-8">
              <SectionHeading index={num('context')} title="Context & Problem" />
              <div className="grid gap-10 md:grid-cols-2">
                {project.problem && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ios-tertiary">
                      The Problem
                    </p>
                    <p className="leading-relaxed text-ios-secondary">{project.problem}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ios-tertiary">
                      The Solution
                    </p>
                    <p className="leading-relaxed text-ios-secondary">{project.solution}</p>
                  </div>
                )}
              </div>

              {(project.targetAudience.length > 0 || project.regions.length > 0) && (
                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  {project.targetAudience.length > 0 && (
                    <div>
                      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ios-tertiary">
                        Audience
                      </p>
                      <ul className="space-y-2">
                        {project.targetAudience.map((a) => (
                          <li key={a} className="flex items-center gap-2 text-ios-secondary">
                            <CheckCircle className="size-4 shrink-0 text-ios-tertiary" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.regions.length > 0 && (
                    <div>
                      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-ios-tertiary">
                        Regions
                      </p>
                      <ul className="space-y-2">
                        {project.regions.map((r) => (
                          <li key={r} className="flex items-center gap-2 text-ios-secondary">
                            <span className="size-1.5 shrink-0 rounded-full bg-ios-ink" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {contextExtras.map((section) => (
                <div key={section.title} className="mt-10 max-w-3xl space-y-5">
                  {contentBlocks(section.content)}
                </div>
              ))}
            </section>
          )}

          {/* My Role */}
          {project.role && (
            <section id="my-role" className="scroll-mt-8">
              <SectionHeading index={num('my-role')} title="Product Designer" />
              <div className="max-w-3xl space-y-6">
                <p className="text-xl font-semibold text-ios-label">{project.role}</p>
                <p className="text-sm leading-relaxed text-ios-tertiary">
                  As a Product Designer, I contributed to translating the team's ideas into a functional and user-centred product experience. My individual responsibilities included developing user flows, structuring interface layouts, creating wireframes, designing UI screens, and prototyping key interactions. I collaborated with other team members on product ideation, feature discussions, refining requirements, reviewing design decisions, and improving the overall user experience.
                </p>
              </div>
            </section>
          )}

          {/* Research & Discovery */}
          {designEmpathize && (
            <section id="research" className="scroll-mt-8">
              <SectionHeading
                index={num('research')}
                title={projectInCategory(project, 'brand') ? 'Brief & Strategy' : 'Research & Discovery'}
              />
              <div className="max-w-3xl space-y-6">{contentBlocks(designEmpathize)}</div>
            </section>
          )}

          {/* Define & Ideate */}
          {(designDefine || designIdeate) && (
            <section id="define" className="scroll-mt-8">
              <SectionHeading index={num('define')} title="Define & Ideate" />
              <div className="max-w-3xl space-y-6">
                {contentBlocks(designDefine)}
                {contentBlocks(designIdeate)}
              </div>
            </section>
          )}

          {/* The Solution */}
          {project.features.length > 0 && (
            <section id="solution" className="scroll-mt-8">
              <SectionHeading index={num('solution')} title="The Solution" />
              <div className="space-y-0">
                {(() => {
                  const { blocks, remaining } = getSolutionBlocks(project);
                  return (
                    <>
                      {blocks.map((block) => (
                        <div key={block.key} className="border-t border-ios-separator pt-5">
                          <h3 className="font-semibold text-ios-label">{block.title}</h3>
                          {block.description && (
                            <p className="mt-2 text-sm leading-relaxed text-ios-tertiary">{block.description}</p>
                          )}
                          {block.images.length > 0 && (
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                              {block.images.map((img) => (
                                <figure
                                  key={img.src}
                                  className="overflow-hidden rounded-ios-xl bg-white/80 shadow-ios ring-1 ring-ios-separator"
                                >
                                  <Image src={img.src} alt={img.alt} width={1200} height={900} className="h-auto w-full object-cover" />
                                  {img.caption && (
                                    <figcaption className="px-3 py-2 text-xs text-ios-tertiary">
                                      {img.caption}
                                    </figcaption>
                                  )}
                                </figure>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {remaining.length > 0 && (
                        <div className="border-t border-ios-separator pt-5">
                          <h3 className="font-semibold text-ios-label">Additional screens</h3>
                          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                            {remaining.map((img) => (
                              <figure
                                key={img.src}
                                className="overflow-hidden rounded-ios-xl bg-white/80 shadow-ios ring-1 ring-ios-separator"
                              >
                                <Image src={img.src} alt={img.alt} width={1200} height={900} className="h-auto w-full object-cover" />
                                {img.caption && (
                                  <figcaption className="px-3 py-2 text-xs text-ios-tertiary">
                                    {img.caption}
                                  </figcaption>
                                )}
                              </figure>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </section>
          )}

          {/* Design Decisions */}
          {(project.architecture.description || project.architecture.highlights.length > 0) && (
            <section id="design" className="scroll-mt-8">
              <SectionHeading index={num('design')} title="Design Decisions" />
              {project.architecture.title && (
                <p className="mb-3 text-sm font-semibold text-ios-label">{project.architecture.title}</p>
              )}
              {project.architecture.description && (
                <p className="mb-6 max-w-3xl leading-relaxed text-ios-secondary">{project.architecture.description}</p>
              )}
              {project.architecture.highlights.length > 0 && (
                <ul className="space-y-2">
                  {project.architecture.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ios-tertiary">
                      <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-ios-ink" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Results & Reflection */}
          {project.results.length > 0 && (
            <section id="results" className="scroll-mt-8">
              <SectionHeading index={num('results')} title="Results & Reflection" />
              <div className="grid gap-px overflow-hidden rounded-ios-xl border border-ios-separator bg-ios-separator sm:grid-cols-3">
                {project.results.map((result) => (
                  <div key={result.metric} className="bg-white p-6">
                    <p className="text-3xl font-bold text-ios-ink">{result.value}</p>
                    <p className="mt-2 text-sm font-medium text-ios-ink">{result.metric}</p>
                    {result.description && (
                      <p className="mt-1 text-xs leading-relaxed text-ios-tertiary">{result.description}</p>
                    )}
                  </div>
                ))}
              </div>
              {(designStrengths || growthOpportunities || reflectionContent) && (
                <div className="mt-10 max-w-3xl space-y-6">
                  {contentBlocks(designStrengths)}
                  {contentBlocks(growthOpportunities)}
                  {contentBlocks(reflectionContent)}
                </div>
              )}
            </section>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <section id="testimonial" className="scroll-mt-8">
              <SectionHeading index={num('testimonial')} title="Testimonial" />
              <QuoteCard
                variant="dark"
                quote={<>&ldquo;{project.testimonial.quote}&rdquo;</>}
                name={project.testimonial.author}
                role={project.testimonial.role}
                company={project.testimonial.company}
                className="rounded-ios-2xl p-8 sm:p-10"
              />
            </section>
          )}
        </div>
      </div>
    </>
  );
}

function MoreProjects({ projects }: { projects: ProjectData[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="mt-20 border-t border-ios-separator pt-12">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-ios-ink sm:text-3xl">
          More Projects
        </h2>
        <a
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ios-electric transition-colors hover:text-ios-electric"
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

function ProjectEnquiry({ project }: { project: ProjectData }) {
  const tracking = {
    'data-vo-track': 'contact_button_click',
    'data-vo-project': project.slug,
    'data-vo-label': `Project enquiry: ${project.title}`,
  };

  return (
    <section className="mt-16 rounded-ios-2xl border border-ios-separator bg-white/80 p-6 shadow-ios-soft sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
            Next step
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-ios-label sm:text-2xl">
            Have a similar project in mind?
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-ios-secondary">
            Tell me what you&rsquo;re building and I&rsquo;ll help you shape the next step.
          </p>
        </div>
        <ButtonLink
          href={`/contact?project=${encodeURIComponent(project.slug)}`}
          icon={<ArrowUpRight className="size-4" />}
          className="shrink-0"
          {...tracking}
        >
          Start a conversation
        </ButtonLink>
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
      <main className="min-h-screen bg-white font-ios text-ios-ink">
      <article className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <a
            href="/projects"
            className="mb-10 inline-flex items-center gap-2 text-sm text-ios-ink transition-colors hover:text-ios-electric"
          >
            <ArrowUpRight className="size-4 rotate-180" />
            Back to projects
          </a>

        {isGallery ? <GalleryView project={project} /> : <CaseStudyView project={project} />}
        <ProjectEnquiry project={project} />
        <MoreProjects projects={suggestedProjects} />
      </article>
      <SiteFooter profile={defaultProfile} />
      <BackToTop />
    </main>
    </>
  );
}
