import type {
  ProjectData,
  ProjectStudyDoc,
  StudyDocBlock,
  StudyDocSection,
  StudyMeta,
} from '@/types/project';
import { projectInCategory } from '@/lib/projectCategories';

const MOBILE_PROJECTS = new Set(['payvo', 'hapnin', 'moovabletech']);

function categoryLabel(project: ProjectData) {
  if (projectInCategory(project, 'brand')) return 'Brand identity';
  if (projectInCategory(project, 'engineering')) return 'Engineering';
  return 'Product design';
}

function studyLabel(project: ProjectData) {
  if (project.slug === 'illustration') return 'illustration';
  return categoryLabel(project).toLowerCase();
}

function periodLabel(period: string) {
  if (/\b(19|20)\d{2}\b/.test(period)) return 'Year';
  if (/\b(week|month|day)s?\b/i.test(period)) return 'Timeline';
  if (/bootcamp|program|cohort|course/i.test(period)) return 'Context';
  return 'Timeline';
}

function stripInline(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*#+\s*/, '')
    .trim();
}

function parseTable(lines: string[]): StudyDocBlock['table'] | null {
  if (lines.length < 2) return null;

  const rows = lines.map((line) =>
    line
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => stripInline(cell)),
  );

  if (rows.length < 2) return null;

  const body = rows
    .slice(1)
    .filter((row) => !row.every((cell) => /^:?-{2,}:?$/.test(cell)));

  return { headers: rows[0], rows: body };
}

function contentToBlocks(content: string, heading?: string): StudyDocBlock[] {
  const clean = content.replace(/\r/g, '').trim();
  if (!clean) return [];

  const chunks = clean.split(/\n{2,}/);
  const blocks: StudyDocBlock[] = [];
  let headingUsed = false;

  for (const chunk of chunks) {
    const lines = chunk
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;

    const blockHeading = headingUsed ? undefined : heading;
    const pipeLines = lines.filter((line) => line.includes('|'));

    if (pipeLines.length >= 2) {
      const table = parseTable(pipeLines);
      if (table) {
        const caption = lines.find((line) => !line.includes('|'));
        blocks.push({
          type: 'table',
          heading: blockHeading ?? (caption ? stripInline(caption) : undefined),
          table,
        });
        headingUsed = true;
        continue;
      }
    }

    if (lines.every((line) => /^[-•*]\s+/.test(line))) {
      blocks.push({
        type: 'bullets',
        heading: blockHeading,
        items: lines.map((line) => stripInline(line.replace(/^[-•*]\s+/, ''))),
      });
      headingUsed = true;
      continue;
    }

    if (lines.every((line) => /^\d+[.)]\s+/.test(line))) {
      blocks.push({
        type: 'numbered',
        heading: blockHeading,
        items: lines.map((line) => stripInline(line.replace(/^\d+[.)]\s+/, ''))),
      });
      headingUsed = true;
      continue;
    }

    const firstLine = lines[0];
    const rest = lines.slice(1);
    const isShortHeading =
      firstLine.startsWith('#') ||
      (firstLine.length < 64 && !/[.!?]$/.test(firstLine));

    if (rest.length > 0 && rest.every((line) => /^[-•*]\s+/.test(line))) {
      blocks.push({
        type: 'bullets',
        heading: blockHeading ?? (isShortHeading ? stripInline(firstLine) : undefined),
        items: rest.map((line) => stripInline(line.replace(/^[-•*]\s+/, ''))),
      });
    } else if (rest.length > 0 && rest.every((line) => /^\d+[.)]\s+/.test(line))) {
      blocks.push({
        type: 'numbered',
        heading: blockHeading ?? (isShortHeading ? stripInline(firstLine) : undefined),
        items: rest.map((line) => stripInline(line.replace(/^\d+[.)]\s+/, ''))),
      });
    } else {
      const paragraphs = isShortHeading ? rest : lines;
      const blockTitle =
        blockHeading ?? (isShortHeading && rest.length > 0 ? stripInline(firstLine) : undefined);
      if (paragraphs.length > 0) {
        blocks.push({
          type: 'paragraphs',
          heading: blockTitle,
          paragraphs: [stripInline(paragraphs.join(' '))],
        });
      }
    }

    headingUsed = true;
  }

  return blocks;
}

function sectionBlocks(sections: ProjectData['sections'], used: Set<string>, pattern: RegExp) {
  return (sections ?? [])
    .filter((section) => !used.has(section.title) && pattern.test(section.title))
    .map((section) => {
      used.add(section.title);
      return contentToBlocks(section.content, section.title);
    })
    .flat();
}

