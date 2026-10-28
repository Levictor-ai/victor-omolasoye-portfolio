import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas-neue)', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        ios: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'SF Pro Display',
          'var(--font-inter)',
          'system-ui',
          'sans-serif',
        ],
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
        ios: {
          blue: '#314CB6',
          bluePressed: '#293F94',
          green: '#34C759',
          red: '#FF3B30',
          orange: '#FF9500',
          yellow: '#FFCC00',
          purple: '#AF52DE',
          pink: '#FF2D55',
          teal: '#5AC8FA',
          label: '#1C1C1E',
          secondary: '#3C3C43',
          tertiary: '#8E8E93',
          quaternary: '#C7C7CC',
          separator: 'rgba(60, 60, 67, 0.12)',
          'separator-strong': 'rgba(60, 60, 67, 0.24)',
          fill: 'rgba(120, 120, 128, 0.12)',
          'fill-strong': 'rgba(120, 120, 128, 0.2)',
          grouped: '#F2F2F7',
          surface: '#FFFFFF',
        },
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'ios-sm': '10px',
        'ios': '14px',
        'ios-lg': '18px',
        'ios-xl': '22px',
        'ios-2xl': '28px',
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
        'ios': '0 1px 2px rgba(0, 0, 0, 0.04), 0 12px 32px -20px rgba(0, 0, 0, 0.25)',
        'ios-lg': '0 2px 4px rgba(0, 0, 0, 0.04), 0 24px 56px -28px rgba(0, 0, 0, 0.32)',
        'ios-button': '0 1px 2px rgba(0, 0, 0, 0.08), 0 6px 16px -6px rgba(49, 76, 182, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
