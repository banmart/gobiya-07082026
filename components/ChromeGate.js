'use client';

// Hides the site chrome on every signed-in app route (/login, /auth/*,
// /dashboard/*, /admin/*), which have their own layouts.
//
// /lp used to be in this list — a landing page conventionally drops the nav so
// there's nowhere to exit except the form. That was reversed deliberately: the
// offer is a high-consideration service sale, not an impulse conversion, and
// buyers were landing with no way to check who Gobiya is before filling in a
// form. If /lp is ever repointed at cold paid traffic, stripping the chrome
// again is a one-line change here.
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
// gate runs, the gated routes still ship the Header/Footer RSC payload even
// though nothing renders — roughly 12KB uncompressed (~3-4KB gzipped) each.
// The only way to avoid it is two root layouts via route groups, which means
// moving every page into app/(site)/ and duplicating the fonts, schema,
// analytics and script tags across both. Not worth it for the signed-in
// routes, which are behind auth and not performance-sensitive.

import { usePathname } from 'next/navigation';

export default function ChromeGate({ children }) {
  const pathname = usePathname();
  const minimal =
    pathname === '/login' ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/forgot') ||
    pathname.startsWith('/set-password') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin');

  if (minimal) return null;
  return <>{children}</>;
}
