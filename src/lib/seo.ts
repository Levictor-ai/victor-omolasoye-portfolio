import type { Metadata } from 'next';

export const SITE_URL = 'https://omolasoyevictor.com';

export const site = {
  name: 'Victor Omolasoye',
  title: 'Victor Omolasoye',
  role: 'Product Designer, Brand Designer & UI/UX Designer',
  roleShort: 'Product Designer & Engineer',
  tagline: 'Designing what ideas become.',
  description:
    'Victor Omolasoye is a product designer, brand designer and UI/UX designer in Lagos, Nigeria. He builds brands, digital products and web experiences with 4+ years of experience across UX research, product design, design systems and front-end development.',
  shortDescription:
    'Product designer, brand designer and UI/UX designer in Lagos, Nigeria, crafting brands, digital products and web experiences.',
  location: 'Lagos, Nigeria',
  email: 'omolasoyevictorakinyemi@gmail.com',
  image: '/images/victor-profile.jpg',
  imageAlt: 'Victor Omolasoye, product and brand designer',
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
  'product designer',
  'brand designer',
  'ui ux designer',
  'web designer',
  'product designer lagos',
  'brand designer lagos',
  'ui ux designer nigeria',
  'product designer nigeria',
  'product design portfolio',
  'ux designer portfolio',
  'brand designer portfolio',
  'product engineer',
  'design systems designer',
  'user research ux designer',
  'freelance product designer',
  'visual designer',
  'graphic designer lagos',
  'product design services',
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
