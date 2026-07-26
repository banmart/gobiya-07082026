import { describe, it, expect } from 'vitest';
import { validateClientInput } from '../../lib/clients.js';

describe('validateClientInput', () => {
  it('accepts a well-formed client', () => {
    const result = validateClientInput({
      name: '  Acme Dental  ',
      contactEmail: 'Owner@Acme.com',
      website: 'acme.com',
    });
    expect(result).toEqual({
      ok: true,
      value: {
        name: 'Acme Dental',
        contactEmail: 'owner@acme.com',
        website: 'https://acme.com',
      },
    });
  });

  it('requires a business name', () => {
    const result = validateClientInput({ name: '   ', contactEmail: 'a@b.com' });
    expect(result.ok).toBe(false);
    expect(result.errors.name).toMatch(/business name/i);
  });

  it('rejects a malformed email', () => {
    const result = validateClientInput({ name: 'Acme', contactEmail: 'not-an-email' });
    expect(result.ok).toBe(false);
    expect(result.errors.contactEmail).toMatch(/valid email/i);
  });

  it('leaves an empty website as null', () => {
    const result = validateClientInput({ name: 'Acme', contactEmail: 'a@b.com', website: '' });
    expect(result.ok).toBe(true);
    expect(result.value.website).toBeNull();
  });

  it('keeps an explicit https scheme', () => {
    const result = validateClientInput({
      name: 'Acme',
      contactEmail: 'a@b.com',
      website: 'https://acme.com/path',
    });
    expect(result.value.website).toBe('https://acme.com/path');
  });
});
