'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, BadgeCheck, FileText } from 'lucide-react';
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
      className="mb-8 bg-[#E9EBEF] py-28 lg:mb-16 lg:py-40"
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
            'mb-6 text-heading-lg font-bold tracking-tight text-gray-900'
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
          <div className="mb-8 flex w-full flex-col gap-3 sm:mb-10 sm:w-auto sm:flex-row sm:flex-wrap">
            {profile.socials.contra && (
              <a
                href={profile.socials.contra}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-transparent px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-black/30 hover:bg-black/10 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 sm:w-auto"
              >
                <BadgeCheck className="size-4 text-blue-600" strokeWidth={2.2} />
                Hire me on Contra
              </a>
            )}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-transparent px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:border-black/30 hover:bg-black/10 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 sm:w-auto"
            >
              <FileText className="size-4 text-blue-600" strokeWidth={2.2} />
              Resume
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                style={{ objectPosition: 'top' }}
                sizes="(max-width: 1024px) 50vw, 40vw"
                priority
              />
            </div>
            {profile.avatarAlt ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={profile.avatarAlt}
                  alt={`${profile.name} working`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'top' }}
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/50">
                <span className="text-label-sm uppercase tracking-wider text-gray-500">
                  Photo coming soon
                </span>
              </div>
            )}
          </div>
          <div className="mt-10 lg:mt-12">
            <div className="prose max-w-none">
              {profile.about.split('\n\n').map((paragraph, i) =>
                paragraph.startsWith('### ') ? (
                  <h3
                    key={i}
                    className="mb-5 text-heading-md font-bold tracking-tight text-gray-900"
                  >
                    {renderInline(paragraph.slice(4))}
                  </h3>
                ) : (
                  <p
                    key={i}
                    className="mb-5 last:mb-0 text-body-lg leading-relaxed text-gray-600"
                  >
                    {renderInline(paragraph, 'font-semibold text-gray-900')}
                  </p>
                ),
              )}
            </div>
            <div className="mt-8 w-full sm:w-auto">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 sm:w-auto"
              >
                Get in touch
                <span className="flex size-9 items-center justify-center rounded-full bg-white -my-1 transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="size-4 text-blue-600" strokeWidth={2.5} />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
