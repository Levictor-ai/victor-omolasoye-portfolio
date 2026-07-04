'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type SkillLevel = 'Familiar' | 'Proficient' | 'Expert';

export interface Skill {
  name: string;
  level: SkillLevel;
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
    behance?: string;
  };
  coreDisciplines: Skill[];
  tools: Skill[];
  technicalHandoff: Skill[];
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
  tagline: 'Bridging the gap between brand identity and user experience to drive business growth.',
  bio: 'Product engineer with a passion for crafting scalable digital experiences.',
  about:
    'Victor Omolasoye is a user experience expert who puts users at the centre of every solution. From brand identity to digital products, he combines research, strategy, and design to bridge the gap between brand design and product development.\n\nHe has worked with founders across sectors to build meaningful, lasting brands and products for audiences in the UK, US, Canada, China, and across Africa. Victor has also partnered with Cowrywise as a Graduate Product Owner, collaborating on Bunkie, a home-services application.\n\nHis work is driven by a focus on clarity, usability, and creating experiences that serve both business goals and real user needs.',
  avatar: '/images/victor-profile.jpg',
  email: 'omolasoyevictorakinyemi@gmail.com',
  location: 'Lagos, Nigeria',
  socials: {
    linkedin: 'https://www.linkedin.com/in/omolasoyevictor/',
    contra: 'https://contra.com/omolasoye_victor_akinye_wziw3jpo',
    github: 'https://github.com/Levictor-ai',
    behance: 'https://www.behance.net/victoromo',
    twitter: 'https://x.com/mlevictor21',
  },
  coreDisciplines: [
    { name: 'Brand Identity', level: 'Expert' },
    { name: 'Typography', level: 'Proficient' },
    { name: 'User Experience', level: 'Expert' },
    { name: 'User Research', level: 'Expert' },
    { name: 'Prototyping', level: 'Proficient' },
    { name: 'Design Systems', level: 'Proficient' },
  ],
  tools: [
    { name: 'Figma', level: 'Expert' },
    { name: 'Photoshop', level: 'Expert' },
    { name: 'Illustrator', level: 'Proficient' },
    { name: 'Framer', level: 'Familiar' },
    { name: 'InDesign', level: 'Familiar' },
  ],
  technicalHandoff: [
    { name: 'Developer Handoff', level: 'Familiar' },
    { name: 'Motion Design', level: 'Familiar' },
    { name: 'HTML/CSS', level: 'Familiar' },
    { name: 'React', level: 'Familiar' },
  ],
  testimonials: [
    {
      quote:
        "Victor's creativity is truly exceptional. He took my vision and transformed it into reality with remarkable precision and creativity. What impressed me most was his openness to feedback, professionalism, and ability to understand exactly what I had in mind. He not only welcomed corrections but also contributed valuable suggestions that made the final result even better than I imagined. Working with Victor has been an outstanding experience. His commitment to excellence, attention to detail, and creative insight have earned my complete trust. I look forward to working with him on many more projects and confidently recommend him to anyone seeking a talented, reliable, and highly professional designer.",
      author: 'CEO',
      role: 'CEO',
      company: 'Hevaura',
    },
    {
      quote:
        'Victor never delivers average designs—he always delivers a masterclass. Every project exceeds my expectations. Thank you for the amazing work!',
      author: 'Alabi Onifoto',
      role: 'Creative Director',
    },
    {
      quote:
        "Working with Victor has been an outstanding experience. From our very first project, he demonstrated exceptional commitment, professionalism, and attention to detail. He consistently delivers high-quality designs on time, even under tight deadlines. His creativity, reliability, and strong work ethic make every collaboration seamless and enjoyable. Having worked with several designers, I can confidently say Victor stands out. His discipline, design expertise, and ability to exceed expectations have made him my preferred graphic designer. I highly recommend Victor to anyone looking for a skilled, dependable, and professional designer. He consistently delivers work of exceptional quality and always goes the extra mile.",
      author: 'Barrister Seyifunmi',
      role: 'Co-founder',
      company: 'Luminous Attorney',
    },
    {
      quote:
        'Working with Victor revealed his deep understanding of product development and user experience. He was able to single handedly design accurately major screens during our time together and he\'s exceptional',
      author: 'Precious Okhueleigbe',
      role: 'Lead Product design',
      company: 'moovable tech',
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
        'You can reach me via email at omolasoyevictorakinyemi@gmail.com or connect with me on LinkedIn. I typically respond within 24 hours.',
    },
  ],
  resumeUrl: 'https://canva.link/pl0y6d2kdh90hm1',
  experience: [
    {
      company: 'Forgelayers',
      role: 'Graphic Designer',
      period: 'Mar. 2026 — Present',
      description: '',
    },
    {
      company: 'Moovable Technology Limited',
      role: 'UI/UX Product Designer',
      period: 'Jan. 2026 — Present',
      description: '',
    },
    {
      company: 'Jasper Creatives',
      role: 'Graphic Designer',
      period: 'Sep. 2025 — Apr. 2026',
      description: '',
    },
    {
      company: 'Untitled Designer',
      role: 'Brand and Product Designer',
      period: 'Feb. 2025 — Feb. 2026',
      description: '',
    },
    {
      company: 'Anyrev',
      role: 'Brand Designer',
      period: 'Sep. 2025 — Dec. 2025',
      description: '',
    },
    {
      company: 'Dev. and Design',
      role: 'UI/UX Designer',
      period: 'Oct. 2025 — Mar. 2026',
      description: '',
    },
    {
      company: 'Venture Tribe',
      role: 'Graphic Designer',
      period: 'Jul. 2024 — Dec. 2024',
      description: '',
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
