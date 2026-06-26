export interface ProjectLink {
  label: string;
  url: string;
  type: 'live' | 'github' | 'case-study' | 'play-store' | 'app-store';
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'infra' | 'design' | 'tools';
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  description?: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface ProjectArchitecture {
  title?: string;
  description: string;
  diagram?: string;
  highlights: string[];
}

export interface ProjectSection {
  title: string;
  content: string;
  images?: ProjectImage[];
}

export interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  coverImage: string;
  overview: string;
  problem: string;
  solution: string;
  targetAudience: string[];
  regions: string[];
  timeline: string;
  features: ProjectFeature[];
  techStack: TechItem[];
  architecture: ProjectArchitecture;
  results: ProjectResult[];
  testimonial?: ProjectTestimonial;
  links: ProjectLink[];
  images: ProjectImage[];
  sections?: ProjectSection[];
  color?: string;
}
