'use client';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  { title: 'Discover', body: 'Understand the idea, the problem, the audience, and the context.' },
  { title: 'Define', body: 'Find the direction, clarify the priorities, and establish what the work needs to achieve.' },
  { title: 'Explore', body: 'Develop different ideas through research, references, sketches, and visual exploration.' },
  { title: 'Create', body: 'Turn the strongest direction into a considered identity, product, or digital experience.' },
  { title: 'Refine', body: 'Question the details, remove what isn\u2019t necessary, and keep improving what works.' },
  { title: 'Deliver', body: 'Bring everything together into a clear, cohesive, and ready-to-use final experience.' },
];

export function HowIWork() {
  return (
    <section id="how-i-work" className="mb-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading display title="How I Bring Ideas to Life" eyebrow="Understand. Explore. Build. Refine." />
        </Reveal>
        <Reveal>
          <div className="relative pl-8 sm:pl-12">
            <div
              className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-ios-electric to-ios-navy sm:left-[23px]"
              aria-hidden="true"
            />
            <div className="space-y-6 sm:space-y-8">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.1}>
                  <div className="relative">
                    <div
                      className="absolute -left-8 top-1 flex size-8 items-center justify-center rounded-full border border-ios-electric/30 bg-ios-electric text-xs font-bold text-white shadow-ios sm:-left-12 sm:size-10 sm:text-sm"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="rounded-ios-xl border border-ios-electric/20 bg-white p-5 shadow-ios backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 sm:p-6">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold tracking-tight text-ios-ink sm:text-xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-2xl text-body-md leading-relaxed text-ios-secondary">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
