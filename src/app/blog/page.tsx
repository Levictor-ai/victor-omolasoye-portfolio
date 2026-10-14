import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { JsonLd } from '@/components/JsonLd';
import { BackToTop } from '@/components/BackToTop';
import { BlogContent } from '@/components/BlogContent';
import { getAllBlogPosts, getBlogTags } from '@/data/blog';
import { breadcrumbSchema, collectionSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
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
      <BlogContent posts={posts} tags={tags} description={description} />
      <BackToTop />
    </>
  );
}
