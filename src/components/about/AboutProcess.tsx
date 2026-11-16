'use client';

import { Reveal } from '@/components/ui/Reveal';

const steps = [
  {
    title: 'Discover',
    body: 'Understand the idea, the problem, the audience and the context.',
  },
  {
    title: 'Define',
    body: 'Find the direction, clarify priorities and establish what the work needs to achieve.',
  },
  {
    title: 'Explore',
    body: 'Develop different ideas through research, references, sketches and visual exploration.',
  },
  {
    title: 'Create',
    body: 'Turn the strongest direction into a considered identity, product or digital experience.',
  },
  {
    title: 'Refine',
    body: 'Question the details, remove what is not necessary and keep improving what works.',
  },
  {
    title: 'Deliver',
    body: 'Bring everything together into a clear, cohesive and ready-to-use final experience.',
  },
];

export function AboutProcess() {
  return (
    <section id="process" className="relative scroll-mt-32 overflow-hidden bg-ios-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,rgba(47,91,255,0.22),transparent_65%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-ios-electric/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                The process
              </p>
              <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                From first question to final handoff.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-white/60 lg:justify-self-end">
              A flexible six-part rhythm I return to on every project. The order
              moves; the questions stay the same.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-ios-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.04}>
              <div className="group h-full bg-ios-navy p-6 transition-colors duration-300 hover:bg-white/[0.045] sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-ios-electric/80" />
                  <span
                    className="h-px flex-1 bg-white/10 transition-colors group-hover:bg-ios-electric/50"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-white/40">
            <p>No two projects are identical. The discipline is.</p>
            <p className="font-mono uppercase tracking-[0.2em]">
              Question → Direction → Craft → Handoff
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
