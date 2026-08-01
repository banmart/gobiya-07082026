import { safeFetch } from './url.js';

/* On-page collector.
 *
 * Regex parsing rather than a DOM library on purpose: this reads a fixed set of
 * head elements and counts a few tags, the input is capped at 2 MB by safeFetch,
 * and adding cheerio/jsdom to a serverless route for that is a poor trade.
 * Nothing here interprets the page — every field is something observed, and a
 * field that could not be observed is simply absent so the report can say so.
 */

function firstMatch(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].trim() : undefined;
}

function decodeEntities(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function metaContent(html, name, attr = 'name') {
  const pattern = new RegExp(
    `<meta[^>]+${attr}=["']${name}["'][^>]*content=["']([^"']*)["']`,
    'i'
  );
  const reversed = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${name}["']`,
    'i'
  );
  return firstMatch(html, pattern) ?? firstMatch(html, reversed);
}

function jsonLdTypes(html) {
  const blocks = html.match(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  );
  if (!blocks) return [];

  const types = new Set();
  for (const block of blocks) {
    const body = block.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
    try {
      const parsed = JSON.parse(body);
      const walk = (node) => {
        if (Array.isArray(node)) return node.forEach(walk);
        if (!node || typeof node !== 'object') return;
        if (node['@type']) {
          [].concat(node['@type']).forEach((t) => types.add(String(t)));
        }
        if (node['@graph']) walk(node['@graph']);
      };
      walk(parsed);
    } catch {
      // Malformed JSON-LD is itself a finding, but it is not this collector's
      // job to guess what was meant. Skip the block.
    }
  }
  return [...types];
}

function textWordCount(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return stripped ? stripped.split(' ').length : 0;
}

export async function collectHtml(url) {
  const response = await safeFetch(url);
  if (!response.ok) {
    return { ok: false, reason: response.reason };
  }

  const html = response.body || '';

  const images = html.match(/<img\b[^>]*>/gi) || [];
  const imagesMissingAlt = images.filter(
    (tag) => !/\balt=["'][^"']*[^\s"'][^"']*["']/i.test(tag)
  ).length;

  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    decodeEntities(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
  );

  const title = decodeEntities(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i));
  const metaDescription = decodeEntities(metaContent(html, 'description'));

  return {
    ok: true,
    facts: {
      httpStatus: response.status,
      finalUrl: response.finalUrl,
      redirectCount: response.redirectCount,
      ttfbMs: response.ttfbMs,
      responseBytes: html.length,

      title,
      titleLength: title ? title.length : 0,
      metaDescription,
      metaDescriptionLength: metaDescription ? metaDescription.length : 0,
      canonical: firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i),
      robotsMeta: metaContent(html, 'robots'),
      ogTitle: decodeEntities(metaContent(html, 'og:title', 'property')),

      h1,
      h1Count: h1.length,
      h2Count: (html.match(/<h2[^>]*>/gi) || []).length,

      imageCount: images.length,
      imagesMissingAlt,

      jsonLdTypes: jsonLdTypes(html),
      hasViewport: Boolean(metaContent(html, 'viewport')),
      htmlLang: firstMatch(html, /<html[^>]+lang=["']([^"']*)["']/i),
      wordCount: textWordCount(html),
    },
  };
}
