const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

/* Core Web Vitals and Lighthouse category scores, mobile strategy.
 *
 * This is the slowest collector by a wide margin — Google renders the page — so
 * it gets its own generous timeout and is the one most likely to come back
 * 'failed'. The report is designed to survive that.
 *
 * Without PAGESPEED_API_KEY the endpoint still answers but is rate limited hard
 * enough to be useless in production, so a missing key is reported as 'skipped'
 * rather than failed. That keeps local dev and preview deployments working.
 */

const TIMEOUT_MS = 30000;

function audit(lighthouse, id) {
  const value = lighthouse?.audits?.[id]?.numericValue;
  return typeof value === 'number' ? Math.round(value) : undefined;
}

function categoryScore(lighthouse, id) {
  const value = lighthouse?.categories?.[id]?.score;
  return typeof value === 'number' ? Math.round(value * 100) : undefined;
}

export async function collectPageSpeed(url) {
  const key = process.env.PAGESPEED_API_KEY;
  if (!key) {
    return { ok: false, skipped: true, reason: 'PageSpeed was not configured for this scan.' };
  }

  const params = new URLSearchParams({ url, strategy: 'mobile', key });
  for (const category of ['performance', 'seo', 'accessibility', 'best-practices']) {
    params.append('category', category);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${PSI_ENDPOINT}?${params}`, { signal: controller.signal });
    if (!response.ok) {
      return { ok: false, reason: `PageSpeed returned ${response.status}.` };
    }

    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    if (!lighthouse) {
      return { ok: false, reason: 'PageSpeed returned no result for this page.' };
    }

    const cls = lighthouse.audits?.['cumulative-layout-shift']?.numericValue;

    return {
      ok: true,
      facts: {
        lcpMs: audit(lighthouse, 'largest-contentful-paint'),
        inpMs: audit(lighthouse, 'interaction-to-next-paint'),
        tbtMs: audit(lighthouse, 'total-blocking-time'),
        fcpMs: audit(lighthouse, 'first-contentful-paint'),
        serverResponseMs: audit(lighthouse, 'server-response-time'),
        cls: typeof cls === 'number' ? Number(cls.toFixed(3)) : undefined,
        performanceScore: categoryScore(lighthouse, 'performance'),
        seoScore: categoryScore(lighthouse, 'seo'),
        accessibilityScore: categoryScore(lighthouse, 'accessibility'),
        bestPracticesScore: categoryScore(lighthouse, 'best-practices'),
      },
    };
  } catch (err) {
    return {
      ok: false,
      reason: err?.name === 'AbortError'
        ? 'PageSpeed took too long to respond.'
        : 'PageSpeed could not be reached.',
    };
  } finally {
    clearTimeout(timer);
  }
}
