import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { ProjectData } from '@/types/project';
import { BackToTop } from '@/components/BackToTop';
import {
  ExternalLink,
  Users,
  MapPin,
  Calendar,
  ArrowUpRight,
  CheckCircle,
  Quote,
  Layers,
  Server,
  Palette,
  Wrench,
} from 'lucide-react';

async function getProject(slug: string): Promise<ProjectData | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'projects', `${slug}.json`);
    const raw = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as ProjectData;
  } catch {
    return null;
  }
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

function linkIcon(type: ProjectData['links'][number]['type']) {
  switch (type) {
    case 'github':      return <ExternalLink className="size-4" />;
    case 'live':        return <ArrowUpRight className="size-4" />;
    case 'case-study':  return <ExternalLink className="size-4" />;
    case 'play-store':  return <ExternalLink className="size-4" />;
    case 'app-store':   return <ExternalLink className="size-4" />;
  }
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
        {project.title}
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
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {project.images.map((img) => (
          <div key={img.src} className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
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

function CaseStudyView({ project }: { project: ProjectData }) {
  return (
    <>
      {/* Header */}
      <header className="mb-16">
        <div className="mb-4 flex items-center gap-3">
          <span
            className="inline-block size-3 rounded-full"
            style={{ backgroundColor: project.color ?? '#1A1A1A' }}
          />
          <span className="text-sm font-medium uppercase tracking-widest text-gray-900">
            Case Study
          </span>
        </div>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>

        <p className="mb-6 text-xl text-gray-500">{project.subtitle}</p>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Users className="size-4" />
            {project.role} @ {project.company}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {project.period}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {project.regions.join(', ')}
          </span>
        </div>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target={link.type !== 'case-study' ? '_blank' : undefined}
                rel={link.type !== 'case-study' ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-black/30 hover:bg-black/5 hover:text-black"
              >
                {linkIcon(link.type)}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Overview */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">Overview</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          {project.overview}
        </p>
      </section>

      {/* Problem & Solution */}
      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">The Problem</h3>
          <p className="leading-relaxed text-gray-700">{project.problem}</p>
        </section>
        <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">The Solution</h3>
          <p className="leading-relaxed text-gray-700">{project.solution}</p>
        </section>
      </div>

      {/* Target Audience / Regions */}
      <section className="mb-16 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900">Target & Reach</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900">
              Audience
            </h3>
            <ul className="space-y-1">
              {project.targetAudience.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="size-3.5 text-gray-700" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900">
              Regions
            </h3>
            <ul className="space-y-1">
              {project.regions.map((r) => (
                <li key={r} className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="size-3.5 text-gray-700" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Key Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-gray-200 bg-gray-50 p-5 transition-colors hover:border-gray-300"
            >
              <h3 className="mb-2 font-medium text-gray-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700"
            >
              {techIcon(tech.category)}
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">Architecture</h2>
        {project.architecture.title && (
          <p className="mb-3 text-sm font-medium text-gray-900">
            {project.architecture.title}
          </p>
        )}
        <p className="mb-6 leading-relaxed text-gray-700">
          {project.architecture.description}
        </p>
        {project.architecture.highlights.length > 0 && (
          <ul className="space-y-2">
            {project.architecture.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-black" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Results */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Results</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.results.map((result) => (
            <div
              key={result.metric}
              className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center"
            >
              <p className="text-3xl font-bold text-gray-700">{result.value}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{result.metric}</p>
              {result.description && (
                <p className="mt-1 text-xs text-gray-400">{result.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="mb-16 rounded-xl border border-black/5 bg-gray-50 p-8">
          <Quote className="mb-4 size-8 text-gray-900" />
          <blockquote className="mb-6 text-lg leading-relaxed text-gray-900">
            &ldquo;{project.testimonial.quote}&rdquo;
          </blockquote>
          <div>
            <p className="font-medium text-gray-900">{project.testimonial.author}</p>
            <p className="text-sm text-gray-500">
              {project.testimonial.role}
              {project.testimonial.company && <> @ {project.testimonial.company}</>}
            </p>
          </div>
        </section>
      )}

      {/* Screens Gallery */}
      {project.images.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Screens Gallery</h2>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {project.images.map((img) => (
              <div key={img.src} className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
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
        </section>
      )}

      {/* Additional Sections */}
      {project.sections?.map((section) => (
        <section key={section.title} className="mb-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">{section.title}</h2>
          <div className="space-y-4">
            {section.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-gray-700">{paragraph}</p>
            ))}
          </div>
          {section.images && section.images.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {section.images.map((img) => (
                <figure key={img.src}>
                  <div className="aspect-video rounded-lg bg-white" />
                  {img.caption && (
                    <figcaption className="mt-2 text-xs text-gray-400">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const isGallery = project.layout === 'gallery';

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-gray-900">
      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <a
          href="/#projects"
          className="mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowUpRight className="size-4 rotate-180" />
          Back to projects
        </a>

        {isGallery ? <GalleryView project={project} /> : <CaseStudyView project={project} />}
      </article>
      <BackToTop />
    </main>
  );
}
