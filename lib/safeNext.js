// Guards the ?next= parameter against open redirects.
//
// middleware.js can only ever produce a /dashboard or /admin path here, but
// nothing stops someone sending a victim to /login?next=//evil.com directly —
// /login is not a matched route, so the middleware never sees it. Validation
// therefore has to happen where the value is consumed.
//
// The subtle case is "//evil.com": it passes a naive startsWith('/') check
// while browsers treat it as a protocol-relative URL and navigate off-site.
export function safeNextPath(value, fallback = '/dashboard') {
  if (typeof value !== 'string' || value === '') return fallback;
  // Absolute URLs, and anything relative to the current directory.
  if (!value.startsWith('/')) return fallback;
  // Protocol-relative, and the backslash spelling browsers normalise into it.
  if (value.startsWith('//') || value.startsWith('/\\')) return fallback;
  // Header and URL injection.
  if (/[\r\n]/.test(value)) return fallback;
  return value;
}
