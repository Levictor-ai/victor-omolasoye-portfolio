'use client';

import Image from 'next/image';
import { BadgeCheck, Mail } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { ContactForm } from '@/components/ContactForm';
import { BackToTop } from '@/components/BackToTop';
import { SiteFooter } from '@/components/SiteFooter';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconTile } from '@/components/ui/IconTile';
import { SectionHeading } from '@/components/ui/SectionHeading';

function LinkedInIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function ContactClient() {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <SectionHeading
            display
            eyebrow="Contact"
            title="Let&rsquo;s build something"
            titleClassName="font-ios text-5xl font-bold leading-[0.9] tracking-tight text-ios-label sm:text-6xl lg:text-7xl"
            lead={
              <>
                Have a project in mind, need a designer to bring an idea from{' '}
                <span className="font-semibold text-ios-label">0 &rarr; 1</span>, or just want to
                talk through a design or product challenge?{' '}
                <span className="font-semibold text-ios-label">Let&rsquo;s talk.</span>
              </>
            }
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-10">
          <Card padding="md" className="shadow-ios-lg">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-ios-lg bg-ios-fill">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                style={{ objectPosition: 'top' }}
                sizes="(max-width: 1024px) 100vw, 32vw"
                priority
              />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-ios-label">{profile.name}</h3>
              <p className="mt-1 text-sm text-ios-tertiary">
                Product Designer + AI-assisted builder
              </p>
            </div>

            <div className="space-y-3 border-t border-ios-separator pt-6">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 break-all text-sm text-ios-secondary transition-colors hover:text-ios-blue"
              >
                <IconTile size="sm" className="size-9 rounded-full">
                  <Mail className="size-4 text-ios-blue" strokeWidth={2.2} />
                </IconTile>
                {profile.email}
              </a>
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-ios-secondary transition-colors hover:text-ios-blue"
                >
                  <IconTile size="sm" className="size-9 rounded-full">
                    <LinkedInIcon />
                  </IconTile>
                  LinkedIn profile
                </a>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {profile.socials.contra && (
                <ButtonLink
                  href={profile.socials.contra}
                  target="_blank"
                  rel="noopener noreferrer"
                  block
                  className="py-4"
                  icon={<BadgeCheck className="size-4" strokeWidth={2.2} />}
                  iconPosition="left"
                >
                  Hire me on Contra
                </ButtonLink>
              )}
              <ButtonLink href="/projects" variant="outline" block className="py-4">
                View my work
              </ButtonLink>
            </div>
          </Card>

          <div className="rounded-ios-2xl bg-gradient-to-br from-ios-blue to-ios-bluePressed p-6 shadow-ios-lg sm:p-8 lg:p-10">
            <p className="mb-3 text-label-sm uppercase tracking-tightr text-white/70">
              Send a message
            </p>
            <h3 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Tell me about your project
            </h3>
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter profile={profile} />
      <BackToTop />
    </>
  );
}
