'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const tools: {
  name: string;
  logo: React.ReactNode;
}[] = [
  {
    name: 'Figma',
    logo: (
        <svg className="size-9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="8" height="4" rx="1" fill="#F24E1E" />
        <rect x="10" y="2" width="4" height="4" rx="1" fill="#A259FF" />
        <rect x="2" y="8" width="8" height="4" rx="1" fill="#0ACF83" />
        <rect x="10" y="8" width="4" height="4" rx="1" fill="#FF7262" />
        <rect x="2" y="14" width="8" height="4" rx="1" fill="#1ABCFE" />
        <rect x="10" y="14" width="4" height="4" rx="1" fill="#F24E1E" />
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    logo: (
        <svg className="size-9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="#00B2FF"
          d="M10 7h4v10h-4z"
          stroke="#00B2FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fill="none"
          stroke="#00B2FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 7l4 4M14 7l-4 4"
        />
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    logo: (
        <svg className="size-9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="#F90"
          d="M10 7h4v10h-4z"
          stroke="#F90"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fill="none"
          stroke="#F90"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 7l4 4M14 7l-4 4"
        />
      </svg>
    ),
  },
  {
    name: 'InDesign',
    logo: (
        <svg className="size-9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="#EC008C"
          d="M10 7h4v10h-4z"
          stroke="#EC008C"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fill="none"
          stroke="#EC008C"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 7l4 4M14 7l-4 4"
        />
      </svg>
    ),
  },
  {
    name: 'Framer',
    logo: (
        <svg className="size-9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill="#000" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: 'Google Antigravity',
    logo: (
        <svg className="size-9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="#4285F4" />
        <path
          fill="#FFFFFF"
          d="M12 5c.7 3 2.3 4.7 5.3 5.4-3 .7-4.6 2.3-5.3 5.3-.7-3-2.3-4.6-5.3-5.3 3-.7 4.6-2.3 5.3-5.4Z"
        />
      </svg>
    ),
  },
];

export function ToolsSection() {
  return (
    <motion.section
      id="tools"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
      className="mb-20"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-8"
      >
        <SectionHeading display title="Tools" eyebrow="What I work with" />
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group flex items-center justify-center rounded-ios-lg border border-ios-separator bg-white/80 p-3 shadow-ios backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-ios-blue/25 hover:shadow-ios-lg"
            >
              {tool.logo}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
