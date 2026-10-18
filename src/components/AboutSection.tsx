'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck, FileText, MapPin } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { renderInline } from '@/lib/inline';
import { buttonClass, ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Chip } from '@/components/ui/Badge';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function AboutSection({
  profile,
  headingClassName,
  showImages = true,
}: {
  profile: ProfileData;
  headingClassName?: string;
  showImages?: boolean;
}) {
  const [lead, ...rest] = profile.about.split('\n\n');

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
      className="fx-grid-lines mb-8 bg-[#E9EBEF] py-24 lg:mb-16 lg:py-32"
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', overflowX: 'clip' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <SectionHeading
            eyebrow="Who I am"
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

        {showImages && (
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="relative grid grid-cols-2 gap-4 sm:gap-6"
          >
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
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className={showImages ? 'mt-12 lg:mt-16' : ''}
        >
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Chip icon={<MapPin className="size-3.5" />}>{profile.location}</Chip>
            {profile.titles.slice(0, 2).map((title) => (
              <Chip key={title}>{title}</Chip>
            ))}
            <Chip
              icon={
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
              }
            >
              Open to work
            </Chip>
          </div>

          <p className="max-w-4xl text-balance text-xl font-medium leading-relaxed text-gray-900 sm:text-2xl">
            {renderInline(lead, 'font-semibold text-gray-900')}
          </p>

          <div className="mt-10 border-t border-black/[0.08] pt-10 lg:columns-2 lg:gap-14 lg:[column-rule:1px_solid_rgba(17,19,26,0.08)]">
            {rest.map((paragraph, i) =>
              paragraph.startsWith('### ') ? (
                <h3
                  key={i}
                  className="mb-4 break-inside-avoid text-heading-md font-bold tracking-tight text-gray-900"
                >
                  {renderInline(paragraph.slice(4))}
                </h3>
              ) : (
                <p
                  key={i}
                  className="mb-6 text-body-lg leading-relaxed text-gray-600 last:mb-0"
                >
                  {renderInline(paragraph, 'font-semibold text-gray-900')}
                </p>
              ),
            )}
          </div>

          <div className="mt-10 w-full sm:w-auto">
            <ButtonLink href="/contact" className="w-full px-5 py-4 sm:w-auto">
              Get in touch
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
