import { promises as dns } from 'node:dns';
import net from 'node:net';

/* URL normalisation and the SSRF guard for the site scan.
 *
 * /api/scan is unauthenticated and fetches an address a stranger typed into a
 * form. Without this module that is a server-side request forgery hole: submit
 * http://169.254.169.254/ and the serverless function reads cloud instance
 * metadata and hands it back in the report.
 *
 * Blocking by hostname is not enough — a public name can resolve to a private
 * address, and a redirect can move to one after the first check passes. So the
 * rule here is: resolve DNS first, check every resolved address, and re-run the
 * whole check on every redirect hop.
 */

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);
const ALLOWED_PORTS = new Set(['', '80', '443']);

export const MAX_REDIRECTS = 3;
export const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
export const TIMEOUT_MS = 8000;

function ipv4ToInt(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
}

function inV4Range(ip, cidr) {
  const [range, bits] = cidr.split('/');
  const mask = bits === '0' ? 0 : (~0 << (32 - Number(bits))) >>> 0;
  return (ipv4ToInt(ip) & mask) === (ipv4ToInt(range) & mask);
}

// Everything that is not a routable public host.
const BLOCKED_V4 = [
  '0.0.0.0/8',        // this network
  '10.0.0.0/8',       // private
  '100.64.0.0/10',    // carrier-grade NAT
  '127.0.0.0/8',      // loopback
  '169.254.0.0/16',   // link-local — cloud metadata lives here
  '172.16.0.0/12',    // private
  '192.0.0.0/24',     // IETF protocol assignments
  '192.168.0.0/16',   // private
  '198.18.0.0/15',    // benchmarking
  '224.0.0.0/4',      // multicast
  '240.0.0.0/4',      // reserved
];

export function isPrivateAddress(ip) {
  const version = net.isIP(ip);
  if (version === 4) return BLOCKED_V4.some((cidr) => inV4Range(ip, cidr));
  if (version !== 6) return true; // not an IP we understand — refuse it

  const addr = ip.toLowerCase();

  // IPv4-mapped (::ffff:1.2.3.4) would otherwise slip past the v6 checks.
  const mapped = addr.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateAddress(mapped[1]);

  if (addr === '::1' || addr === '::') return true;
  if (/^f[cd]/.test(addr)) return true;              // fc00::/7 unique local
  if (/^fe[89ab]/.test(addr)) return true;           // fe80::/10 link-local
  if (/^ff/.test(addr)) return true;                 // ff00::/8 multicast
  return false;
}

/** Add a scheme when the visitor omitted one, drop the fragment, lowercase the host. */
export function normalizeUrl(input) {
  const raw = String(input ?? '').trim();
  if (!raw) return { ok: false, reason: 'No website address was provided.' };

  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  let url;
  try {
    url = new URL(withScheme);
  } catch {
    return { ok: false, reason: 'That does not look like a valid web address.' };
  }

  if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
    return { ok: false, reason: 'Only http and https addresses can be scanned.' };
  }
  if (url.username || url.password) {
    return { ok: false, reason: 'Addresses containing credentials cannot be scanned.' };
  }
  if (!ALLOWED_PORTS.has(url.port)) {
    return { ok: false, reason: 'Only standard web ports (80 and 443) can be scanned.' };
  }
  if (!url.hostname.includes('.')) {
    return { ok: false, reason: 'That address has no domain name.' };
  }

  url.hash = '';
  url.hostname = url.hostname.toLowerCase();
  return { ok: true, url: url.toString() };
}

/** Resolve the host and refuse it if any address it answers with is private. */
export async function assertPublicUrl(rawUrl) {
  const normalized = normalizeUrl(rawUrl);
  if (!normalized.ok) return normalized;

  const { hostname } = new URL(normalized.url);

  // A bare IP literal never gets a DNS round trip, so check it directly.
  if (net.isIP(hostname)) {
    return isPrivateAddress(hostname)
      ? { ok: false, reason: 'That address is not publicly reachable.' }
      : { ok: true, url: normalized.url };
  }

  let addresses;
  try {
    addresses = await dns.lookup(hostname, { all: true });
  } catch {
    return { ok: false, reason: 'That domain could not be resolved.' };
  }

  if (addresses.length === 0) {
    return { ok: false, reason: 'That domain could not be resolved.' };
  }
  // Any private answer disqualifies the host — a name that resolves to both a
  // public and a private address is exactly the DNS-rebinding shape we refuse.
  if (addresses.some((a) => isPrivateAddress(a.address))) {
    return { ok: false, reason: 'That address is not publicly reachable.' };
  }

  return { ok: true, url: normalized.url };
}

/**
 * Fetch with the guard applied at every hop, plus hard time and size limits.
 * Redirects are followed manually precisely so each new location is re-checked.
 */
export async function safeFetch(rawUrl, { timeoutMs = TIMEOUT_MS, maxBytes = MAX_BYTES } = {}) {
  let current = rawUrl;
  let redirectCount = 0;

  for (;;) {
    const checked = await assertPublicUrl(current);
    if (!checked.ok) return { ok: false, reason: checked.reason };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const startedAt = Date.now();

    let response;
    try {
      response = await fetch(checked.url, {
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          // Identify honestly. Sites that block unknown agents should be able
          // to see who this is, and the report says so when they block us.
          'User-Agent': 'GobiyaSiteScan/1.0 (+https://www.gobiya.com/free-site-scan)',
          Accept: 'text/html,application/xhtml+xml',
        },
      });
    } catch (err) {
      clearTimeout(timer);
      return {
        ok: false,
        reason: err?.name === 'AbortError'
          ? 'The site took too long to respond.'
          : 'The site could not be reached.',
      };
    }

    const ttfbMs = Date.now() - startedAt;

    if (response.status >= 300 && response.status < 400) {
      clearTimeout(timer);
      const location = response.headers.get('location');
      if (!location) return { ok: false, reason: 'The site sent an incomplete redirect.' };
      if (redirectCount >= MAX_REDIRECTS) {
        return { ok: false, reason: 'The site redirected too many times.' };
      }
      redirectCount += 1;
      current = new URL(location, checked.url).toString();
      continue;
    }

    // Read manually so a huge or endless body cannot exhaust the function.
    let body = '';
    try {
      const reader = response.body?.getReader();
      if (reader) {
        const decoder = new TextDecoder();
        let received = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.length;
          if (received > maxBytes) {
            await reader.cancel();
            break;
          }
          body += decoder.decode(value, { stream: true });
        }
      }
    } catch {
      return { ok: false, reason: 'The site closed the connection early.' };
    } finally {
      clearTimeout(timer);
    }

    return {
      ok: true,
      status: response.status,
      finalUrl: checked.url,
      redirectCount,
      headers: response.headers,
      body,
      ttfbMs,
    };
  }
}
