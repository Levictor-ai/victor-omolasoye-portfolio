'use client';

import { createContext, useContext, type ReactNode } from 'react';

export interface Skill {
  name: string;
  percentage: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProfileData {
  name: string;
  titles: string[];
  tagline: string;
  bio: string;
  about: string;
  avatar: string;
  email: string;
  location: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    contra?: string;
  };
  toolSkills: Skill[];
  softSkills: Skill[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  resumeUrl: string;
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
}

const defaultProfile: ProfileData = {
  name: 'Victor Omolasoye',
  titles: ['Product Designer', 'Product Engineer', 'Brand Designer'],
  tagline: 'Designing products that bridge brand and experience.',
  bio: 'Product engineer with a passion for crafting scalable digital experiences.',
  about:
    'Victor Omolasoye is a user experience expert who puts users at the centre of every solution. From brand identity to digital products, he combines research, strategy, and design to bridge the gap between brand design and product development.\n\nHe has worked with founders across sectors to build meaningful, lasting brands and products for audiences in the UK, US, Canada, China, and across Africa. Victor has also partnered with Cowrywise as a Graduate Product Owner, collaborating on Bunkie, a home-services application.\n\nHis work is driven by a focus on clarity, usability, and creating experiences that serve both business goals and real user needs.',
  avatar: '/images/victor-profile.jpg',
  email: 'victor@omolasoye.com',
  location: 'Lagos, Nigeria',
  socials: {
    linkedin: 'https://linkedin.com/in/victoromolasoye',
    contra: 'https://contra.com/victoromolasoye',
    github: 'https://github.com/victoromolasoye',
  },
  toolSkills: [
    { name: 'Figma', percentage: 95 },
    { name: 'Photoshop', percentage: 90 },
    { name: 'Illustrator', percentage: 70 },
    { name: 'Framer', percentage: 50 },
    { name: 'Antigravity', percentage: 90 },
    { name: 'AI', percentage: 90 },
  ],
  softSkills: [
    { name: 'User Experience', percentage: 90 },
    { name: 'User Research', percentage: 83 },
    { name: 'Prompt Engineering', percentage: 80 },
    { name: 'Artificial Intelligence', percentage: 86 },
  ],
  testimonials: [
    {
      quote:
        'Victor has a rare ability to translate complex user needs into elegant, intuitive designs. His work on our platform transformed how users interact with our product.',
      author: 'Tunde Adeyemi',
      role: 'VP of Product',
      company: 'Cowrywise',
    },
    {
      quote:
        'Working with Victor was a masterclass in user-centred design. He brought clarity to every stage of the product development process.',
      author: 'Chioma Okafor',
      role: 'CEO',
      company: 'TechVentures Africa',
    },
  ],
  faqs: [
    {
      question: 'What services do you offer?',
      answer:
        'I offer product design, brand identity, UX research, and product engineering services. This includes everything from user research and wireframing to visual design, prototyping, and front-end development.',
    },
    {
      question: 'How do you approach a new project?',
      answer:
        'I start with research and discovery — understanding the users, the market, and the business goals. From there, I move through ideation, prototyping, testing, and iterative refinement before handing off development-ready designs.',
    },
    {
      question: 'What industries have you worked in?',
      answer:
        'I have worked across fintech, prop-tech, blockchain, and consumer social platforms, partnering with companies like Cowrywise and founders building for audiences in the UK, US, Canada, China, and Africa.',
    },
    {
      question: 'Do you offer ongoing retainer-based work?',
      answer:
        'Yes. I am available for both project-based engagements and ongoing retainer arrangements for product teams that need consistent design and engineering support.',
    },
    {
      question: 'How can I work with you?',
      answer:
        'You can reach me via email at victor@omolasoye.com or connect with me on LinkedIn. I typically respond within 24 hours.',
    },
  ],
  resumeUrl: '/files/victor-omolasoye-resume.pdf',
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
