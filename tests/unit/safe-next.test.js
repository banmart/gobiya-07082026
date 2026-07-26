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

  it('falls back for empty, missing, or non-string input', () => {
    expect(safeNextPath('')).toBe('/dashboard');
    expect(safeNextPath(undefined)).toBe('/dashboard');
    expect(safeNextPath(['/dashboard'])).toBe('/dashboard');
  });

  it('honours a custom fallback', () => {
    expect(safeNextPath('https://evil.com', '/admin')).toBe('/admin');
  });
});
