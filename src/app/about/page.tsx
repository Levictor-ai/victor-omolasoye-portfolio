import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/site/Reveal';
import { RichText } from '@/components/site/RichText';
import { defaultProfile } from '@/data/profile';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, personSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About — Multidisciplinary Designer',
  description:
    'About Victor Omolasoye, a multidisciplinary designer working across brand identity and digital product design, with a background in English and Education.',
  path: '/about',
  keywords: [
    'about victor omolasoye',
    'multidisciplinary designer',
    'brand designer background',
    'product designer nigeria',
  ],
});

const capabilities = [
  {
    title: 'Brand Design',
    items: ['Brand identity', 'Visual systems', 'Typography', 'Art direction', 'Brand applications'],
  },
  {
    title: 'Product Design',
    items: [
      'UX and interface design',
      'User flows',
      'Wireframing',
      'Prototyping',
      'Design systems',
    ],
  },
  {
    title: 'Supporting',
    items: [
      'Digital experience design',
      'AI-assisted prototyping and development',
      'Design-to-development handoff',
    ],
  },
];

const approach = [
  {
    title: 'Understand the problem',
    body: 'Start with the context: who the work is for, what is not working, and what success should look like.',
  },
  {
    title: 'Define the direction',
    body: 'Turn the brief into a clear point of view — positioning, structure, and the visual or product principles that will guide the work.',
  },
  {
    title: 'Design the solution',
    body: 'Build the identity or interface system, exploring typography, colour, layout, flows and interactions until the pieces work together.',
  },
  {
    title: 'Refine and evaluate',
    body: 'Review, test and tighten the details, then prepare clear files and guidance so the work can be used and built correctly.',
  },
];

export default function AboutPage() {
  const profile = defaultProfile;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
          personSchema(),
        ]}
      />
      <Nav />
      <main>
        <header className="mx-auto max-w-[1400px] px-5 pb-14 pt-16 sm:px-8 sm:pt-24 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:items-end lg:gap-16">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                About
              </p>
              <h1 className="mt-6 max-w-[16ch] text-balance font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.02em] text-ink">
                A multidisciplinary designer working across brand and product.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
                I&rsquo;m {profile.name}, a designer interested in how ideas are communicated,
                experienced and brought to life. My practice spans brand identity and
                digital product design.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-paper-sunken">
                <Image
                  src="/images/hero-portrait.jpg"
                  alt="Portrait of Victor Omolasoye"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'top' }}
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </header>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-ink sm:text-5xl">
                Background
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="max-w-2xl space-y-5 text-base leading-[1.75] text-ink-muted sm:text-lg">
                <p>
                  My background is in English and Education, and it still shapes how I work.
                  It trained me to think about clarity, structure and storytelling — how an
                  idea is framed, what people need to understand first, and what makes a
                  message land.
                </p>
                <p>
                  I moved into design through an interest in visual communication, then grew
                  into product work: how systems behave, how people move through an
                  experience, and how a brand holds together when it leaves the presentation
                  and becomes something people actually use.
                </p>
                <p>
                  Today I work across brand identity, digital product design and the
                  experiences that connect them. I enjoy being involved from the early
                  thinking through to the final details, and I care about work that feels
                  considered rather than decorated.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Capabilities
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {capabilities.map((group, index) => (
              <Reveal key={group.title} delay={Math.min(index * 0.06, 0.18)}>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink-faint"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-ink sm:text-5xl">
                Working approach
              </h2>
            </Reveal>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {approach.map((step, index) => (
                <Reveal key={step.title} delay={Math.min(index * 0.05, 0.15)}>
                  <p className="text-xs tabular-nums text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <Reveal>
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Selected experience
            </h2>
          </Reveal>
          <div className="mt-8">
            {profile.experience.map((role, index) => (
              <Reveal
                key={`${role.company}-${role.period}`}
                delay={Math.min(index * 0.04, 0.2)}
                className="grid gap-4 border-t border-line py-8 sm:grid-cols-[0.8fr_1.2fr] sm:gap-10"
              >
                <div>
                  <h3 className="text-base font-semibold text-ink">{role.company}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{role.role}</p>
                  <p className="mt-1 text-xs text-ink-faint">{role.period}</p>
                </div>
                <RichText content={role.description} className="text-sm" />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <h2 className="font-display text-5xl leading-[0.98] tracking-[-0.01em] text-ink sm:text-6xl">
              Let&rsquo;s discuss the work.
            </h2>
            <div>
              <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
                I&rsquo;m open to opportunities and collaborations where thoughtful design can
                make a difference — whether that is shaping a brand, improving a digital
                experience, or exploring an idea.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-medium text-ink"
                >
                  Contact me
                  <span aria-hidden="true">→</span>
                </Link>
                <a href={`mailto:${profile.email}`} className="editorial-link text-ink">
                  Email
                </a>
                {profile.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link text-ink"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
