'use client';

import { createContext, useContext, type ReactNode } from 'react';

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills: string[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
}

const defaultProfile: ProfileData = {
  name: 'Victor Omolasoye',
  title: 'Product Engineer',
  tagline: 'Building products that matter.',
  bio: 'Product engineer with a passion for crafting scalable digital experiences. I bridge the gap between product strategy and technical execution.',
  avatar: '/images/victor-profile.jpg',
  email: 'victor@example.com',
  location: 'Lagos, Nigeria',
  socials: {
    github: 'https://github.com/victoromolasoye',
    linkedin: 'https://linkedin.com/in/victoromolasoye',
    twitter: 'https://twitter.com/victoromolasoye',
  },
  skills: [
    'Product Strategy',
    'Next.js',
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Prisma',
    'Tailwind CSS',
    'System Design',
    'User Research',
  ],
  experience: [
    {
      company: 'Cowrywise',
      role: 'Graduate Product Owner',
      period: '2024 — Present',
      description:
        'Leading product development for Bunkie, a cross-region home services marketplace. Driving roadmap, stakeholder alignment, and engineering execution.',
    },
  ],
};

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
