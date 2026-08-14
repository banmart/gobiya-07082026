import { Resend } from 'resend';

/**
 * A Resend client that is constructed on first use rather than at import time.
 *
 * `new Resend(key)` throws when the key is missing. Doing that at module scope
 * means the constructor runs during `next build` — Next evaluates every route
 * module while collecting page data — so a secret that is only ever needed at
 * request time was able to fail the entire build:
 *
 *     Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
 *     Failed to collect page data for /api/auth/forgot
 *
 * That is the wrong failure mode. Building the site does not send email, so a
 * build should not require the ability to. With the client behind this proxy,
 * construction is deferred until something actually reads a property off it —
 * i.e. inside a handler, at request time — and a missing key surfaces as a
 * failed email on one route instead of an unbuildable site.
 *
 * Call sites are unchanged: `resend.emails.send(...)` still works.
 */
let client = null;

export function getResend() {
  if (client) return client;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      'RESEND_API_KEY is not set. Add it to the deployment environment ' +
        '(and .env.local for local development) — email cannot be sent without it.',
    );
  }

  client = new Resend(apiKey);
  return client;
}

export const resend = new Proxy(
  {},
  {
    get(_target, property) {
      const value = Reflect.get(getResend(), property);
      // `emails` and friends are class instances whose methods rely on `this`,
      // so bind anything callable back to the real client.
      return typeof value === 'function' ? value.bind(getResend()) : value;
    },
  },
);
