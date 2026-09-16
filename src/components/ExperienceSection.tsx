'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ProfileData } from '@/context/PortfolioContext';
import { renderInline } from '@/lib/inline';

function ExpandableDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      if (ref.current) {
        setOverflowing(ref.current.scrollHeight > ref.current.clientHeight + 1);
      }
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [expanded]);

  return (
    <div>
      <div
        ref={ref}
        className={`space-y-3 text-body-sm leading-relaxed text-gray-600 ${
          expanded ? '' : 'line-clamp-2'
        }`}
      >
        {text.split('\n\n').map((paragraph, pi) => (
          <p key={pi}>{renderInline(paragraph)}</p>
        ))}
      </div>
      {overflowing && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export function ExperienceSection({
  profile,
  headingClassName,
}: {
  profile: ProfileData;
  headingClassName?: string;
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
        show: { transition: { staggerChildren: 0.1 } },
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
          'mb-1 text-heading-lg font-bold tracking-tight text-gray-900'
        }
      >
        Experience
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05 } },
        }}
        className="mb-8 text-label-sm uppercase tracking-wider text-gray-400"
      >
        Where I&rsquo;ve worked
      </motion.p>
      <div>
        {profile.experience.map((exp, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, x: -16 },
              show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
            }}
            className={i === 0 ? '' : 'mt-7 border-t border-gray-200/70 pt-7 sm:mt-8 sm:pt-8'}
          >
            <div className="grid gap-2 md:grid-cols-[200px_1fr] md:gap-8">
              <div>
                <p className="text-sm font-medium text-gray-400">{exp.period}</p>
                <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">{exp.role}</p>
                <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-gray-900">
                  {exp.company}
                </p>
              </div>
              {exp.description && (
                <ExpandableDescription text={exp.description} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}