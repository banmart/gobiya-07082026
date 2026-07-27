import { describe, it, expect } from 'vitest';
import { runPerplexityScout } from '../../lib/prospector';

describe('Prospector Helper & Perplexity AI Scout', () => {
  it('runs scout with free-form keyword and location', async () => {
    const res = await runPerplexityScout({
      keyword: 'Medical Spas',
      location: 'Beverly Hills, CA',
      limit: 5,
    });

    expect(res.ok).toBe(true);
    expect(Array.isArray(res.prospects)).toBe(true);
    expect(res.prospects.length).toBeGreaterThan(0);
    expect(res.prospects[0].email).toContain('@');
    expect(res.prospects[0].company).toBeTruthy();
  });
});
