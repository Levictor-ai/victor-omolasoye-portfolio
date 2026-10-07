'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Mail } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { ContactForm } from '@/components/ContactForm';
import { BackToTop } from '@/components/BackToTop';

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
          <p className="mb-3 text-label-sm uppercase tracking-wider text-gray-400">Contact</p>
          <h2 className="mb-4 font-display text-5xl font-bold leading-[0.9] tracking-wide text-gray-900 sm:text-6xl lg:text-7xl">
            Let&rsquo;s build something
          </h2>
          <p className="text-body-lg leading-relaxed text-gray-600">
            Have a project in mind, need a designer to bring an idea from{' '}
            <span className="font-semibold text-gray-900">0 &rarr; 1</span>, or just want to
            talk through a design or product challenge?{' '}
            <span className="font-semibold text-gray-900">Let&rsquo;s talk.</span>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_24px_60px_-28px] shadow-black/[0.15]">
            <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
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
            <h3 className="text-xl font-bold tracking-tight text-gray-900">{profile.name}</h3>
            <p className="mb-6 mt-1 text-sm text-gray-500">
              Product Designer + AI-assisted builder
            </p>

            <div className="space-y-3 border-t border-gray-200 pt-6">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 break-all text-sm text-gray-700 transition-colors hover:text-blue-600"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                  <Mail className="size-4 text-blue-600" strokeWidth={2.2} />
                </span>
                {profile.email}
              </a>
              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-700 transition-colors hover:text-blue-600"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                    <LinkedInIcon />
                  </span>
                  LinkedIn profile
                </a>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {profile.socials.contra && (
                <a
                  href={profile.socials.contra}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-sm font-medium text-white transition-all hover:from-blue-500 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                >
                  <BadgeCheck className="size-4" strokeWidth={2.2} />
                  Hire me on Contra
                </a>
              )}
              <Link
                href="/projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-transparent px-6 py-4 text-sm font-medium text-gray-900 transition-colors hover:border-black/30 hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
              >
                View my work
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 shadow-xl shadow-blue-900/20 sm:p-8 lg:p-10">
            <p className="mb-3 text-label-sm uppercase tracking-wider text-blue-100">
              Send a message
            </p>
            <h3 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Tell me about your project
            </h3>
            <ContactForm />
          </div>
        </div>
      </main>
      <BackToTop />
    </>
  );
}
