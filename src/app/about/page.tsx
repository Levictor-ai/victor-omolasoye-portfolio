'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { HowIWork } from '@/components/HowIWork';
import { ServicesSection } from '@/components/ServicesSection';
import { ToolsSection } from '@/components/ToolsSection';
import { BackToTop } from '@/components/BackToTop';

export default function AboutPage() {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <AboutSection
        profile={profile}
        headingClassName="mb-6 font-display text-6xl font-bold leading-none tracking-wide text-gray-900 sm:text-7xl"
      />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-24 sm:px-8">
        <ServicesSection />
        <HowIWork />
        <ToolsSection />
        <div className="mt-32" />
        <ExperienceSection
          profile={profile}
          headingClassName="mb-1 font-display text-6xl font-bold leading-none tracking-wide text-gray-900 sm:text-7xl"
        />
      </main>
      <BackToTop />
    </>
  );
}
