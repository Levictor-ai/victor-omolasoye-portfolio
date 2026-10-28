import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/site/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { defaultProfile } from '@/data/profile';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact — Start a Conversation',
  description:
    'Contact Victor Omolasoye, a multidisciplinary designer working across brand identity and digital product design. Available for selected projects and opportunities.',
  path: '/contact',
  keywords: [
    'contact victor omolasoye',
    'hire brand designer',
    'hire product designer',
    'freelance designer lagos',
  ],
});

export default function ContactPage() {
  const profile = defaultProfile;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <Nav />
      <main>
        <header className="mx-auto max-w-[1400px] px-5 pb-14 pt-16 sm:px-8 sm:pt-24 lg:px-12">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Contact
            </p>
            <h1 className="mt-6 max-w-[14ch] text-balance font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.02em] text-ink">
              Let&rsquo;s create something meaningful.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
              If you&rsquo;re looking for a designer to help shape a brand, improve a digital
              experience or explore an idea, I&rsquo;d be happy to hear from you.
            </p>
          </Reveal>
        </header>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Direct
              </h2>
              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <p className="text-ink-faint">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="editorial-link mt-1 block break-all text-ink"
                  >
                    {profile.email}
                  </a>
                </div>
                {profile.socials.linkedin && (
                  <div>
                    <p className="text-ink-faint">LinkedIn</p>
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link mt-1 block text-ink"
                    >
                      linkedin.com/in/omolasoyevictor
                    </a>
                  </div>
                )}
                {profile.socials.behance && (
                  <div>
                    <p className="text-ink-faint">Portfolio archive</p>
                    <a
                      href={profile.socials.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link mt-1 block text-ink"
                    >
                      Behance
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-ink-faint">Based in</p>
                  <p className="mt-1 text-ink">{profile.location}</p>
                </div>
              </div>

              <p className="mt-10 max-w-xs text-sm leading-relaxed text-ink-muted">
                Prefer to look around first?{' '}
                <Link href="/brand-design" className="editorial-link text-ink">
                  Brand design
                </Link>{' '}
                and{' '}
                <Link href="/product-design" className="editorial-link text-ink">
                  product design
                </Link>{' '}
                are a good place to start.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Or send a message
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
