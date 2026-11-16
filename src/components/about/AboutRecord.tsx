'use client';

import type { ProfileData } from '@/context/PortfolioContext';
import { Reveal } from '@/components/ui/Reveal';

const months: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function endScore(period: string) {
  const end = period.split('—').pop()?.trim() ?? period;
  if (/present/i.test(end)) return Number.POSITIVE_INFINITY;

  const match = end.match(/([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/);
  if (!match) return 0;

  return Number(match[2]) * 12 + (months[match[1].toLowerCase()] ?? 0);
}

export function AboutRecord({ profile }: { profile: ProfileData }) {
  if (profile.experience.length === 0) return null;

  const roles = [...profile.experience].sort(
    (a, b) => endScore(b.period) - endScore(a.period),
  );

  return (
    <section id="record" className="scroll-mt-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
              The record
            </p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-ios-ink sm:text-4xl lg:text-5xl">
              Where I&rsquo;ve been.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ios-secondary">
              Eight teams, one throughline: make the complex feel clear. The roles
              range from founding designer to brand co-lead, but the work keeps
              returning to systems, stories and the people using them.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 border-t border-ios-separator">
          {roles.map((role, index) => (
            <Reveal key={`${role.company}-${role.period}`} delay={index * 0.03}>
              <div className="grid gap-3 border-b border-ios-separator py-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 sm:py-7">
                <p className="font-mono text-[11px] text-ios-tertiary">
                  {role.period}
                </p>
                <div>
                  <p className="text-xl font-semibold tracking-tight text-ios-ink sm:text-2xl">
                    {role.company}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ios-secondary">
                    {role.role}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {role.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-ios-fill px-2.5 py-1 text-[11px] font-medium text-ios-secondary"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
