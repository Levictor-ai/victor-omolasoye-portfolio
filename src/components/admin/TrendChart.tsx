import type { DailyPoint } from '@/lib/visit-store';

const WIDTH = 640;
const HEIGHT = 180;
const PAD = 10;

export function TrendChart({ data }: { data: DailyPoint[] }) {
  const max = Math.max(1, ...data.map((point) => point.views));
  const stepX = data.length > 1 ? (WIDTH - PAD * 2) / (data.length - 1) : 0;

  const points = data.map((point, index) => {
    const x = PAD + index * stepX;
    const y = HEIGHT - PAD - (point.views / max) * (HEIGHT - PAD * 2);
    return { x, y, ...point };
  });

  const line = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(' ');

  const first = points[0];
  const last = points[points.length - 1];
  const area =
    first && last
      ? `${line} L${last.x.toFixed(1)},${HEIGHT - PAD} L${first.x.toFixed(1)},${HEIGHT - PAD} Z`
      : '';

  const peak = data.reduce<DailyPoint | null>(
    (best, point) => (!best || point.views > best.views ? point : best),
    null,
  );

  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-ios-tertiary">
        <span>Peak day: {peak?.date ?? '—'}</span>
        <span>{max} view{max === 1 ? '' : 's'} max</span>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Daily page views"
        className="mt-3 h-40 w-full overflow-visible"
      >
        <defs>
          <linearGradient id="visits-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#314CB6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#314CB6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={PAD}
            x2={WIDTH - PAD}
            y1={PAD + ratio * (HEIGHT - PAD * 2)}
            y2={PAD + ratio * (HEIGHT - PAD * 2)}
            stroke="rgba(60, 60, 67, 0.1)"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {area ? <path d={area} fill="url(#visits-fill)" /> : null}
        {line ? (
          <path
            d={line}
            fill="none"
            stroke="#314CB6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}

        {points.length > 0 && points.length <= 31
          ? points.map((point) => (
              <circle
                key={point.date}
                cx={point.x}
                cy={point.y}
                r={2.5}
                fill="#314CB6"
                vectorEffect="non-scaling-stroke"
              />
            ))
          : null}
      </svg>

      <div className="mt-2 flex justify-between text-[11px] text-ios-tertiary">
        <span>{data[0]?.date ?? ''}</span>
        <span>{data[data.length - 1]?.date ?? ''}</span>
      </div>
    </div>
  );
}
