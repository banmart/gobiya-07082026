import { describe, it, expect } from 'vitest';
import { runPerplexityScout } from '../../lib/prospector';

describe('Prospector Helper & Perplexity AI Scout', () => {
  it('resolves PERPLEXITY_API environment variable', async () => {
    const originalEnv = process.env.PERPLEXITY_API;
    process.env.PERPLEXITY_API = 'pplx-sample-key';

    const res = await runPerplexityScout({
      keyword: 'Medical Spas',
      location: 'Beverly Hills, CA',
      limit: 5,
    });

    expect(res).toBeDefined();
    process.env.PERPLEXITY_API = originalEnv;
  });
});
