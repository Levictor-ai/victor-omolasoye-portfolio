'use client';

'use client';

import type { ProfileData } from '@/context/PortfolioContext';
import { QuoteCard } from '@/components/ui/QuoteCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function TestimonialsSection({ profile }: { profile: ProfileData }) {
  const items = profile.testimonials;
  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <section id="testimonials" className="mb-20">
      <Reveal className="mb-8">
        <SectionHeading display title="Testimonials" eyebrow="What people say about working with me" />
      </Reveal>
      <div className="marquee-fade-x overflow-hidden">
        <div
          className="flex w-max gap-6 marquee-track"
          style={{ '--marquee-duration': `${Math.max(30, items.length * 12)}s` } as React.CSSProperties}
        >
          {loop.map((item, i) => (
            <div
              key={`${item.author}-${i}`}
              className="w-[20rem] shrink-0 sm:w-[24rem]"
              aria-hidden={i >= items.length || undefined}
            >
              <QuoteCard
                className="h-full"
                quote={<>&ldquo;{item.quote}&rdquo;</>}
                name={item.author}
                role={item.role}
                company={item.company}
                avatar={item.avatar ? { src: item.avatar, alt: item.author } : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
