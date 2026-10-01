import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { pageMetadata, site } from '@/lib/seo';
import { defaultProfile } from '@/data/profile';

const title = `About ${site.name} | Product, Brand & UI/UX Designer in Lagos`;

const description =
  'About Victor Omolasoye — a multidisciplinary product designer, brand designer and UI/UX designer in Lagos, Nigeria with 4+ years of experience across UX research, design systems, brand identity and product design.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/about',
  keywords: [
    'about victor omolasoye',
    'product designer cv',
    'brand designer cv',
    'ui ux designer resume',
    'product designer work experience',
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
          faqSchema(defaultProfile.faqs),
        ]}
      />
      <h1 className="sr-only">
        About {site.name} — Product Designer, Brand Designer and UI/UX Designer in Lagos, Nigeria
      </h1>
      <AboutClient />
    </>
  );
}
