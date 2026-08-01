import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { normalizeUrl, isPrivateAddress, assertPublicUrl } from '../../lib/scan/url.js';

/* The SSRF guard is the highest-risk code in the scan: /api/scan is
 * unauthenticated and fetches an address a stranger typed into a form. These
 * tests are the reason it can be trusted to do that. */

describe('normalizeUrl', () => {
  it('adds a scheme when one is missing', () => {
    expect(normalizeUrl('example.com').url).toBe('https://example.com/');
  });

  it('lowercases the host and drops the fragment', () => {
    const result = normalizeUrl('https://EXAMPLE.com/path#section');
    expect(result.url).toBe('https://example.com/path');
  });

  it.each([
    ['file:///etc/passwd', 'non-web scheme'],
    ['ftp://example.com', 'non-web scheme'],
    ['javascript:alert(1)', 'javascript scheme'],
  ])('rejects %s (%s)', (input) => {
    expect(normalizeUrl(input).ok).toBe(false);
  });

  it('rejects credentials embedded in the URL', () => {
    expect(normalizeUrl('https://user:pass@example.com').ok).toBe(false);
  });

  it('rejects non-standard ports', () => {
    expect(normalizeUrl('http://example.com:22').ok).toBe(false);
    expect(normalizeUrl('http://example.com:8080').ok).toBe(false);
  });

  it('accepts explicit standard ports', () => {
    expect(normalizeUrl('http://example.com:80').ok).toBe(true);
    expect(normalizeUrl('https://example.com:443').ok).toBe(true);
  });

  it('rejects a hostname with no dot', () => {
    expect(normalizeUrl('http://localhost').ok).toBe(false);
  });

  it('rejects empty input', () => {
    expect(normalizeUrl('').ok).toBe(false);
    expect(normalizeUrl(undefined).ok).toBe(false);
  });
});

describe('isPrivateAddress', () => {
  it.each([
    ['127.0.0.1', 'loopback'],
    ['10.1.2.3', 'private class A'],
    ['172.16.0.1', 'private class B lower bound'],
    ['172.31.255.254', 'private class B upper bound'],
    ['192.168.1.1', 'private class C'],
    ['169.254.169.254', 'cloud metadata'],
    ['100.64.0.1', 'carrier-grade NAT'],
    ['0.0.0.0', 'this network'],
    ['224.0.0.1', 'multicast'],
    ['::1', 'IPv6 loopback'],
    ['fc00::1', 'IPv6 unique local'],
    ['fe80::1', 'IPv6 link-local'],
    ['::ffff:169.254.169.254', 'IPv4-mapped metadata address'],
  ])('blocks %s (%s)', (ip) => {
    expect(isPrivateAddress(ip)).toBe(true);
  });

  it.each([
    ['8.8.8.8'],
    ['1.1.1.1'],
    ['172.32.0.1'],   // just outside 172.16/12
    ['192.167.1.1'],  // just outside 192.168/16
    ['2606:4700::1'],
  ])('allows public address %s', (ip) => {
    expect(isPrivateAddress(ip)).toBe(false);
  });

  it('refuses anything that is not an IP address', () => {
    expect(isPrivateAddress('not-an-ip')).toBe(true);
  });
});

describe('assertPublicUrl', () => {
  let lookup;

  beforeEach(async () => {
    const dns = await import('node:dns');
    lookup = vi.spyOn(dns.promises, 'lookup');
  });

  afterEach(() => vi.restoreAllMocks());

  it('rejects a public hostname that resolves to a private address', async () => {
    lookup.mockResolvedValue([{ address: '169.254.169.254', family: 4 }]);
    const result = await assertPublicUrl('https://evil.example.com');
    expect(result.ok).toBe(false);
  });

  it('rejects when any one answer is private, even if another is public', async () => {
    lookup.mockResolvedValue([
      { address: '8.8.8.8', family: 4 },
      { address: '127.0.0.1', family: 4 },
    ]);
    const result = await assertPublicUrl('https://rebind.example.com');
    expect(result.ok).toBe(false);
  });

  it('allows a hostname resolving only to public addresses', async () => {
    lookup.mockResolvedValue([{ address: '93.184.216.34', family: 4 }]);
    const result = await assertPublicUrl('https://example.com');
    expect(result.ok).toBe(true);
  });

  it('rejects a bare private IP literal without a DNS lookup', async () => {
    const result = await assertPublicUrl('http://169.254.169.254');
    expect(result.ok).toBe(false);
    expect(lookup).not.toHaveBeenCalled();
  });

  it('reports a domain that does not resolve', async () => {
    lookup.mockRejectedValue(new Error('ENOTFOUND'));
    const result = await assertPublicUrl('https://nope.example.com');
    expect(result.ok).toBe(false);
  });
});
