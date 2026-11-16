import Image from 'next/image';
import { Quote } from 'lucide-react';
import type { ProjectData, StudyDocBlock } from '@/types/project';
import { CaseStudySidebar } from '@/components/CaseStudySidebar';
import { projectCategories } from '@/lib/projectCategories';

const BRAND = '#663398';
const ACCENT = '#FF522A';

function categoryLabel(category: ProjectData['category']) {
  switch (category) {
    case 'product': return 'Product Design';
    case 'brand': return 'Brand Design';
    case 'engineering': return 'Engineering';
  }
}

function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-ios-separator pb-4">
      <span className="font-mono text-xs text-ios-tertiary">
        {String(index).padStart(2, '0')}
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-ios-label sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function BlockHeading({ block }: { block: StudyDocBlock }) {
  if (!block.heading && !block.intro) return null;
  return (
    <div className="mb-5">
      {block.heading && (
        <h3 className="text-lg font-semibold tracking-tight text-ios-label">
          {block.heading}
        </h3>
      )}
      {block.intro && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ios-tertiary">
          {block.intro}
        </p>
      )}
    </div>
  );
}

function DocBlock({ block }: { block: StudyDocBlock }) {
  switch (block.type) {
    case 'paragraphs':
      return (
        <div>
          <BlockHeading block={block} />
          <div className="max-w-3xl space-y-4">
            {(block.paragraphs ?? []).map((paragraph, i) => (
              <p
                key={paragraph}
                className={
                  block.lead && i === 0
                    ? 'text-xl leading-relaxed text-ios-secondary'
                    : 'leading-relaxed text-ios-secondary'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );

    case 'bullets':
      return (
        <div>
          <BlockHeading block={block} />
          <ul className="max-w-3xl space-y-2.5">
            {(block.items ?? []).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 leading-relaxed text-ios-secondary"
              >
                <span
                  className="mt-2.5 block size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: BRAND }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case 'numbered':
      return (
        <div>
          <BlockHeading block={block} />
          <ol className="max-w-3xl space-y-3">
            {(block.items ?? []).map((item, i) => (
              <li
                key={item}
                className="flex gap-3 rounded-ios-xl border border-ios-separator bg-white p-4 text-sm leading-relaxed text-ios-secondary"
              >
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      );

    case 'cards':
      return (
        <div>
          <BlockHeading block={block} />
          <div
            className={`grid gap-4 ${
              block.columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
            }`}
          >
            {(block.cards ?? []).map((card) => (
              <div
                key={card.title}
                className="rounded-ios-xl border border-ios-separator bg-white p-5"
              >
                <h4 className="text-base font-semibold tracking-tight text-ios-label">
                  {card.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ios-tertiary">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'personas':
      return (
        <div>
          <BlockHeading block={block} />
          <div className="grid gap-4 lg:grid-cols-3">
            {(block.personas ?? []).map((persona) => (
              <article
                key={persona.name}
                className="flex flex-col rounded-ios-2xl border border-ios-separator bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-full font-ios text-lg font-semibold text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    {persona.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-ios-label">
                      {persona.name}, {persona.age}
                    </p>
                    <p className="text-xs leading-relaxed text-ios-tertiary">
                      {persona.role}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ios-secondary">
                  {persona.summary}
                </p>
                <blockquote
                  className="mt-4 border-l-2 pl-3 text-sm italic leading-relaxed text-ios-secondary"
                  style={{ borderColor: ACCENT }}
                >
                  &ldquo;{persona.quote}&rdquo;
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      );

    case 'quotes':
      return (
        <div>
          <BlockHeading block={block} />
          <div className="grid gap-4 lg:grid-cols-3">
            {(block.quotes ?? []).map((quote) => (
              <blockquote
                key={quote.quote}
                className="rounded-ios-2xl border border-ios-separator bg-white p-6"
              >
                <Quote
                  aria-hidden="true"
                  className="size-5"
                  style={{ color: ACCENT }}
                />
                <p className="mt-3 text-sm leading-relaxed text-ios-secondary">
                  {quote.quote}
                </p>
                <footer className="mt-4 text-xs font-medium text-ios-tertiary">
                  {quote.source}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      );

    case 'table':
      return (
        <div>
          <BlockHeading block={block} />
          {block.table && (
            <>
              <div className="hidden overflow-hidden rounded-ios-xl border border-ios-separator md:block">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    {block.heading ?? 'Project findings'}
                  </caption>
                  <thead className="bg-ios-grouped">
                    <tr>
                      {block.table.headers.map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ios-separator bg-white">
                    {block.table.rows.map((row) => (
                      <tr key={row[0]} className="align-top">
                        {row.map((cell, i) => (
                          <td
                            key={`${row[0]}-${i}`}
                            className={`px-5 py-4 leading-relaxed ${
                              i === 0 ? 'font-medium text-ios-label' : 'text-ios-tertiary'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 md:hidden">
                {block.table.rows.map((row) => (
                  <div
                    key={row[0]}
                    className="rounded-ios-xl border border-ios-separator bg-white p-5"
                  >
                    <p className="text-sm font-semibold text-ios-label">{row[0]}</p>
                    <dl className="mt-3 space-y-2.5">
                      {row.slice(1).map((cell, i) => (
                        <div key={`${row[0]}-m-${i}`}>
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
                            {block.table?.headers[i + 1]}
                          </dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-ios-secondary">
                            {cell}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>

              {block.table.note && (
                <p className="mt-3 text-xs leading-relaxed text-ios-tertiary">
                  {block.table.note}
                </p>
              )}
            </>
          )}
        </div>
      );

    case 'stats': {
      const stats = block.stats ?? [];
      const wide = stats.length >= 5;
      return (
        <div>
          <BlockHeading block={block} />
          <div
            className={`grid gap-px overflow-hidden rounded-ios-xl border border-ios-separator bg-ios-separator sm:grid-cols-2 ${
              stats.length === 3
                ? 'lg:grid-cols-3'
                : wide
                  ? 'lg:grid-cols-5'
                  : 'lg:grid-cols-4'
            }`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-5">
                <p className="text-2xl font-bold tracking-tight text-ios-label">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-ios-label">{stat.label}</p>
                {stat.description && (
                  <p className="mt-1 text-xs leading-relaxed text-ios-tertiary">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case 'images':
      return (
        <div>
          <BlockHeading block={block} />
          <div
            className={`grid gap-4 ${
              block.columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
            }`}
          >
            {(block.images ?? []).map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-ios-xl border border-ios-separator bg-white"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1400}
                  height={750}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {image.label && (
                  <figcaption className="px-4 py-3 text-xs leading-relaxed text-ios-tertiary">
                    {image.label}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      );

    case 'screens':
      return (
        <div>
          <BlockHeading block={block} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {(block.screens ?? []).map((screen) => (
              <figure key={screen.src}>
                <div className="overflow-hidden rounded-[22px] border border-ios-separator bg-white shadow-ios">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={390}
                    height={844}
                    className="h-auto w-full"
                    sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 22vw"
                  />
                </div>
                {screen.label && (
                  <figcaption className="mt-2 text-center text-[11px] leading-relaxed text-ios-tertiary">
                    {screen.label}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      );

    case 'figure':
      return (
        <figure>
          {block.figure && (
            <>
              <div className="overflow-hidden rounded-ios-xl border border-ios-separator bg-white">
                <Image
                  src={block.figure.src}
                  alt={block.figure.alt}
                  width={1267}
                  height={685}
                  className="h-auto w-full"
                  sizes="100vw"
                />
              </div>
              {block.figure.caption && (
                <figcaption className="mt-2 text-xs leading-relaxed text-ios-tertiary">
                  {block.figure.caption}
                </figcaption>
              )}
            </>
          )}
        </figure>
      );

    case 'callout':
      return (
        <div
          className={`rounded-ios-2xl p-6 sm:p-8 ${
            block.callout?.tone === 'brand'
              ? 'text-white'
              : block.callout?.tone === 'warm'
                ? 'border border-[#F5D9A8] bg-[#FFF8EC] text-[#7A5200]'
                : 'bg-ios-grouped text-ios-label'
          }`}
          style={
            block.callout?.tone === 'brand' ? { backgroundColor: BRAND } : undefined
          }
        >
          {block.callout?.label && (
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                block.callout.tone === 'brand' ? 'text-white/70' : 'text-ios-tertiary'
              }`}
            >
              {block.callout.label}
            </p>
          )}
          <p
            className={`max-w-3xl text-lg font-medium leading-snug sm:text-xl ${
              block.callout?.label ? 'mt-2' : ''
            }`}
          >
            {block.callout?.text}
          </p>
        </div>
      );

    case 'timeline':
      return (
        <div>
          <BlockHeading block={block} />
          <div className="space-y-0">
            {(block.timeline ?? []).map((item) => (
              <div
                key={item.when}
                className="grid gap-2 border-t border-ios-separator py-4 sm:grid-cols-[112px_1fr] sm:gap-6"
              >
                <p className="font-mono text-xs font-semibold" style={{ color: BRAND }}>
                  {item.when}
                </p>
                <div>
                  <p className="text-sm font-semibold text-ios-label">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ios-tertiary">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'swatches':
      return (
        <div>
          <BlockHeading block={block} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(block.swatches ?? []).map((color) => (
              <div
                key={color.name}
                className="overflow-hidden rounded-ios-xl border border-ios-separator bg-white"
              >
                <div
                  aria-hidden="true"
                  className="h-16 w-full"
                  style={{ backgroundColor: color.value }}
                />
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-ios-label">{color.name}</p>
                    <code className="font-mono text-[11px] text-ios-tertiary">
                      {color.value}
                    </code>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ios-tertiary">
                    {color.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'scale':
      return (
        <div>
          <BlockHeading block={block} />
          <div className="overflow-hidden rounded-ios-xl border border-ios-separator bg-white">
            {(block.scale ?? []).map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-4 border-b border-ios-separator px-5 py-3 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="w-12 shrink-0 font-ios leading-none text-ios-label"
                  style={{ fontSize: Math.min(row.px, 32), fontWeight: Number(row.weight) }}
                >
                  Aa
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ios-label">{row.label}</p>
                  <p className="text-xs leading-relaxed text-ios-tertiary">{row.usage}</p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-ios-tertiary">
                  {row.px}px / {row.weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function StudyDocCaseStudy({ project }: { project: ProjectData }) {
  const doc = project.studyDoc;
  if (!doc) return null;

  const meta = [{ label: 'Role', value: project.role }, ...doc.meta].filter(
    (row) => row.value,
  );

  const navItems = doc.sections.map((section) => ({
    id: section.id,
    label: section.nav,
  }));

  return (
    <>
      <header className="mb-14">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-ios-2xl border border-ios-separator bg-[#E5E4EA]">
          <Image
            src={project.coverImage}
            alt={`${project.title} — ${project.subtitle}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {projectCategories(project).map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center rounded-full bg-ios-fill px-3 py-1 text-xs font-medium uppercase tracking-widest text-ios-secondary"
                >
                  {categoryLabel(category)}
                </span>
              ))}
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: BRAND }}
              >
                {doc.badge}
              </span>
            </div>
            <h1 className="font-ios text-5xl font-bold tracking-tight text-ios-label sm:text-6xl">
              <span className="sr-only">
                {project.title} case study by Victor Omolasoye, {project.role} —{' '}
              </span>
              <span aria-hidden="true">{project.title}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-ios-secondary sm:text-xl">
              {project.subtitle}
            </p>
            <p className="mt-2 text-sm font-medium" style={{ color: BRAND }}>
              {doc.tagline}
            </p>
          </div>
          <div className="shrink-0 text-sm text-ios-tertiary sm:text-right">
            <p className="font-medium text-ios-label">{project.role}</p>
            <p className="mt-1">{project.period}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-16">
        <CaseStudySidebar meta={meta} links={project.links} items={navItems} />

        <div className="min-w-0 space-y-16">
          {doc.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-8">
              <SectionHeading index={index + 1} title={section.title} />
              {section.intro && (
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-ios-secondary">
                  {section.intro}
                </p>
              )}
              <div className="space-y-10">
                {section.blocks.map((block, i) => (
                  <DocBlock key={`${section.id}-${i}`} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
