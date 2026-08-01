import { describe, it, expect } from 'vitest';
import { scoreFacts } from '../../lib/scan/score.js';

/* The score is the number a prospect will quote back at us, so it has to be
 * defensible. The property that matters most: a check we could not run must not
 * move the score, or a PageSpeed outage silently marks a healthy site down. */

const PERFECT = {
  title: 'A good, descriptive page title for a business',
  titleLength: 45,
  metaDescription: 'x'.repeat(120),
  metaDescriptionLength: 120,
  h1Count: 1,
  canonical: 'https://example.com/',
  imageCount: 10,
  imagesMissingAlt: 0,
  jsonLdTypes: ['Organization'],
  wordCount: 900,
  httpsAvailable: true,
  certAuthorized: true,
  certDaysToExpiry: 200,
  hasViewport: true,
  robotsMeta: 'index,follow',
  robotsBlocksEverything: false,
  sitemapFound: true,
  lcpMs: 1800,
  cls: 0.02,
  inpMs: 120,
  hasSpf: true,
};

describe('scoreFacts', () => {
  it('scores a clean site at 100', () => {
    expect(scoreFacts(PERFECT).score).toBe(100);
  });

  it('returns 0 with no measurements rather than NaN', () => {
    const result = scoreFacts({});
    expect(result.score).toBe(0);
    expect(Number.isNaN(result.score)).toBe(false);
    expect(result.measuredCount).toBe(0);
  });

  it('leaves the score unchanged when a collector did not run', () => {
    // Dropping every PageSpeed fact must not penalise the site.
    const { lcpMs, cls, inpMs, ...withoutPerformance } = PERFECT;
    expect(scoreFacts(withoutPerformance).score).toBe(100);
  });

  it('counts fewer measurements when a collector did not run', () => {
    const { lcpMs, cls, inpMs, ...withoutPerformance } = PERFECT;
    expect(scoreFacts(withoutPerformance).measuredCount)
      .toBeLessThan(scoreFacts(PERFECT).measuredCount);
  });

  it('marks unmeasured checks as unmeasured, not as failures', () => {
    const { lcpMs, cls, inpMs, ...withoutPerformance } = PERFECT;
    const lcp = scoreFacts(withoutPerformance).breakdown.find((b) => b.id === 'lcp');
    expect(lcp.state).toBe('unmeasured');
    expect(lcp.detail).toBe('Not measured');
  });

  it('penalises a missing title', () => {
    const result = scoreFacts({ ...PERFECT, title: '', titleLength: 0 });
    expect(result.score).toBeLessThan(100);
    expect(result.breakdown.find((b) => b.id === 'title').state).toBe('fail');
  });

  it('fails a noindex page', () => {
    const result = scoreFacts({ ...PERFECT, robotsMeta: 'noindex,follow' });
    expect(result.breakdown.find((b) => b.id === 'indexable').state).toBe('fail');
  });

  it('fails when robots.txt blocks every crawler', () => {
    const result = scoreFacts({ ...PERFECT, robotsBlocksEverything: true });
    expect(result.breakdown.find((b) => b.id === 'indexable').state).toBe('fail');
  });

  it('scales the image alt score by how many are missing', () => {
    const half = scoreFacts({ ...PERFECT, imageCount: 10, imagesMissingAlt: 5 });
    const all = scoreFacts({ ...PERFECT, imageCount: 10, imagesMissingAlt: 10 });
    expect(half.score).toBeGreaterThan(all.score);
  });

  it('treats a page with no images as passing rather than failing', () => {
    const result = scoreFacts({ ...PERFECT, imageCount: 0, imagesMissingAlt: 0 });
    expect(result.breakdown.find((b) => b.id === 'imageAlt').state).toBe('pass');
  });

  it('never leaves the 0-100 range', () => {
    const worst = scoreFacts({
      title: '', titleLength: 0, metaDescriptionLength: 0, h1Count: 0,
      imageCount: 5, imagesMissingAlt: 5, jsonLdTypes: [], wordCount: 10,
      httpsAvailable: false, hasViewport: false, robotsMeta: 'noindex',
      sitemapFound: false, lcpMs: 12000, cls: 0.9, inpMs: 2000, hasSpf: false,
      certDaysToExpiry: -5,
    });
    expect(worst.score).toBeGreaterThanOrEqual(0);
    expect(worst.score).toBeLessThanOrEqual(100);
    expect(scoreFacts(PERFECT).score).toBeLessThanOrEqual(100);
  });
});
