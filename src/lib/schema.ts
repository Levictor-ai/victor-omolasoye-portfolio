import { absoluteUrl, site } from './seo';

const PERSON_ID = `${absoluteUrl('/')}#person`;

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    givenName: 'Victor',
    familyName: 'Omolasoye',
    url: absoluteUrl('/'),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl('/') },
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(site.image),
    },
    jobTitle: 'Product Designer, Brand Designer & UI/UX Designer',
    description: site.description,
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    knowsAbout: [
      'Product Design',
      'User Experience Design',
      'UI/UX Design',
      'Brand Identity',
      'Design Systems',
      'User Research',
      'Prototyping',
      'Web Design',
      'Front-End Development',
    ],
    knowsLanguage: ['en'],
    alumniOf: [
      'Cowrywise',
      'Moovable Technology Limited',
      'Forgelayers',
      'Jasper Creatives',
      'Anyrev',
    ],
    sameAs: Object.values(site.socials),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    url: absoluteUrl('/'),
    name: `${site.name} — ${site.roleShort}`,
    description: site.description,
    inLanguage: site.language,
    publisher: { '@id': PERSON_ID },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl('/')}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectSchema(project: {
  title: string;
  subtitle: string;
  overview: string;
  coverImage: string;
  slug: string;
  role: string;
  company: string;
  period: string;
  techStack: { name: string }[];
  links: { url: string; label: string; type: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${absoluteUrl(`/projects/${project.slug}`)}#project`,
    name: project.title,
    headline: `${project.title} — ${project.subtitle}`,
    description: project.overview,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.coverImage),
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    dateCreated: project.period,
    keywords: project.techStack.map((t) => t.name).join(', '),
    inLanguage: site.language,
    ...(project.links.length > 0
      ? {
          subjectOf: project.links.map((link) => ({
            '@type': 'CreativeWork',
            name: link.label,
            url: link.url,
          })),
        }
      : {}),
  };
}

export function collectionSchema({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(path)}#collection`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    inLanguage: site.language,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
  wordCount?: number;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    name: post.title,
    description: post.description,
    url,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    inLanguage: site.language,
    isPartOf: { '@id': `${absoluteUrl('/blog')}#collection` },
    ...(post.keywords ? { keywords: post.keywords.join(', ') } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
  };
}
