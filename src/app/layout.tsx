import type { Metadata, Viewport } from 'next';
import { Manrope, Instrument_Serif } from 'next/font/google';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { PageScrollReset } from '@/components/PageScrollReset';
import { Analytics } from '@/components/Analytics';
import { JsonLd } from '@/components/JsonLd';
import { primaryKeywords, SITE_URL, site } from '@/lib/seo';
import { personSchema, websiteSchema } from '@/lib/schema';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#FAFAF7',
  width: 'device-width',
  initialScale: 1,
};

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: 'Portfolio',
  keywords: primaryKeywords,
  alternates: {
    canonical: SITE_URL,
    types: { 'application/rss+xml': `${SITE_URL}/blog/rss.xml` },
  },
  formatDetection: { email: true, address: false, telephone: false },
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.description,
    url: SITE_URL,
    siteName: `${site.name} — ${site.roleShort}`,
    locale: site.locale,
    type: 'website',
    images: [{ url: site.image, width: 1200, height: 1547, alt: site.imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.role}`,
    description: site.description,
    site: '@mlevictor21',
    creator: '@mlevictor21',
    images: [site.image],
  },
  icons: {
    icon: [
      { url: '/favicon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: {
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-screen bg-paper font-sans text-ink">
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <PageScrollReset />
        <PortfolioProvider>{children}</PortfolioProvider>
        <Analytics />
      </body>
    </html>
  );
}
