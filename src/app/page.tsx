import fs from 'fs';
import path from 'path';
import { ProjectCard } from '@/components/ProjectCard';
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
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-24">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Victor Omolasoye
        </h1>
        <p className="max-w-2xl text-lg text-slate-400">
          Product engineer building digital products that bridge strategy and
          execution. Currently shaping home services at scale.
        </p>
      </section>

      {/* Projects Grid */}
      <section id="projects">
        <h2 className="mb-8 text-2xl font-semibold text-white">Projects</h2>
        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No projects published yet.</p>
        )}
      </section>
    </main>
  );
}
