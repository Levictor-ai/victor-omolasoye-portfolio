'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { HowIWork } from '@/components/HowIWork';
import { BackToTop } from '@/components/BackToTop';

export default function AboutPage() {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <AboutSection profile={profile} />
        <HowIWork />
        <ExperienceSection profile={profile} />
      </main>
      <BackToTop />
    </>
  );
}