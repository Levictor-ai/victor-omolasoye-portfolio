'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

function FigmaLogo() {
  return (
    <svg className="size-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="4" r="4" fill="#F24E1E" />
      <circle cx="8" cy="12" r="4" fill="#A259FF" />
      <circle cx="8" cy="20" r="4" fill="#0ACF83" />
      <circle cx="16" cy="4" r="4" fill="#FF7262" />
      <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
    </svg>
  );
}

const tools: {
  name: string;
  tileClass: string;
  logo: ReactNode;
}[] = [
  { name: 'Figma', tileClass: 'bg-ios-fill', logo: <FigmaLogo /> },
  {
    name: 'Photoshop',
    tileClass: 'bg-transparent',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="#31A8FF"
          d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.68.01-.2-.01-.34 0-.41.01v3.36c.14.01.27.02.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.62-.23-.89-.17-.26-.41-.46-.7-.57zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.899c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.391 11.65c-.399.56-.959.98-1.609 1.22-.68.25-1.43.34-2.25.34-.24 0-.4 0-.5-.01s-.24-.01-.43-.01v3.209c.01.07-.04.131-.11.141H5.52c-.08 0-.12-.041-.12-.131V6.42c0-.07.03-.11.1-.11.17 0 .33 0 .56-.01.24-.01.49-.01.76-.02s.56-.01.87-.02c.31-.01.61-.01.91-.01.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.149.42.229.85.229 1.3.001.86-.199 1.57-.6 2.13zm7.091 3.89c-.28.4-.671.709-1.12.891-.49.209-1.09.318-1.811.318-.459 0-.91-.039-1.359-.129-.35-.061-.7-.17-1.02-.32-.07-.039-.121-.109-.111-.189v-1.74c0-.029.011-.07.041-.09.029-.02.06-.01.09.01.39.23.8.391 1.24.49.379.1.779.15 1.18.15.38 0 .65-.051.83-.141.16-.07.27-.24.27-.42 0-.141-.08-.27-.24-.4-.16-.129-.489-.279-.979-.471-.51-.18-.979-.42-1.42-.719-.31-.221-.569-.51-.761-.85-.159-.32-.239-.67-.229-1.021 0-.43.12-.84.341-1.21.25-.4.619-.72 1.049-.92.469-.239 1.059-.349 1.769-.349.41 0 .83.03 1.24.09.3.04.59.12.86.23.039.01.08.05.1.09.01.04.02.08.02.12v1.63c0 .04-.02.08-.05.1-.09.02-.14.02-.18 0-.3-.16-.62-.27-.96-.34-.37-.08-.74-.13-1.12-.13-.2-.01-.41.02-.601.07-.129.03-.24.1-.31.2-.05.08-.08.18-.08.27s.04.18.101.26c.09.11.209.2.34.27.229.12.47.23.709.33.541.18 1.061.43 1.541.73.33.209.6.49.789.83.16.318.24.67.23 1.029.011.471-.129.94-.389 1.331z"
        />
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    tileClass: 'bg-transparent',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="#FF9A00"
          d="M10.53 10.73c-.1-.31-.19-.61-.29-.92-.1-.31-.19-.6-.27-.89-.08-.28-.15-.54-.22-.78h-.02c-.09.43-.2.86-.34 1.29-.15.48-.3.98-.46 1.48-.14.51-.29.98-.44 1.4h2.54c-.06-.211-.14-.46-.23-.721-.09-.269-.18-.559-.27-.859zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zM14.7 16.83h-2.091c-.069.01-.139-.04-.159-.11l-.82-2.38H7.91l-.76 2.35c-.02.09-.1.15-.19.141H5.08c-.11 0-.14-.061-.11-.18L8.19 7.38c.03-.1.06-.21.1-.33.04-.21.06-.43.06-.65-.01-.05.03-.1.08-.11h2.59c.08 0 .12.03.13.08l3.65 10.3c.03.109 0 .16-.1.16zm3.4-.15c0 .11-.039.16-.129.16H16.01c-.1 0-.15-.061-.15-.16v-7.7c0-.1.041-.14.131-.14h1.98c.09 0 .129.05.129.14v7.7zm-.209-9.03c-.231.24-.571.37-.911.35-.33.01-.65-.12-.891-.35-.23-.25-.35-.58-.34-.92-.01-.34.12-.66.359-.89.242-.23.562-.35.892-.35.391 0 .689.12.91.35.22.24.34.56.33.89.01.34-.11.67-.349.92z"
        />
      </svg>
    ),
  },
  {
    name: 'InDesign',
    tileClass: 'bg-transparent',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="#FF3366"
          d="M4.25.3C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm11.31 5.13h2.03c.05-.01.09.03.1.07v9.54c0 .18.01.38.02.6.02.21.03.41.04.58 0 .07-.03.13-.1.16-.52.22-1.07.38-1.63.48-.5.09-1.02.14-1.54.14-.74.01-1.48-.14-2.15-.45-.63-.29-1.15-.77-1.51-1.36-.37-.61-.55-1.37-.55-2.28-.01-.74.18-1.47.55-2.11.38-.65.93-1.19 1.59-1.55.7-.39 1.54-.58 2.53-.58.05 0 .12 0 .21.01s.19.01.31.02V5.54c0-.07.03-.11.1-.11zm-8.93.86h1.95c.06-.01.12.03.13.1.01.01.01.02.01.03v10.26c0 .11-.05.16-.14.16H6.62c-.09 0-.13-.05-.13-.16V6.42c0-.09.05-.13.14-.13zm8.23 4.24c-.39 0-.78.08-1.13.26-.34.17-.63.42-.85.74-.22.32-.33.75-.33 1.27-.01.35.05.7.17 1.03.1.27.25.51.45.71.19.18.42.32.68.4.27.09.55.13.83.13.15 0 .29-.01.42-.02.13.01.25-.01.36-.05v-4.4c-.09-.02-.18-.04-.27-.05-.11-.01-.22-.02-.33-.02z"
        />
      </svg>
    ),
  },
  {
    name: 'Framer',
    tileClass: 'bg-black',
    logo: (
      <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill="#FFFFFF" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: 'Google Antigravity',
    tileClass: 'bg-transparent',
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
              className="group flex items-center gap-3 rounded-ios-lg border border-ios-separator bg-white/80 p-3 font-ios shadow-ios backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-ios-blue/25 hover:shadow-ios-lg"
            >
              <div
                className={`flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-ios-sm transition-transform duration-300 group-hover:scale-110 ${tool.tileClass}`}
              >
                {tool.logo}
              </div>
              <span className="text-sm font-medium text-ios-label">{tool.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}