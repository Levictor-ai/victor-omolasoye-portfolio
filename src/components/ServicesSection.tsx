'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Brand Design',
    description:
      'Building identities that give businesses and ideas a clear visual voice.',
    skills:
      'Identity systems \u00b7 Logo design \u00b7 Art direction \u00b7 Typography \u00b7 Colour \u00b7 Brand guidelines \u00b7 Packaging',
  },
  {
    title: 'Product Design',
    description:
      'Designing digital products that turn complex problems into clear and useful experiences.',
    skills:
      'Product strategy \u00b7 UX \u00b7 User flows \u00b7 UI design \u00b7 Design systems \u00b7 Prototyping \u00b7 AI-assisted product development',
  },
  {
    title: 'Web Design',
    description:
      'Creating digital experiences that connect brand, content, interaction, and technology.',
    skills:
      'Website strategy \u00b7 UX/UI \u00b7 Responsive design \u00b7 Interaction design \u00b7 Framer \u00b7 AI-assisted development \u00b7 Design to build',
  },
];

export function ServicesSection() {
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
      id="services"
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
        Services
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="mb-8 text-label-sm uppercase tracking-wider text-gray-400"
      >
        What I can do for you
      </motion.p>
      <motion.div
        variants={fadeUp}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-900">
              {service.title}
            </h3>
            <p className="mb-5 text-body-md leading-relaxed text-gray-600">
              {service.description}
            </p>
            <p className="mt-auto text-sm leading-relaxed text-gray-400">
              {service.skills}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
