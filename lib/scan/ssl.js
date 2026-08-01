import tls from 'node:tls';
import { assertPublicUrl } from './url.js';

/* Certificate check.
 *
 * A direct TLS handshake rather than the WhoisXML SSL endpoint the /tools route
 * uses: this needs three fields, and spending a paid API call plus a round trip
 * on them inside a scan that is already slow is not worth it.
 *
 * The SSRF guard applies here too — this opens a socket to a host the visitor
 * named, so the address is validated before connecting.
 */

const TIMEOUT_MS = 8000;

export async function collectSsl(url) {
  const checked = await assertPublicUrl(url);
  if (!checked.ok) return { ok: false, reason: checked.reason };

  const target = new URL(checked.url);
  if (target.protocol !== 'https:') {
    // Not a failure. A site served over plain http is a finding in its own
    // right, and the score treats it as one.
    return { ok: true, facts: { httpsAvailable: false } };
  }

  const host = target.hostname;
  const port = Number(target.port || 443);

  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try { socket.destroy(); } catch { /* already gone */ }
      resolve(value);
    };

    const timer = setTimeout(
      () => finish({ ok: false, reason: 'The TLS handshake timed out.' }),
      TIMEOUT_MS
    );

    const socket = tls.connect(
      { host, port, servername: host, rejectUnauthorized: false },
      () => {
        const cert = socket.getPeerCertificate();
        if (!cert || !cert.valid_to) {
          return finish({ ok: false, reason: 'No certificate was presented.' });
        }

        const validTo = new Date(cert.valid_to);
        const validFrom = new Date(cert.valid_from);
        const daysToExpiry = Math.floor((validTo.getTime() - Date.now()) / 86400000);

        finish({
          ok: true,
          facts: {
            httpsAvailable: true,
            // rejectUnauthorized is false so a broken chain still yields data;
            // authorized records whether it would have passed verification.
            certAuthorized: socket.authorized,
            certAuthorizationError: socket.authorizationError
              ? String(socket.authorizationError)
              : undefined,
            certIssuer: cert.issuer?.O || cert.issuer?.CN,
            certValidFrom: Number.isNaN(validFrom.getTime()) ? undefined : validFrom.toISOString(),
            certValidTo: Number.isNaN(validTo.getTime()) ? undefined : validTo.toISOString(),
            certDaysToExpiry: Number.isNaN(daysToExpiry) ? undefined : daysToExpiry,
            tlsProtocol: socket.getProtocol() || undefined,
          },
        });
      }
    );

    socket.on('error', () => finish({ ok: false, reason: 'The TLS connection failed.' }));
  });
}
