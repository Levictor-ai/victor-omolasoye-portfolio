import { formatNumber } from '@/lib/analytics-format';

const WIDTH = 640;
const PAD = 10;

export interface TrendSeries {
  key: string;
  label: string;
  color: string;
}

export interface TrendPoint {
  date: string;
}

export function TrendChart({
  data,
  series,
  height = 180,
  ariaLabel = 'Analytics trend',
}: {
  data: TrendPoint[];
  series: TrendSeries[];
  height?: number;
  ariaLabel?: string;
}) {
  if (data.length === 0 || series.length === 0) {
    return <p className="text-sm text-ios-tertiary">No trend data for this range yet.</p>;
  }

  const max = Math.max(
    1,
    ...data.flatMap((point) =>
      series.map((item) =>
        Number((point as unknown as Record<string, unknown>)[item.key] ?? 0),
      ),
    ),
  );
  const stepX = data.length > 1 ? (WIDTH - PAD * 2) / (data.length - 1) : 0;

  const toPoints = (item: TrendSeries) =>
    data.map((point, index) => {
      const value = Number((point as unknown as Record<string, unknown>)[item.key] ?? 0);
      const x = PAD + index * stepX;
      const y = height - PAD - (value / max) * (height - PAD * 2);
      return { x, y, value, date: point.date };
    });

  const firstSeries = series[0];
  const firstPoints = toPoints(firstSeries);
  const firstLine = firstPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(' ');

  const first = firstPoints[0];
  const last = firstPoints[firstPoints.length - 1];
  const area =
    first && last
      ? `${firstLine} L${last.x.toFixed(1)},${height - PAD} L${first.x.toFixed(1)},${height - PAD} Z`
      : '';

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ios-tertiary">
        <div className="flex flex-wrap items-center gap-3">
          {series.map((item) => (
            <span key={item.key} className="inline-flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              {item.label}
            </span>
          ))}
        </div>
        <span>Max {formatNumber(max)}</span>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
        className="mt-3 w-full overflow-visible"
        style={{ height }}
      >
        <defs>
          <linearGradient id={`trend-fill-${firstSeries.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={firstSeries.color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={firstSeries.color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={PAD}
            x2={WIDTH - PAD}
            y1={PAD + ratio * (height - PAD * 2)}
            y2={PAD + ratio * (height - PAD * 2)}
            stroke="rgba(60, 60, 67, 0.1)"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {area ? <path d={area} fill={`url(#trend-fill-${firstSeries.key})`} /> : null}

        {series.map((item) => {
          const points = toPoints(item);
          const line = points
            .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
            .join(' ');

          return (
            <g key={item.key}>
              {line ? (
                <path
                  d={line}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              ) : null}
              {points.length > 0 && points.length <= 31
                ? points.map((point) => (
                    <circle
                      key={`${item.key}-${point.date}`}
                      cx={point.x}
                      cy={point.y}
                      r={2.2}
                      fill={item.color}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))
                : null}
            </g>
          );
        })}
      </svg>

      <div className="mt-2 flex justify-between text-[11px] text-ios-tertiary">
        <span>{data[0]?.date ?? ''}</span>
        <span>{data[data.length - 1]?.date ?? ''}</span>
      </div>
    </div>
  );
}
