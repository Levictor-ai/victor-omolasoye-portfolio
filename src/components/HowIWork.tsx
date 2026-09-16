'use client';

import { motion } from 'framer-motion';

const beliefs = [
  {
    title: 'Good design starts with understanding',
    body: "I don't believe in designing from assumptions. Before I make a screen, identity, or visual system, I want to understand the problem, the people it is for, and what the business is trying to achieve. The better I understand the context, the more intentional the design becomes.",
  },
  {
    title: 'Design is more than making things look good',
    body: 'A beautiful interface can still be confusing. A strong brand can still fail to communicate. I care about aesthetics, but I care just as much about clarity, usability, and purpose. Every design decision should have a reason behind it.',
  },
  {
    title: 'I enjoy building from 0 → 1',
    body: "Some of my most meaningful work has been starting with very little and helping shape what comes next. From defining a brand's visual direction to structuring a product experience, I enjoy turning ideas into something tangible, coherent, and ready to grow.",
  },
  {
    title: 'Collaboration makes the work better',
    body: "I don't see design as a solo process. The best solutions often come from working closely with founders, product teams, developers, marketers, and other designers. I value open conversations, honest feedback, and bringing different perspectives into the process because good collaboration often reveals things I wouldn't see on my own.",
  },
  {
    title: 'Brand and product should speak the same language',
    body: "I don't see brand identity and digital products as separate worlds. The way a company looks, communicates, and behaves should feel connected wherever people encounter it. I think about the bigger experience\u2014not just the logo or the interface in isolation.",
  },
  {
    title: 'AI should amplify the designer, not replace the thinking',
    body: "I see AI as another tool in the design process\u2014one that can help me explore ideas faster, research possibilities, generate directions, and reduce repetitive work. But the important decisions still require human judgment, context, empathy, and taste. I use AI to expand what I can explore, while keeping the thinking and responsibility behind the work firmly with me.",
  },
  {
    title: 'Design should work in the real world',
    body: "The best design isn't always the most complicated. I think about the person using the product, the context they're in, the limitations they might have, and what they actually need to accomplish. My goal is to make things feel simple, useful, and natural.",
  },
  {
    title: 'I care about what happens after the design',
    body: "A design isn't finished when the Figma file is handed over. I like working closely with developers and stakeholders to make sure the idea survives implementation. I care about the final experience\u2014not just how it looked in the design file.",
  },
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
        What I believe about design
      </motion.p>
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }}>
        <div className="space-y-10">
          {beliefs.map((belief, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="grid gap-2 md:grid-cols-[80px_1fr] md:gap-6"
            >
              <span className="text-sm font-bold tracking-tight text-blue-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                  {belief.title}
                </h3>
                <p className="mt-2 text-body-md leading-relaxed text-gray-600">{belief.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}