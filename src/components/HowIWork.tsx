'use client';

import { motion } from 'framer-motion';

const steps = [
  { title: 'Discover', body: 'Understand the idea, the problem, the audience, and the context.' },
  { title: 'Define', body: 'Find the direction, clarify the priorities, and establish what the work needs to achieve.' },
  { title: 'Explore', body: 'Develop different ideas through research, references, sketches, and visual exploration.' },
  { title: 'Create', body: 'Turn the strongest direction into a considered identity, product, or digital experience.' },
  { title: 'Refine', body: 'Question the details, remove what isn\u2019t necessary, and keep improving what works.' },
  { title: 'Deliver', body: 'Bring everything together into a clear, cohesive, and ready-to-use final experience.' },
];

export function HowIWork() {
  return (
    <motion.section
      id="how-i-work"
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
        How I Work
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05 } },
        }}
        className="mb-8 text-label-sm uppercase tracking-wider text-gray-400"
      >
        Understand. Explore. Build. Refine.
      </motion.p>
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }}>
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="grid gap-2 md:grid-cols-[110px_1fr] md:gap-6"
            >
              <span className="font-display text-2xl font-bold leading-none tracking-wide text-gray-900">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-body-md leading-relaxed text-gray-600">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}