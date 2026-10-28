import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blog';
import { getAllProjects } from '@/lib/projects';
import { absoluteUrl } from '@/lib/seo';
import { isUpcoming, trackForCategory, workPath } from '@/lib/work';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();
  const posts = getAllBlogPosts();
  const now = new Date();

  return [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/brand-design'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/product-design'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...projects
      .filter((project) => !isUpcoming(project))
      .map((project) => ({
        url: absoluteUrl(workPath(trackForCategory(project.category), project.slug)),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.dateModified ?? post.datePublished),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
