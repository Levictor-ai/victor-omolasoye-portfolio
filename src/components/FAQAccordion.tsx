'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/context/PortfolioContext';

interface Props {
  items: FAQ[];
}

export function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-slate-700/30 rounded-xl border border-slate-700/20">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={index}>
            <h3>
              <button
                id={buttonId}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-slate-200 transition-colors hover:text-indigo-300 sm:px-6 sm:text-base"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`size-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-4 text-sm leading-relaxed text-slate-400 sm:px-6">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
