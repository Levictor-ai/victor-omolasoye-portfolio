import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/site/Reveal';
import { RichText } from '@/components/site/RichText';
import { WorkCard } from '@/components/site/WorkCard';
import { defaultProfile } from '@/data/profile';
import { tracks, workPath, getNextProject, getRelatedProjects, projectDisciplines, projectTypeLabel, type WorkTrack } from '@/lib/work';
import type { ProjectData } from '@/types/project';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function Chapter({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <div id={id} className="scroll-mt-24">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="text-xs tabular-nums text-ink-faint">{index}</span>
          <h2 className="text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </Reveal>
  );
}

export function CaseStudyView({
  project,
  track,
}: {
  project: ProjectData;
  track: WorkTrack;
}) {
  const config = tracks[track];
  const related = getRelatedProjects(track, project.slug, 3);
  const next = getNextProject(track, project.slug);
  const disciplines = projectDisciplines(project);
  const detailSections = (project.sections ?? []).filter(
    (section) =>
      !/impact|results?|executive summary|^product overview$/i.test(section.title),
  );
  const typeLabel = projectTypeLabel(project);
  const isGallery = project.layout === 'gallery';
  const gallery = project.images;

  const meta = [
    project.role && { label: 'Role', value: project.role },
    project.company && { label: 'Client', value: project.company },
    project.period && { label: 'Year', value: project.period },
    project.regions.length > 0 && { label: 'Region', value: project.regions.join(', ') },
    { label: 'Type', value: typeLabel },
  ].filter(Boolean) as { label: string; value: string }[];

  const contents = [
    { id: 'overview', label: 'Overview' },
    project.problem && { id: 'context', label: 'Context' },
    project.solution && { id: 'approach', label: 'Approach' },
    ...detailSections.map((section) => ({
      id: slugify(section.title),
      label: section.title,
    })),
    project.features.length > 0 && { id: 'deliverables', label: 'Deliverables' },
    disciplines.length > 0 && { id: 'tools', label: 'Tools & disciplines' },
    project.results.length > 0 && { id: 'outcomes', label: 'Outcomes' },
    gallery.length > 0 && { id: 'gallery', label: 'Gallery' },
  ].filter(Boolean) as { id: string; label: string }[];

  let chapterIndex = 1;
  const chapter = () => String(chapterIndex++).padStart(2, '0');

  return (
    <>
      <Nav />
      <main>
        <article>
          <header className="mx-auto max-w-[1400px] px-5 pb-10 pt-10 sm:px-8 sm:pt-14 lg:px-12">
            <Link
              href={`/${track}`}
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" strokeWidth={1.6} />
              {config.label}
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                  {config.label} — {typeLabel}
                </p>
                <h1 className="mt-4 text-balance font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.02em] text-ink">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
                  {project.subtitle}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 text-sm">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs uppercase tracking-[0.1em] text-ink-faint">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </header>

          <Reveal className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-paper-sunken">
              <Image
                src={project.coverImage}
                alt={`${project.title} — ${project.subtitle}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[200px_1fr] lg:gap-16 lg:px-12">
            <aside className="hidden lg:block">
              <nav aria-label="Case study contents" className="sticky top-24">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-ink-faint">
                  Contents
                </p>
                <ul className="space-y-2 text-sm">
                  {contents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-ink-muted transition-colors hover:text-ink"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="max-w-3xl space-y-12">
              <Chapter id="overview" index={chapter()} title="Overview">
                <RichText content={project.overview} />
              </Chapter>

              {project.problem && (
                <Chapter id="context" index={chapter()} title="The brief and the challenge">
                  <RichText content={project.problem} />
                </Chapter>
              )}

              {project.solution && (
                <Chapter id="approach" index={chapter()} title="Approach">
                  <RichText content={project.solution} />
                </Chapter>
              )}

              {(project.targetAudience.length > 0 || project.timeline) && (
                <Chapter id="audience" index={chapter()} title="Audience and positioning">
                  {project.targetAudience.length > 0 && (
                    <div className="mb-5">
                      <p className="mb-3 text-sm text-ink-muted">Designed for</p>
                      <ul className="flex flex-wrap gap-2">
                        {project.targetAudience.map((audience) => (
                          <li
                            key={audience}
                            className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft"
                          >
                            {audience}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.timeline && (
                    <p className="text-sm text-ink-muted">
                      <span className="text-ink">Timeline:</span> {project.timeline}
                    </p>
                  )}
                </Chapter>
              )}

              {detailSections.map((section) => (
                <Chapter
                  key={section.title}
                  id={slugify(section.title)}
                  index={chapter()}
                  title={section.title}
                >
                  <RichText content={section.content} />
                </Chapter>
              ))}

              {project.features.length > 0 && (
                <Chapter id="deliverables" index={chapter()} title="Deliverables and capabilities">
                  <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <div key={feature.title}>
                        <h3 className="text-sm font-semibold text-ink">{feature.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Chapter>
              )}

              {disciplines.length > 0 && (
                <Chapter id="tools" index={chapter()} title="Tools and disciplines">
                  <ul className="flex flex-wrap gap-2">
                    {disciplines.map((discipline) => (
                      <li
                        key={discipline}
                        className="rounded-full bg-paper-sunken px-3 py-1 text-xs text-ink-soft"
                      >
                        {discipline}
                      </li>
                    ))}
                  </ul>
                  {project.architecture.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2 text-sm text-ink-muted">
                      {project.architecture.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink-faint" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </Chapter>
              )}

              {project.results.length > 0 && (
                <Chapter id="outcomes" index={chapter()} title="Outcomes">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {project.results.map((result) => (
                      <div key={result.metric} className="border-l border-line pl-4">
                        <p className="text-xs uppercase tracking-[0.1em] text-ink-faint">
                          {result.metric}
                        </p>
                        <p className="mt-1 text-lg font-medium text-ink">{result.value}</p>
                        {result.description && (
                          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                            {result.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Chapter>
              )}

              {project.testimonial && (
                <Reveal as="section" className="border-t border-line pt-8">
                  <blockquote className="text-xl leading-relaxed text-ink sm:text-2xl">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm text-ink-muted">
                    {project.testimonial.author}
                    {project.testimonial.role ? `, ${project.testimonial.role}` : ''}
                    {project.testimonial.company ? `, ${project.testimonial.company}` : ''}
                  </p>
                </Reveal>
              )}

              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3 border-t border-line pt-8">
                  {project.links.map((link) => (
                    <a
                      key={`${link.label}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" strokeWidth={1.6} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {gallery.length > 0 && (
            <section
              id="gallery"
              aria-label={`${project.title} gallery`}
              className="mx-auto mt-20 max-w-[1400px] scroll-mt-24 px-5 sm:px-8 lg:px-12"
            >
              <Reveal>
                <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                  Gallery
                </h2>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((image, index) => (
                  <Reveal
                    key={`${image.src}-${index}`}
                    delay={Math.min(index * 0.04, 0.2)}
                    className={
                      isGallery && index % 3 === 0
                        ? 'sm:col-span-2'
                        : undefined
                    }
                  >
                    <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-paper-sunken">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </figure>
                    {image.caption && (
                      <figcaption className="mt-2 text-xs text-ink-faint">
                        {image.caption}
                      </figcaption>
                    )}
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="mx-auto mt-24 max-w-[1400px] border-t border-line px-5 pt-10 sm:px-8 lg:px-12">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="text-xl font-semibold text-ink sm:text-2xl">
                  Related {config.label.toLowerCase()} work
                </h2>
                <Link
                  href={`/${track}`}
                  className="hidden text-sm text-ink-muted transition-colors hover:text-ink sm:block"
                >
                  View all
                </Link>
              </div>
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <WorkCard key={item.slug} project={item} track={track} />
                ))}
              </div>
            </section>
          )}

          {next && (
            <section className="mt-20 border-t border-line">
              <Link
                href={workPath(track, next.slug)}
                className="group mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-14 sm:px-8 lg:px-12"
              >
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                  Next project
                </span>
                <span className="flex items-center justify-between gap-6">
                  <span className="font-display text-4xl tracking-[-0.01em] text-ink sm:text-6xl">
                    {next.title}
                  </span>
                  <ArrowRight
                    className="size-7 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-2 sm:size-10"
                    strokeWidth={1.2}
                  />
                </span>
              </Link>
            </section>
          )}
        </article>
      </main>
      <SiteFooter profile={defaultProfile} />
    </>
  );
}
