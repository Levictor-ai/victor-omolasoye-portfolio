import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas-neue)', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'label-lg': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      colors: {
        surface: {
          DEFAULT: '#F8F9FA',
          light: '#FFFFFF',
          lighter: '#F1F3F5',
        },
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'elevation-2': '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.03)',
        'elevation-4': '0 16px 32px rgba(0,0,0,0.08), 0 6px 12px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
