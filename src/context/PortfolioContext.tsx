'use client';

import { createContext, useContext, type ReactNode } from 'react';
import {
  defaultProfile,
  type ProfileData,
  type SkillLevel,
  type Skill,
  type Testimonial,
  type FAQ,
} from '@/data/profile';

export type { SkillLevel, Skill, Testimonial, FAQ, ProfileData };
export { defaultProfile };

interface PortfolioContextValue {
  profile: ProfileData;
}

const PortfolioContext = createContext<PortfolioContextValue>({
  profile: defaultProfile,
});

export function PortfolioProvider({
  children,
  profile,
}: {
  children: ReactNode;
  profile?: ProfileData;
}) {
  return (
    <PortfolioContext.Provider value={{ profile: profile ?? defaultProfile }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): ProfileData {
  const ctx = useContext(PortfolioContext);
  return ctx.profile;
}
