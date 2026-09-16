'use client';

import { motion } from 'framer-motion';

export function HowIWork() {
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
      id="how-i-work"
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
        How I Work
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="mb-8 text-label-sm uppercase tracking-wider text-gray-400"
      >
        Understand. Explore. Build. Refine.
      </motion.p>
      <motion.div variants={fadeUp} className="max-w-3xl space-y-5">
        <p className="text-body-lg leading-relaxed text-gray-600">
          I don&rsquo;t start with the solution. I start with the problem.
        </p>
        <p className="text-body-lg leading-relaxed text-gray-600">
          I take time to understand the idea, the people it is for, and what it needs to achieve.
          I explore different directions, find the strongest one, and give it structure before moving
          into the details.
        </p>
        <p className="text-body-lg leading-relaxed text-gray-600">
          From there, I design, prototype, test, and refine. I work closely with people throughout
          the process, because good work rarely happens in isolation.
        </p>
        <p className="text-body-lg leading-relaxed text-gray-600">
          I also like to stay close to the making. With AI, no-code tools, and modern development
          workflows becoming part of the creative process, I can move an idea beyond the canvas and
          closer to something real.
        </p>
        <p className="text-body-lg leading-relaxed text-gray-600">
          The goal is simple:{' '}
          <strong className="font-semibold text-gray-900">
            make thoughtful work that looks good, works well, and has a reason behind it.
          </strong>
        </p>
      </motion.div>
    </motion.section>
  );
}
