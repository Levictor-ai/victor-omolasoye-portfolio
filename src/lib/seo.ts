import type { Metadata } from 'next';

export const SITE_URL = 'https://omolasoyevictor.com';

export const site = {
  name: 'Victor Omolasoye',
  title: 'Victor Omolasoye',
  role: 'Multidisciplinary Designer',
  roleShort: 'Brand & Product Designer',
  tagline: 'I design brands and digital experiences.',
  description:
    'Victor Omolasoye is a multidisciplinary designer working across brand identity and digital product design. He brings ideas to life through thoughtful visual identities and intuitive digital experiences.',
  shortDescription:
    'Multidisciplinary designer working across brand identity and digital product design.',
  location: 'Lagos, Nigeria',
  email: 'omolasoyevictorakinyemi@gmail.com',
  image: '/images/victor-profile.jpg',
  imageAlt: 'Victor Omolasoye, multidisciplinary designer',
  locale: 'en_NG',
  language: 'en',
  socials: {
    linkedin: 'https://www.linkedin.com/in/omolasoyevictor/',
    contra: 'https://contra.com/omolasoye_victor_akinye_wziw3jpo',
    github: 'https://github.com/Levictor-ai',
    behance: 'https://www.behance.net/victoromo',
    twitter: 'https://x.com/mlevictor21',
    medium: 'https://medium.com/@omolasoyevictorakinyemi',
  },
} as const;

export const primaryKeywords = [
  'multidisciplinary designer',
  'brand designer',
  'product designer',
  'brand identity designer',
  'ui ux designer',
  'digital experience designer',
  'brand designer lagos',
  'product designer lagos',
  'brand designer nigeria',
  'product designer nigeria',
  'brand identity portfolio',
  'product design portfolio',
  'design systems designer',
  'visual identity',
  'art direction',
  'freelance brand designer',
  'freelance product designer',
];

export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path === '/' ? '' : path.replace(/\/$/, '')}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = site.image,
  imageAlt = site.imageAlt,
  type = 'website',
  publishedTime,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...primaryKeywords.slice(0, 8), ...keywords],
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: `${site.name} — ${site.roleShort}`,
      locale: site.locale,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: absoluteUrl(image), width: 1200, height: 1547, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
