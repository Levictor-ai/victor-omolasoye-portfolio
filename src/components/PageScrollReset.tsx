'use client';

import { useEffect } from 'react';

export function PageScrollReset() {
  useEffect(() => {
    if (window.location.hash) {
      return;
    }

    const scrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    return () => {
      window.history.scrollRestoration = scrollRestoration;
    };
  }, []);

  return null;
}
