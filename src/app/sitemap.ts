import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllBlogPosts } from '@/data/blog';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const dir = path.join(process.cwd(), 'data', 'projects');
  let projectSlugs: string[] = [];
  let showcaseSlugs: string[] = [];
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const project = JSON.parse(raw) as { showcase?: boolean };
      const slug = file.replace(/\.json$/, '');
      if (project.showcase) showcaseSlugs.push(slug);
      else projectSlugs.push(slug);
    }
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
      url: absoluteUrl('/brand'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/product'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
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
      priority: 0.8,
    },
    ...projectSlugs.map((slug) => ({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...showcaseSlugs.map((slug) => ({
      url: absoluteUrl(`/showcase/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.dateModified ?? post.datePublished),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
