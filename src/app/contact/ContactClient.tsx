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

function WhatsAppIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function ContactClient() {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="w-full px-6 py-10 lg:py-16">
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
              {profile.socials.whatsapp && (
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-ios-secondary transition-colors hover:text-ios-blue"
                >
                  <IconTile size="sm" className="size-9 rounded-full">
                    <WhatsAppIcon />
                  </IconTile>
                  WhatsApp
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
            <p className="mb-3 text-label-sm uppercase tracking-wider text-white/70">
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
