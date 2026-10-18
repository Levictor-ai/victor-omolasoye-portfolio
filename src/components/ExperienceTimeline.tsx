'use client';

import type { ProfileData } from '@/context/PortfolioContext';
import { renderInline } from '@/lib/inline';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ExperienceTimeline({
  profile,
  headingClassName,
  eyebrow = 'The journey so far',
}: {
  profile: ProfileData;
  headingClassName?: string;
  eyebrow?: string;
}) {
  if (profile.experience.length === 0) return null;

  return (
    <section id="experience" className="mb-20">
      <Reveal className="mb-10">
        <SectionHeading
          display={!headingClassName}
          titleClassName={headingClassName}
          title="Experience"
          eyebrow={eyebrow}
        />
      </Reveal>

      <div className="relative">
        <span
          className="absolute bottom-4 left-[9px] top-4 w-px bg-gradient-to-b from-blue-600 via-gray-200 to-transparent sm:left-[11px]"
          aria-hidden="true"
        />
        <RevealGroup className="space-y-8">
          {profile.experience.map((exp, i) => (
            <RevealItem key={`${exp.company}-${i}`}>
              <div className="relative pl-9 sm:pl-14">
                <span
                  className="absolute left-0 top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-blue-600 bg-white sm:size-6"
                  aria-hidden="true"
                >
                  <span className="size-2 rounded-full bg-blue-600" />
                </span>
                <Card className="border-gray-200 transition-colors hover:border-blue-200">
                  <Badge variant="muted" size="md">
                    {exp.period}
                  </Badge>
                  <h3 className="mt-3 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                    {exp.role}
                  </h3>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                    {exp.company}
                  </p>
                  {exp.description && (
                    <div className="mt-3 space-y-3 text-body-sm leading-relaxed text-gray-600">
                      {exp.description.split('\n\n').map((paragraph, pi) => (
                        <p key={pi}>{renderInline(paragraph)}</p>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
