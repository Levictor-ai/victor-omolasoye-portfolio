'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LogoProps {
  className?: string;
}

function FigmaLogo({ className = 'size-7' }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="4" r="4" fill="#F24E1E" />
      <circle cx="8" cy="12" r="4" fill="#A259FF" />
      <circle cx="8" cy="20" r="4" fill="#0ACF83" />
      <circle cx="16" cy="4" r="4" fill="#FF7262" />
      <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
    </svg>
  );
}

function VercelLogo({ className = 'size-7' }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 22 20.5H2Z" fill="#000000" />
    </svg>
  );
}

function GeminiLogo({ className = 'size-7' }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="gemini-sparkle">
          <path d="M12 3c1.5 5.5 3.5 7.5 9 9-5.5 1.5-7.5 3.5-9 9-1.5-5.5-3.5-7.5-9-9 5.5-1.5 7.5-3.5 9-9Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#gemini-sparkle)">
        <rect x="0" y="0" width="12" height="12" fill="#4285F4" />
        <rect x="12" y="0" width="12" height="12" fill="#9B72CB" />
        <rect x="0" y="12" width="12" height="12" fill="#FBBC05" />
        <rect x="12" y="12" width="12" height="12" fill="#EA4335" />
      </g>
    </svg>
  );
}

function GithubLogo({ className = 'size-7' }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="#181717"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  );
}

function WorkspaceLogo({ className = 'size-7' }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4.5 11.5 13" stroke="#4285F4" strokeWidth="3.5" />
      <path d="M11.5 13 12.5 4.5" stroke="#34A853" strokeWidth="3.5" />
      <path d="M12.5 4.5 13 13" stroke="#FBBC05" strokeWidth="3.5" />
      <path d="M13 13 21 4.5" stroke="#EA4335" strokeWidth="3.5" />
    </svg>
  );
}

const tools: {
  name: string;
  tileClass: string;
  svgClass: string;
  logo: ReactNode;
}[] = [
  {
    name: 'Figma',
    tileClass: 'bg-gray-50',
    svgClass: 'size-7',
    logo: <FigmaLogo />,
  },
  {
    name: 'Photoshop',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#31A8FF" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="inherit" fill="#FFFFFF">
          Ps
        </text>
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#FF9A00" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="inherit" fill="#FFFFFF">
          Ai
        </text>
      </svg>
    ),
  },
  {
    name: 'InDesign',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#FF3366" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="inherit" fill="#FFFFFF">
          Id
        </text>
      </svg>
    ),
  },
  {
    name: 'Framer',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#0055FF" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="inherit" fill="#FFFFFF">
          F
        </text>
      </svg>
    ),
  },
  {
    name: 'Google Antigravity',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#4285F4" />
        <path
          fill="#FFFFFF"
          d="M12 5c.7 3 2.3 4.7 5.3 5.4-3 .7-4.6 2.3-5.3 5.3-.7-3-2.3-4.6-5.3-5.3 3-.7 4.6-2.3 5.3-5.4Z"
        />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    tileClass: 'bg-gray-50',
    svgClass: 'size-7',
    logo: <VercelLogo />,
  },
  {
    name: 'ChatGPT',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#10A37F" />
        <g fill="#FFFFFF">
          <rect x="11" y="4.5" width="2" height="9" rx="1" />
          <rect x="11" y="4.5" width="2" height="9" rx="1" transform="rotate(60 12 12)" />
          <rect x="11" y="4.5" width="2" height="9" rx="1" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Gemini',
    tileClass: 'bg-gray-50',
    svgClass: 'size-7',
    logo: <GeminiLogo />,
  },
  {
    name: 'Flow',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#7E6AF6" />
        <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="inherit" fill="#FFFFFF">
          F
        </text>
      </svg>
    ),
  },
  {
    name: 'Notion',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#111111" />
        <g fill="#FFFFFF">
          <rect x="7.5" y="5.5" width="3" height="13" rx="1" />
          <rect x="13.5" y="5.5" width="3" height="13" rx="1" />
          <path d="M10.8 5.5h3.4l-.4 13h-3.4z" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Slack',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#611F69" />
        <g fill="#FFFFFF">
          <rect x="4.5" y="9" width="15" height="2.5" rx="1.25" />
          <rect x="4.5" y="13" width="15" height="2.5" rx="1.25" />
          <rect x="9" y="4.5" width="2.5" height="15" rx="1.25" />
          <rect x="13" y="4.5" width="2.5" height="15" rx="1.25" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Google Workspace',
    tileClass: 'bg-gray-50',
    svgClass: 'size-7',
    logo: <WorkspaceLogo />,
  },
  {
    name: 'Microsoft Teams',
    tileClass: 'bg-transparent',
    svgClass: 'h-full w-full',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#6264A7" />
        <g fill="#FFFFFF">
          <rect x="4" y="11" width="16" height="3" rx="1.5" />
          <rect x="10.5" y="4.5" width="3" height="15" rx="1.5" />
        </g>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    tileClass: 'bg-gray-50',
    svgClass: 'size-7',
    logo: <GithubLogo />,
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
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className="mb-20"
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="mb-1 text-heading-lg font-bold tracking-tight text-gray-900"
      >
        Tools
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05 } },
        }}
        className="mb-8 text-label-sm uppercase tracking-wider text-gray-400"
      >
        What I work with
      </motion.p>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`flex size-12 items-center justify-center overflow-hidden rounded-xl ${tool.tileClass}`}
              >
                {tool.logo}
              </div>
              <span className="text-sm font-medium text-gray-900">{tool.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}