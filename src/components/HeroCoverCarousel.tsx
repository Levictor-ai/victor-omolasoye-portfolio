'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { track } from '@/lib/analytics';
import type { ProjectData } from '@/types/project';

const AUTOPLAY_MS = 5200;
const DRAG_GUARD_MS = 260;

type Direction = 1 | -1;

const slideVariants = {
  enter: (direction: Direction) => ({
    x: direction > 0 ? '22%' : '-22%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: Direction) => ({
    x: direction > 0 ? '-14%' : '14%',
    opacity: 0,
    zIndex: 0,
  }),
};

/**
 * Hero cover showcase: a swipeable stack of project covers with
 * auto-advance, dots, arrows, and drag/keyboard support.
 */
export function HeroCoverCarousel({ projects }: { projects: ProjectData[] }) {
  const slides = useMemo(
    () => projects.filter((project) => Boolean(project.coverImage)).slice(0, 6),
    [projects],
  );
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const reduceMotion = useReducedMotion();
  const lastDragEnd = useRef(0);

  const paginate = useCallback(
    (dir: Direction) => {
      if (count < 2) return;
      setDirection(dir);
      setIndex((current) => (current + dir + count) % count);
    },
    [count],
  );

  // Keep the index valid if the project list changes.
  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  // Auto-advance continuously; the cover can also be swiped or dragged.
  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [count, index]);

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    lastDragEnd.current = Date.now();
    const power = info.offset.x + info.velocity.x * 0.2;
    if (power <= -70) paginate(1);
    else if (power >= 70) paginate(-1);
  };

  const guardDragClick = (event: ReactMouseEvent) => {
    if (Date.now() - lastDragEnd.current < DRAG_GUARD_MS) {
      event.preventDefault();
      return true;
    }
    return false;
  };

  const current = slides[index];

  if (!current) return null;

  return (
    <div
      className="relative mx-auto w-full min-w-0 max-w-sm md:max-w-md lg:h-full lg:max-w-none"
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured project covers"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          paginate(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          paginate(1);
        }
      }}
    >
      {/* Soft colour glow behind the print. */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-ios-blue/20 via-ios-pale/40 to-ios-teal/20 blur-2xl"
        aria-hidden="true"
      />

      {/* Stacked-photo backing sheet. */}
      <div
        className="absolute inset-x-10 -bottom-1 h-6 rounded-b-[2rem] bg-white/50"
        aria-hidden="true"
      />

      <div className="relative rounded-[2rem] border border-white/80 bg-white/70 p-2 shadow-ios-lg backdrop-blur-xl lg:h-full">
        <motion.div
          drag={count > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          className="relative aspect-[4/5] overflow-hidden rounded-[1.65rem] bg-ios-fill lg:aspect-auto lg:h-full"
          style={{ touchAction: 'pan-y' }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current.slug}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' },
              }}
              className="absolute inset-0"
            >
              <Link
                href={`/projects/${current.slug}`}
                aria-label={`View ${current.title} case study`}
                onClick={(event) => {
                  if (guardDragClick(event)) return;
                  track('project_open', { project: current.slug, location: 'hero_carousel' });
                }}
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                className="group relative block h-full w-full select-none focus-visible:outline-none"
              >
                <Image
                  src={current.coverImage}
                  alt={`${current.title} cover`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="pointer-events-none select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  draggable={false}
                  priority={index === 0}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent"
                  aria-hidden="true"
                />

                {/* Top meta row */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center p-4 sm:p-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-ios-green" />
                    Featured cover
                  </span>
                </div>

                {/* Caption */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
                      {current.role}
                    </p>
                    <p className="mt-1.5 truncate text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
                      {current.title}
                    </p>
                    <p className="mt-1 truncate text-sm text-white/70">
                      {current.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Autoplay progress rail */}
          {count > 1 && (
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-white/20"
              aria-hidden="true"
            >
              <div
                key={`${current.slug}-progress`}
                className="hero-progress h-full bg-white/90"
                data-reduced={Boolean(reduceMotion)}
                style={{ '--hero-progress-duration': `${AUTOPLAY_MS}ms` } as CSSProperties}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
