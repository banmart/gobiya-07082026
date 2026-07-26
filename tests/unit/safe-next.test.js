import { describe, it, expect } from 'vitest';
import { safeNextPath } from '../../lib/safeNext.js';

describe('safeNextPath', () => {
  it('keeps an ordinary relative path', () => {
    expect(safeNextPath('/dashboard/settings')).toBe('/dashboard/settings');
  });

  it('rejects a protocol-relative URL', () => {
    // The dangerous one: this passes a naive startsWith('/') check, but a
    // browser reads it as https://evil.com.
    expect(safeNextPath('//evil.com')).toBe('/dashboard');
  });

  it('rejects a backslash-prefixed URL', () => {
    // Browsers normalise the backslash to a slash, making this equivalent
    // to the protocol-relative case above.
    expect(safeNextPath('/\\evil.com')).toBe('/dashboard');
  });

  it('rejects an absolute URL', () => {
    expect(safeNextPath('https://evil.com')).toBe('/dashboard');
  });

  it('rejects a value containing CR or LF', () => {
    expect(safeNextPath('/dashboard\r\nSet-Cookie: x=1')).toBe('/dashboard');
  });

  it('rejects a tab-smuggled protocol-relative URL', () => {
    // The one that got through the first version. The URL parser strips tabs,
    // so this resolves to //evil.com and leaves the origin. A request arrives
    // as ?next=/%09/evil.com and searchParams decodes it to a real tab.
    expect(safeNextPath('/\t/evil.com')).toBe('/dashboard');
    expect(safeNextPath(decodeURIComponent('/%09/evil.com'))).toBe('/dashboard');
  });

  it('rejects other control characters and spaces', () => {
    expect(safeNextPath('/ /evil.com')).toBe('/dashboard');
    expect(safeNextPath('//evil.com')).toBe('/dashboard');
    expect(safeNextPath('/ /evil.com')).toBe('/dashboard');
  });

  it('rejects anything that resolves off-origin, whatever the spelling', () => {
    // The backstop, stated as a property rather than a list of tricks: if the
    // URL parser takes it somewhere other than our own origin, reject it.
    for (const attack of ['/\t\t//evil.com', '/\r//evil.com', '/\\\\evil.com']) {
      const resolved = safeNextPath(attack);
      expect(new URL(resolved, 'https://gobiya.invalid').origin).toBe('https://gobiya.invalid');
    }
  });

  it('falls back for empty, missing, or non-string input', () => {
    expect(safeNextPath('')).toBe('/dashboard');
    expect(safeNextPath(undefined)).toBe('/dashboard');
    expect(safeNextPath(['/dashboard'])).toBe('/dashboard');
  });

  it('honours a custom fallback', () => {
    expect(safeNextPath('https://evil.com', '/admin')).toBe('/admin');
  });
});
