import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/site/Reveal';
import { defaultProfile } from '@/data/profile';
import { type WorkTrack } from '@/lib/work';
import type { ProjectData } from '@/types/project';

function CategoryCard({
  index,
  track,
  title,
  description,
  linkLabel,
  feature,
}: {
  index: string;
  track: WorkTrack;
  title: string;
  description: string;
  linkLabel: string;
  feature: ProjectData | null;
}) {
  return (
    <Link
      href={`/${track}`}
      className="group flex flex-col focus-visible:outline-none"
      aria-label={linkLabel}
    >
      <div className="media-zoom relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-paper-sunken">
        {feature ? (
          <Image
            src={feature.coverImage}
            alt={`${title} — ${feature.title}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-faint">
            Selected work
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-ink-faint">
              <span className="tabular-nums">{index}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            </div>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
              {title}
            </h3>
          </div>
          <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="size-4" strokeWidth={1.6} />
          </span>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
          {description}
        </p>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          {linkLabel}
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </span>
      </div>
    </Link>
  );
}

export function HomeContent({
  brandFeature,
  productFeature,
}: {
  brandFeature: ProjectData | null;
  productFeature: ProjectData | null;
}) {
  const profile = defaultProfile;

  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28 lg:px-12 lg:pt-32">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-[0.14em]">
              <span className="text-ink">Victor Omolasoye</span>
              <span className="text-ink-faint">
                Multidisciplinary Designer — Lagos, Nigeria
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-8 max-w-[15ch] text-balance font-display text-[clamp(3.25rem,9vw,8rem)] leading-[0.94] tracking-[-0.02em] text-ink">
              I design brands and digital experiences.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
                I bring ideas to life through thoughtful visual identities and intuitive
                digital experiences, helping businesses communicate clearly and connect
                with people.
              </p>
              <a
                href="#work"
                className="inline-flex w-fit items-center gap-2 text-sm text-ink transition-opacity hover:opacity-60"
              >
                Explore selected work
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </Reveal>
        </section>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="mx-auto max-w-[1400px] scroll-mt-20 border-t border-line px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
        >
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2
                id="work-heading"
                className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint"
              >
                Selected work
              </h2>
              <p className="hidden text-sm text-ink-faint sm:block">Two disciplines, one practice</p>
            </div>
          </Reveal>

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12">
            <Reveal>
              <CategoryCard
                index="01"
                track="brand-design"
                title="Brand Design"
                description="Building distinctive identities through strategy, visual systems and thoughtful creative direction."
                linkLabel="Explore Brand Design"
                feature={brandFeature}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <CategoryCard
                index="02"
                track="product-design"
                title="Product Design"
                description="Turning user needs and product requirements into intuitive digital experiences."
                linkLabel="Explore Product Design"
                feature={productFeature}
              />
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.01em] text-ink sm:text-5xl">
                A little about me
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="max-w-2xl space-y-5 text-base leading-[1.75] text-ink-muted sm:text-lg">
                <p>
                  I&rsquo;m Victor Omolasoye, a multidisciplinary designer interested in how
                  ideas are communicated, experienced and brought to life.
                </p>
                <p>
                  My work spans brand identity and digital product design, combining visual
                  thinking, user-centred problem solving and an appreciation for the details
                  that make experiences feel clear and cohesive.
                </p>
                <p>
                  With a background in English and Education, I bring an emphasis on clarity,
                  communication and storytelling to the way I approach design.
                </p>
                <p>
                  I&rsquo;m also exploring AI-assisted workflows to prototype ideas, build digital
                  experiences and bring concepts closer to reality.
                </p>
                <Link
                  href="/about"
                  className="editorial-link inline-flex pt-2 text-sm font-medium text-ink"
                >
                  More about me
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] border-t border-line px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-5xl leading-[0.98] tracking-[-0.01em] text-ink sm:text-7xl">
                Have a project in mind?
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:pt-2">
              <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
                I&rsquo;m open to opportunities and collaborations where thoughtful design can
                make a difference.
              </p>
              <div className="mt-8 flex flex-col gap-3 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="editorial-link w-fit text-ink"
                >
                  {profile.email}
                </a>
                {profile.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link w-fit text-ink"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-2 border-t border-line py-6 text-xs text-ink-faint sm:grid-cols-2">
            <p>Available for selected projects and opportunities.</p>
            <p className="sm:text-right">
              <Link href={`/brand-design`} className="transition-colors hover:text-ink">
                Brand design
              </Link>
              <span aria-hidden="true"> · </span>
              <Link href={`/product-design`} className="transition-colors hover:text-ink">
                Product design
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
