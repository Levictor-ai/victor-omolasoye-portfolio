'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { ContactForm } from '@/components/ContactForm';
import { BackToTop } from '@/components/BackToTop';
import { SiteFooter } from '@/components/SiteFooter';
import { ButtonLink } from '@/components/ui/Button';
import { testimonialIdentity } from '@/lib/testimonial';

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can fail in older browsers; the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-ios-separator bg-white px-4 py-2.5 text-xs font-semibold text-ios-secondary transition-colors hover:border-ios-electric/30 hover:text-ios-electric"
    >
      {copied ? <Check className="size-3.5" /> : <Mail className="size-3.5" />}
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}

export function ContactClient() {
  const profile = usePortfolio();
  const socials = [
    profile.socials.linkedin && { label: 'LinkedIn', href: profile.socials.linkedin },
    profile.socials.behance && { label: 'Behance', href: profile.socials.behance },
    profile.socials.github && { label: 'GitHub', href: profile.socials.github },
    profile.socials.twitter && { label: 'X', href: profile.socials.twitter },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  const quote = profile.testimonials[1] ?? profile.testimonials[0];
  const quoteIdentity = quote ? testimonialIdentity(quote) : null;

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="font-ios">
        <section className="bg-hero fx-grid-lines relative overflow-hidden border-b border-ios-separator">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-14 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16 lg:px-12 lg:pb-24 lg:pt-20">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="font-mono uppercase tracking-[0.22em] text-ios-tertiary">
                  Contact
                </span>
                <span className="h-px w-8 bg-ios-separator-strong" aria-hidden="true" />
                <span className="flex items-center gap-2 font-medium text-ios-secondary">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-ios-green opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-ios-green" />
                  </span>
                  Open to select projects
                </span>
              </div>

              <h1 className="mt-7 text-balance text-[clamp(3rem,6.8vw,6.2rem)] font-bold leading-[0.92] tracking-[-0.05em] text-ios-ink">
                <span className="sr-only">
                  Contact Victor Omolasoye. Bring me the messy idea.
                </span>
                <span aria-hidden="true">
                  Bring me the{' '}
                  <span className="ns-highlight">messy</span> idea.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ios-secondary sm:text-xl">
                A rough thought, a stalled product, or a brand that no longer
                fits. Send it over &mdash; I&rsquo;ll help you find the shape.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink href="#brief" className="w-full px-7 py-4 sm:w-auto">
                  Start a brief
                  <ArrowUpRight className="size-4" />
                </ButtonLink>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ios-electric"
                  >
                    <Mail className="size-4" />
                    {profile.email}
                  </a>
                  <CopyEmail email={profile.email} />
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ios-separator pt-5 text-xs text-ios-tertiary">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  Replies within 24 hours
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  Lagos, Nigeria
                </span>
                <span>Mon&ndash;Fri, WAT</span>
              </div>
            </div>

            <div className="relative z-10 rounded-ios-2xl border border-ios-separator bg-white/90 p-6 shadow-ios backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="relative size-14 overflow-hidden rounded-full bg-ios-fill">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'top' }}
                    sizes="56px"
                    priority
                  />
                </div>
                <div>
                  <p className="font-semibold text-ios-ink">{profile.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ios-tertiary">
                    Product &amp; brand designer
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-ios-separator pt-5 text-sm">
                <p className="flex items-center gap-2 text-ios-secondary">
                  <Sparkles className="size-4 text-ios-electric" />
                  Product, brand and web
                </p>
                <p className="flex items-center gap-2 text-ios-secondary">
                  <Clock className="size-4 text-ios-electric" />
                  Usually replies in one working day
                </p>
                <p className="flex items-center gap-2 text-ios-secondary">
                  <MapPin className="size-4 text-ios-electric" />
                  Lagos, Nigeria &middot; working worldwide
                </p>
              </div>

              <div className="mt-6 border-t border-ios-separator pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ios-tertiary">
                  Elsewhere
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-ios-secondary transition-colors hover:text-ios-electric"
                    >
                      {social.label}
                      <ArrowUpRight className="size-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="brief" className="scroll-mt-24 bg-[#F7F7FA]">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
              <div className="rounded-ios-2xl border border-ios-separator bg-white p-6 shadow-ios sm:p-8 lg:self-start">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ios-tertiary">
                  Project brief
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-ios-ink sm:text-4xl">
                  Tell me what you&rsquo;re building.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ios-secondary">
                  A few details help me reply with something useful, not a
                  generic deck. Short answers are fine.
                </p>
                <div className="mt-8">
                  <ContactForm email={profile.email} />
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-ios-2xl bg-ios-navy p-6 text-white sm:p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                    What happens next
                  </p>
                  <ol className="mt-5 space-y-5">
                    {[
                      {
                        title: 'I read the brief',
                        body: 'Within one working day, you get a real reply with questions or a clear next step.',
                      },
                      {
                        title: 'We talk it through',
                        body: 'A 30-minute call to align on the problem, scope and constraints.',
                      },
                      {
                        title: 'You get a plan',
                        body: 'Approach, timeline and investment, written down before anything starts.',
                      },
                    ].map((step) => (
                      <li key={step.title} className="flex gap-3">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ios-electric" />
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {step.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-white/60">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-ios-2xl border border-ios-separator bg-white p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ios-tertiary">
                    A useful brief includes
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      'The problem, not just the deliverable.',
                      'Who it is for and what they need.',
                      'Any constraints: time, budget or tech.',
                      'What success looks like.',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-ios-secondary"
                      >
                        <Check className="mt-0.5 size-3.5 shrink-0 text-ios-electric" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-ios-separator pt-4 text-xs leading-relaxed text-ios-tertiary">
                    Not sure yet? That&rsquo;s fine. Send what you have.
                  </p>
                </div>

                {quote && quoteIdentity && (
                  <figure className="rounded-ios-2xl border border-ios-separator bg-white p-6">
                    <blockquote className="text-sm leading-relaxed text-ios-secondary">
                      &ldquo;{quote.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <span className="relative size-9 overflow-hidden rounded-full bg-ios-fill">
                        {quote.avatar ? (
                          <Image
                            src={quote.avatar}
                            alt={quoteIdentity.name}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        ) : (
                          <span className="grid h-full place-items-center text-xs font-semibold text-ios-secondary">
                            {quoteIdentity.name.slice(0, 1)}
                          </span>
                        )}
                      </span>
                      <span>
                        <span className="block text-xs font-semibold text-ios-ink">
                          {quoteIdentity.name}
                        </span>
                        <span className="block text-[11px] text-ios-tertiary">
                          {quoteIdentity.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter profile={profile} />
      <BackToTop />
    </>
  );
}
