import { cn } from '@/lib/cn';

const COVER_PALETTES = [
  { from: '#0B1B3F', to: '#1D3F91', accent: '#8AA8FF', glow: 'rgba(47, 91, 255, 0.55)' },
  { from: '#241044', to: '#5B21B6', accent: '#C9B6FF', glow: 'rgba(175, 82, 222, 0.5)' },
  { from: '#052E2B', to: '#0F766E', accent: '#5EEAD4', glow: 'rgba(20, 184, 166, 0.5)' },
  { from: '#3A1706', to: '#B8420B', accent: '#FDBA74', glow: 'rgba(249, 115, 22, 0.45)' },
  { from: '#2B0718', to: '#B0175A', accent: '#F9A8D4', glow: 'rgba(236, 72, 153, 0.45)' },
  { from: '#16233A', to: '#44536B', accent: '#CBD5E1', glow: 'rgba(148, 163, 184, 0.4)' },
];

function formatCoverDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .toUpperCase();
}

export interface BlogCoverProps {
  /** Position in the full article list — keeps colours and numbering stable while filtering. */
  index: number;
  tag: string;
  date: string;
  variant?: 'card' | 'hero';
  className?: string;
}

/**
 * Generated editorial cover for an article. No image assets needed: each post gets a
 * deterministic palette, and the essay number doubles as the main graphic element.
 */
export function BlogCover({ index, tag, date, variant = 'card', className }: BlogCoverProps) {
  const palette = COVER_PALETTES[index % COVER_PALETTES.length];
  const numeral = String(index + 1).padStart(2, '0');
  const isHero = variant === 'hero';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative isolate flex flex-col justify-between overflow-hidden',
        isHero ? 'p-6 sm:p-8' : 'p-4',
        className,
      )}
      style={{ backgroundImage: `linear-gradient(145deg, ${palette.from} 0%, ${palette.to} 100%)` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(115% 95% at 88% -8%, ${palette.glow} 0%, transparent 62%)`,
        }}
      />

      {/* Fine editorial grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(255,255,255,0.9) 0 1px, transparent 1px 40px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0 1px, transparent 1px 40px)',
          maskImage: 'linear-gradient(to top left, #000 0%, transparent 78%)',
          WebkitMaskImage: 'linear-gradient(to top left, #000 0%, transparent 78%)',
        }}
      />

      {/* Concentric rings */}
      <div className="absolute -right-12 -top-16 size-44 rounded-full border border-white/20" />
      <div className="absolute -right-2 -top-8 size-28 rounded-full border border-white/10" />
      <div
        className="absolute right-6 top-8 size-2 rounded-full"
        style={{ backgroundColor: palette.accent, boxShadow: `0 0 18px ${palette.accent}` }}
      />

      {/* Accent hairline */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${palette.accent}, transparent)` }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="inline-flex max-w-[78%] items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-white/85 backdrop-blur-sm">
          <span className="truncate">{tag}</span>
        </span>
      </div>

      <span
        className={cn(
          'pointer-events-none absolute select-none font-ios font-bold leading-none tracking-[-0.07em] text-transparent transition-transform duration-700 ease-out group-hover:-translate-y-1.5',
          isHero ? '-bottom-[0.24em] right-3 text-[10rem] sm:text-[13rem]' : '-bottom-[0.22em] right-2 text-[6.75rem]',
        )}
        style={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.36)' }}
      >
        {numeral}
      </span>

      <div className="relative z-10 flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
        <span className="size-1 rounded-full bg-white/50" />
        {formatCoverDate(date)}
      </div>
    </div>
  );
}
