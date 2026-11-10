'use client';

import { useState } from 'react';

const SPOTIFY_TRACK_ID = '181B5ZTSwhfJYzFOndIttV';
const SPOTIFY_EMBED_SRC = `https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?autoplay=1`;

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-4" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function AboutMusicPlayer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-12 lg:mb-16">
      {open ? (
        <div className="overflow-hidden rounded-ios-xl border border-ios-separator bg-white/90 shadow-ios backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ios-ink">Now playing</p>
              <p className="truncate text-xs font-medium text-ios-secondary">Victor Omolasoye · Spotify</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close music player"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ios-fill text-ios-secondary transition-colors hover:bg-ios-fill-strong hover:text-ios-ink active:scale-95"
            >
              <CloseGlyph />
            </button>
          </div>
          {/* Mounted on demand only — the iframe (and Spotify's player JS) is
              never loaded until the visitor actually clicks play, so the page
              never hangs or pays the embed cost upfront. */}
          <iframe
            src={SPOTIFY_EMBED_SRC}
            width="100%"
            height={152}
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen"
            allowFullScreen
            title="Spotify — Now playing"
            loading="lazy"
            className="block w-full"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="group flex w-full items-center gap-3 rounded-full border border-ios-separator bg-white/80 px-4 py-2.5 font-ios shadow-ios backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-ios-separator-strong hover:bg-white hover:shadow-ios-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-electric/40 active:scale-97 sm:w-auto"
        >
          <span className="flex h-7 items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-eq w-1 rounded-full bg-ios-electric"
                style={{ height: `${8 + i * 3}px` }}
              />
            ))}
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold text-ios-ink">Now playing</span>
            <span className="block text-xs font-medium text-ios-secondary">Spotify · tap to play</span>
          </span>
          <span className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-full bg-ios-electric text-white shadow-ios-button transition-colors group-hover:bg-ios-bluePressed sm:ml-0">
            <PlayGlyph />
          </span>
        </button>
      )}
    </div>
  );
}
