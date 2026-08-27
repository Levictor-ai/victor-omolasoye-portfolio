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
    medium?: string;
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
    'Victor Omolasoye is a multidisciplinary designer with **4+ years of experience** working across **brand identity, UX/UI, and digital products**. He combines research, strategy, and visual thinking to create brands and products that are clear, purposeful, and built around real user needs.\n\nHe has worked with founders and teams across the **UK, US, Canada, China, and Africa**, helping turn ideas into meaningful brands and digital experiences. He was also a **Graduate Product Owner at Cowrywise**, contributed to Bunkie, a home-services application.\n\nHis approach sits at the intersection of **design, product, and strategy**—bringing together business goals and user needs to create experiences that are not only visually strong, but useful, intuitive, and lasting.',
  avatar: '/images/victor-profile.jpg',
  email: 'omolasoyevictorakinyemi@gmail.com',
  location: 'Lagos, Nigeria',
  socials: {
    linkedin: 'https://www.linkedin.com/in/omolasoyevictor/',
    contra: 'https://contra.com/omolasoye_victor_akinye_wziw3jpo',
    github: 'https://github.com/Levictor-ai',
    behance: 'https://www.behance.net/victoromo',
    twitter: 'https://x.com/mlevictor21',
    medium: 'https://medium.com/@omolasoyevictorakinyemi',
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
  resumeUrl: 'https://drive.google.com/file/d/1hX0Qb8eERBRps2DsfU8oeohNF5HjDhFn/view?usp=sharing',
  experience: [
    {
      company: 'Forgelayers',
      role: 'Founding Designer · Graphic Designer',
      period: 'Mar. 2026 — Jul. 2026',
      description:
        'Joined Forgelayers at an early stage as a founding designer, helping take the product and brand from **0 → 1**. I defined and shaped the design direction across the different stages of the project, establishing the visual language, brand foundations, and creative systems needed to move the product from concept toward execution.\n\nWorked across brand campaigns, digital assets, social media, and print while collaborating with the broader team to translate ideas into clear, consistent visual experiences. I was involved beyond individual design deliverables, contributing to how the product was positioned, communicated, and visually developed from the ground up.',
    },
    {
      company: 'Moovable Technology Limited',
      role: 'UI/UX Product Designer',
      period: 'Jan. 2026 — Jun. 2026',
      description:
        'Worked as a key member of the product team designing the **MVP for a logistics platform**, helping translate the company\u2019s operational and business requirements into a functional digital product. I contributed to the product experience across key user journeys, turning complex logistics workflows into clear, intuitive interfaces.\n\nMy work covered the design of the **MVP and the complete administrative experience**, including the platform\u2019s admin pages, operational workflows, and supporting interfaces. I worked across user flows, wireframes, high-fidelity UI, prototyping, and responsive interface design, collaborating closely with the team to ensure the product was structured for real-world use.\n\nI also worked alongside developers during design handoff and implementation, refining interfaces and resolving design considerations throughout the process. This allowed me to contribute not just to individual screens, but to the **overall product structure and experience of the logistics platform**.',
    },
    {
      company: 'Jasper Creatives',
      role: 'Graphic Designer',
      period: 'Sep. 2025 — Apr. 2026',
      description:
        'Worked within a design agency environment, contributing to projects for clients across **different industries and sectors**. My role involved translating varied client requirements and brand objectives into compelling visual solutions across identity, marketing, campaigns, and digital communication.\n\nWorked across multiple projects simultaneously, adapting to different visual directions, audiences, and business needs while maintaining a high standard of craft and consistency. Collaborated with the agency team throughout the creative process, from interpreting briefs and developing concepts to refining designs and preparing final deliverables.',
    },
    {
      company: 'Untitled Designer',
      role: 'Brand and Product Designer',
      period: 'Feb. 2025 — Feb. 2026',
      description:
        'Delivered brand identities and product UI across sectors, translating business goals into clear visual systems and user-centred interfaces that shaped the full product experience.',
    },
    {
      company: 'Anyrev',
      role: 'Founding Designer · Brand Designer',
      period: 'Sep. 2025 — Dec. 2025',
      description:
        'Joined Anyrev at an early stage as a founding designer and helped build the brand from **0 → 1**. I was involved in defining the design direction from the beginning, shaping how the product should look, communicate, and present itself to its audience.\n\nDeveloped the core brand identity, including the logo, visual language, typography, colour system, and brand guidelines. Rather than working from an established identity, I helped establish the foundations that would guide the brand across its different stages and future touchpoints.',
    },
    {
      company: 'Dev. and Design',
      role: 'UI/UX Designer',
      period: 'Oct. 2025 — Mar. 2026',
      description:
        'Designed user flows and digital interfaces for web and mobile products, translating product requirements into intuitive and visually consistent experiences. Worked closely with developers throughout the design process to ensure that interfaces were practical to build and accurately translated from design to implementation.\n\nContributed to interaction design, responsive layouts, component consistency, and design handoff, with a focus on creating polished experiences that balanced usability, accessibility, and visual quality.',
    },
    {
      company: 'Venture Tribe',
      role: 'Graphic Designer',
      period: 'Jul. 2024 — Dec. 2024',
      description:
        'Contributed as part of the design team, supporting the delivery of visual work across the venture community\u2019s branding, events, and social media. My role focused on helping the team maintain a faster and more efficient creative workflow by taking on design tasks and ensuring deliverables were completed on time.\n\nWorked across different types of visual communication while maintaining consistency with the organisation\u2019s existing brand direction. This experience strengthened my ability to collaborate within a team, work efficiently under deadlines, and contribute to a larger creative output without compromising design quality.',
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
