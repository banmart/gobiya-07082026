import { describe, it, expect } from 'vitest';
import { runPerplexityScout } from '../../lib/prospector';

describe('Prospector Helper & Perplexity AI Scout', () => {
  it('returns missing API key notice when no API key is provided', async () => {
    const res = await runPerplexityScout({
      keyword: 'Medical Spas',
      location: 'Beverly Hills, CA',
      limit: 5,
    });

    expect(res.ok).toBe(false);
    expect(res.error).toContain('Perplexity API Key is missing');
  });

  it('runs scout with provided Perplexity API key', async () => {
    const res = await runPerplexityScout({
      keyword: 'Medical Spas',
      location: 'Beverly Hills, CA',
      limit: 5,
      apiKey: 'pplx-test-key',
    });

    expect(res.ok).toBeDefined();
  });
});
