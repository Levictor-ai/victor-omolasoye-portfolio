import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata, site } from '@/lib/seo';

const title = `Contact ${site.name} | Hire a Product Designer in Lagos`;

const description =
  'Get in touch with Victor Omolasoye — product designer in Lagos, Nigeria. Email, LinkedIn, hire on Contra, or send a message through the contact form.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/contact',
  keywords: [
    'contact victor omolasoye',
    'hire product designer lagos',
    'hire ui ux designer nigeria',
    'freelance product designer contact',
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <h1 className="sr-only">
        Contact {site.name} — Product Designer in Lagos, Nigeria
      </h1>
      <ContactClient />
    </>
  );
}
