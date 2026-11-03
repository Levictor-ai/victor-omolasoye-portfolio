'use client';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const results = [
  {
    project: 'Forgelayers',
    title: '0 → 1 brand foundation',
    description:
      'Joined as founding designer and built the brand from scratch — visual language, identity foundations, and campaign systems for product, social, digital, and print.',
    href: undefined,
  },
  {
    project: 'Moovable Technology',
    title: 'Logistics MVP + full admin',
    description:
      'Designed the MVP and complete administrative experience for a logistics platform, turning complex operational workflows into clear, build-ready interfaces.',
    href: '/projects/moovabletech',
  },
  {
    project: 'Bunkie UI',
    title: '32 screens · 5 core flows',
    description:
      'Delivered the end-to-end mobile marketplace UI across onboarding, discovery, listings, identity verification, and profile management.',
    href: '/projects/bunkie-ui',
  },
  {
    project: 'Bunkie',
    title: 'WCAG AA brand system',
    description:
      'Built a scalable identity and design system with an accessible palette, typography hierarchy, and a shared component library used across product and marketing.',
    href: '/projects/bunkie',
  },
  {
    project: 'Hapnin',
    title: '32 research participants',
    description:
      'Ran qualitative and quantitative research with 32 people, synthesising 6 key pain points into the structure for a centralised event discovery product.',
    href: '/projects/hapnin',
  },
  {
    project: 'TokenForge',
    title: 'Accessible tokens in under 60s',
    description:
      'Designed an AI-assisted workflow that generates WCAG-compliant design tokens and exports them as CSS variables, Tailwind config, or JSON.',
    href: '/projects/token-forge',
  },
];

export function ResultsSection() {
  return (
    <section id="results" className="mb-20">
      <div className="px-6 sm:px-8 lg:px-12">
        <Reveal className="mb-8">
          <SectionHeading
            display
            title="Results I&rsquo;ve delivered"
            eyebrow="Concrete outcomes from my projects and experience"
            titleClassName="text-ios-ink"
          />
        </Reveal>
      </div>
      <div className="divide-y divide-ios-separator/80 py-12 px-6 sm:px-8 lg:px-12">
        {results.map((result, i) => {
          const row = (
            <div className="group grid gap-4 py-8 transition-transform duration-300 hover:translate-x-1 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
              <span className="text-5xl font-bold leading-none tracking-tight bg-gradient-to-br from-ios-electric to-ios-blue bg-clip-text text-transparent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ios-ink sm:text-3xl">
                  {result.title}
                </h3>
                <p className="mt-3 max-w-3xl text-body-md leading-relaxed text-ios-secondary">
                  {result.description}
                </p>
              </div>
            </div>
          );

          return <div key={result.title}>{row}</div>;
        })}
      </div>
    </section>
  );
}
