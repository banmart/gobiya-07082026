// One-off generator for the SQL that pushes the new 4-step Prospector Drip
// content into the already-seeded live `drip_sequences` row. Not meant to be
// kept around — run once, apply the .sql it writes, then this (and the .sql)
// can be deleted.
import { writeFileSync } from 'fs';
import { renderProspectorEmail } from '../../lib/prospectorEmailTemplate.js';

const steps = [
  {
    step: 1,
    delay_days: 0,
    subject: "Quick question about {{company}}'s website",
    body: renderProspectorEmail({
      preheader: "A free 60-second scan shows you exactly what's slowing {{company}} down.",
      badge: 'Free Website Check',
      heading: "Most site owners never check what's under the hood",
      image: { file: 'hero-tech-seo.jpg', height: 336, alt: 'A technical SEO consultant reviewing a website' },
      bodyHtml: `
        <p style="margin:0 0 14px 0;">Hi {{contact_name}},</p>
        <p style="margin:0 0 14px 0;">I noticed {{company}} is active in {{location}} — and most business owners in {{industry}} never open their website's "engine." They just assume it works.</p>
        <p style="margin:0 0 14px 0;">Under the hood, small technical issues quietly cost real customers: pages that load too slow, broken links, information Google can't find, or a site that ChatGPT and other AI tools skip over entirely.</p>
        <p style="margin:0 0 0 0;">We built a free tool that checks all of it in about a minute — speed, on-page SEO, security, and whether AI search engines can even find {{company}}. No forms first, just a quick report back.</p>
      `,
      ctaUrl: '{{offer_link}}',
      ctaLabel: 'Scan My Site Free',
      signOff: '— Steve<br>Gobiya Growth Team',
    }),
  },
  {
    step: 2,
    delay_days: 2,
    subject: 'How slow is {{website}}, really?',
    body: renderProspectorEmail({
      preheader: 'Slow-loading pages lose visitors before they see what you offer.',
      badge: 'Site Speed Check',
      heading: 'How slow is {{website}}, really?',
      image: { file: 'developer-dashboard-review.jpg', height: 336, alt: 'A developer reviewing website performance data on a dashboard' },
      bodyHtml: `
        <p style="margin:0 0 14px 0;">Hi {{contact_name}},</p>
        <p style="margin:0 0 14px 0;">Here's a number worth knowing: most visitors decide whether to stay on a page within the first few seconds. If {{website}} takes too long to load, they're gone before they ever see what {{company}} offers — and Google notices the same slowdown.</p>
        <p style="margin:0 0 14px 0;">Core Web Vitals — Google's speed and stability scores — factor directly into how often your site shows up in search. A slow site doesn't just lose visitors. It loses rankings.</p>
        <p style="margin:0 0 0 0;">The free scan measures your load speed the same way Google does, and flags exactly what's dragging it down.</p>
      `,
      ctaUrl: '{{offer_link}}',
      ctaLabel: 'Check My Site Speed Free',
    }),
  },
  {
    step: 3,
    delay_days: 4,
    subject: 'Can ChatGPT even find {{company}}?',
    body: renderProspectorEmail({
      preheader: 'AI Overviews, ChatGPT, and Perplexity read sites differently than Google does.',
      badge: 'AI Visibility Check',
      heading: 'Can ChatGPT even find {{company}}?',
      image: { file: 'hero-analytics-man.jpg', height: 336, alt: 'A marketer analyzing AI search visibility data' },
      bodyHtml: `
        <p style="margin:0 0 14px 0;">Hi {{contact_name}},</p>
        <p style="margin:0 0 14px 0;">Search doesn't only mean Google anymore. More people in {{industry}} are asking ChatGPT, Perplexity, and Google's AI Overviews for recommendations before they ever type a traditional search.</p>
        <p style="margin:0 0 14px 0;">The problem: most websites were built for the old rules. If {{website}} is missing clear structured information or blocks AI crawlers without knowing it, {{company}} may be invisible in exactly the answers your future customers are reading.</p>
        <p style="margin:0 0 0 0;">The free scan checks your AI visibility alongside your traditional SEO, so you know whether ChatGPT and Google AI Overviews can actually find you.</p>
      `,
      ctaUrl: '{{offer_link}}',
      ctaLabel: 'See My AI Visibility Free',
    }),
  },
  {
    step: 4,
    delay_days: 7,
    subject: "Last look: what's {{website}} missing?",
    body: renderProspectorEmail({
      preheader: 'Two ways to find out — a free scan, or five minutes with a real person.',
      badge: 'Last Call',
      heading: "Last look: what's {{website}} missing?",
      image: { file: 'analytics-dashboard-review.jpg', height: 336, alt: 'An analytics dashboard showing improved website performance' },
      bodyHtml: `
        <p style="margin:0 0 14px 0;">Hi {{contact_name}},</p>
        <p style="margin:0 0 14px 0;">This is my last note, so let's make it useful. Since 2009, we've helped more than 500 Los Angeles businesses fix exactly the kind of technical issues the free scan catches — slow load times, pages Google can't crawl, and sites AI search tools skip right past. Clients rate us 5.0 on Google and 5.0 on Clutch.</p>
        <p style="margin:0 0 0 0;">If {{company}}'s website has never been checked for speed, SEO, security, and AI visibility, the free scan takes about a minute and hands you a plain-language report — no sales call required. And if you'd rather just talk it through, we're happy to take a look at {{website}} together and tell you what we'd fix first.</p>
      `,
      ctaUrl: '{{offer_link}}',
      ctaLabel: 'Scan My Site Free',
      secondary: { url: '{{site_url}}/contact', label: 'Or talk to a real person →' },
      showTrust: true,
      signOff: '— Steve<br>Gobiya Growth Team',
    }),
  },
];

const description =
  'Multi-touch outreach sequence for cold prospects from the Prospector tool, diagnosing site issues and routing to the free website scan.';

const stepsJson = JSON.stringify(steps);

// Dollar-quoted strings take their content completely literally — the only
// way this breaks is if the content itself contains the closing delimiter.
if (stepsJson.includes('$json$') || description.includes('$desc$')) {
  throw new Error('Content contains a dollar-quote delimiter — pick different tags before running.');
}

const sql = `-- Updates the LIVE 'Prospector Drip - 4 Step' sequence row in place (same id),
-- so any prospect currently mid-sequence keeps their progress and simply
-- receives the new content on their next scheduled send. Run this once in
-- the Supabase SQL editor after deploying the lib/drip.js + lib/
-- prospectorEmailTemplate.js changes and the public/assets/img/email/*
-- assets in this branch.
update public.drip_sequences
set description = $desc$${description}$desc$,
    steps = $json$${stepsJson}$json$::jsonb
where title = 'Prospector Drip - 4 Step';
`;

writeFileSync(new URL('./update-prospector-drip.sql', import.meta.url), sql, 'utf8');
console.log('wrote SQL, bytes:', sql.length);
