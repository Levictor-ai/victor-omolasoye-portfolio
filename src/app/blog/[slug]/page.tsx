import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { JsonLd } from '@/components/JsonLd';
import { BackToTop } from '@/components/BackToTop';
import { getAllBlogPosts, getBlogPost } from '@/data/blog';
import { blogPostingSchema, breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { defaultProfile } from '@/data/profile';

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article' };

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: '/images/victor-profile.jpg',
    imageAlt: `Victor Omolasoye, author of ${post.title}`,
    type: 'article',
    publishedTime: post.datePublished,
    keywords: post.tags.map((t) => t.toLowerCase()),
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const posts = getAllBlogPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const next = posts[(currentIndex + 1) % posts.length];
  const wordCount = post.sections.reduce(
    (total, section) =>
      total +
      section.paragraphs.join(' ').split(/\s+/).length +
      (section.bullets ?? []).join(' ').split(/\s+/).length,
    post.title.split(/\s+/).length,
  );

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema({
            title: post.title,
            description: post.description,
            slug,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            keywords: post.tags,
            wordCount,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <Nav avatar={defaultProfile.avatar} />
      <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          &larr; All articles
        </Link>

        <article>
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">{post.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="space-y-8 text-[15px] leading-relaxed text-gray-700">
            {post.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j} className="mb-4">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="my-4 space-y-2">
                    {section.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gray-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-2 text-lg font-bold text-gray-900">Written by {defaultProfile.name}</h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              {defaultProfile.name} is a product designer, brand designer and UI/UX designer in
              Lagos, Nigeria, working across UX research, design systems, brand identity and
              product design.
            </p>
            <a
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-brand hover:text-brand-dark"
            >
              Read the full article on Medium &rarr;
            </a>
          </footer>
        </article>

        {next && next.slug !== post.slug && (
          <nav className="mt-12 border-t border-gray-200 pt-8">
            <p className="mb-2 text-sm text-gray-500">Next article</p>
            <Link
              href={`/blog/${next.slug}`}
              className="text-lg font-bold tracking-tight text-gray-900 hover:text-brand-dark"
            >
              {next.title}
            </Link>
          </nav>
        )}
      </main>
      <BackToTop />
    </>
  );
}
