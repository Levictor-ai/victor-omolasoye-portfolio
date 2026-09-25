import type { Metadata, Viewport } from 'next';
import { Manrope, Bebas_Neue, Inter } from 'next/font/google';
import { PortfolioProvider } from '@/context/PortfolioContext';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#F8F9FA',
  width: 'device-width',
  initialScale: 1,
};

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
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
  metadataBase: new URL('https://omolasoyevictor.com'),
  title: {
    default: 'Victor Omolasoye | Product Designer & Engineer',
    template: '%s | Victor Omolasoye',
  },
  description:
    'Portfolio of Victor Omolasoye — Product designer, engineer, and brand designer crafting user-centred digital experiences.',
  openGraph: {
    title: 'Victor Omolasoye | Product Designer & Engineer',
    description:
      'Portfolio of Victor Omolasoye — Product designer, engineer, and brand designer crafting user-centred digital experiences.',
    url: 'https://omolasoyevictor.com',
    siteName: 'Victor Omolasoye Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/victor-profile.jpg', width: 1200, height: 1547 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Victor Omolasoye | Product Designer & Engineer',
    description:
      'Portfolio of Victor Omolasoye — Product designer, engineer, and brand designer crafting user-centred digital experiences.',
    images: ['/images/victor-profile.jpg'],
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${bebasNeue.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
