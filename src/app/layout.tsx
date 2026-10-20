import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Bebas_Neue, Inter } from 'next/font/google';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { PageScrollReset } from '@/components/PageScrollReset';
import { Analytics } from '@/components/Analytics';
import { JsonLd } from '@/components/JsonLd';
import { primaryKeywords, SITE_URL, site } from '@/lib/seo';
import { personSchema, websiteSchema } from '@/lib/schema';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#F2F2F7',
  width: 'device-width',
  initialScale: 1,
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.role} in Lagos, Nigeria`,
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
    title: `${site.name} | ${site.role} in Lagos, Nigeria`,
    description: site.description,
    url: SITE_URL,
    siteName: `${site.name} — ${site.roleShort}`,
    locale: site.locale,
    type: 'website',
    images: [{ url: site.image, width: 1200, height: 1547, alt: site.imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.role} in Lagos, Nigeria`,
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
    <html lang="en" className={`${jakarta.variable} ${bebasNeue.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-ios-grouped font-ios text-ios-label">
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <PageScrollReset />
        <PortfolioProvider>{children}</PortfolioProvider>
        <Analytics />
      </body>
    </html>
  );
}
