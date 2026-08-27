import fs from 'fs';
import path from 'path';
import type { ProjectData } from '@/types/project';

const projectsDir = path.join(process.cwd(), 'data', 'projects');

export function getAllProjects(): ProjectData[] {
  try {
    const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.json'));
    return files
      .map((f) => {
        const raw = fs.readFileSync(path.join(projectsDir, f), 'utf-8');
        return JSON.parse(raw) as ProjectData;
      })
      .sort((a, b) => {
        const aComing = !a.period || a.subtitle === 'Project Coming Soon';
        const bComing = !b.period || b.subtitle === 'Project Coming Soon';
        if (aComing && !bComing) return 1;
        if (!aComing && bComing) return -1;
        return (
          new Date(b.period.split(' — ')[1] ?? b.period).getTime() -
          new Date(a.period.split(' — ')[1] ?? a.period).getTime()
        );
      });
  } catch {
    return [];
  }
}

export function getProject(slug: string): ProjectData | null {
  try {
    const filePath = path.join(projectsDir, `${slug}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as ProjectData;
  } catch {
    return null;
  }
}

export function getSuggestedProjects(
  currentSlug: string,
  count = 3,
): ProjectData[] {
  const others = getAllProjects().filter((p) => p.slug !== currentSlug);
  const current = getProject(currentSlug);
  if (others.length === 0) return [];

  const sameCategory = current
    ? others.filter((p) => p.category === current.category)
    : [];

  const sameCategoryCompleted = sameCategory.filter(
    (p) => p.period && p.subtitle !== 'Project Coming Soon',
  );
  const rest = others.filter((p) => !sameCategory.includes(p) && p.period && p.subtitle !== 'Project Coming Soon');
  const pool = [...sameCategoryCompleted, ...rest];

  if (pool.length >= count) return pool.slice(0, count);

  return [...pool, ...others.filter((p) => !pool.includes(p))].slice(0, count);
}