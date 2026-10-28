import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';
import { JsonLd } from '@/components/JsonLd';
import { getHomepageFeature } from '@/lib/work';
import { pageMetadata, site } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import { defaultProfile } from '@/data/profile';

export const metadata: Metadata = pageMetadata({
  title: `${site.name} | ${site.role}`,
  description: site.description,
  path: '/',
  keywords: ['brand and product designer', 'multidisciplinary designer lagos'],
});

export default function HomePage() {
  const brandFeature = getHomepageFeature('brand-design');
  const productFeature = getHomepageFeature('product-design');

  return (
    <>
      <JsonLd data={faqSchema(defaultProfile.faqs)} />
      <HomeContent brandFeature={brandFeature} productFeature={productFeature} />
    </>
  );
}
