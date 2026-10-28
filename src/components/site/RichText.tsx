import type { ReactNode } from 'react';

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-${index}`} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-${index}`}>{part}</span>;
  });
}

function isTableBlock(lines: string[]): boolean {
  return (
    lines.length >= 2 &&
    lines[0].trim().startsWith('|') &&
    /^\|?[\s:-]+\|/.test(lines[1].trim())
  );
}

function parseCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

export function RichText({ content, className = '' }: { content: string; className?: string }) {
  const blocks = content.split(/\n{2,}/).filter((block) => block.trim().length > 0);

  return (
    <div className={`space-y-5 ${className}`}>
      {blocks.map((rawBlock, blockIndex) => {
        const lines = rawBlock.split('\n').filter((line) => line.trim().length > 0);
        const key = `block-${blockIndex}`;

        if (isTableBlock(lines)) {
          const [headerLine, , ...rowLines] = lines;
          const headers = parseCells(headerLine);
          return (
            <div key={key} className="-mx-1 overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line">
                    {headers.map((header, index) => (
                      <th
                        key={`${key}-h-${index}`}
                        className="py-2.5 pr-4 font-medium text-ink"
                      >
                        {renderInline(header, `${key}-h-${index}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rowLines.map((row, rowIndex) => (
                    <tr key={`${key}-r-${rowIndex}`} className="border-b border-line/70">
                      {parseCells(row).map((cell, cellIndex) => (
                        <td
                          key={`${key}-r-${rowIndex}-c-${cellIndex}`}
                          className="py-2.5 pr-4 align-top text-ink-muted"
                        >
                          {renderInline(cell, `${key}-r-${rowIndex}-c-${cellIndex}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (lines.every((line) => line.trim().startsWith('- '))) {
          return (
            <ul key={key} className="space-y-2.5">
              {lines.map((line, index) => (
                <li key={`${key}-li-${index}`} className="flex gap-3 text-ink-muted">
                  <span aria-hidden="true" className="mt-[0.65em] block size-1 shrink-0 rounded-full bg-ink-faint" />
                  <span>{renderInline(line.trim().slice(2), `${key}-li-${index}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (lines.length === 1 && lines[0].startsWith('### ')) {
          return (
            <h4 key={key} className="pt-2 text-base font-semibold text-ink">
              {lines[0].slice(4)}
            </h4>
          );
        }

        return (
          <p key={key} className="whitespace-pre-line leading-[1.75] text-ink-muted">
            {lines.map((line, index) => (
              <span key={`${key}-l-${index}`}>
                {renderInline(line, `${key}-l-${index}`)}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
