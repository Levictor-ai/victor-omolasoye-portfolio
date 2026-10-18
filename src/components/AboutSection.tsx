'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck, FileText } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { renderInline } from '@/lib/inline';
import { buttonClass, ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function AboutSection({
  profile,
  headingClassName,
  showImages = true,
}: {
  profile: ProfileData;
  headingClassName?: string;
  showImages?: boolean;
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
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', overflowX: 'clip' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="mb-8 sm:mb-10"
        >
          <SectionHeading
            title="About Me"
            titleClassName={headingClassName}
            action={
              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                {profile.socials.contra && (
                  <a
                    href={profile.socials.contra}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass({ variant: 'outline', className: 'w-full sm:w-auto' })}
                  >
                    <BadgeCheck className="size-4 text-blue-600" strokeWidth={2.2} />
                    Hire me on Contra
                  </a>
                )}
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass({ variant: 'outline', className: 'w-full sm:w-auto' })}
                >
                  <FileText className="size-4 text-blue-600" strokeWidth={2.2} />
                  Resume
                </a>
              </div>
            }
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          {showImages && (
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg shadow-black/5"
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: 'top' }}
                sizes="(max-width: 1024px) 50vw, 40vw"
                priority
              />
            </motion.div>
            {profile.avatarAlt ? (
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg shadow-black/5"
              >
                <Image
                  src={profile.avatarAlt}
                  alt={`${profile.name} working`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: 'top' }}
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </motion.div>
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/50">
                <span className="text-label-sm uppercase tracking-wider text-gray-500">
                  Photo coming soon
                </span>
              </div>
            )}
          </div>
          )}
          <div className={showImages ? 'mt-10 lg:mt-12' : ''}>
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
              <ButtonLink
                href="/contact"
                className="w-full px-5 py-4 sm:w-auto"
              >
                Get in touch
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
