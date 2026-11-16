'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { Nav } from '@/components/Nav';
import { SiteFooter } from '@/components/SiteFooter';
import { BackToTop } from '@/components/BackToTop';
import type { ProjectData } from '@/types/project';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutChapters, AboutReadingProgress } from '@/components/about/AboutChapters';
import { AboutStory } from '@/components/about/AboutStory';
import { AboutCraft } from '@/components/about/AboutCraft';
import { AboutProcess } from '@/components/about/AboutProcess';
import { AboutProof } from '@/components/about/AboutProof';
import { AboutRecord } from '@/components/about/AboutRecord';
import { AboutFaq } from '@/components/about/AboutFaq';
import { AboutCta } from '@/components/about/AboutCta';

export function AboutClient({ projects }: { projects: ProjectData[] }) {
  const profile = usePortfolio();

  return (
    <>
      <Nav avatar={profile.avatar} />
      <AboutReadingProgress />
      <main className="font-ios">
        <AboutHero profile={profile} />
        <AboutChapters />
        <AboutStory profile={profile} />
        <AboutCraft profile={profile} />
        <AboutProcess />
        <AboutProof profile={profile} projects={projects} />
        <AboutRecord profile={profile} />
        <AboutFaq faqs={profile.faqs} />
        <AboutCta profile={profile} />
      </main>
      <SiteFooter profile={profile} />
      <BackToTop />
    </>
  );
}
