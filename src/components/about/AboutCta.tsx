'use client';

import { ArrowUpRight, Mail } from 'lucide-react';
import type { ProfileData } from '@/context/PortfolioContext';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function AboutCta({ profile }: { profile: ProfileData }) {
  const socials = [
    profile.socials.linkedin && { label: 'LinkedIn', href: profile.socials.linkedin },
    profile.socials.behance && { label: 'Behance', href: profile.socials.behance },
    profile.socials.github && { label: 'GitHub', href: profile.socials.github },
    profile.socials.twitter && { label: 'X', href: profile.socials.twitter },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <section id="contact" className="scroll-mt-32 bg-white px-6 pb-24 pt-8 sm:px-8 lg:px-12">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ios-navy px-6 py-14 text-white sm:px-12 sm:py-18 lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_90%_at_85%_0%,rgba(47,91,255,0.35),transparent_65%)]"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 right-4 select-none font-ios text-[7rem] font-bold leading-none tracking-tighter text-white/[0.04] sm:text-[12rem]"
          >
            HELLO
          </span>

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                Next
              </p>
              <h2 className="mt-4 max-w-2xl break-words text-balance text-3xl font-bold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Let&rsquo;s make the next idea inevitable.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                Have a product, brand or web experience in mind? Tell me what
                you&rsquo;re building and I&rsquo;ll help you shape the next step.
              </p>
            </div>

            <div className="flex min-w-0 flex-col gap-3">
              <ButtonLink href="/contact" variant="light" className="w-full px-6 py-4">
                Start a conversation
                <ArrowUpRight className="size-4" />
              </ButtonLink>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex min-w-0 items-center justify-between gap-3 rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                <span className="inline-flex min-w-0 items-center gap-2">
                  <Mail className="size-4 shrink-0" />
                  <span className="break-all text-[13px] sm:text-sm">
                    {profile.email}
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/45">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-white"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
