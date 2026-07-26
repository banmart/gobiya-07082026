'use client';

// Hides the site chrome on /lp and on every signed-in app route
// (/login, /auth/*, /dashboard/*, /admin/*), which have their own layouts.
//
// This replaces the previous middleware + headers() approach. That version
// worked, but reading headers() in the root layout opted *every* route in the
// app into dynamic rendering — 52 of 54 pages were server-rendered per request
// with `Cache-Control: no-store` and no CDN caching, purely to answer a
// question about one route. usePathname() is known at prerender time, so the
// same decision costs nothing and the rest of the site can go static.
//
// Header and Footer are server components. They're passed in as children
// rather than imported here, so they still render on the server — this file
// only decides whether that output is kept.
//
// Known trade-off: because the parent serializes those children before this
// gate runs, /lp still ships their RSC payload even though nothing renders.
// That costs /lp about 12KB uncompressed (~3-4KB gzipped, 32KB -> 44KB). The
// only way to avoid it is two root layouts via route groups, which means
// moving every page into app/(site)/ and duplicating the fonts, schema,
// analytics and script tags across both. Not worth it to save 3KB on one
// noindex page — but that's the fix if /lp ever needs to be leaner.

import { usePathname } from 'next/navigation';

export default function ChromeGate({ children }) {
  const pathname = usePathname();
  const minimal =
    pathname === '/lp' ||
    pathname.startsWith('/lp/') ||
    pathname === '/login' ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/forgot') ||
    pathname.startsWith('/set-password') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin');

  if (minimal) return null;
  return <>{children}</>;
}
