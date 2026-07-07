import type { Metadata, Viewport } from 'next';
import { Manrope, Bebas_Neue } from 'next/font/google';
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
    images: [{ url: '/images/victor-profile.jpg', width: 1200, height: 1200 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Victor Omolasoye | Product Designer & Engineer',
    description:
      'Portfolio of Victor Omolasoye — Product designer, engineer, and brand designer crafting user-centred digital experiences.',
    images: ['/images/victor-profile.jpg'],
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
    <html lang="en" className={`${manrope.variable} ${bebasNeue.variable} antialiased`}>
      <body className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
