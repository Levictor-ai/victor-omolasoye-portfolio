'use client';

import type { ProfileData } from '@/context/PortfolioContext';
import { QuoteCard } from '@/components/ui/QuoteCard';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function TestimonialsSection({ profile }: { profile: ProfileData }) {
  const items = profile.testimonials;
  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="mb-20">
      <Reveal className="mb-8">
        <SectionHeading display title="Testimonials" eyebrow="What people say about working with me" />
      </Reveal>
      <RevealGroup className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <RevealItem key={`${item.author}-${i}`} className="h-full">
            <QuoteCard
              className="h-full"
              quote={<>&ldquo;{item.quote}&rdquo;</>}
              name={item.author}
              role={item.role}
              company={item.company}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
