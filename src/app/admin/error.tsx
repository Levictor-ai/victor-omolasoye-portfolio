'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The error is intentionally not logged with visitor data.
    console.error('Admin dashboard error', error.message);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-ios-grouped px-5 py-12 font-ios">
      <div className="w-full max-w-md rounded-ios-xl border border-ios-separator bg-white/85 p-6 text-center shadow-ios-soft">
        <p className="text-sm font-semibold text-ios-label">Could not load the dashboard</p>
        <p className="mt-2 text-sm leading-relaxed text-ios-secondary">
          The analytics store or the page hit an unexpected error. Your data is safe; try loading the
          section again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-full bg-ios-blue px-4 py-2 text-xs font-semibold text-white shadow-ios-button-soft transition-colors hover:bg-ios-bluePressed"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
