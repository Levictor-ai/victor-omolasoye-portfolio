import { getAllProjects } from '@/lib/projects';
import type { ProjectCategory, ProjectData } from '@/types/project';

export type WorkTrack = 'brand-design' | 'product-design';

export interface TrackConfig {
  slug: WorkTrack;
  label: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Preferred project to represent this track on the homepage. */
  homepageFeature: string;
}

export const tracks: Record<WorkTrack, TrackConfig> = {
  'brand-design': {
    slug: 'brand-design',
    label: 'Brand Design',
    shortLabel: 'Brand',
    eyebrow: 'Discipline 01',
    title: 'Brand Design',
    intro:
      'I create visual identities that give businesses a distinctive presence and a consistent way to communicate across touchpoints.',
    metaTitle: 'Brand Design — Identity & Visual Systems',
    metaDescription:
      'Brand identity, visual systems and art direction by Victor Omolasoye — identities, typography, colour systems and brand applications for businesses across Africa and beyond.',
    keywords: [
      'brand design portfolio',
      'brand identity designer',
      'visual identity',
      'brand systems',
      'brand designer lagos',
      'brand designer nigeria',
      'art direction',
      'brand applications',
    ],
    homepageFeature: 'hevaura',
  },
  'product-design': {
    slug: 'product-design',
    label: 'Product Design',
    shortLabel: 'Product',
    eyebrow: 'Discipline 02',
    title: 'Product Design',
    intro:
      'I design digital experiences by connecting user needs, business goals and thoughtful interface design. My process moves from understanding the problem to shaping and refining a usable solution.',
    metaTitle: 'Product Design — UX & UI Case Studies',
    metaDescription:
      'Product design and UI/UX case studies by Victor Omolasoye — research, user flows, interfaces and design systems for fintech, logistics, social and consumer products.',
    keywords: [
      'product design portfolio',
      'product designer',
      'ui ux case study',
      'ux research portfolio',
      'design systems',
      'product designer lagos',
      'product designer nigeria',
      'mobile app design',
    ],
    homepageFeature: 'hapnin',
  },
};

const TRACK_CATEGORIES: Record<WorkTrack, ProjectCategory[]> = {
  'brand-design': ['brand'],
  'product-design': ['product', 'engineering'],
};

export function trackForCategory(category: ProjectCategory): WorkTrack {
  return category === 'brand' ? 'brand-design' : 'product-design';
}

export function workPath(track: WorkTrack, slug: string): string {
  return `/${track}/${slug}`;
}

export function isUpcoming(project: ProjectData): boolean {
  return !project.period || project.subtitle === 'Project Coming Soon';
}

export function projectTypeLabel(project: ProjectData): string {
  if (project.projectType) return project.projectType;
  if (project.personal) return 'Personal project';
  if (project.company) return 'Client project';
  return 'Project';
}

export function projectDisciplines(project: ProjectData): string[] {
  if (project.disciplines?.length) return project.disciplines;
  return project.techStack.map((item) => item.name);
}

export function getTrackProjects(track: WorkTrack): ProjectData[] {
  const categories = TRACK_CATEGORIES[track];
  return getAllProjects().filter((project) => categories.includes(project.category));
}

export function getCaseStudies(track: WorkTrack): ProjectData[] {
  return getTrackProjects(track).filter((project) => !isUpcoming(project));
}

export function getWorkProject(track: WorkTrack, slug: string): ProjectData | null {
  return getTrackProjects(track).find((project) => project.slug === slug) ?? null;
}

export function getRelatedProjects(
  track: WorkTrack,
  slug: string,
  count = 3,
): ProjectData[] {
  return getCaseStudies(track)
    .filter((project) => project.slug !== slug)
    .slice(0, count);
}

export function getNextProject(track: WorkTrack, slug: string): ProjectData | null {
  const projects = getCaseStudies(track);
  if (projects.length === 0) return null;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length] ?? null;
}

export function getHomepageFeature(track: WorkTrack): ProjectData | null {
  const projects = getCaseStudies(track);
  const preferred = projects.find(
    (project) => project.slug === tracks[track].homepageFeature,
  );
  return preferred ?? projects[0] ?? null;
}
