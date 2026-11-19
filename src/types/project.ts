export interface ProjectLink {
  label: string;
  url: string;
  type: 'live' | 'github' | 'case-study' | 'play-store' | 'app-store' | 'figma';
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

/**
 * Optional long-form structure for concept case studies. When present, the
 * project page renders the richer StudyCaseStudy layout instead of the
 * standard marketing case study sections.
 */
export interface StudyMeta {
  label: string;
  value: string;
}

export interface StudyPoint {
  title: string;
  description: string;
}

export interface StudyCompetitor {
  name: string;
  focus: string;
}

export interface StudyPersona {
  name: string;
  age: string;
  summary: string;
  needs: string[];
}

export interface StudyPrinciple {
  title: string;
  description: string;
}

export interface StudyScreen {
  tag: string;
  screen: string;
  state: string;
  image: string;
  imageAlt: string;
  lead: string;
  body: string[];
  decision: string;
  iterations: string[];
}

export interface StudySwatch {
  name: string;
  value: string;
  usage: string;
}

export interface StudyTypeRow {
  role: string;
  px: number;
  weight: string;
  usage: string;
}

export interface StudySystem {
  intro: string;
  colors: StudySwatch[];
  type: StudyTypeRow[];
  spacing: string;
  components: string[];
  navigation: string;
  note?: string;
}

export interface StudyTable {
  headers: string[];
  rows: string[][];
}

export interface StudyMetric {
  label: string;
  description: string;
}

export interface ProjectStudy {
  tagline: string;
  meta: StudyMeta[];
  problemPoints: StudyPoint[];
  problemStatement: string;
  goals: string[];
  research: {
    intro: string;
    note?: string;
    competitors: StudyCompetitor[];
    hypotheses: string[];
    persona: StudyPersona;
  };
  principles: StudyPrinciple[];
  screensIntro: string;
  screensNote: string;
  screens: StudyScreen[];
  system: StudySystem;
  tradeoffs: StudyTable;
  metrics: { intro: string; items: StudyMetric[] };
  learnings: string[];
  nextSteps: string[];
}

/**
 * Block-based long-form study, used for projects with several equally
 * important sections (research, brand, system, screens, process). Rendered by
 * StudyDocCaseStudy.
 */
export interface StudyDocBlock {
  type:
    | 'paragraphs'
    | 'bullets'
    | 'numbered'
    | 'cards'
    | 'personas'
    | 'quotes'
    | 'table'
    | 'stats'
    | 'images'
    | 'screens'
    | 'figure'
    | 'callout'
    | 'timeline'
    | 'swatches'
    | 'scale';
  heading?: string;
  intro?: string;
  columns?: 2 | 3;
  lead?: boolean;
  paragraphs?: string[];
  items?: string[];
  cards?: { title: string; body: string }[];
  personas?: {
    name: string;
    age: string;
    role: string;
    summary: string;
    quote: string;
  }[];
  quotes?: { quote: string; source: string }[];
  table?: {
    headers: string[];
    rows: string[][];
    note?: string;
  };
  stats?: { value: string; label: string; description?: string }[];
  images?: { src: string; alt: string; label?: string }[];
  screens?: { src: string; alt: string; label?: string }[];
  figure?: { src: string; alt: string; caption?: string };
  callout?: { label?: string; text: string; tone?: 'brand' | 'warm' };
  timeline?: { when: string; title: string; body: string }[];
  swatches?: { name: string; value: string; usage: string }[];
  scale?: { label: string; px: number; weight: string; usage: string }[];
}

export interface StudyDocSection {
  id: string;
  nav: string;
  title: string;
  intro?: string;
  blocks: StudyDocBlock[];
}

export interface ProjectStudyDoc {
  badge: string;
  tagline: string;
  meta: StudyMeta[];
  sections: StudyDocSection[];
}



export type ProjectCategory = 'brand' | 'product' | 'engineering';

export interface ProjectData {
  slug: string;
  category: ProjectCategory;
  /** Extra tracks this project belongs to, e.g. work that sits in both brand and product. */
  categories?: ProjectCategory[];
  personal?: boolean;
  /** Showcased separately ("In the Lab") instead of in the project listings. */
  showcase?: boolean;
  /** When true, the project is pinned to the top of its category on the projects page. */
  featured?: boolean;
  /** Sort order among featured projects (lower comes first). */
  featuredOrder?: number;
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
  study?: ProjectStudy;
  studyDoc?: ProjectStudyDoc;
  color?: string;
  layout?: 'case-study' | 'gallery';
  galleryColumns?: 1 | 2;
}
