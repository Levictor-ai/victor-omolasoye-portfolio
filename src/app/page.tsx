import fs from 'fs';
import path from 'path';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { HomeContent } from '@/components/HomeContent';
import type { ProjectData } from '@/types/project';

function getAllProjects(): ProjectData[] {
  const dir = path.join(process.cwd(), 'data', 'projects');
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    return files
      .map((f) => {
        const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
        return JSON.parse(raw) as ProjectData;
      })
      .sort(
        (a, b) =>
          new Date(b.period.split(' — ')[1] ?? b.period).getTime() -
          new Date(a.period.split(' — ')[1] ?? a.period).getTime(),
      );
  } catch {
    return [];
  }
}

export default function HomePage() {
  const projects = getAllProjects();
  return (
    <PortfolioProvider>
      <HomeContent projects={projects} />
    </PortfolioProvider>
  );
}
