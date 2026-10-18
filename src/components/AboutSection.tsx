'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck, FileText } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { renderInline } from '@/lib/inline';
import { buttonClass, ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

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
  const titles = profile.titles.length > 0 ? profile.titles : ['Designer'];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (titles.length < 2) return;
    const id = setInterval(() => setTitleIndex((i) => (i + 1) % titles.length), 2400);
    return () => clearInterval(id);
  }, [titles.length]);

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
      className="mb-8 bg-[#E9EBEF] py-24 lg:mb-16 lg:py-32"
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', overflowX: 'clip' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <SectionHeading
            eyebrow="About me"
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
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-10 sm:mt-14"
        >
          <div className="max-w-4xl">
            <h3 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Hi, I&rsquo;m {profile.name}.
            </h3>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-xl leading-snug text-gray-600 sm:text-2xl">
              <span>I&rsquo;m a</span>
              <span className="inline-flex min-h-[1.3em] items-baseline font-semibold text-blue-600">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={titles[titleIndex]}
                    initial={{ y: '0.7em', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-0.7em', opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {titles[titleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>based in {profile.location}.</span>
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">{profile.bio}</p>
          </div>

          <div className="mt-10 max-w-4xl border-t border-black/[0.08] pt-10">
            {profile.about.split('\n\n').map((paragraph, i) =>
              paragraph.startsWith('### ') ? (
                <h3
                  key={i}
                  className="mb-3 mt-8 text-heading-md font-bold tracking-tight text-gray-900 first:mt-0"
                >
                  {renderInline(paragraph.slice(4))}
                </h3>
              ) : (
                <p key={i} className="mb-6 text-body-lg leading-relaxed text-gray-600 last:mb-0">
                  {renderInline(paragraph, 'font-semibold text-gray-900')}
                </p>
              ),
            )}
          </div>
        </motion.div>

        {showImages && (
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-20"
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

        <div className="mt-10 w-full sm:w-auto">
          <ButtonLink href="/contact" className="w-full px-5 py-4 sm:w-auto">
            Get in touch
          </ButtonLink>
        </div>
      </div>
    </motion.section>
  );
}
