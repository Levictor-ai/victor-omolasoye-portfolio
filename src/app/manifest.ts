import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Victor Omolasoye | Product Designer & Engineer',
    short_name: 'Victor Omolasoye',
    description:
      'Portfolio of Victor Omolasoye — Product designer, engineer, and brand designer crafting user-centred digital experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F9FA',
    theme_color: '#F8F9FA',
    icons: [
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}