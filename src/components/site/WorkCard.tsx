import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectData } from '@/types/project';
import { isUpcoming, projectDisciplines, projectTypeLabel, workPath, type WorkTrack } from '@/lib/work';

export function WorkCard({
  project,
  track,
  priority = false,
}: {
  project: ProjectData;
  track: WorkTrack;
  priority?: boolean;
}) {
  const upcoming = isUpcoming(project);
  const disciplines = projectDisciplines(project).slice(0, 3);

  const body = (
    <>
      <div className="media-zoom relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-paper-sunken">
        <Image
          src={project.coverImage}
          alt={`${project.title} — ${project.subtitle}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>

      <div className="flex items-start justify-between gap-4 pt-5">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">
            {project.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {project.subtitle}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-faint">
            <span>{projectTypeLabel(project)}</span>
            {disciplines.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{disciplines.join(', ')}</span>
              </>
            )}
          </div>
        </div>

        {!upcoming && (
          <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="size-4" strokeWidth={1.6} />
          </span>
        )}
      </div>
    </>
  );

  if (upcoming) {
    return (
      <div className="group block">
        {body}
        <p className="sr-only">Project coming soon</p>
      </div>
    );
  }

  return (
    <Link
      href={workPath(track, project.slug)}
      className="group block focus-visible:outline-none"
      aria-label={`View ${project.title} case study`}
    >
      {body}
    </Link>
  );
}
