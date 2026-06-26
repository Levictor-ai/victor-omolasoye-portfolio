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
  email: 'omolasoyevictorakinyemi@gmail.com',
  location: 'Lagos, Nigeria',
  socials: {
    linkedin: 'https://www.linkedin.com/in/omolasoyevictor/',
    contra: 'https://contra.com/omolasoye_victor_akinye_wziw3jpo',
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
    {
      quote:
        'Victor brought a level of intentionality to our brand identity that completely shifted how our customers perceive us. Every pixel had a purpose.',
      author: 'Folake Balogun',
      role: 'Founder',
      company: 'Jasper Creatives',
    },
    {
      quote:
        'His ability to switch between design thinking and technical execution is unmatched. He doesn\'t just design — he builds.',
      author: 'Emeka Nwosu',
      role: 'CTO',
      company: 'Moovable Technology Limited',
    },
    {
      quote:
        'Victor redesigned our entire product experience and the user feedback was overwhelmingly positive. Our engagement metrics doubled within a month.',
      author: 'Sarah Adeleke',
      role: 'Product Lead',
      company: 'Dev. and Design',
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
  resumeUrl: 'https://canva.link/pl0y6d2kdh90hm1',
  experience: [
    {
      company: 'Moovable Technology Limited',
      role: 'UI/UX Product Designer',
      period: 'Jan 2026 — Present',
      description:
        'Leading product design for mobile and web platforms, driving user research, prototyping, and cross-functional collaboration to ship intuitive interfaces.',
    },
    {
      company: 'Dev. and Design',
      role: 'UI/UX Designer',
      period: 'Oct 2025 — Mar 2026',
      description:
        'Designed and delivered end-to-end user experiences for client products, from wireframes to high-fidelity prototypes.',
    },
    {
      company: 'Jasper Creatives',
      role: 'Graphic Designer',
      period: 'Sep 2025 — Present',
      description:
        'Creating brand identities, marketing collateral, and visual assets for a diverse portfolio of clients.',
    },
    {
      company: 'Anyrev',
      role: 'Brand Designer',
      period: 'Sep 2025 — Dec 2025',
      description:
        'Developed brand strategies, visual systems, and design guidelines for the platform.',
    },
    {
      company: 'Untitled Designer',
      role: 'Brand & Product Designer',
      period: 'Feb 2025 — Feb 2026',
      description:
        'Delivered brand identity and product design solutions across multiple client engagements.',
    },
    {
      company: 'Venture Tribe',
      role: 'Graphic Designer',
      period: 'Jul 2024 — Dec 2024',
      description:
        'Produced visual content, social media graphics, and branding materials for startup ecosystem events and campaigns.',
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
