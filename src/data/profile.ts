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
  avatar?: string;
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
    keywords: string[];
  }[];
}

export const defaultProfile: ProfileData = {
  name: 'Victor Omolasoye',
  titles: ['Product Designer', 'Product Engineer', 'Brand Designer'],
  tagline: 'Designing what ideas become.',
  bio: 'Product engineer with a passion for crafting scalable digital experiences.',
  about:
    'I’m Victor Omolasoye, a multidisciplinary designer with a background in English and Education and over three years of experience designing across brand, product, and digital experiences.\n\nI started designing out of a fascination with visual communication, but over time, my interest grew beyond how things look into how they work, how people interact with them, and how ideas can be transformed into meaningful experiences.\n\nToday, I work across **brand design, UI/UX, product design, and web experiences**. I combine design thinking, visual communication, and AI powered tools to take ideas from concept to tangible digital experiences. I enjoy being involved throughout the process, from understanding the problem and shaping the experience to developing visual systems, prototyping solutions, and bringing ideas to life.\n\nMy background in English has strengthened the way I think about communication. I care about clarity, storytelling, structure, and creating experiences where both the visual and verbal language feel intentional.\n\nI’m especially interested in the intersection of **design, technology, AI, and human behaviour**, and I’m constantly exploring new ways to create products that are useful, intuitive, accessible, and meaningful.\n\nTo me, design is not simply about making things look good. **It’s about giving ideas form, making them understandable, and creating experiences that work.**',
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
        "Victor is an exceptional designer who brought my vision to life with creativity and precision. He understood my ideas, welcomed feedback, and contributed thoughtful suggestions that elevated the final result. His professionalism, attention to detail, and commitment to excellence made the experience outstanding. I highly recommend Victor for any design project.",
      author: 'CEO',
      role: 'CEO',
      company: 'Hevaura',
      avatar: '/images/avatars/hevaura-ceo.png',
    },
    {
      quote:
        'Victor never delivers average designs—he always delivers a masterclass. Every project exceeds my expectations. Thank you for the amazing work!',
      author: 'Alabi Onifoto',
      role: 'Creative Director',
      avatar: '/images/avatars/alabi-onifoto.png',
    },
    {
      quote:
        "Victor is an exceptional designer who transformed my vision into reality with precision and creativity. He was highly professional, receptive to feedback, and added valuable ideas that made the final result even better. His attention to detail, creativity, and commitment to excellence made working with him an outstanding experience. I highly recommend Victor to anyone looking for a talented and reliable designer.",
      author: 'Barrister Seyifunmi',
      role: 'Co-founder',
      company: 'Luminous Attorney',
      avatar: '/images/avatars/seyifunmi.png',
    },
    {
      quote:
        "Working with Victor revealed his deep understanding of product development and user experience. He was able to single handedly design accurately major screens during our time together and he's exceptional",
      author: 'Precious Okhueleigbe',
      role: 'Lead Product design',
      company: 'moovable tech',
      avatar: '/images/avatars/precious-okhuelegbe.png',
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
  resumeUrl: 'https://drive.google.com/file/d/18bYWCcV4bx5f2rkG3M-CyvL-rkh3gCdn/view?usp=sharing',
  experience: [
    {
      company: 'Forgelayers',
      role: 'Founding Designer · Graphic Designer',
      period: 'Mar. 2026 — Jul. 2026',
      keywords: ['0 → 1', 'Design Direction', 'Brand Foundations', 'Design Systems', 'Campaigns & Print'],
    },
    {
      company: 'Moovable Technology Limited',
      role: 'UI/UX Product Designer',
      period: 'Jan. 2026 — Jun. 2026',
      keywords: ['Logistics MVP', 'Admin Experience', 'User Flows', 'Wireframes → Hi-Fi UI', 'Design Handoff'],
    },
    {
      company: 'Jasper Creatives',
      role: 'Graphic Designer',
      period: 'Sep. 2025 — Apr. 2026',
      keywords: ['Agency Work', 'Brand Identity', 'Marketing & Campaigns', 'Multi-client Delivery'],
    },
    {
      company: 'Untitled Designer',
      role: 'Brand and Product Designer',
      period: 'Feb. 2025 — Feb. 2026',
      keywords: ['Brand Identity', 'Product UI', 'Visual Systems', 'User-centred Design'],
    },
    {
      company: 'Anyrev',
      role: 'Founding Designer · Brand Designer',
      period: 'Sep. 2025 — Dec. 2025',
      keywords: ['0 → 1', 'Brand Identity', 'Logo & Visual Language', 'Type & Colour Systems', 'Brand Guidelines'],
    },
    {
      company: 'Dev. and Design',
      role: 'UI/UX Designer',
      period: 'Oct. 2025 — Mar. 2026',
      keywords: ['User Flows', 'Web & Mobile UI', 'Responsive Layouts', 'Component Consistency', 'Design Handoff'],
    },
    {
      company: 'Venture Tribe',
      role: 'Graphic Designer',
      period: 'Jul. 2024 — Dec. 2024',
      keywords: ['Branding', 'Events', 'Social Media', 'Team Collaboration', 'Fast Turnaround'],
    },
  ],
};
