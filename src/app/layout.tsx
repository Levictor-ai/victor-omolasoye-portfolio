import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { PortfolioProvider } from '@/context/PortfolioContext';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
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
    <html lang="en" className={`${manrope.variable} antialiased`}>
      <body className="min-h-screen bg-[#0B0F19] font-sans text-slate-200">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
