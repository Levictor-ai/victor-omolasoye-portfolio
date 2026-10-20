'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { IconTile } from '@/components/ui/IconTile';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

function BrandIcon() {
  return (
    <motion.div
      animate={{ rotate: [0, 12, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="text-ios-label"
    >
      <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      className="text-ios-label"
    >
      <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="text-ios-label"
    >
      <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  return (
    <section id="services" className="mb-20">
      <Reveal className="mb-8">
        <SectionHeading display title="Services" eyebrow="What I can do for you" />
      </Reveal>
      <div className="mx-auto max-w-3xl space-y-5">
        {services.map((service, i) => (
          <div
            key={service.title}
            className="sticky"
            style={{ top: `calc(4.5rem + ${i * 0.5}rem)` }}
          >
            <Card variant="flat" hover className="min-h-[210px] shadow-ios-lg">
              <IconTile size="lg">{service.icon}</IconTile>
              <h3 className="text-xl font-bold tracking-tight text-ios-label">{service.title}</h3>
              <p className="max-w-2xl text-body-md leading-relaxed text-ios-secondary">
                {service.description}
              </p>
              <p className="mt-auto max-w-2xl text-sm leading-relaxed text-ios-tertiary">
                {service.skills}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
