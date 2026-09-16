'use client';

import { motion } from 'framer-motion';

function BrandIcon() {
  return (
    <motion.div
      animate={{ rotate: [0, 12, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="flex size-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600"
    >
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22a10 10 0 1 1 10-10c0 2.21-1.79 4-4 4h-3a2 2 0 0 0-1.6 3.2c.5.7.1 2.8-1.4 2.8z" />
        <circle cx="7.5" cy="11" r="1" fill="currentColor" />
        <circle cx="10.5" cy="7.5" r="1" fill="currentColor" />
        <circle cx="15" cy="7.5" r="1" fill="currentColor" />
        <circle cx="17.5" cy="11" r="1" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

function ProductIcon() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
    >
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    </motion.div>
  );
}

function WebIcon() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      className="flex size-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600"
    >
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </motion.div>
  );
}

const services = [
  {
    title: 'Brand Design',
    icon: <BrandIcon />,
    description:
      'Building identities that give businesses and ideas a clear visual voice.',
    skills:
      'Identity systems \u00b7 Logo design \u00b7 Art direction \u00b7 Typography \u00b7 Colour \u00b7 Brand guidelines \u00b7 Packaging',
  },
  {
    title: 'Product Design',
    icon: <ProductIcon />,
    description:
      'Designing digital products that turn complex problems into clear and useful experiences.',
    skills:
      'Product strategy \u00b7 UX \u00b7 User flows \u00b7 UI design \u00b7 Design systems \u00b7 Prototyping \u00b7 AI-assisted product development',
  },
  {
    title: 'Web Design',
    icon: <WebIcon />,
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
            {service.icon}
            <h3 className="mb-3 mt-4 text-xl font-bold tracking-tight text-gray-900">
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