export function buildStudyDoc(project: ProjectData): ProjectStudyDoc {
  const sections = project.sections ?? [];
  const used = new Set<string>();

  const meta: StudyMeta[] = [];
  if (project.company) meta.push({ label: 'Company', value: project.company });
  if (project.period) {
    const label = periodLabel(project.period);
    meta.push({ label, value: project.period });
    if (
      project.timeline &&
      project.timeline !== project.period &&
      label !== 'Timeline'
    ) {
      meta.push({ label: 'Timeline', value: project.timeline });
    }
  } else if (project.timeline) {
    meta.push({ label: 'Timeline', value: project.timeline });
  }
  if (project.regions.length > 0) {
    meta.push({ label: 'Location', value: project.regions.join(', ') });
  }
  if (project.techStack.length > 0) {
    meta.push({
      label: 'Tools',
      value: project.techStack.slice(0, 4).map((tool) => tool.name).join(', '),
    });
  }

  const docSections: StudyDocSection[] = [];

  // Summary
  const summaryBlocks: StudyDocBlock[] = [];
  if (project.overview) {
    summaryBlocks.push({ type: 'paragraphs', lead: true, paragraphs: [project.overview] });
  }
  const summaryExtras = sections.filter((section) =>
    /executive summary|product overview/i.test(section.title),
  );
  summaryExtras.forEach((section) => {
    used.add(section.title);
    summaryBlocks.push(...contentToBlocks(section.content, section.title));
  });
  if (project.results.length > 0) {
    summaryBlocks.push({
      type: 'stats',
      stats: project.results.map((result) => ({
        value: result.value,
        label: result.metric,
        description: result.description,
      })),
    });
  }
  if (summaryBlocks.length === 0) {
    summaryBlocks.push({
      type: 'paragraphs',
      paragraphs: [project.subtitle || 'A closer look at the work.'],
    });
  }
  docSections.push({
    id: 'summary',
    nav: 'Summary',
    title: 'Project overview',
    blocks: summaryBlocks,
  });

  // Problem & approach
  const problemBlocks: StudyDocBlock[] = [];
  if (project.problem) {
    problemBlocks.push({ type: 'paragraphs', paragraphs: [project.problem] });
  }
  if (project.solution) {
    problemBlocks.push({
      type: 'callout',
      callout: { label: 'The approach', text: project.solution, tone: 'brand' },
    });
  }
  const goalBlocks = sectionBlocks(sections, used, /goals?|objectives?|success criteria/i);
  if (goalBlocks.length > 0) problemBlocks.push(...goalBlocks);
  if (problemBlocks.length > 0) {
    docSections.push({
      id: 'problem',
      nav: 'The Problem',
      title: 'The problem',
      blocks: problemBlocks,
    });
  }

  // Research & process
  const researchBlocks = sectionBlocks(
    sections,
    used,
    /research|discover|define|ideate|strategy|brief|competitive|process|approach|audit|method|insight/i,
  );
  if (researchBlocks.length > 0) {
    docSections.push({
      id: 'research',
      nav: 'Research & Process',
      title: 'Research & process',
      blocks: researchBlocks,
    });
  }

  // Features
  if (project.features.length > 0) {
    docSections.push({
      id: 'work',
      nav: 'The Work',
      title: 'The work',
      blocks: [
        {
          type: 'cards',
          columns: project.features.length >= 4 ? 2 : 3,
          cards: project.features.map((feature) => ({
            title: feature.title,
            body: feature.description,
          })),
        },
      ],
    });
  }

  // Screens / selected pieces
  if (project.images.length > 0) {
    const mobile = MOBILE_PROJECTS.has(project.slug);
    docSections.push({
      id: 'screens',
      nav: mobile ? 'Selected Screens' : 'Selected Work',
      title: mobile ? 'Selected screens' : 'Selected work',
      blocks: [
        {
          type: mobile ? 'screens' : 'images',
          columns: 2,
          screens: mobile
            ? project.images.map((image) => ({
                src: image.src,
                alt: image.alt,
                label: image.alt,
              }))
            : undefined,
          images: mobile
            ? undefined
            : project.images.map((image) => ({
                src: image.src,
                alt: image.alt,
                label: image.alt,
              })),
        },
      ],
    });
  }

  // Design system / approach
  if (project.architecture.description || project.architecture.highlights.length > 0) {
    const designBlocks: StudyDocBlock[] = [];
    if (project.architecture.title && project.architecture.description) {
      designBlocks.push({
        type: 'paragraphs',
        heading: project.architecture.title,
        paragraphs: [project.architecture.description],
      });
    } else if (project.architecture.title) {
      designBlocks.push({
        type: 'paragraphs',
        paragraphs: [project.architecture.title],
      });
    } else if (project.architecture.description) {
      designBlocks.push({
        type: 'paragraphs',
        paragraphs: [project.architecture.description],
      });
    }
    if (project.architecture.highlights.length > 0) {
      designBlocks.push({
        type: 'bullets',
        heading: 'What shaped the work',
        items: project.architecture.highlights,
      });
    }
    docSections.push({
      id: 'design',
      nav: 'Design Approach',
      title: categoryLabel(project) === 'Brand identity' ? 'The system' : 'Design approach',
      blocks: designBlocks,
    });
  }

  // Remaining original sections become the detail chapter
  const reflectionPattern =
    /reflect|learn|challenge|strength|growth|next|takeaway|impact|results?|outcome|future/i;
  const detailBlocks = sections
    .filter(
      (section) => !used.has(section.title) && !reflectionPattern.test(section.title),
    )
    .map((section) => {
      used.add(section.title);
      return contentToBlocks(section.content, section.title);
    })
    .flat();
  if (detailBlocks.length > 0) {
    docSections.push({
      id: 'details',
      nav: 'Inside the Work',
      title: 'Inside the work',
      blocks: detailBlocks,
    });
  }

  // Reflection and impact
  const reflectionBlocks = sectionBlocks(sections, used, reflectionPattern);
  if (reflectionBlocks.length > 0) {
    docSections.push({
      id: 'reflection',
      nav: 'Reflection',
      title: 'Reflection & impact',
      blocks: reflectionBlocks,
    });
  }

  return {
    badge: project.timeline || project.period || 'Case study',
    tagline: `${/^[aeiou]/i.test(studyLabel(project)) ? 'An' : 'A'} ${studyLabel(project)} case study`,
    meta,
    sections: docSections,
  };
}
