'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, FileText, Palette, PenTool } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { track } from '@/lib/analytics';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function FloatingChip({
  label,
  className,
  delay = 0,
}: {
  label: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 + delay }}
      className={`absolute z-30 flex items-center gap-1.5 rounded-full border border-ios-separator bg-white/80 px-3 py-1.5 font-ios text-xs font-semibold text-ios-label shadow-ios backdrop-blur-xl ${className}`}
      style={{ animation: `chip-sway ${5 + delay}s ease-in-out ${delay}s infinite` }}
    >
      <span className="size-1.5 rounded-full bg-ios-blue" />
      {label}
    </motion.span>
  );
}

function AboutPortrait({ profile }: { profile: ProfileData }) {
  return (
    <div className="group relative mx-auto aspect-[4/5] w-full max-w-[19rem] sm:max-w-[22rem]">
      <div className="pointer-events-none absolute -inset-9 rounded-[3rem] border border-ios-separator" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -inset-5 rounded-[2.5rem] border border-dashed border-ios-separator-strong"
        style={{ animation: 'spin-clock 60s linear infinite' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -inset-2 rounded-[2rem] border border-ios-blue/40"
        style={{ animation: 'stroke-pulse 3.6s ease-in-out infinite' }}
        aria-hidden="true"
      />

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border-4 border-white bg-ios-fill shadow-ios-lg transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-[1.03]">
        <Image
          src={profile.avatar}
          alt={profile.name}
          fill
          className="object-cover"
          style={{ objectPosition: 'top' }}
          sizes="(max-width: 1024px) 60vw, 26vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow-ios backdrop-blur-xl">
          <PenTool className="size-3.5 text-ios-blue" strokeWidth={2.2} />
          <span className="text-xs font-semibold text-ios-label">Designer &amp; Builder</span>
        </div>
      </div>

      <FloatingChip label="Product" className="-right-3 top-8 sm:-right-5" />
      <FloatingChip label="Brand" className="-left-3 top-1/2 sm:-left-5" delay={1.2} />
      <FloatingChip label="UI/UX" className="-bottom-2 right-6" delay={2.1} />
    </div>
  );
}

export function AboutHero({ profile }: { profile: ProfileData }) {
  const roles = profile.titles.join(' · ');
  const socials = [
    profile.socials.linkedin && { href: profile.socials.linkedin, label: 'LinkedIn' },
    profile.socials.behance && { href: profile.socials.behance, label: 'Behance' },
    profile.socials.contra && { href: profile.socials.contra, label: 'Contra' },
    profile.socials.medium && { href: profile.socials.medium, label: 'Medium' },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <motion.section
      id="about-hero"
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-hero border-b border-ios-separator font-ios"
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', overflowX: 'clip' }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-12 lg:py-24">
        <div>
          <motion.div variants={item} className="mb-6 flex items-center gap-2.5">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ios-green opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-ios-green" />
            </span>
            <span className="text-sm font-medium text-ios-label">Open to work</span>
          </motion.div>

          <motion.p
            variants={item}
            className="mb-4 flex items-center gap-2 text-label-sm font-semibold uppercase tracking-[0.2em] text-ios-blue"
          >
            <Palette className="size-3.5" strokeWidth={2.4} />
            About me
          </motion.p>

          <motion.h2
            variants={item}
            className="mb-5 text-balance font-display text-6xl font-bold leading-[0.95] tracking-wide text-ios-label sm:text-7xl lg:text-8xl"
          >
            {profile.tagline}
          </motion.h2>

          <motion.p
            variants={item}
            className="mb-3 text-lg font-semibold tracking-tight text-ios-label"
          >
            {roles}
          </motion.p>

          <motion.p
            variants={item}
            className="mb-8 max-w-xl text-body-lg leading-relaxed text-ios-secondary"
          >
            {profile.bio}
          </motion.p>

          <motion.div variants={item} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                onClick={() => track('cta_click', { location: 'about_hero', label: 'get_in_touch' })}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ios-blue px-8 py-4 text-sm font-semibold text-white shadow-ios-button transition-all duration-200 hover:bg-ios-bluePressed active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40 sm:w-auto"
              >
                Get in touch
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
              </Link>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('resume_click', { location: 'about_hero' })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ios-fill px-8 py-4 text-sm font-semibold text-ios-blue transition-all duration-200 hover:bg-ios-fill-strong active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/40 sm:w-auto"
            >
              <FileText className="size-4 text-ios-blue" strokeWidth={2.2} />
              Resume
            </motion.a>
          </motion.div>

          {socials.length > 0 && (
            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-ios-secondary transition-colors hover:text-ios-blue"
                >
                  {social.label}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
                </a>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div variants={item} className="w-full">
          <AboutPortrait profile={profile} />
        </motion.div>
      </div>
    </motion.section>
  );
}
