'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { Layers, Palette, Users, Wrench } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';

function CountUp({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

export function StatsBand({ profile }: { profile: ProfileData }) {
  const stats = [
    {
      icon: <Palette className="size-5" strokeWidth={2.2} />,
      value: 4,
      suffix: '+',
      label: 'Years of experience',
    },
    {
      icon: <Layers className="size-5" strokeWidth={2.2} />,
      value: profile.experience.length,
      suffix: '',
      label: 'Teams worked with',
    },
    {
      icon: <Wrench className="size-5" strokeWidth={2.2} />,
      value: profile.tools.length + profile.technicalHandoff.length,
      suffix: '',
      label: 'Tools & technologies',
    },
    {
      icon: <Users className="size-5" strokeWidth={2.2} />,
      value: profile.testimonials.length,
      suffix: '+',
      label: 'Client testimonials',
    },
  ];

  return (
    <motion.section
      id="stats"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="mb-20"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-3 bg-white p-6 sm:p-7">
            <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              {stat.icon}
            </span>
            <span className="font-display text-5xl font-bold leading-none tracking-wide text-gray-900 sm:text-6xl">
              <CountUp value={stat.value} />
              {stat.suffix}
            </span>
            <span className="text-sm font-medium text-gray-500">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
