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
  // Any C0 control character or space. The URL parser strips tab, CR and LF
  // outright, so "/<TAB>/evil.com" parses as "//evil.com" and leaves the
  // origin — blocking only CR and LF is not enough.
  if (/[\x00-\x20]/.test(value)) return fallback;

  // Backstop. Rather than keep enumerating parser quirks, resolve the value
  // the same way the browser will and insist it stayed on the origin. This is
  // what makes the guard robust against the next trick nobody thought of.
  try {
    const probe = new URL(value, 'https://gobiya.invalid');
    if (probe.origin !== 'https://gobiya.invalid') return fallback;
  } catch {
    return fallback;
  }

  return value;
}
