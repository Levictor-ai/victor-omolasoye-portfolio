'use client';

import { Card } from '@/components/ui/Card';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
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
      <Reveal className="mb-8">
        <SectionHeading
          display
          title="Results I&rsquo;ve delivered"
          eyebrow="Concrete outcomes from my projects and experience"
        />
      </Reveal>
      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <RevealItem key={result.title} className="h-full">
            <Card href={result.href} hover className="h-full">
              <span className="text-[11px] font-semibold uppercase tracking-tightr text-ios-blue">
                {result.project}
              </span>
              <h3 className="text-lg font-bold tracking-tight text-ios-label">{result.title}</h3>
              <p className="text-body-md leading-relaxed text-ios-secondary">{result.description}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
