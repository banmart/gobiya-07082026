import { describe, it, expect } from 'vitest';
import { HOMEPAGE_FAQ } from '../../lib/homepageFaq.js';

describe('HOMEPAGE_FAQ', () => {
  it('has eight entries', () => {
    expect(HOMEPAGE_FAQ).toHaveLength(8);
  });

  it('gives every entry a question and an answer', () => {
    for (const item of HOMEPAGE_FAQ) {
      expect(item.q.length).toBeGreaterThan(0);
      expect(item.q.endsWith('?')).toBe(true);
      expect(item.a.length).toBeGreaterThan(0);
    }
  });

  it('keeps answers in the 40-70 word range so they stay citable', () => {
    for (const item of HOMEPAGE_FAQ) {
      const words = item.a.trim().split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(40);
      expect(words).toBeLessThanOrEqual(70);
    }
  });

  it('quotes only the real published pricing tiers', () => {
    const pricing = HOMEPAGE_FAQ.find((i) => i.q.toLowerCase().includes('cost'));
    expect(pricing.a).toContain('$999');
    expect(pricing.a).toContain('$2,500');
    expect(pricing.a).toContain('$5,500');
  });

  it('makes no guarantees', () => {
    const banned = /guarantee|guaranteed|page one in|#1 ranking/i;
    for (const item of HOMEPAGE_FAQ) {
      expect(banned.test(item.a)).toBe(false);
    }
  });
});
