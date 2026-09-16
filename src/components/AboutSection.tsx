'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ProfileData } from '@/context/PortfolioContext';
import { renderInline } from '@/lib/inline';

export function AboutSection({
  profile,
  headingClassName,
}: {
  profile: ProfileData;
  headingClassName?: string;
}) {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="bg-black py-24 lg:py-32"
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className={
            headingClassName ??
            'mb-6 text-heading-lg font-bold tracking-tight text-white'
          }
        >
          About Me
        </motion.h2>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-10">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                style={{ objectPosition: 'top' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="prose prose-invert max-w-none">
                {profile.about.split('\n\n').map((paragraph, i) => (
                  <p
                    key={i}
                    className="mb-5 last:mb-0 text-body-lg leading-relaxed text-gray-300"
                  >
                    {renderInline(paragraph, 'font-semibold text-white')}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                >
                  Hire Me
                  <span className="flex size-9 items-center justify-center rounded-full bg-white -my-1 transition-transform group-hover:translate-x-0.5">
                    <svg className="size-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
