'use client';

import { Card } from '@/components/ui/Card';
import { IconTile } from '@/components/ui/IconTile';
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
      <Reveal className="mb-8">
        <SectionHeading display title="How I Work" eyebrow="Understand. Explore. Build. Refine." />
      </Reveal>
      <div className="mx-auto max-w-3xl space-y-5 sm:mx-0 sm:grid sm:max-w-none sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="sticky sm:static sm:h-full"
            style={{ top: `calc(1rem + ${i * 0.5}rem)` }}
          >
            <Card variant="flat" hover className="h-full min-h-[180px] sm:min-h-[200px]">
              <IconTile variant="soft" size="sm" className="font-ios text-xl font-bold">
                {String(i + 1).padStart(2, '0')}
              </IconTile>
              <h3 className="text-lg font-bold tracking-tight text-ios-label sm:text-xl">
                {step.title}
              </h3>
              <p className="max-w-2xl text-body-md leading-relaxed text-ios-secondary">{step.body}</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
