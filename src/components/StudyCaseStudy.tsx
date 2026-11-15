import Image from 'next/image';
import {
  ArrowRight,
  Check,
  CircleUserRound,
  Dumbbell,
  House,
  Lightbulb,
  MousePointerClick,
  Ruler,
  Sparkles,
} from 'lucide-react';
import type { ProjectData } from '@/types/project';
import { CaseStudySidebar } from '@/components/CaseStudySidebar';
import { projectCategories } from '@/lib/projectCategories';

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

const navItems = [
  { id: 'summary', label: 'Summary' },
  { id: 'problem', label: 'The Problem' },
  { id: 'goals', label: 'Goals' },
  { id: 'research', label: 'Research & Insights' },
  { id: 'principles', label: 'Design Principles' },
  { id: 'walkthrough', label: 'Solution Walkthrough' },
  { id: 'system', label: 'Design System' },
  { id: 'decisions', label: 'Decisions & Trade-offs' },
  { id: 'metrics', label: 'Success Metrics' },
  { id: 'reflection', label: 'Reflection & Next Steps' },
];

const BRAND = '#4F378A';
const BRAND_TINT = '#F3EEFB';

export function StudyCaseStudy({ project }: { project: ProjectData }) {
  const study = project.study;
  if (!study) return null;

  const sectionNumber = (id: string) => {
    const index = navItems.findIndex((item) => item.id === id);
    return index >= 0 ? index + 1 : 0;
  };

  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Product', value: project.company },
    { label: 'Year', value: project.period },
  ].filter((row) => row.value);

  return (
    <>
      {/* Cover */}
      <header className="mb-14">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-ios-2xl border border-ios-separator bg-[#2D1D52]">
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
              <span className="inline-flex items-center rounded-full bg-[#EADDFF] px-3 py-1 text-xs font-semibold text-[#4F378A]">
                iOS app
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
            <p className="mt-2 text-sm font-medium text-[#4F378A]">{study.tagline}</p>
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
          {/* Summary */}
          <section id="summary" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('summary')} title="Summary" />
            <p className="max-w-3xl text-xl leading-relaxed text-ios-secondary">
              {project.overview}
            </p>

            <div className="mt-8 grid gap-px overflow-hidden rounded-ios-xl border border-ios-separator bg-ios-separator sm:grid-cols-2 lg:grid-cols-3">
              {study.meta.map((row) => (
                <div key={row.label} className="bg-white p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
                    {row.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ios-label">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-px overflow-hidden rounded-ios-xl border border-ios-separator bg-ios-separator sm:grid-cols-2 lg:grid-cols-4">
              {project.results.map((result) => (
                <div key={result.metric} className="bg-white p-5">
                  <p className="text-2xl font-bold tracking-tight text-ios-label">{result.value}</p>
                  <p className="mt-1 text-xs font-medium text-ios-label">{result.metric}</p>
                  {result.description && (
                    <p className="mt-1 text-xs leading-relaxed text-ios-tertiary">
                      {result.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Problem */}
          <section id="problem" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('problem')} title="The Problem" />
            <p className="max-w-3xl leading-relaxed text-ios-secondary">{project.problem}</p>
            <p className="mt-4 max-w-3xl text-sm font-medium text-ios-label">
              Two friction points tend to cause it:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {study.problemPoints.map((point, i) => (
                <div
                  key={point.title}
                  className="rounded-ios-xl border border-ios-separator bg-white p-6"
                >
                  <span className="font-mono text-xs font-semibold text-[#4F378A]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-ios-label">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ios-tertiary">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-ios-2xl bg-[#4F378A] p-7 text-white sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Problem statement
              </p>
              <p className="mt-3 max-w-3xl text-xl font-medium leading-snug sm:text-2xl">
                {study.problemStatement}
              </p>
            </div>
          </section>

          {/* Goals */}
          <section id="goals" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('goals')} title="Goals" />
            <ul className="grid gap-4 sm:grid-cols-2">
              {study.goals.map((goal) => (
                <li
                  key={goal}
                  className="flex gap-3 rounded-ios-xl border border-ios-separator bg-white p-5"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#EADDFF] text-[#4F378A]">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-ios-secondary">{goal}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Research */}
          <section id="research" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('research')} title="Research & Insights" />
            <p className="max-w-3xl leading-relaxed text-ios-secondary">
              {study.research.intro}
            </p>

            {study.research.note && (
              <p className="mt-6 max-w-3xl rounded-ios-lg border border-[#F5D9A8] bg-[#FFF8EC] p-4 text-sm leading-relaxed text-[#7A5200]">
                <span className="font-semibold">Note: </span>
                {study.research.note}
              </p>
            )}

            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
                Competitor audit
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {study.research.competitors.map((competitor) => (
                  <div
                    key={competitor.name}
                    className="rounded-ios-xl border border-ios-separator bg-white p-5"
                  >
                    <p className="text-sm font-semibold text-ios-label">{competitor.name}</p>
                    <p className="mt-2 text-xs leading-relaxed text-ios-tertiary">
                      {competitor.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
                  Key insights
                </h3>
                <ul className="mt-4 space-y-3">
                  {study.research.hypotheses.map((hypothesis) => (
                    <li
                      key={hypothesis}
                      className="flex gap-3 rounded-ios-xl border border-ios-separator bg-white p-4 text-sm leading-relaxed text-ios-secondary"
                    >
                      <Sparkles className="mt-0.5 size-4 shrink-0 text-[#4F378A]" />
                      {hypothesis}
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-ios-2xl border border-ios-separator bg-ios-grouped p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#4F378A] font-ios text-lg font-semibold text-white">
                    {study.research.persona.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-ios-label">
                      {study.research.persona.name}, {study.research.persona.age}
                    </p>
                    <p className="text-xs text-ios-tertiary">Primary persona</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ios-secondary">
                  {study.research.persona.summary}
                </p>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
                  Needs
                </p>
                <ul className="mt-2 space-y-2">
                  {study.research.persona.needs.map((need) => (
                    <li
                      key={need}
                      className="flex items-start gap-2 text-sm leading-relaxed text-ios-secondary"
                    >
                      <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[#4F378A]" />
                      {need}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          {/* Principles */}
          <section id="principles" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('principles')} title="Design Principles" />
            <div className="grid gap-4 sm:grid-cols-2">
              {study.principles.map((principle, i) => (
                <div
                  key={principle.title}
                  className="relative overflow-hidden rounded-ios-xl border border-ios-separator bg-white p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-1 font-ios text-6xl font-bold leading-none text-[#EADDFF]"
                  >
                    {i + 1}
                  </span>
                  <h3 className="relative text-base font-semibold text-ios-label">
                    {principle.title}
                  </h3>
                  <p className="relative mt-2 max-w-[26ch] text-sm leading-relaxed text-ios-tertiary">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Walkthrough */}
          <section id="walkthrough" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('walkthrough')} title="Solution Walkthrough" />
            <p className="max-w-3xl leading-relaxed text-ios-secondary">{study.screensIntro}</p>
            <p
              className="mt-5 max-w-3xl rounded-ios-lg p-4 text-sm leading-relaxed text-ios-tertiary"
              style={{ backgroundColor: BRAND_TINT }}
            >
              {study.screensNote}
            </p>

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
              Screen reference
            </p>
            <ul className="mt-3 divide-y divide-ios-separator overflow-hidden rounded-ios-xl border border-ios-separator bg-white">
              {study.screens.map((screen) => (
                <li
                  key={`ref-${screen.tag}`}
                  className="grid grid-cols-[72px_1fr] gap-x-4 px-5 py-3 text-sm sm:grid-cols-[96px_130px_1fr]"
                >
                  <span className="font-mono text-xs font-semibold text-[#4F378A]">
                    {screen.tag}
                  </span>
                  <span className="font-medium text-ios-label">{screen.screen}</span>
                  <span className="col-start-2 text-xs leading-relaxed text-ios-tertiary sm:col-start-3 sm:text-sm">
                    {screen.state}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-12 space-y-16">
              {study.screens.map((screen) => (
                <article key={screen.tag} className="border-t border-ios-separator pt-10">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12">
                    <figure className="mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:sticky lg:top-8 lg:mx-0 lg:self-start">
                      <div className="overflow-hidden rounded-[30px] border border-ios-separator bg-white shadow-ios">
                        <Image
                          src={screen.image}
                          alt={screen.imageAlt}
                          width={860}
                          height={1860}
                          className="h-auto w-full"
                          sizes="(max-width: 1024px) 60vw, 300px"
                        />
                      </div>
                      <figcaption className="mt-4 text-center text-xs leading-relaxed text-ios-tertiary lg:text-left">
                        <span className="font-semibold text-ios-label">{screen.tag}</span>
                        {' · '}
                        {screen.screen}
                        {' · '}
                        {screen.state}
                      </figcaption>
                    </figure>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ios-tertiary">
                        {screen.tag} / {screen.screen} / {screen.state}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-ios-label sm:text-3xl">
                        {screen.lead}
                      </h3>
                      <div className="mt-4 space-y-4">
                        {screen.body.map((paragraph) => (
                          <p key={paragraph} className="leading-relaxed text-ios-secondary">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      <div
                        className="mt-6 rounded-ios-xl border-l-4 p-5"
                        style={{ borderColor: BRAND, backgroundColor: BRAND_TINT }}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4F378A]">
                          Design decision
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ios-secondary">
                          {screen.decision}
                        </p>
                      </div>

                      <div className="mt-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
                          Iteration notes
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {screen.iterations.map((iteration) => (
                            <li
                              key={iteration}
                              className="flex gap-2.5 text-sm leading-relaxed text-ios-secondary"
                            >
                              <ArrowRight className="mt-1 size-4 shrink-0 text-[#4F378A]" />
                              {iteration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Design system */}
          <section id="system" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('system')} title="Design System" />
            <p className="max-w-3xl leading-relaxed text-ios-secondary">
              {study.system.intro}
            </p>

            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
                Colour
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {study.system.colors.map((color) => (
                  <div
                    key={color.name}
                    className="overflow-hidden rounded-ios-xl border border-ios-separator bg-white"
                  >
                    <div
                      className="h-16 w-full"
                      style={{ backgroundColor: color.value }}
                      aria-hidden="true"
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

            <div className="mt-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
                Typography
              </h3>
              <div className="mt-4 overflow-hidden rounded-ios-xl border border-ios-separator bg-white">
                {study.system.type.map((row) => (
                  <div
                    key={row.role}
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
                      <p className="text-sm font-medium text-ios-label">{row.role}</p>
                      <p className="text-xs leading-relaxed text-ios-tertiary">{row.usage}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-ios-tertiary">
                      {row.px}px / {row.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-ios-xl border border-ios-separator bg-white p-5">
                <Ruler className="size-4 text-[#4F378A]" />
                <p className="mt-3 text-sm font-semibold text-ios-label">Spacing</p>
                <p className="mt-1 text-xs leading-relaxed text-ios-tertiary">
                  {study.system.spacing}
                </p>
              </div>

              <div className="rounded-ios-xl border border-ios-separator bg-white p-5">
                <MousePointerClick className="size-4 text-[#4F378A]" />
                <p className="mt-3 text-sm font-semibold text-ios-label">Components</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {study.system.components.map((component) => (
                    <span
                      key={component}
                      className="rounded-full bg-ios-fill px-2.5 py-1 text-[11px] font-medium text-ios-secondary"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-ios-xl border border-ios-separator bg-white p-5">
                <Dumbbell className="size-4 text-[#4F378A]" />
                <p className="mt-3 text-sm font-semibold text-ios-label">Navigation</p>
                <p className="mt-1 text-xs leading-relaxed text-ios-tertiary">
                  {study.system.navigation}
                </p>
                <div className="mt-3 flex items-center justify-between rounded-full border border-ios-separator bg-white px-3 py-2">
                  <span className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-[#4F378A]">
                    <House className="size-4" />
                    Home
                  </span>
                  <span className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-ios-quaternary">
                    <Dumbbell className="size-4" />
                    Workouts
                  </span>
                  <span className="flex flex-col items-center gap-0.5 text-[10px] font-medium text-ios-quaternary">
                    <CircleUserRound className="size-4" />
                    Profile
                  </span>
                </div>
              </div>
            </div>

            {study.system.note && (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ios-tertiary">
                {study.system.note}
              </p>
            )}
          </section>

          {/* Decisions and trade-offs */}
          <section id="decisions" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('decisions')} title="Key Decisions & Trade-offs" />
            <p className="max-w-3xl leading-relaxed text-ios-secondary">
              Every decision bought clarity in one place and cost something in another. These are
              the trade-offs worth revisiting as the product grows.
            </p>

            <div className="mt-8 hidden overflow-hidden rounded-ios-xl border border-ios-separator md:block">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Key design decisions, the reasoning behind them and their trade-offs
                </caption>
                <thead className="bg-ios-grouped">
                  <tr>
                    {study.tradeoffs.headers.map((header) => (
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
                  {study.tradeoffs.rows.map((row) => (
                    <tr key={row[0]} className="align-top">
                      {row.map((cell, i) => (
                        <td
                          key={`${row[0]}-${i}`}
                          className={`px-5 py-4 leading-relaxed ${
                            i === 0
                              ? 'w-[34%] font-medium text-ios-label'
                              : 'text-ios-tertiary'
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

            <div className="mt-6 space-y-3 md:hidden">
              {study.tradeoffs.rows.map((row) => (
                <div
                  key={row[0]}
                  className="rounded-ios-xl border border-ios-separator bg-white p-5"
                >
                  <p className="text-sm font-semibold text-ios-label">{row[0]}</p>
                  <dl className="mt-3 space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
                        {study.tradeoffs.headers[1]}
                      </dt>
                      <dd className="mt-0.5 text-ios-secondary">{row[1]}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ios-tertiary">
                        {study.tradeoffs.headers[2]}
                      </dt>
                      <dd className="mt-0.5 text-ios-tertiary">{row[2]}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>

          {/* Metrics */}
          <section id="metrics" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('metrics')} title="Success Metrics" />
            <p className="max-w-3xl leading-relaxed text-ios-secondary">
              {study.metrics.intro}
            </p>
            <ul className="mt-6 divide-y divide-ios-separator rounded-ios-xl border border-ios-separator bg-white">
              {study.metrics.items.map((metric, i) => (
                <li key={metric.label} className="flex gap-4 p-5">
                  <span className="font-mono text-xs font-semibold text-[#4F378A]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ios-label">{metric.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ios-tertiary">
                      {metric.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Reflection */}
          <section id="reflection" className="scroll-mt-8">
            <SectionHeading index={sectionNumber('reflection')} title="Reflection & Next Steps" />

            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
                  What I learned
                </h3>
                <ul className="mt-4 space-y-3">
                  {study.learnings.map((learning) => (
                    <li
                      key={learning}
                      className="flex gap-3 rounded-ios-xl border border-ios-separator bg-white p-4 text-sm leading-relaxed text-ios-secondary"
                    >
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#4F378A]" />
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
                  Next steps
                </h3>
                <ol className="mt-4 space-y-3">
                  {study.nextSteps.map((step, i) => (
                    <li
                      key={step}
                      className="flex gap-3 rounded-ios-lg border border-ios-separator bg-white p-4 text-sm leading-relaxed text-ios-secondary"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#EADDFF] text-xs font-semibold text-[#4F378A]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-10 rounded-ios-2xl bg-ios-grouped p-8 text-center">
              <p className="font-ios text-xl font-semibold tracking-tight text-ios-label sm:text-2xl">
                The next session is the product.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ios-tertiary">
                Every empty state, quick start and streak exists to make that next session easier
                to begin than the last one.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
