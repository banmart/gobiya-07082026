/* The score.
 *
 * Computed here, in code, and never by the model. Two reasons: a model-produced
 * number drifts between the page and the email even with identical input, and
 * nobody — including us — can explain how it was reached when a prospect asks.
 *
 * Unmeasured facts are excluded from both the numerator and the denominator, so
 * a collector that failed lowers confidence in the score rather than the score
 * itself. A site is not penalised for our PageSpeed quota running out.
 */

/** @param {{id:string,label:string,weight:number,earned:number|undefined,detail:string}} check */
function check(id, label, weight, earned, detail) {
  return { id, label, weight, earned, detail };
}

function band(value, thresholds) {
  // thresholds: [goodBelow, okBelow] — lower is better
  if (value === undefined) return undefined;
  if (value <= thresholds[0]) return 1;
  if (value <= thresholds[1]) return 0.5;
  return 0;
}

export function scoreFacts(facts = {}) {
  const checks = [];

  // ── On-page ──
  checks.push(check('title', 'Page title', 10,
    facts.title === undefined ? undefined
      : facts.titleLength >= 20 && facts.titleLength <= 65 ? 1
      : facts.titleLength > 0 ? 0.5 : 0,
    facts.title === undefined ? 'Not measured'
      : facts.titleLength === 0 ? 'Missing'
      : `${facts.titleLength} characters`));

  checks.push(check('metaDescription', 'Meta description', 8,
    facts.metaDescriptionLength === undefined ? undefined
      : facts.metaDescriptionLength >= 70 && facts.metaDescriptionLength <= 165 ? 1
      : facts.metaDescriptionLength > 0 ? 0.5 : 0,
    facts.metaDescriptionLength === undefined ? 'Not measured'
      : facts.metaDescriptionLength === 0 ? 'Missing'
      : `${facts.metaDescriptionLength} characters`));

  checks.push(check('h1', 'Single H1', 8,
    facts.h1Count === undefined ? undefined : facts.h1Count === 1 ? 1 : 0,
    facts.h1Count === undefined ? 'Not measured' : `${facts.h1Count} found`));

  checks.push(check('canonical', 'Canonical tag', 5,
    facts.canonical === undefined && facts.title === undefined ? undefined
      : facts.canonical ? 1 : 0,
    facts.canonical ? 'Present' : facts.title === undefined ? 'Not measured' : 'Missing'));

  checks.push(check('imageAlt', 'Image alt text', 7,
    facts.imageCount === undefined ? undefined
      : facts.imageCount === 0 ? 1
      : 1 - Math.min(1, facts.imagesMissingAlt / facts.imageCount),
    facts.imageCount === undefined ? 'Not measured'
      : `${facts.imagesMissingAlt} of ${facts.imageCount} missing alt text`));

  checks.push(check('schema', 'Structured data', 8,
    facts.jsonLdTypes === undefined ? undefined : facts.jsonLdTypes.length > 0 ? 1 : 0,
    facts.jsonLdTypes === undefined ? 'Not measured'
      : facts.jsonLdTypes.length ? facts.jsonLdTypes.join(', ') : 'None found'));

  checks.push(check('content', 'Content depth', 6,
    facts.wordCount === undefined ? undefined
      : facts.wordCount >= 600 ? 1 : facts.wordCount >= 250 ? 0.5 : 0,
    facts.wordCount === undefined ? 'Not measured' : `${facts.wordCount} words`));

  // ── Technical ──
  checks.push(check('https', 'HTTPS', 10,
    facts.httpsAvailable === undefined ? undefined
      : facts.httpsAvailable && facts.certAuthorized !== false ? 1
      : facts.httpsAvailable ? 0.5 : 0,
    facts.httpsAvailable === undefined ? 'Not measured'
      : !facts.httpsAvailable ? 'Not served over HTTPS'
      : facts.certAuthorized === false ? 'Certificate did not validate' : 'Valid certificate'));

  checks.push(check('certExpiry', 'Certificate expiry', 4,
    facts.certDaysToExpiry === undefined ? undefined
      : facts.certDaysToExpiry > 30 ? 1 : facts.certDaysToExpiry > 0 ? 0.5 : 0,
    facts.certDaysToExpiry === undefined ? 'Not measured'
      : `${facts.certDaysToExpiry} days remaining`));

  checks.push(check('viewport', 'Mobile viewport', 6,
    facts.hasViewport === undefined ? undefined : facts.hasViewport ? 1 : 0,
    facts.hasViewport === undefined ? 'Not measured' : facts.hasViewport ? 'Declared' : 'Missing'));

  checks.push(check('indexable', 'Open to search engines', 8,
    facts.robotsMeta === undefined && facts.robotsBlocksEverything === undefined ? undefined
      : /noindex/i.test(facts.robotsMeta || '') || facts.robotsBlocksEverything ? 0 : 1,
    /noindex/i.test(facts.robotsMeta || '') ? 'Page is set to noindex'
      : facts.robotsBlocksEverything ? 'robots.txt blocks all crawlers'
      : facts.robotsMeta === undefined && facts.robotsBlocksEverything === undefined
        ? 'Not measured' : 'Crawlable'));

  checks.push(check('sitemap', 'XML sitemap', 5,
    facts.sitemapFound === undefined ? undefined : facts.sitemapFound ? 1 : 0,
    facts.sitemapFound === undefined ? 'Not measured'
      : facts.sitemapFound ? 'Found' : 'Not found'));

  // ── Performance ──
  checks.push(check('lcp', 'Largest Contentful Paint', 10,
    band(facts.lcpMs, [2500, 4000]),
    facts.lcpMs === undefined ? 'Not measured' : `${(facts.lcpMs / 1000).toFixed(1)}s`));

  checks.push(check('cls', 'Cumulative Layout Shift', 5,
    band(facts.cls, [0.1, 0.25]),
    facts.cls === undefined ? 'Not measured' : String(facts.cls)));

  checks.push(check('inp', 'Interaction to Next Paint', 5,
    band(facts.inpMs ?? facts.tbtMs, [200, 500]),
    facts.inpMs !== undefined ? `${facts.inpMs}ms`
      : facts.tbtMs !== undefined ? `${facts.tbtMs}ms blocking time` : 'Not measured'));

  // ── Trust ──
  checks.push(check('email', 'Email authentication (SPF)', 5,
    facts.hasSpf === undefined ? undefined : facts.hasSpf ? 1 : 0,
    facts.hasSpf === undefined ? 'Not measured' : facts.hasSpf ? 'SPF present' : 'No SPF record'));

  const measured = checks.filter((c) => c.earned !== undefined);
  const totalWeight = measured.reduce((sum, c) => sum + c.weight, 0);
  const earnedWeight = measured.reduce((sum, c) => sum + c.weight * c.earned, 0);

  return {
    // No measurements at all yields 0 rather than NaN. The report treats that
    // as "we could not reach the site", not as a failing grade.
    score: totalWeight === 0 ? 0 : Math.round((earnedWeight / totalWeight) * 100),
    measuredCount: measured.length,
    totalCount: checks.length,
    breakdown: checks.map(({ id, label, detail, earned, weight }) => ({
      id,
      label,
      detail,
      weight,
      state: earned === undefined ? 'unmeasured' : earned >= 1 ? 'pass' : earned > 0 ? 'warn' : 'fail',
    })),
  };
}
