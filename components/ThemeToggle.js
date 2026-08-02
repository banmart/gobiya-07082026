'use client';

import { useState, useEffect } from 'react';

export const THEME_KEY = 'gobiya-theme';

/**
 * Light/dark switch for the header.
 *
 * The stored value is the user's CHOICE ('light' | 'dark'), not the resolved
 * theme. Nothing stored means "follow the OS", which is the first-visit state
 * and the reason this listens to matchMedia: someone who has never touched the
 * switch should see the page change when their machine flips at sunset.
 *
 * The attribute itself is set before paint by the inline script in
 * app/layout.js. This component only takes over from there — it deliberately
 * does not set the theme on mount, or every load would flash.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'light');

    // Only tracks the OS while the user has made no explicit choice.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e) => {
      let stored = null;
      try {
        stored = localStorage.getItem(THEME_KEY);
      } catch {}
      if (stored === 'light' || stored === 'dark') return;
      const next = e.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };

    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const toggle = () => {
    const next = (document.documentElement.dataset.theme || 'light') === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="nav__theme-btn"
      onClick={toggle}
      /* The label names the ACTION, not the state — a button labelled "dark
         mode" is ambiguous about whether that is what you get or what you are
         in. aria-pressed carries the state. */
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
    >
      {/* Both glyphs ship; CSS shows one. Swapping them in JS would make the
          icon depend on hydration and pop on load. */}
      <svg
        className="nav__theme-icon nav__theme-icon--sun"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className="nav__theme-icon nav__theme-icon--moon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
