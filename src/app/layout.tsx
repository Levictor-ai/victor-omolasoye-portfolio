import type { Metadata } from 'next';
import { Manrope, Bebas_Neue } from 'next/font/google';
import { PortfolioProvider } from '@/context/PortfolioContext';
import './globals.css';

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
  title: 'Victor Omolasoye | Product Designer & Engineer',
  description:
    'Portfolio of Victor Omolasoye — Product designer, engineer, and brand designer crafting user-centred digital experiences.',
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
