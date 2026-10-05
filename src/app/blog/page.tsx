import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { JsonLd } from '@/components/JsonLd';
import { BackToTop } from '@/components/BackToTop';
import { getAllBlogPosts, getBlogTags } from '@/data/blog';
import { breadcrumbSchema, collectionSchema } from '@/lib/schema';
import { pageMetadata, site } from '@/lib/seo';
import { defaultProfile } from '@/data/profile';

const title = 'Writing on Product Design, UI/UX & Brand Design';

const description =
  'Articles by Victor Omolasoye on product design, UI/UX, design systems, accessibility, UX writing and typography — written for designers and the teams that build with them.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/blog',
  keywords: [
    'product design articles',
    'ui ux writing',
    'design blog',
    'ux articles',
    'design thinking articles',
  ],
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const tags = getBlogTags();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
          collectionSchema({
            name: 'Writing on Product Design, UI/UX & Brand Design',
            description,
            path: '/blog',
            items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
          }),
        ]}
      />
      <Nav avatar={defaultProfile.avatar} />
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
        <header className="mb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand">
            Writing
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Notes on product design, UI/UX and brand design
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">{description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-gray-300"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                <Link href={`/blog/${post.slug}`} className="hover:text-brand-dark">
                  {post.title}
                </Link>
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{post.description}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="text-sm text-gray-500">
          Full versions of these articles are published on{' '}
          <a
            href={site.socials.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand hover:text-brand-dark"
          >
            Medium
          </a>
          .
        </p>
      </main>
      <BackToTop />
    </>
  );
}
