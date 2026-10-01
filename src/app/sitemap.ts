import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllBlogPosts } from '@/data/blog';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const dir = path.join(process.cwd(), 'data', 'projects');
  let projectSlugs: string[] = [];
  try {
    projectSlugs = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));
  } catch {}

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
      url: absoluteUrl('/projects'),
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
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projectSlugs.map((slug) => ({
      url: absoluteUrl(`/projects/${slug}`),
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
