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
import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BackToTop } from '@/components/BackToTop';

export function AboutClient() {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <main className="w-full px-6 pt-16 pb-28">
        <AboutSection
          profile={profile}
          headingClassName="font-ios text-6xl font-bold leading-none tracking-tight text-ios-ink sm:text-7xl"
          showImage={false}
          extraImage={profile.avatar}
        />
        <ServicesSection />
        <HowIWork />
        <ResultsSection />
        <ToolsSection />
        <TestimonialsSection profile={profile} />
        {profile.faqs.length > 0 && (
          <section id="faq" className="mb-20">
            <div className="mb-8">
              <SectionHeading title="Frequently Asked Questions" />
            </div>
            <Accordion items={profile.faqs} variant="card" />
          </section>
        )}
        <ExperienceTimeline profile={profile} />
      </main>
      <BackToTop />
    </>
  );
}
