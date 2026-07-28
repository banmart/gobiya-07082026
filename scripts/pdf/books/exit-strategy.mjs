import { page, cover, toc, cta, document_, numbered, table, checklist } from '../book-shell.mjs';

const T = 'The Exit Strategy Handbook';

export const meta = {
  slug: 'exit-strategy',
  out: 'technical-seo-architecture.pdf',
  title: T,
};

export function build() {
  const s = [];

  s.push(
    cover({
      title: 'The Exit<br>Strategy<br>Handbook',
      tagline: 'Technical SEO and search architecture for a business built to be worth buying',
    })
  );

  s.push(
    toc([
      { num: '01', label: 'Why Architecture Sets Your Ceiling', pg: 3 },
      { num: '02', label: 'Crawlability: Getting Found at All', pg: 5 },
      { num: '03', label: 'Rendering and the JavaScript Trap', pg: 8 },
      { num: '04', label: 'Structure and Internal Linking', pg: 10 },
      { num: '05', label: 'Speed That Actually Counts', pg: 13 },
      { num: '06', label: 'Structured Data', pg: 15 },
      { num: '07', label: 'The Technical Audit', pg: 17 },
      { num: '08', label: 'Key Takeaways', pg: 20 },
      { num: '09', label: 'About Gobiya', pg: 21 },
    ])
  );

  s.push(
    page(T, 3, `  <div class="kicker">Chapter 01</div>
  <h1 class="content-title">Why Architecture Sets Your Ceiling</h1>
  <hr class="rule-gold">
  <p>Content gets the attention. Architecture sets the limit on what that content can ever achieve.</p>
  <p>You can write the best page in your industry, and if a search engine cannot crawl it, cannot render it, or cannot work out how it relates to the rest of your site, that page will underperform a mediocre one on a well-built competitor's domain. This is the single most common reason good content fails.</p>
  <p class="stat-line">Architecture is the ceiling. Content is how close you get to it.</p>
  <p>The good news is that technical problems are the most fixable category in search. They are concrete, they are checkable, and they usually stay fixed. Unlike rankings, which move for reasons outside your control, a rendering bug you repair today is repaired tomorrow.</p>`)
  );

  s.push(
    page(T, 4, `  <h2 class="content-title" style="font-size:17pt;">Why This Belongs in an Exit Conversation</h2>
  <hr class="rule-gold">
  <p>If you ever intend to sell the business, technical search health stops being a marketing detail and becomes a due-diligence line item.</p>
  <p>A buyer looking at an acquisition wants to know how much of your revenue depends on channels that will keep working after the deal closes. Traffic that arrives because you own well-built, well-ranked pages is a transferable asset. Traffic that arrives because you are spending on ads is a cost the buyer inherits.</p>
${numbered([
      '<strong>Owned demand raises the multiple.</strong> Predictable organic pipeline reads as durable revenue rather than rented attention.',
      '<strong>Technical debt reads as risk.</strong> A site with indexation problems and no structured data suggests a rebuild is coming, and the buyer prices that in.',
      '<strong>Concentration is a discount.</strong> If nearly all leads come from one paid platform, you are selling a business that depends on a vendor you do not control.',
    ])}
  <p>Everything in this handbook improves your search performance today. It also happens to improve what the business is worth.</p>`)
  );

  s.push(
    page(T, 5, `  <div class="kicker">Chapter 02</div>
  <h1 class="content-title">Crawlability: Getting Found at All</h1>
  <hr class="rule-gold">
  <p>Before a page can rank, be cited, or convert anyone, a machine has to be able to reach it. Crawlability is that first gate, and more sites fail it than their owners realize.</p>
  <p>Four things decide whether a bot can reach a page:</p>
${numbered([
      '<strong>robots.txt</strong> — a single stray disallow line can hide an entire section of your site. This file is checked before anything else.',
      '<strong>Internal links</strong> — a page with no links pointing at it is effectively invisible, no matter how good it is.',
      '<strong>Sitemap</strong> — your XML sitemap should list every page you want indexed, and nothing you do not.',
      '<strong>Status codes</strong> — a page returning an error or an unexpected redirect will not be indexed, however fine it looks in a browser.',
    ])}
  <p>Check these in order. Fixing content problems while a robots.txt rule is blocking the section is wasted effort.</p>`)
  );

  s.push(
    page(T, 6, `  <h2 class="content-title" style="font-size:17pt;">The Orphan Page Problem</h2>
  <hr class="rule-gold">
  <p>An orphan page is one that exists, loads fine, and has no internal links pointing to it. It usually happens by accident: a page gets built for a campaign, the campaign ends, the navigation changes, and the page is left stranded.</p>
  <p>Search engines find pages mainly by following links. A page nothing links to has to be discovered some other way — usually your sitemap — and even when it is found, it inherits none of the authority your other pages have accumulated.</p>
  <p><strong>How to find them:</strong> compare the list of pages in your sitemap against the pages reachable by clicking through your own site. Anything in the first list but not the second is an orphan.</p>
  <p><strong>How to fix them:</strong> either link to the page from somewhere relevant, or remove it. A page worth keeping is worth linking to. A page not worth linking to is usually not worth keeping.</p>`)
  );

  s.push(
    page(T, 7, `  <h2 class="content-title" style="font-size:17pt;">Index Bloat</h2>
  <hr class="rule-gold">
  <p>The opposite problem is just as damaging: thousands of low-value pages getting indexed and diluting the site.</p>
  <p>Common sources are filtered and sorted URL variants, internal search results, tag and category archives with one item in them, printer-friendly duplicates, and staging pages that were never blocked.</p>
${table(
      ['Symptom', 'Likely Cause', 'Fix'],
      [
        ['Far more indexed pages than real ones', 'URL parameters', 'Canonical tags, parameter rules'],
        ['Near-identical pages ranking against each other', 'Thin archives', 'Consolidate or noindex'],
        ['Staging content in results', 'Unprotected environment', 'Password protection, not just noindex'],
        ['Search result pages indexed', 'Internal search crawlable', 'Disallow in robots.txt'],
      ]
    )}
  <p>The goal is not the largest possible index. It is an index that contains your good pages and nothing else.</p>`)
  );

  s.push(
    page(T, 8, `  <div class="kicker">Chapter 03</div>
  <h1 class="content-title">Rendering and the JavaScript Trap</h1>
  <hr class="rule-gold">
  <p>This is the most expensive technical mistake we find, and the hardest for a non-specialist to spot — because the page looks perfect in your browser.</p>
  <p>Modern sites often build their content with JavaScript after the initial page loads. Your browser waits patiently and runs it. Some bots do too. Many do not, and several of the AI crawlers that matter most for citations do not execute JavaScript at all.</p>
  <p class="stat-line">If your content only exists after JavaScript runs, a meaningful share of crawlers see an empty page.</p>
  <p><strong>How to check in thirty seconds:</strong> open your page, right-click, choose "View Page Source," and search that raw source for a sentence from your main content. If the sentence is not there, your content is being built client-side, and some crawlers will never see it.</p>`)
  );

  s.push(
    page(T, 9, `  <h2 class="content-title" style="font-size:17pt;">Fixing the Rendering Gap</h2>
  <hr class="rule-gold">
  <p>The fix is to deliver your important content in the initial HTML response rather than assembling it afterwards in the browser.</p>
${numbered([
      '<strong>Server-side rendering.</strong> The server builds the full HTML and sends it complete. Best general answer for content that changes often.',
      '<strong>Static generation.</strong> Pages are built ahead of time and served as finished files. Fastest and most reliable for content that changes rarely.',
      '<strong>Hybrid.</strong> Critical content rendered server-side, non-essential interactive extras layered on afterwards. Usually the practical compromise.',
    ])}
  <p>What matters is not which framework you use but what arrives in that first response. Headings, body copy, structured data, and links should all be present before a single line of JavaScript executes.</p>
  <p>Interactive extras — calculators, filters, live chat — can safely load afterwards. Your core answer cannot.</p>`)
  );

  s.push(
    page(T, 10, `  <div class="kicker">Chapter 04</div>
  <h1 class="content-title">Structure and Internal Linking</h1>
  <hr class="rule-gold">
  <p>Site structure tells a machine what your business does, which pages matter most, and how topics relate. Done well it is invisible. Done badly it caps everything.</p>
  <p>Two principles carry most of the weight:</p>
${numbered([
      '<strong>Shallow beats deep.</strong> Any page worth ranking should be reachable within three clicks of the home page. Pages buried five levels down are treated as less important, because the structure says they are.',
      '<strong>Group by topic, not by date.</strong> Organizing around subjects your buyers care about builds recognizable topical authority. Organizing by publication month builds nothing.',
    ])}
  <p>A useful test: could a stranger, looking only at your navigation, correctly describe what your business does and where it operates? If not, neither can a machine.</p>`)
  );

  s.push(
    page(T, 11, `  <h2 class="content-title" style="font-size:17pt;">Hub and Spoke</h2>
  <hr class="rule-gold">
  <p>The most reliable structure for a service business is hub and spoke. A hub page covers a topic broadly. Spoke pages cover individual questions in depth. Every spoke links back to its hub, and the hub links out to every spoke.</p>
  <p>The effect is that authority pools at the hub and distributes to the spokes, and the relationship between the pages is unambiguous to anything reading the site.</p>
${table(
      ['Page Type', 'Purpose', 'Links To'],
      [
        ['Hub', 'Broad coverage of one service', 'Every related spoke'],
        ['Spoke', 'One specific question, answered fully', 'Its hub, plus sibling spokes'],
        ['Location', 'One service in one place', 'Its hub, plus nearby locations'],
      ]
    )}
  <p>Keep anchor text descriptive. A link reading "our technical SEO services" carries meaning; one reading "click here" carries none.</p>`)
  );

  s.push(
    page(T, 12, `  <h2 class="content-title" style="font-size:17pt;">URLs That Age Well</h2>
  <hr class="rule-gold">
  <p>URLs are permanent in a way most site elements are not. Every change risks breaking links you do not control, so it is worth getting them right once.</p>
${checklist([
      'Short, readable, and made of real words rather than IDs or codes',
      'Lower case, with hyphens between words — never underscores or spaces',
      'No dates, unless the content is genuinely time-bound news',
      'No stop words padding the path out',
      'Structure that mirrors the site hierarchy',
      'Never changed without a permanent redirect from the old address',
    ])}
  <p>If you must change a URL, redirect the old one permanently and update your internal links to point at the new address directly. Chains of redirects leak both speed and authority.</p>`)
  );

  s.push(
    page(T, 13, `  <div class="kicker">Chapter 05</div>
  <h1 class="content-title">Speed That Actually Counts</h1>
  <hr class="rule-gold">
  <p>Speed matters, but not every speed metric matters equally, and chasing a perfect score is a poor use of a budget.</p>
  <p>Three measurements describe what a real visitor experiences:</p>
${table(
      ['Metric', 'What It Measures', 'Aim For'],
      [
        ['LCP', 'When the main content appears', 'Under 2.5 seconds'],
        ['INP', 'How fast the page reacts to a tap', 'Under 200 milliseconds'],
        ['CLS', 'How much the layout jumps while loading', 'Under 0.1'],
      ]
    )}
  <p>Of the three, the first is usually the one costing you money — it is what a visitor experiences as "this site is slow," and it is most often caused by one oversized hero image.</p>`)
  );

  s.push(
    page(T, 14, `  <h2 class="content-title" style="font-size:17pt;">The Fixes Worth Doing First</h2>
  <hr class="rule-gold">
${numbered([
      '<strong>Compress your images.</strong> Almost always the single biggest win. Serve modern formats, size them for the space they occupy, and stop shipping 4000-pixel photos into 800-pixel slots.',
      '<strong>Reserve space for anything that loads late.</strong> Images and embeds without declared dimensions shove the page around as they arrive, which is what a visitor experiences as a page fighting back.',
      '<strong>Audit your third-party scripts.</strong> Chat widgets, heat maps, ad pixels and analytics accumulate quietly. Each one costs speed. Remove what nobody reads.',
      '<strong>Test on a real phone over mobile data,</strong> not on office wifi on a desktop. That is the experience most of your visitors are actually having.',
    ])}
  <p>Do those four and you will capture most of the available benefit. Chasing the last few points of a lab score rarely changes what a visitor feels.</p>`)
  );

  s.push(
    page(T, 15, `  <div class="kicker">Chapter 06</div>
  <h1 class="content-title">Structured Data</h1>
  <hr class="rule-gold">
  <p>Structured data is a block of machine-readable facts you add to a page, stating plainly what the page is about: this is a business, here is its address, here are its hours, this is an article, this person wrote it.</p>
  <p>It does not change what a visitor sees. It changes how confidently a machine can describe you — which is exactly what an AI tool needs before it will name you in an answer.</p>
  <p>The types that earn their keep for most businesses:</p>
${table(
      ['Type', 'Use It On', 'Why It Matters'],
      [
        ['Organization', 'Home page', 'Establishes who you are'],
        ['LocalBusiness', 'Location pages', 'Address, hours, service area'],
        ['Service', 'Service pages', 'What you actually do'],
        ['FAQPage', 'Pages with real Q&amp;A', 'Direct answers AI can lift'],
        ['Article', 'Guides and posts', 'Author and date credibility'],
      ]
    )}`)
  );

  s.push(
    page(T, 16, `  <h2 class="content-title" style="font-size:17pt;">Getting Schema Right</h2>
  <hr class="rule-gold">
  <p>Three rules prevent almost every structured data problem we encounter.</p>
${numbered([
      '<strong>It must match the visible page.</strong> Marking up a review that does not appear on the page, or hours that contradict your contact page, is a violation and gets the markup ignored at best.',
      '<strong>Be consistent everywhere.</strong> Your name, address, and phone number in schema must match your website, your Google Business Profile, and your directory listings exactly. "Street" in one place and "St." in another is a mismatch to a machine.',
      '<strong>Validate it after every deploy.</strong> Schema breaks silently. A redesign or plugin update can strip it out without anybody noticing for months.',
    ])}
  <p>Structured data is cheap to add and cheap to maintain. It is also one of the few signals where being thorough puts you meaningfully ahead of competitors who have skipped it entirely.</p>`)
  );

  s.push(
    page(T, 17, `  <div class="kicker">Chapter 07</div>
  <h1 class="content-title">The Technical Audit</h1>
  <hr class="rule-gold">
  <p>Run this quarterly. Everything here is checkable from a browser.</p>
${checklist([
      'Search <em>site:yourdomain.com</em> — does the count roughly match your real page count?',
      'Open robots.txt. Is anything important accidentally disallowed?',
      'View page source on your top page. Is the main content in the raw HTML?',
      'Is every important page reachable within three clicks of the home page?',
      'Does every page have exactly one H1, describing what the page is about?',
      'Do your URLs use real words, lower case, with hyphens?',
      'Load your top page on a phone over mobile data. Content in under three seconds?',
      'Does structured data exist, validate, and match what is on the page?',
      'Do NAP details match exactly across site, profile, and directories?',
      'Does every old URL you have changed still redirect permanently?',
    ])}`)
  );

  s.push(
    page(T, 18, `  <h2 class="content-title" style="font-size:17pt;">Priority Order When Everything Is Broken</h2>
  <hr class="rule-gold">
  <p>Finding a dozen problems at once is normal. Fix them in this order, because each one gates the next.</p>
${table(
      ['Priority', 'Problem', 'Why First'],
      [
        ['1', 'Blocked or unindexed pages', 'Nothing else matters if bots cannot reach them'],
        ['2', 'Content only rendered by JavaScript', 'Invisible content cannot rank or be cited'],
        ['3', 'Broken redirects and error pages', 'Actively leaking authority right now'],
        ['4', 'Missing or invalid structured data', 'Cheap to fix, disproportionate benefit'],
        ['5', 'Speed and layout stability', 'Real, but rarely the binding constraint'],
        ['6', 'Structure and internal linking', 'Compounding gain, slower to show'],
      ]
    )}
  <p>Teams routinely start at five because it produces a satisfying score. Start at one.</p>`)
  );

  s.push(
    page(T, 19, `  <h2 class="content-title" style="font-size:17pt;">Keeping It Fixed</h2>
  <hr class="rule-gold">
  <p>Technical health decays. Not because anybody is careless, but because sites change constantly and nothing warns you when a change breaks something invisible.</p>
  <p>The usual culprits: a redesign that drops structured data, a plugin update that adds render-blocking scripts, a new section launched without internal links, a staging environment left crawlable, a URL changed without a redirect.</p>
  <p>The defence is a routine, not a project:</p>
${numbered([
      '<strong>After every significant deploy,</strong> re-check indexation and validate schema on a sample of key pages.',
      '<strong>Monthly,</strong> review crawl errors and fix anything new.',
      '<strong>Quarterly,</strong> run the full audit on the previous page.',
    ])}
  <p>Twenty minutes a month prevents the kind of problem that takes a quarter to unwind.</p>`)
  );

  s.push(
    page(T, 20, `  <div class="kicker">Chapter 08</div>
  <h1 class="content-title">Key Takeaways</h1>
  <hr class="rule-gold">
${numbered([
      'Architecture sets the ceiling on what your content can achieve. Great writing on an unreadable site underperforms average writing on a well-built one.',
      'Check crawlability before anything else. Content published behind a blocked path produces nothing.',
      'If your main content only exists after JavaScript runs, a meaningful share of crawlers — including AI crawlers — see an empty page.',
      'Keep important pages within three clicks, group by topic rather than date, and link with descriptive anchor text.',
      'Compress your images before chasing any other speed fix. It is almost always the biggest single win.',
      'Structured data must match the visible page, stay consistent across every listing, and be re-validated after each deploy.',
      'Technical health decays silently. A quarterly audit costs less than one recovery.',
    ])}`)
  );

  s.push(
    cta(T, 21, {
      heading: 'Build It to Be Worth Buying',
      blurb:
        'Gobiya builds the technical foundation underneath durable organic growth — crawlability, rendering, structure, speed, and structured data. The result is a business whose demand transfers with it. We have been doing this from Los Angeles since 2010.',
    })
  );

  return document_(meta.title, s);
}
