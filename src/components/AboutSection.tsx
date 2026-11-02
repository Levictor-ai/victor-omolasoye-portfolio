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
  showImage = true,
  extraImage,
}: {
  profile: ProfileData;
  headingClassName?: string;
  showImage?: boolean;
  extraImage?: string;
}) {
  const hasImage = showImage || !!extraImage;
  const imageSrc = extraImage ?? profile.avatar;

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
      className="mb-20 font-ios py-16 lg:py-24"
    >
      <div className="w-full">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="mb-10 lg:mb-16"
        >
          <SectionHeading
            eyebrow="A little context"
            title="About Me"
            titleClassName={headingClassName}
          />
        </motion.div>

        <div
          className={`grid items-start gap-10 ${
            hasImage ? 'lg:grid-cols-[0.85fr_1.15fr] lg:gap-16' : ''
          }`}
        >
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24"
            >
              <div className="relative mx-auto w-full max-w-sm rotate-[-3deg] transition-transform duration-500 hover:rotate-0">
                <div
                  className="pointer-events-none absolute -inset-5 rounded-[2.75rem] bg-gradient-to-br from-ios-blue/30 to-ios-teal/30 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-ios-xl border border-white/70 bg-ios-fill shadow-ios-lg ring-1 ring-ios-blue/10">
                  <Image
                    src={imageSrc}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'top' }}
                    sizes="(max-width: 1024px) 80vw, 32vw"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-3 bottom-3 rounded-ios-lg border border-white/40 bg-white/80 px-4 py-3 backdrop-blur-xl">
                    <p className="text-sm font-semibold text-ios-label">{profile.name}</p>
                    <p className="mt-0.5 text-xs text-ios-secondary">
                      {profile.titles[0]} · {profile.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <div className="prose max-w-none">
              {profile.about.split('\n\n').map((paragraph, i) =>
                paragraph.startsWith('### ') || paragraph.startsWith('## ') ? (
                  <h3
                    key={i}
                    className="mb-5 text-heading-md font-bold tracking-tight text-ios-label"
                  >
                    {renderInline(paragraph.startsWith('### ') ? paragraph.slice(4) : paragraph.slice(3))}
                  </h3>
                ) : (
                  <p
                    key={i}
                    className="mb-5 last:mb-0 text-body-lg leading-relaxed text-ios-secondary"
                  >
                    {renderInline(paragraph, 'font-semibold text-ios-label')}
                  </p>
                ),
              )}
            </div>

            <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/contact" className="w-full px-5 py-4 sm:w-auto">
                Get in touch
              </ButtonLink>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass({ variant: 'outline', className: 'w-full sm:w-auto' })}
              >
                <FileText className="size-4 text-ios-blue" strokeWidth={2.2} />
                Resume
              </a>
              {profile.socials.contra && (
                <a
                  href={profile.socials.contra}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass({ variant: 'outline', className: 'w-full sm:w-auto' })}
                >
                  <BadgeCheck className="size-4 text-ios-blue" strokeWidth={2.2} />
                  Hire me on Contra
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
