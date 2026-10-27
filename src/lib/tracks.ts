import type { ProjectCategory } from '@/types/project';

export type TrackSlug = 'brand' | 'product';

export type TrackCategory = Extract<ProjectCategory, 'brand' | 'product'>;

export interface Track {
  slug: TrackSlug;
  category: TrackCategory;
  label: string;
  eyebrow: string;
  title: string;
  lead: string;
  intro: string;
  focus: string[];
  other: TrackSlug;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const tracks: Record<TrackSlug, Track> = {
  brand: {
    slug: 'brand',
    category: 'brand',
    label: 'Brand Design',
    eyebrow: 'Brand Design Track',
    title: 'Brand systems that hold up everywhere they go.',
    lead:
      'Identity, typography, and visual language built to move from a launch deck to a product interface without losing their character.',
    intro:
      'My brand work is shaped by the fact that I also design products. Every mark, palette, and type system I build is tested against the harder question: does this still work when it has to live inside a real interface, a campaign, and a team that needs to use it without me? That is why the product work on this site is here — it is proof that the identities hold, not a change of direction.',
    focus: [
      'Brand identity',
      'Visual systems',
      'Typography',
      'Art direction',
      'Campaigns & social',
      'Guidelines & handoff',
    ],
    other: 'product',
    meta: {
      title: 'Brand Design Portfolio — Identity & Visual Systems | Victor Omolasoye',
      description:
        'Brand identity, visual systems and art direction by Victor Omolasoye — logo systems, typography, colour and guidelines for startups and studios across Africa, the UK and the US.',
      keywords: [
        'brand design portfolio',
        'brand identity designer',
        'visual identity',
        'logo design',
        'brand guidelines',
        'brand designer lagos',
        'brand designer nigeria',
        'art direction',
      ],
    },
  },
  product: {
    slug: 'product',
    category: 'product',
    label: 'Product Design',
    eyebrow: 'Product Design Track',
    title: 'Products people understand on the first try.',
    lead:
      'Research, flows, interfaces, and design systems — designed end to end and handed off in a state developers can actually build.',
    intro:
      'Product work is where the brand has to earn its keep. I take the same systems thinking I use on identity and apply it to user journeys: what the product says, how it moves, and whether someone can get through it without instructions. Where a brand project feeds a product, I keep both tracks linked so you can see the system working in context.',
    focus: [
      'UX research',
      'Product strategy',
      'Flows & wireframes',
      'UI design',
      'Design systems',
      'Prototyping & handoff',
    ],
    other: 'brand',
    meta: {
      title: 'Product Design Portfolio — UX & UI Case Studies | Victor Omolasoye',
      description:
        'Product design and UI/UX case studies by Victor Omolasoye — research, user flows, design systems and interfaces for fintech, logistics and consumer products in Nigeria and beyond.',
      keywords: [
        'product design portfolio',
        'product designer',
        'ui ux case study',
        'product design case study',
        'ux research portfolio',
        'design systems',
        'product designer lagos',
        'product designer nigeria',
      ],
    },
  },
};

export function getTrack(slug: TrackSlug): Track {
  return tracks[slug];
}

export function getOtherTrack(track: Track): Track {
  return tracks[track.other];
}
