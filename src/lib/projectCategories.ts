import type { ProjectCategory, ProjectData } from '@/types/project';

/** Every track a project belongs to (falls back to its primary category). */
export function projectCategories(project: ProjectData): ProjectCategory[] {
  return project.categories && project.categories.length > 0
    ? project.categories
    : [project.category];
}

export function projectInCategory(project: ProjectData, category: ProjectCategory): boolean {
  return projectCategories(project).includes(category);
}
