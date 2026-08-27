import type { ReactNode } from 'react';

export function renderInline(
  text: string,
  className = 'font-semibold text-gray-900',
): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={className}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}