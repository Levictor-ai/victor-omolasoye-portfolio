'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Clock,
  FileText,
  MapPin,
} from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { ButtonLink, buttonClass } from '@/components/ui/Button';

function useLagosTime() {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

function AvailabilityStamp() {
  return (
    <div className="absolute -right-3 -top-5 grid size-24 place-items-center rounded-full border border-ios-separator bg-white/90 shadow-ios backdrop-blur-sm sm:-right-6 sm:-top-7 sm:size-28">
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full animate-[spin-clock_32s_linear_infinite] motion-reduce:animate-none"
        aria-hidden="true"
      >
        <defs>
          <path
            id="about-stamp-arc"
            d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
          />
        </defs>
        <text
          fill="#2F5BFF"
          fontSize="8"
          fontWeight="600"
          letterSpacing="2.4"
          className="font-ios uppercase"
        >
          <textPath href="#about-stamp-arc">
            OPEN TO SELECT PROJECTS · 2026 ·
          </textPath>
        </text>
      </svg>
      <span className="grid size-10 place-items-center rounded-full bg-ios-electric text-white shadow-ios-button">
        <ArrowUpRight className="size-4" strokeWidth={2.4} />
      </span>
    </div>
  );
}

function Scribble() {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 20"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-[0.28em] w-[102%] overflow-visible"
    >
      <motion.path
        d="M4 14C42 4 82 17 122 9c30-6 68-4 114 3"
        fill="none"
        stroke="#2F5BFF"
        strokeWidth="6"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.65, ease: 'easeOut' }}
      />
    </svg>
  );
}

export function AboutHero({ profile }: { profile: ProfileData }) {
  const time = useLagosTime();
  const reduce = useReducedMotion();

  return (
    <section
      id="about-top"
      className="bg-hero fx-grid-lines relative overflow-hidden border-b border-ios-separator"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-16 pt-14 sm:px-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-center lg:gap-16 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="relative z-10 min-w-0">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 text-[11px]"
          >
            <span className="font-mono uppercase tracking-[0.22em] text-ios-tertiary">
              About
            </span>
            <span className="h-px w-8 bg-ios-separator-strong" aria-hidden="true" />
            <span className="font-medium text-ios-secondary">
              Designer, builder, observer
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-balance font-ios text-[clamp(3.1rem,7.2vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.055em] text-ios-ink"
          >
            <span className="sr-only">
              About Victor Omolasoye, product designer, brand designer and UI/UX
              designer in Lagos. Designing what ideas become.
            </span>
            <span aria-hidden="true">
              Designing
              <br />
              what{' '}
              <span className="relative inline-block">
                ideas
                <Scribble />
              </span>{' '}
              become.
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ios-secondary sm:text-xl"
          >
            I&rsquo;m Victor Omolasoye &mdash; a product designer, brand designer
            and builder in Lagos. For 4+ years I&rsquo;ve helped teams turn fuzzy
            ideas into identities and interfaces people understand, trust and use.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <ButtonLink href="/contact" className="w-full px-7 py-4 sm:w-auto">
              Start a conversation
              <ArrowUpRight className="size-4" />
            </ButtonLink>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({
                variant: 'outline',
                className: 'w-full px-7 py-4 sm:w-auto',
              })}
            >
              <FileText className="size-4" strokeWidth={2.2} />
              Download résumé
            </a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ios-separator pt-5 text-xs text-ios-tertiary"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ios-green opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-ios-green" />
              </span>
              <span className="font-medium text-ios-label">Open to select projects</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              Lagos, Nigeria
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              Lagos &middot; {time} WAT
            </span>
            <span className="hidden sm:inline">Designing since 2020</span>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-full max-w-[430px]"
        >
          <div
            className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-ios-electric/15 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/80 bg-ios-grouped shadow-ios-lg ring-1 ring-ios-electric/15">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              priority
              className="object-cover"
              style={{ objectPosition: 'top' }}
              sizes="(max-width: 1024px) 80vw, 36vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-ios-xl border border-white/25 bg-white/15 p-4 text-white backdrop-blur-md">
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="mt-0.5 text-xs text-white/75">
                Product &amp; brand designer &middot; Lagos, NG
              </p>
            </div>
          </div>

          <AvailabilityStamp />

          <span className="absolute -left-5 top-[18%] hidden -rotate-6 rounded-full border border-ios-separator bg-white px-3 py-1.5 text-[11px] font-semibold text-ios-label shadow-ios sm:block">
            Brand systems
          </span>
          <span className="absolute -right-6 top-[42%] hidden rotate-[5deg] rounded-full border border-ios-separator bg-white px-3 py-1.5 text-[11px] font-semibold text-ios-label shadow-ios sm:block">
            Product design
          </span>
          <span className="absolute -left-6 bottom-[24%] hidden rotate-[3deg] rounded-full border border-ios-separator bg-white px-3 py-1.5 text-[11px] font-semibold text-ios-label shadow-ios sm:block">
            Web experiences
          </span>
        </motion.div>
      </div>
    </section>
  );
}
