'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { Layers, Palette, Users, Wrench } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { IconTile } from '@/components/ui/IconTile';
import { StatBlock } from '@/components/ui/StatBlock';
import { Reveal } from '@/components/ui/Reveal';

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
    <section id="stats" className="mb-20">
      <Reveal>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-3 bg-white p-6 sm:p-7">
              <IconTile variant="soft" size="sm">
                {stat.icon}
              </IconTile>
              <StatBlock
                value={
                  <>
                    <CountUp value={stat.value} />
                    {stat.suffix}
                  </>
                }
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
