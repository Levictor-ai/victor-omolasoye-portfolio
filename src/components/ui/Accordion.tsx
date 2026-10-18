'use client';

import { useId, useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface AccordionItemData {
  question: ReactNode;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
  variant?: 'divided' | 'card';
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'divided',
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen);
  const baseId = useId();

  function toggle(index: number) {
    setOpen((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index);
      return allowMultiple ? [...prev, index] : [index];
    });
  }

  if (items.length === 0) return null;

  return (
    <div className={cn(variant === 'card' && 'grid gap-3', className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={index}
            className={cn(
              variant === 'divided'
                ? 'border-t border-gray-200 last:border-b'
                : 'overflow-hidden rounded-2xl border border-gray-200 bg-white',
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  'flex w-full items-center justify-between gap-6 text-left font-bold tracking-tight text-gray-900 transition-colors hover:text-blue-600',
                  variant === 'divided'
                    ? 'py-6 text-xl sm:py-7 sm:text-2xl'
                    : 'px-5 py-4 text-base sm:px-6 sm:text-lg',
                )}
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    'grid size-10 flex-none place-items-center rounded-full border border-gray-300 text-gray-900 transition-all duration-200',
                    isOpen && 'rotate-45 border-transparent bg-blue-600 text-white',
                  )}
                >
                  <Plus className="size-4" strokeWidth={2.4} />
                </span>
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="overflow-hidden"
              >
                <div
                  className={cn(
                    'max-w-3xl text-base leading-relaxed text-gray-600',
                    variant === 'divided' ? 'pb-6 pr-16 sm:pb-7' : 'px-5 pb-5 sm:px-6',
                  )}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
