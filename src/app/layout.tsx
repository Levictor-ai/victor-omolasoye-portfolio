import type { Metadata } from 'next';
import { PortfolioProvider } from '@/context/PortfolioContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Victor Omolasoye | Product Engineer',
  description:
    'Portfolio of Victor Omolasoye — Product engineer crafting scalable digital experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-[#0B0F19] font-sans text-slate-200">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
