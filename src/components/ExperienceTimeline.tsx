'use client';

import type { ProfileData } from '@/context/PortfolioContext';
import { Chip } from '@/components/ui/Badge';
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

      <div className="relative font-ios">
        <span
          className="absolute bottom-4 left-[9px] top-4 w-px bg-gradient-to-b from-ios-blue via-ios-separator to-transparent sm:left-[11px]"
          aria-hidden="true"
        />
        <RevealGroup className="space-y-8">
          {profile.experience.map((exp, i) => (
            <RevealItem key={`${exp.company}-${i}`}>
              <div className="relative pl-9 sm:pl-14">
                <span
                  className="absolute left-0 top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-ios-blue bg-white sm:size-6"
                  aria-hidden="true"
                >
                  <span className="size-2 rounded-full bg-ios-blue" />
                </span>
                <Card className="transition-colors hover:border-ios-blue/25">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-sm font-bold tracking-tight text-ios-label">
                      {exp.company}
                    </p>
                    <span className="text-xs text-ios-tertiary">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium tracking-tight text-ios-secondary">
                    {exp.role}
                  </p>
                  {exp.keywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.keywords.map((keyword) => (
                        <Chip key={keyword}>{keyword}</Chip>
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
