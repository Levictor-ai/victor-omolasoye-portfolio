'use client';

import { motion } from 'framer-motion';
import type { ProfileData } from '@/context/PortfolioContext';
import { renderInline } from '@/lib/inline';

export function ExperienceTimeline({
  profile,
  headingClassName,
  eyebrow = 'The journey so far',
}: {
  profile: ProfileData;
  headingClassName?: string;
  eyebrow?: string;
}) {
  if (profile.experience.length === 0) return null;

  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="mb-20"
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className={
          headingClassName ??
          'mb-1 font-display text-6xl font-bold leading-none tracking-wide text-gray-900 sm:text-7xl'
        }
      >
        Experience
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05 } },
        }}
        className="mb-10 text-label-sm uppercase tracking-wider text-blue-600"
      >
        {eyebrow}
      </motion.p>

      <div className="relative">
        <span
          className="absolute bottom-4 left-[9px] top-4 w-px bg-gradient-to-b from-blue-600 via-gray-200 to-transparent sm:left-[11px]"
          aria-hidden="true"
        />
        <ol className="space-y-8">
          {profile.experience.map((exp, i) => (
            <motion.li
              key={`${exp.company}-${i}`}
              variants={{
                hidden: { opacity: 0, x: -16 },
                show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
              }}
              className="relative pl-9 sm:pl-14"
            >
              <span
                className="absolute left-0 top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-blue-600 bg-white sm:size-6"
                aria-hidden="true"
              >
                <span className="size-2 rounded-full bg-blue-600" />
              </span>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-blue-200 sm:p-6">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {exp.period}
                </span>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                  {exp.role}
                </h3>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                  {exp.company}
                </p>
                {exp.description && (
                  <div className="mt-3 space-y-3 text-body-sm leading-relaxed text-gray-600">
                    {exp.description.split('\n\n').map((paragraph, pi) => (
                      <p key={pi}>{renderInline(paragraph)}</p>
                    ))}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}
