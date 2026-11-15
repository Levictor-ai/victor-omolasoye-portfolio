'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Clock, Rss, Sparkles } from 'lucide-react';
import type { BlogPost } from '@/data/blog';
import { site } from '@/lib/seo';
import { cn } from '@/lib/cn';
import { Badge, Eyebrow } from '@/components/ui/Badge';
import { BlogCover } from '@/components/BlogCover';
import { buttonClass } from '@/components/ui/Button';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const easeOut = [0.22, 1, 0.36, 1] as const;
const ALL_TAG = 'All';

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

export function BlogContent({
  posts,
  tags,
  description,
}: {
  posts: BlogPost[];
  tags: string[];
  description: string;
}) {
  const [activeTag, setActiveTag] = useState<string>(ALL_TAG);

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return counts;
  }, [posts]);

  const indexBySlug = useMemo(
    () => new Map(posts.map((post, index) => [post.slug, index])),
    [posts],
  );

  const filtered = useMemo(
    () => (activeTag === ALL_TAG ? posts : posts.filter((post) => post.tags.includes(activeTag))),
    [activeTag, posts],
  );

  const featured = activeTag === ALL_TAG ? posts[0] : undefined;
  const gridPosts = featured
    ? filtered.filter((post) => post.slug !== featured.slug)
    : filtered;

  const totalMinutes = posts.reduce(
    (total, post) => total + (Number.parseInt(post.readingTime, 10) || 0),
    0,
  );
  const latestDate = posts[0] ? formatDate(posts[0].datePublished) : null;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="relative mb-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 -z-10 h-64 w-64 rounded-full bg-ios-electric/10 blur-3xl"
        />

        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-ios-electric" />
            <Eyebrow accent>Writing</Eyebrow>
          </div>
          <a
            href="/blog/rss.xml"
            className="inline-flex items-center gap-1.5 rounded-full border border-ios-separator bg-white/70 px-3 py-1.5 text-xs font-medium text-ios-secondary transition-colors duration-200 hover:border-ios-separator-strong hover:bg-white hover:text-ios-label focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-electric/40"
          >
            <Rss className="size-3.5" />
            RSS feed
          </a>
        </div>

        <h1 className="mb-4 max-w-3xl text-balance text-4xl font-bold tracking-tight text-ios-label sm:text-5xl">
          Notes on <span className="text-ios-electric">product design</span>, UI/UX and brand design
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-ios-secondary">{description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ios-tertiary">
          <span className="font-medium text-ios-secondary">
            {posts.length} {posts.length === 1 ? 'essay' : 'essays'}
          </span>
          <span aria-hidden="true" className="size-1 rounded-full bg-ios-quaternary" />
          <span>{totalMinutes} min of reading</span>
          {latestDate && (
            <>
              <span aria-hidden="true" className="size-1 rounded-full bg-ios-quaternary" />
              <span>Latest: {latestDate}</span>
            </>
          )}
        </div>

        <div
          role="group"
          aria-label="Filter articles by topic"
          className="-mx-6 mt-7 flex items-center gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {[ALL_TAG, ...tags].map((tag) => {
            const isActive = activeTag === tag;
            const count = tag === ALL_TAG ? posts.length : (tagCounts.get(tag) ?? 0);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-electric/40',
                  isActive
                    ? 'border-ios-ink bg-ios-ink text-white shadow-ios'
                    : 'border-ios-separator bg-white/70 text-ios-secondary hover:border-ios-separator-strong hover:bg-white hover:text-ios-label',
                )}
              >
                {tag}
                <span
                  className={cn(
                    'font-mono text-[10px] tabular-nums',
                    isActive ? 'text-white/60' : 'text-ios-tertiary',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {activeTag === ALL_TAG
            ? `Showing all ${posts.length} essays.`
            : `Showing ${filtered.length} ${filtered.length === 1 ? 'essay' : 'essays'} tagged ${activeTag}.`}
        </p>
      </motion.header>

      <AnimatePresence mode="popLayout">
        {featured && (
          <motion.section
            key="featured"
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="mb-8"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-ios-2xl border border-ios-separator bg-white/85 shadow-ios backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-ios-separator-strong hover:bg-white hover:shadow-ios-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-electric/40 lg:grid-cols-[1.06fr_0.94fr]"
            >
              <div className="order-2 flex flex-col p-6 sm:p-8 lg:order-1 lg:justify-center lg:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="accent" size="sm" icon={<Sparkles className="size-3" />}>
                    Latest article
                  </Badge>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ios-tertiary">
                    {featured.tags[0]}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs text-ios-tertiary">
                  <time dateTime={featured.datePublished}>{formatDate(featured.datePublished)}</time>
                  <span aria-hidden="true" className="size-1 rounded-full bg-ios-quaternary" />
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {featured.readingTime}
                  </span>
                </div>

                <h2 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-ios-ink transition-colors duration-200 group-hover:text-ios-electric sm:text-3xl lg:text-[2.1rem]">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ios-secondary sm:text-[15px]">
                  {featured.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-ios-electric px-5 py-2.5 text-sm font-semibold text-white shadow-ios-button transition-colors duration-200 group-hover:bg-ios-bluePressed">
                    Read article
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="text-xs text-ios-tertiary">Also published on Medium</span>
                </div>
              </div>

              <BlogCover
                index={indexBySlug.get(featured.slug) ?? 0}
                tag={featured.tags[0]}
                date={featured.datePublished}
                variant="hero"
                className="order-1 min-h-[220px] lg:order-2 lg:min-h-full"
              />
            </Link>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ios-tertiary">
          {activeTag === ALL_TAG
            ? 'More essays'
            : `${filtered.length} ${filtered.length === 1 ? 'essay' : 'essays'} on ${activeTag}`}
        </h2>
        <span className="text-xs text-ios-tertiary">Newest first</span>
      </div>

      <motion.div
        key={activeTag}
        variants={gridContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {gridPosts.map((post) => (
          <motion.article key={post.slug} variants={gridItem} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-ios-2xl border border-ios-separator bg-white/85 shadow-ios backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-ios-separator-strong hover:bg-white hover:shadow-ios-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-electric/40"
            >
              <BlogCover
                index={indexBySlug.get(post.slug) ?? 0}
                tag={post.tags[0]}
                date={post.datePublished}
                className="aspect-[16/9] w-full"
              />

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-ios-tertiary">
                    <Clock className="size-3.5" />
                    {post.readingTime}
                  </span>
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-ios-fill text-ios-secondary transition-colors duration-200 group-hover:bg-ios-electric group-hover:text-white">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>

                <h3 className="mt-3 text-balance text-lg font-bold leading-snug tracking-tight text-ios-ink transition-colors duration-200 group-hover:text-ios-electric">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ios-secondary">
                  {post.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="muted" size="sm">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="muted" size="sm">
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      {gridPosts.length === 0 && (
        <p className="rounded-ios-xl border border-dashed border-ios-separator-strong bg-white/60 px-6 py-10 text-center text-sm text-ios-tertiary">
          No essays here yet — try another topic.
        </p>
      )}

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="relative mt-20 overflow-hidden rounded-ios-2xl bg-ios-navy px-6 py-14 text-center sm:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-ios-electric/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-ios-purple/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-ios-2xl ring-1 ring-inset ring-white/10"
        />

        <div className="relative mx-auto max-w-2xl font-ios">
          <Eyebrow className="text-white/60">The notebook</Eyebrow>
          <h2 className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            New essays, published to Medium first
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
            Longer versions, with the references and the rough thinking left in. Follow along, or
            subscribe to the feed.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={site.socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({ variant: 'light' })}
            >
              Follow on Medium
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="/blog/rss.xml"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <Rss className="size-4" />
              RSS feed
            </a>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
