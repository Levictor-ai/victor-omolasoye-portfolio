'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/data/blog';
import { site } from '@/lib/seo';
import { Badge, Eyebrow } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const easeOut = [0.22, 1, 0.36, 1] as const;

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
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
  const [featured, ...rest] = posts;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="relative mb-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 -z-10 h-64 w-64 rounded-full bg-ios-blue/10 blur-3xl"
        />
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-ios-blue" />
          <Eyebrow accent>Writing</Eyebrow>
        </div>
        <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight text-ios-label sm:text-5xl">
          Notes on product design, UI/UX and brand design
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-ios-secondary">{description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline">{tag}</Badge>
            </li>
          ))}
        </ul>
      </motion.header>

      {featured && (
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          className="mb-6"
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block overflow-hidden rounded-ios-2xl bg-ios-label p-8 font-ios text-white shadow-ios-lg transition-shadow duration-300 hover:shadow-ios-lg sm:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-ios-blue/30 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-ios-2xl ring-1 ring-inset ring-white/10"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/80 ring-1 ring-inset ring-white/15">
                Latest article
              </span>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/60">
                <time dateTime={featured.datePublished}>{formatDate(featured.datePublished)}</time>
                <span aria-hidden="true">&middot;</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {featured.readingTime}
                </span>
              </div>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-snug tracking-tight sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
                {featured.description}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white">
                Read article
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </motion.section>
      )}

      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-5 sm:grid sm:gap-5 sm:space-y-0 sm:grid-cols-2"
      >
        {rest.map((post, i) => (
          <motion.article
            key={post.slug}
            variants={gridItem}
            className="sticky h-full sm:static"
            style={{ top: `calc(4.5rem + ${Math.min(i, 3) * 0.5}rem)` }}
          >
            <Card href={`/blog/${post.slug}`} hover className="group h-full">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-ios-tertiary">
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
                <span className="font-mono text-xs text-ios-quaternary">
                  {String(i + 2).padStart(2, '0')}
                </span>
              </div>
              <h2 className="mb-2 text-xl font-bold tracking-tight text-ios-label transition-colors group-hover:text-ios-blue">
                {post.title}
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-ios-secondary">{post.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="muted" size="sm">
                    {tag}
                  </Badge>
                ))}
                <span className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-ios-fill text-ios-secondary transition-colors group-hover:bg-ios-blue group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Card>
          </motion.article>
        ))}
      </motion.div>

      <p className="mt-12 font-ios text-sm text-ios-secondary">
        Full versions of these articles are published on{' '}
        <a
          href={site.socials.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ios-blue hover:text-ios-bluePressed"
        >
          Medium
        </a>
        .
      </p>
    </main>
  );
}
