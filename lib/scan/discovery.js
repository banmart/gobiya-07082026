import { safeFetch } from './url.js';

/* robots.txt and sitemap.xml.
 *
 * This is also where the honest limit of the scan sits: it reports how many
 * URLs the sitemap declares, but nothing crawls them. One page is analysed —
 * the one the visitor submitted. The report says so rather than implying a
 * whole-site crawl happened.
 */

function sitemapUrlsFrom(xml) {
  return (xml.match(/<loc>/gi) || []).length;
}

export async function collectDiscovery(url) {
  let origin;
  try {
    origin = new URL(url).origin;
  } catch {
    return { ok: false, reason: 'Could not read the domain from that address.' };
  }

  const robots = await safeFetch(`${origin}/robots.txt`, { timeoutMs: 5000 });
  const robotsFound = robots.ok && robots.status === 200;
  const robotsBody = robotsFound ? robots.body : '';

  // Only a bare `Disallow: /` under a wildcard agent counts as blocking
  // everything. Any other Disallow is ordinary housekeeping.
  const blocksEverything = /user-agent:\s*\*[\s\S]*?disallow:\s*\/\s*(\n|$)/i.test(robotsBody);

  const declaredSitemap = robotsBody.match(/sitemap:\s*(\S+)/i)?.[1];
  const sitemapUrl = declaredSitemap || `${origin}/sitemap.xml`;

  const sitemap = await safeFetch(sitemapUrl, { timeoutMs: 5000 });
  const sitemapFound = sitemap.ok && sitemap.status === 200;
  const isIndex = sitemapFound && /<sitemapindex/i.test(sitemap.body);

  return {
    ok: true,
    facts: {
      robotsFound,
      robotsBlocksEverything: robotsFound ? blocksEverything : undefined,
      robotsDeclaresSitemap: Boolean(declaredSitemap),
      sitemapFound,
      sitemapIsIndex: sitemapFound ? isIndex : undefined,
      // For a sitemap index this counts child sitemaps, not pages. Labelled as
      // such in the report so the number is never presented as a page count.
      sitemapUrlCount: sitemapFound ? sitemapUrlsFrom(sitemap.body) : undefined,
      pagesAnalysed: 1,
    },
  };
}
