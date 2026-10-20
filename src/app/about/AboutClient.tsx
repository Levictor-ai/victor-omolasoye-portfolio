'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { HowIWork } from '@/components/HowIWork';
import { ResultsSection } from '@/components/ResultsSection';
import { ToolsSection } from '@/components/ToolsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { BackToTop } from '@/components/BackToTop';

export function AboutClient() {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <AboutSection
        profile={profile}
        headingClassName="font-display text-6xl font-bold leading-none tracking-wide text-ios-label sm:text-7xl"
      />
      <main className="mx-auto max-w-7xl px-6 pt-16 pb-24 sm:px-8">
        <ServicesSection />
        <HowIWork />
        <ResultsSection />
        <ToolsSection />
        <TestimonialsSection profile={profile} />
        <ExperienceTimeline profile={profile} />
      </main>
      <BackToTop />
    </>
  );
}
