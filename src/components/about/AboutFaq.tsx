'use client';

import type { FAQ } from '@/context/PortfolioContext';
import { ButtonLink } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';

export function AboutFaq({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-32 border-t border-ios-separator bg-ios-grouped/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-12 lg:py-28">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
            06 &mdash; Questions
          </p>
          <h2 className="mt-4 max-w-md text-balance text-3xl font-bold leading-[1.05] tracking-tight text-ios-ink sm:text-4xl">
            The things people ask before we work together.
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ios-secondary">
            If your question is not here, ask it directly. I usually reply within
            a day.
          </p>
          <ButtonLink href="/contact" variant="outline" className="mt-6">
            Ask me anything
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion
            variant="divided"
            items={faqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
