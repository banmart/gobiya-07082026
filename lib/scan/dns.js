import { promises as dns } from 'node:dns';

/* DNS posture. Cheap, fast, and the answers are unambiguous — a domain either
 * publishes an MX record or it does not.
 *
 * Each lookup is settled independently: a domain with no MX is a finding, not a
 * failed collector, so a rejected lookup resolves to undefined rather than
 * taking the rest down with it.
 */

async function tryResolve(fn) {
  try {
    return await fn();
  } catch {
    return undefined;
  }
}

export async function collectDns(url) {
  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return { ok: false, reason: 'Could not read the domain from that address.' };
  }

  const [a, aaaa, mx, txt, ns, cname] = await Promise.all([
    tryResolve(() => dns.resolve4(hostname)),
    tryResolve(() => dns.resolve6(hostname)),
    tryResolve(() => dns.resolveMx(hostname)),
    tryResolve(() => dns.resolveTxt(hostname)),
    tryResolve(() => dns.resolveNs(hostname.split('.').slice(-2).join('.'))),
    tryResolve(() => dns.resolveCname(hostname)),
  ]);

  // Nothing resolved at all is a genuine collector failure, not a finding.
  if (!a && !aaaa && !cname) {
    return { ok: false, reason: 'The domain did not resolve to any address.' };
  }

  const txtFlat = (txt || []).map((entry) => entry.join(''));

  return {
    ok: true,
    facts: {
      hostname,
      ipv4Count: a?.length ?? 0,
      hasIpv6: Boolean(aaaa?.length),
      mxCount: mx?.length ?? 0,
      hasMx: Boolean(mx?.length),
      nameservers: ns?.slice(0, 4),
      hasSpf: txtFlat.some((t) => t.toLowerCase().startsWith('v=spf1')),
      hasDmarcTxtAtRoot: txtFlat.some((t) => t.toLowerCase().startsWith('v=dmarc1')),
    },
  };
}
