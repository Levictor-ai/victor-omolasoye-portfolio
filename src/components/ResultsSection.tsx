'use client';

import { Card } from '@/components/ui/Card';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const results = [
  {
    title: '0\u21921 products',
    description:
      'Helped take digital products from early ideas and requirements into structured, usable interfaces.',
  },
  {
    title: 'Brand foundations',
    description:
      'Built visual identities and systems from the ground up for emerging brands and businesses.',
  },
  {
    title: 'End-to-end product work',
    description:
      'Designed product experiences across user flows, interfaces, design systems, prototypes, and admin platforms.',
  },
  {
    title: 'Launch-ready experiences',
    description:
      'Created brand and digital work prepared for real-world launch and implementation.',
  },
  {
    title: 'Faster exploration',
    description:
      'Used AI-assisted workflows to move from concept to functional prototypes and web experiences faster.',
  },
  {
    title: 'Cross-functional design',
    description:
      'Worked across brand, product, and web to create more consistent experiences from identity through interface.',
  },
];

export function ResultsSection() {
  return (
    <section id="results" className="mb-20">
      <Reveal className="mb-8">
        <SectionHeading
          display
          title="Results I&rsquo;ve delivered"
          eyebrow="The impact I bring across brand, product & web"
        />
      </Reveal>
      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <RevealItem key={result.title} className="h-full">
            <Card hover className="h-full">
              <span className="block h-1 w-8 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-14" />
              <h3 className="text-lg font-bold tracking-tight text-gray-900">{result.title}</h3>
              <p className="text-body-md leading-relaxed text-gray-600">{result.description}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
