import { describe, it, expect } from 'vitest';
import { buildPrompt, fallbackReport, SYSTEM_RULES } from '../../lib/scan/report.js';
import { scoreFacts } from '../../lib/scan/score.js';

/* The facts-only contract is what stops this feature shipping fabricated audits
 * to prospects. If the prompt ever grows a field the scan did not measure, the
 * model will happily narrate it as fact — these tests are the tripwire. */

describe('buildPrompt', () => {
  const { score, breakdown } = scoreFacts({
    title: 'Example', titleLength: 7, h1Count: 1, imageCount: 2, imagesMissingAlt: 1,
  });
  const prompt = buildPrompt({ url: 'https://example.com/', score, breakdown });

  it('states the rules the model has to follow', () => {
    expect(prompt).toContain(SYSTEM_RULES);
  });

  it('includes the URL and the calculated score', () => {
    expect(prompt).toContain('https://example.com/');
    expect(prompt).toContain(`${score}/100`);
  });

  it('flags unmeasured checks explicitly rather than omitting them', () => {
    // Silence would let the model assume the check passed. It must see the gap.
    expect(prompt).toContain('NOT MEASURED');
  });

  it('says plainly that only one page was analysed', () => {
    expect(prompt.toLowerCase()).toContain('not a full-site crawl');
  });

  it('forbids inventing metrics the scan never took', () => {
    for (const banned of ['backlink', 'competitor', 'traffic', 'keyword ranking']) {
      expect(SYSTEM_RULES.toLowerCase()).toContain(banned);
    }
  });

  it('never leaks raw page content into the prompt', () => {
    // Only measurements go to the model — never the HTML it came from.
    expect(prompt).not.toContain('<html');
    expect(prompt).not.toContain('<script');
  });

  it('carries no fact that is absent from the breakdown', () => {
    const dataBlock = prompt.slice(prompt.indexOf('Measurements:'));
    const labels = breakdown.map((b) => b.label);
    const promptLabels = dataBlock
      .split('\n')
      .filter((line) => line.startsWith('- '))
      .map((line) => line.slice(2, line.indexOf(':')));

    expect(promptLabels.length).toBe(labels.length);
    promptLabels.forEach((label) => expect(labels).toContain(label));
  });
});

describe('fallbackReport', () => {
  it('produces a usable report when the model is unavailable', () => {
    const { breakdown } = scoreFacts({ title: '', titleLength: 0, h1Count: 3 });
    const report = fallbackReport({ breakdown });

    expect(report.summary).toBeTruthy();
    expect(report.findings.length).toBeGreaterThan(0);
    expect(report.generatedBy).toBe('fallback');
    report.findings.forEach((f) => {
      expect(f.title).toBeTruthy();
      expect(f.why).toBeTruthy();
      expect(f.fix).toBeTruthy();
    });
  });

  it('reports only measured problems, inventing nothing', () => {
    const { breakdown } = scoreFacts({ title: '', titleLength: 0 });
    const report = fallbackReport({ breakdown });
    const labels = breakdown.map((b) => b.label);
    report.findings.forEach((f) => expect(labels).toContain(f.title));
  });

  it('says everything passed when nothing failed', () => {
    // A title alone is not enough: supplying one makes the canonical check
    // measured too, and a page with a title but no canonical genuinely fails
    // it. Both are given here so every measured check passes.
    const { breakdown } = scoreFacts({
      title: 'A perfectly reasonable title here',
      titleLength: 33,
      canonical: 'https://example.com/',
    });
    expect(breakdown.filter((b) => b.state === 'fail' || b.state === 'warn')).toHaveLength(0);

    const report = fallbackReport({ breakdown });
    expect(report.findings.length).toBe(0);
    expect(report.summary.toLowerCase()).toContain('passed');
  });

  it('caps findings so the report stays readable', () => {
    const { breakdown } = scoreFacts({
      title: '', titleLength: 0, metaDescriptionLength: 0, h1Count: 0,
      imageCount: 5, imagesMissingAlt: 5, jsonLdTypes: [], wordCount: 10,
      httpsAvailable: false, hasViewport: false, robotsMeta: 'noindex',
      sitemapFound: false, lcpMs: 12000, cls: 0.9, inpMs: 2000, hasSpf: false,
    });
    expect(fallbackReport({ breakdown }).findings.length).toBeLessThanOrEqual(6);
  });
});
