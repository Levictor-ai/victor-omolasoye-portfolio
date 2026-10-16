'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';

export function TestimonialsSection({ profile }: { profile: ProfileData }) {
  const items = profile.testimonials;
  if (items.length === 0) return null;

  return (
    <motion.section
      id="testimonials"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="mb-20"
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-1 font-display text-6xl font-bold leading-none tracking-wide text-gray-900 sm:text-7xl"
      >
        Testimonials
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05 } },
        }}
        className="mb-8 text-label-sm uppercase tracking-wider text-blue-600"
      >
        What people say about working with me
      </motion.p>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <motion.blockquote
            key={`${item.author}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
            whileHover={{ y: -6 }}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_24px_60px_-40px] shadow-black/30 transition-shadow hover:shadow-[0_32px_70px_-34px] hover:shadow-black/30 sm:p-7"
          >
            <Quote className="mb-4 size-7 shrink-0 text-blue-600" strokeWidth={1.8} />
            <p className="mb-6 text-body-md leading-relaxed text-gray-700">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-auto flex items-center gap-3 border-t border-gray-200 pt-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-sm font-semibold uppercase text-white">
                {item.author.trim().charAt(0) || '?'}
              </span>
              <cite className="not-italic">
                <span className="block text-sm font-semibold text-gray-900">{item.author}</span>
                <span className="text-sm text-gray-500">
                  {item.role}
                  {item.company ? ` @ ${item.company}` : ''}
                </span>
              </cite>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </motion.section>
  );
}
