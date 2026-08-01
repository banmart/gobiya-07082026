import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('../../lib/scan/url.js', async (importOriginal) => ({
  ...(await importOriginal()),
  safeFetch: vi.fn(),
}));

const { collectHtml } = await import('../../lib/scan/html.js');
const { safeFetch } = await import('../../lib/scan/url.js');

function page(body) {
  return {
    ok: true,
    status: 200,
    finalUrl: 'https://example.com/',
    redirectCount: 0,
    ttfbMs: 120,
    body,
  };
}

const FULL = `<!DOCTYPE html><html lang="en-US"><head>
<title>Acme Plumbing &amp; Rooter — Los Angeles</title>
<meta name="description" content="Emergency plumbing across LA.">
<meta name="viewport" content="width=device-width">
<link rel="canonical" href="https://example.com/">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"Acme"}</script>
</head><body>
<h1>Acme Plumbing</h1><h2>Services</h2><h2>Areas</h2>
<img src="a.jpg" alt="A technician"><img src="b.jpg"><img src="c.jpg" alt="">
<p>Some real words on the page describing the business and what it does.</p>
</body></html>`;

afterEach(() => vi.clearAllMocks());

describe('collectHtml', () => {
  it('extracts the head fields it observed', async () => {
    safeFetch.mockResolvedValue(page(FULL));
    const { ok, facts } = await collectHtml('https://example.com/');

    expect(ok).toBe(true);
    expect(facts.title).toBe('Acme Plumbing & Rooter — Los Angeles'); // entities decoded
    expect(facts.metaDescription).toBe('Emergency plumbing across LA.');
    expect(facts.canonical).toBe('https://example.com/');
    expect(facts.hasViewport).toBe(true);
    expect(facts.htmlLang).toBe('en-US');
  });

  it('counts headings and reports the h1 text', async () => {
    safeFetch.mockResolvedValue(page(FULL));
    const { facts } = await collectHtml('https://example.com/');
    expect(facts.h1).toEqual(['Acme Plumbing']);
    expect(facts.h1Count).toBe(1);
    expect(facts.h2Count).toBe(2);
  });

  it('treats an empty alt attribute as missing alt text', async () => {
    safeFetch.mockResolvedValue(page(FULL));
    const { facts } = await collectHtml('https://example.com/');
    expect(facts.imageCount).toBe(3);
    expect(facts.imagesMissingAlt).toBe(2); // no alt, and alt=""
  });

  it('reads JSON-LD types', async () => {
    safeFetch.mockResolvedValue(page(FULL));
    const { facts } = await collectHtml('https://example.com/');
    expect(facts.jsonLdTypes).toContain('LocalBusiness');
  });

  it('walks @graph for types', async () => {
    safeFetch.mockResolvedValue(page(
      `<html><head><script type="application/ld+json">
       {"@graph":[{"@type":"Organization"},{"@type":"WebSite"}]}
       </script></head><body></body></html>`
    ));
    const { facts } = await collectHtml('https://example.com/');
    expect(facts.jsonLdTypes).toEqual(expect.arrayContaining(['Organization', 'WebSite']));
  });

  it('survives malformed JSON-LD without failing the collector', async () => {
    safeFetch.mockResolvedValue(page(
      `<html><head><script type="application/ld+json">{ not json }</script></head><body></body></html>`
    ));
    const { ok, facts } = await collectHtml('https://example.com/');
    expect(ok).toBe(true);
    expect(facts.jsonLdTypes).toEqual([]);
  });

  it('leaves absent fields undefined rather than guessing them', async () => {
    // An empty page must produce "not measured", never an invented default.
    safeFetch.mockResolvedValue(page('<html><body><p>hi</p></body></html>'));
    const { facts } = await collectHtml('https://example.com/');

    expect(facts.title).toBeUndefined();
    expect(facts.metaDescription).toBeUndefined();
    expect(facts.canonical).toBeUndefined();
    expect(facts.h1Count).toBe(0);
    expect(facts.jsonLdTypes).toEqual([]);
  });

  it('excludes script and style text from the word count', async () => {
    safeFetch.mockResolvedValue(page(
      `<html><body><script>var a = "aaa bbb ccc ddd";</script>
       <style>.x{color:red}</style><p>one two three</p></body></html>`
    ));
    const { facts } = await collectHtml('https://example.com/');
    expect(facts.wordCount).toBe(3);
  });

  it('passes the fetch failure through instead of throwing', async () => {
    safeFetch.mockResolvedValue({ ok: false, reason: 'The site could not be reached.' });
    const result = await collectHtml('https://example.com/');
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('The site could not be reached.');
  });
});
