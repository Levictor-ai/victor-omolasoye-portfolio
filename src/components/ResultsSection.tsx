'use client';

import { motion } from 'framer-motion';

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
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="results"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={stagger}
      className="mb-20"
    >
      <motion.h2
        variants={fadeUp}
        className="mb-1 font-display text-6xl font-bold leading-none tracking-wide text-gray-900 sm:text-7xl"
      >
        Results I&rsquo;ve delivered
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="mb-8 text-label-sm uppercase tracking-wider text-gray-400"
      >
        The impact I bring across brand, product &amp; web
      </motion.p>
      <motion.div variants={fadeUp} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.title}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6"
          >
            <h3 className="mb-3 text-lg font-bold tracking-tight text-gray-900">
              {result.title}
            </h3>
            <p className="text-body-md leading-relaxed text-gray-600">{result.description}</p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}