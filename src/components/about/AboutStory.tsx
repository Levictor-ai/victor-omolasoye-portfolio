'use client';

import { Sparkles } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { Reveal } from '@/components/ui/Reveal';

export function AboutStory({ profile }: { profile: ProfileData }) {
  const paragraphs = profile.about
    .split('\n\n')
    .map((paragraph) => paragraph.trim())
    .filter(
      (paragraph) =>
        paragraph.length > 0 &&
        !paragraph.startsWith('##') &&
        !paragraph.startsWith('###'),
    );

  if (paragraphs[0]) {
    paragraphs[0] = paragraphs[0].replace(/^I'm Victor Omolasoye,\s*/i, "I'm ");
  }

  const currentRole = profile.experience[0];

  return (
    <section id="story" className="relative scroll-mt-32 overflow-hidden bg-[#F7F7FA]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[190px_minmax(0,1fr)_260px] lg:gap-14 lg:px-12 lg:py-28">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
            The person
          </p>
          <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-ios-secondary">
            The short version: curious by default, deliberate by practice, and
            always looking for the human reason behind the brief.
          </p>
        </Reveal>

        <div className="min-w-0">
          <Reveal>
            <h2 className="max-w-3xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-ios-ink sm:text-4xl lg:text-5xl">
              Curious by default.{' '}
              <span className="text-ios-tertiary">Deliberate by practice.</span>
            </h2>
          </Reveal>

          <div className="mt-8 max-w-2xl space-y-6">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.05 * index}>
                <p
                  className={
                    index === 0
                      ? 'text-xl leading-relaxed text-ios-ink sm:text-2xl'
                      : 'text-lg leading-relaxed text-ios-secondary'
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <blockquote className="mt-10 max-w-2xl border-l-2 border-ios-electric pl-5 text-2xl font-medium leading-snug tracking-tight text-ios-ink sm:text-3xl">
              &ldquo;I&rsquo;m naturally observant and reflective, and I enjoy
              finding inspiration in everyday experiences.&rdquo;
            </blockquote>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-ios-xl border border-ios-ink/10 bg-white p-5 shadow-ios-soft">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ios-tertiary">
              <Sparkles className="size-3.5 text-ios-electric" />
              Field notes
            </p>

            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-ios-tertiary">
                  Based in
                </dt>
                <dd className="mt-1 font-medium text-ios-ink">Lagos, Nigeria</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-ios-tertiary">
                  Designing since
                </dt>
                <dd className="mt-1 font-medium text-ios-ink">2020</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-ios-tertiary">
                  Focus
                </dt>
                <dd className="mt-1 font-medium text-ios-ink">
                  Brand, product, web
                </dd>
              </div>
              {currentRole && (
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-ios-tertiary">
                    Currently
                  </dt>
                  <dd className="mt-1 font-medium text-ios-ink">
                    {currentRole.role} at {currentRole.company}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-ios-tertiary">
                  Off-screen
                </dt>
                <dd className="mt-1 font-medium text-ios-ink">
                  Reading (fiction and non-fiction), K-dramas, films, music,
                  faith
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-ios-tertiary">
                  Availability
                </dt>
                <dd className="mt-1 flex items-center gap-2 font-medium text-ios-ink">
                  <span className="size-1.5 rounded-full bg-ios-green" />
                  Open to select projects
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
