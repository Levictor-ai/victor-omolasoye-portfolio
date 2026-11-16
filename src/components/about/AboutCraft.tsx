'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import type { ProfileData, Skill } from '@/context/PortfolioContext';
import { Reveal } from '@/components/ui/Reveal';

const services = [
  {
    title: 'Brand & graphic design',
    blurb:
      'Identities with a point of view — and the systems that keep them consistent.',
    description:
      'I build distinctive brand identities and visual languages that give a business a recognisable presence. That covers strategy, logo and mark, typography, colour, layout, guidelines and the campaign assets that keep the system alive.',
    skills: [
      'Brand identity',
      'Logo design',
      'Art direction',
      'Typography',
      'Colour systems',
      'Brand guidelines',
      'Packaging',
      'Marketing design',
    ],
    example: { label: 'See the Bunkie brand system', href: '/projects/bunkie' },
  },
  {
    title: 'Product design',
    blurb: 'Interfaces that make the complex feel obvious.',
    description:
      'I turn ideas and messy problems into products people can move through without instructions. Research, flows, interface design, prototypes and design systems — with enough engineering context to make the handoff real.',
    skills: [
      'Product thinking',
      'UX research',
      'User flows',
      'Interface design',
      'Design systems',
      'Prototyping',
      'AI-assisted product development',
    ],
    example: { label: 'See the Payvo product', href: '/projects/payvo' },
  },
  {
    title: 'Web design',
    blurb: 'Sites that carry the brand and do the work.',
    description:
      'I design and build web experiences that hold the identity, tell the story and stay usable. From the first content outline to the responsive build, the goal is a site that feels like the brand and behaves like a product.',
    skills: [
      'Website strategy',
      'UX/UI design',
      'Responsive design',
      'Interaction design',
      'Framer',
      'Design-to-build',
    ],
    example: { label: 'See the Veyra landing page', href: '/projects/veyra' },
  },
];

const levelDots: Record<Skill['level'], number> = {
  Familiar: 1,
  Proficient: 2,
  Expert: 3,
};

function SkillList({ title, skills }: { title: string; skills: Skill[] }) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-ios-separator pb-3">
        <h3 className="text-sm font-semibold text-ios-label">{title}</h3>
        <span className="text-[10px] uppercase tracking-[0.14em] text-ios-tertiary">
          Familiar → Expert
        </span>
      </div>
      <ul>
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center justify-between gap-4 border-b border-ios-separator py-3"
          >
            <span className="text-sm text-ios-secondary">{skill.name}</span>
            <span className="flex items-center gap-3">
              <span
                className="flex items-center gap-1"
                aria-label={`${skill.name}: ${skill.level}`}
              >
                {[1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={`size-1.5 rounded-full ${
                      dot <= levelDots[skill.level]
                        ? 'bg-ios-electric'
                        : 'bg-ios-fill-strong'
                    }`}
                  />
                ))}
              </span>
              <span className="w-20 text-right text-[10px] uppercase tracking-[0.1em] text-ios-tertiary">
                {skill.level}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutCraft({ profile }: { profile: ProfileData }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  const toolNames = [...profile.tools, ...profile.technicalHandoff].map(
    (tool) => tool.name,
  );
  const marquee = [...toolNames, ...toolNames];

  return (
    <section id="craft" className="scroll-mt-32 bg-white">
      <span id="services" className="block scroll-mt-32" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
                02 &mdash; The craft
              </p>
              <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold leading-[1.05] tracking-tight text-ios-ink sm:text-4xl lg:text-5xl">
                Three ways I help ideas take shape.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ios-secondary lg:justify-self-end">
              I work across the whole arc — from the first strategic question to
              the final build-ready screen. The common thread is clarity: making
              something feel simple without making it shallow.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-ios-separator">
          {services.map((service, index) => {
            const isOpen = open === index;
            const buttonId = `${baseId}-service-${index}`;
            const panelId = `${baseId}-service-panel-${index}`;

            return (
              <div key={service.title} className="border-b border-ios-separator">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="group flex w-full items-start gap-4 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-electric/40 sm:gap-6 sm:py-8"
                >
                  <span className="mt-1 font-mono text-[11px] font-medium text-ios-tertiary">
                    0{index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-2xl font-semibold tracking-tight text-ios-ink transition-colors group-hover:text-ios-electric sm:text-3xl">
                      {service.title}
                    </span>
                    <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-ios-tertiary sm:text-base">
                      {service.blurb}
                    </span>
                  </span>
                  <span
                    className={`mt-1 grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-ios-electric bg-ios-electric text-white shadow-ios-button'
                        : 'border-ios-separator bg-white text-ios-secondary group-hover:border-ios-electric/40 group-hover:text-ios-electric'
                    }`}
                  >
                    <Plus className="size-4" strokeWidth={2.4} />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-7 pb-8 pl-8 sm:pl-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
                      <p className="max-w-2xl text-base leading-relaxed text-ios-secondary">
                        {service.description}
                      </p>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ios-tertiary">
                          Capabilities
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {service.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-ios-fill px-2.5 py-1 text-[11px] font-medium text-ios-secondary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={service.example.href}
                          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ios-electric"
                        >
                          {service.example.label}
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
                  The toolbox
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ios-ink sm:text-3xl">
                  Daily drivers &amp; handoff skills.
                </h3>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ios-tertiary">
                The tools change with the problem. The habit is the same: keep the
                craft close to the build.
              </p>
            </div>
          </Reveal>

          <div className="marquee-fade-x mt-8 overflow-hidden border-y border-ios-separator py-5">
            <div
              className="marquee-track flex w-max items-center gap-8 motion-reduce:animate-none"
              style={{ '--marquee-duration': '44s' } as React.CSSProperties}
              aria-hidden="true"
            >
              {marquee.map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  className="flex shrink-0 items-center gap-8 text-4xl font-bold tracking-tight text-outline sm:text-5xl"
                >
                  {name}
                  <span className="text-base text-ios-electric">✦</span>
                </span>
              ))}
            </div>
            <ul className="sr-only">
              {toolNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
            <SkillList title="Design" skills={profile.tools} />
            <SkillList title="Handoff & build" skills={profile.technicalHandoff} />
          </div>
        </div>
      </div>
    </section>
  );
}
