import { page, cover, toc, cta, document_, numbered, table, checklist } from '../book-shell.mjs';

const T = 'Acquired';

export const meta = {
  slug: 'acquired',
  out: 'acquired-guide-to-scaling.pdf',
  title: 'Acquired',
};

export function build() {
  const s = [];

  s.push(
    cover({
      title: 'Acquired',
      tagline: 'The art of scaling a business to $100M on demand you actually own',
    })
  );

  s.push(
    toc([
      { num: '01', label: 'The Only Channel You Actually Own', pg: 3 },
      { num: '02', label: 'The Math of Compounding Demand', pg: 5 },
      { num: '03', label: 'The Five Stages of Search-Led Growth', pg: 8 },
      { num: '04', label: 'What to Measure at Each Stage', pg: 13 },
      { num: '05', label: 'The Growth Self-Audit', pg: 15 },
      { num: '06', label: 'Your First 90 Days', pg: 17 },
      { num: '07', label: 'Key Takeaways', pg: 20 },
      { num: '08', label: 'About Gobiya', pg: 21 },
    ])
  );

  s.push(
    page(T, 3, `  <div class="kicker">Chapter 01</div>
  <h1 class="content-title">The Only Channel You Actually Own</h1>
  <hr class="rule-gold">
  <p>Most businesses that reach real scale don't get there on paid ads alone. Ads work — right up until you stop paying, at which point the leads stop the same day. You are renting demand, and the rent goes up every year.</p>
  <p>Organic search is different in one specific way: the asset is yours. A page that answers a real buyer question keeps answering it next month, next quarter, and next year, without a media budget behind it. That is the difference between renting demand and owning it.</p>
  <p class="stat-line">Paid traffic stops the day you stop paying. Organic traffic compounds.</p>
  <p>This guide is about building that owned demand deliberately, in stages, with a way to tell whether it's working at each step. It is not a promise that search replaces every other channel. It's a case that search should be the channel you build underneath the others, because it's the one that keeps working when budgets tighten.</p>`)
  );

  s.push(
    page(T, 4, `  <h2 class="content-title" style="font-size:17pt;">Why Most Growth Plans Stall</h2>
  <hr class="rule-gold">
  <p>Growth plans usually fail for one of four reasons, and none of them are about effort.</p>
${numbered([
      '<strong>No owned demand.</strong> Everything runs through paid channels, so growth is capped by the ad budget and margin gets squeezed as costs rise.',
      '<strong>Traffic without intent.</strong> The site attracts readers who were never going to buy, and the team celebrates a number that does not convert.',
      '<strong>A leaky site.</strong> Real buyers arrive and leave, because the page they landed on never asked them to do anything.',
      '<strong>No measurement.</strong> Nobody can say which half of the work produced the pipeline, so the next budget cycle cuts the wrong half.',
    ])}
  <p>Each stage in this guide is built to close one of those gaps in order. Skipping ahead is the most common mistake — content built on a site that cannot be crawled produces nothing, and conversion work on a page nobody visits improves a rate that applies to no one.</p>`)
  );

  s.push(
    page(T, 5, `  <div class="kicker">Chapter 02</div>
  <h1 class="content-title">The Math of Compounding Demand</h1>
  <hr class="rule-gold">
  <p>The reason search-led growth feels slow at first and fast later is that it compounds. Each page you publish can rank for far more than the one question you wrote it for, and each page that earns trust makes the next one easier to rank.</p>
  <p>Consider the difference in shape between the two models:</p>
${table(
      ['', 'Paid Acquisition', 'Search-Led Growth'],
      [
        ['Month 1', 'Leads arrive immediately', 'Little to no traffic'],
        ['Month 6', 'Same leads, higher cost per lead', 'Early pages start ranking'],
        ['Month 18', 'Costs keep climbing', 'Compounding, largely fixed cost'],
        ['If you stop', 'Leads stop that day', 'Pages keep producing for months'],
      ]
    )}
  <p>Neither column is wrong. The mistake is running only the first one for years and never building the second, so the business never develops demand it owns.</p>`)
  );

  s.push(
    page(T, 6, `  <h2 class="content-title" style="font-size:17pt;">Why the Curve Bends Upward</h2>
  <hr class="rule-gold">
  <p>Three effects stack on top of each other, and together they explain the shape of the curve.</p>
${numbered([
      '<strong>Coverage.</strong> A well-written page ranks for dozens of related searches, not just the one in the heading. Ten good pages can cover hundreds of real queries.',
      '<strong>Authority.</strong> As more sites reference yours, search engines and AI tools grow more confident recommending you. That confidence lifts every page at once, including the ones you published a year ago.',
      '<strong>Reuse.</strong> The research behind one strong page feeds the next. Your tenth page takes noticeably less effort than your first.',
    ])}
  <p>The practical consequence: the first ninety days will look disappointing next to a paid campaign, and the eighteenth month will not be close. Judge the work on leading indicators early — pages indexed, queries earning impressions, rankings improving — rather than on revenue in month two.</p>`)
  );

  s.push(
    page(T, 7, `  <h2 class="content-title" style="font-size:17pt;">The Cost of Waiting</h2>
  <hr class="rule-gold">
  <p>Because the returns compound, timing matters more than in channels with a linear payoff. A page published today has a year of compounding ahead of it. The same page published next summer does not.</p>
  <p>This is also the honest argument against waiting for a website redesign before starting. Redesigns slip. Meanwhile the questions your buyers are asking are being answered by a competitor, and the competitor is accumulating the authority that makes their next page rank faster than yours.</p>
  <p class="stat-line">The best time to start was a year ago. The second best time is before your next redesign, not after it.</p>
  <p>If your site has real technical problems, fix those first — Chapter 3 covers how to tell. But "our site is a little dated" is not a reason to delay publishing the pages your buyers are searching for.</p>`)
  );

  s.push(
    page(T, 8, `  <div class="kicker">Chapter 03</div>
  <h1 class="content-title">The Five Stages of Search-Led Growth</h1>
  <hr class="rule-gold">
  <p>Every business we've scaled through search moves through the same five stages, in the same order. The order matters: each stage assumes the one before it is done.</p>
${table(
      ['Stage', 'The Question It Answers', 'Typical Duration'],
      [
        ['1. Foundation', 'Can machines read and index the site at all?', '2–4 weeks'],
        ['2. Coverage', 'Do we have a page for every real buyer question?', '2–4 months'],
        ['3. Authority', 'Does anyone credible vouch for us?', 'Ongoing'],
        ['4. Conversion', 'Do visitors actually become leads?', '4–6 weeks'],
        ['5. Compounding', 'Can we repeat this predictably?', 'Ongoing'],
      ]
    )}
  <p>The next four pages take each stage in turn: what it means, what "done" looks like, and the failure mode that sends teams back a step.</p>`)
  );

  s.push(
    page(T, 9, `  <div class="phase-tag">Stage 01</div>
  <h1 class="platform-name">Foundation</h1>
  <hr class="rule-gold">
  <p>Before anything else, machines have to be able to reach your pages, read them, and understand what your business is. This stage is unglamorous and completely non-negotiable.</p>
  <p><strong>What done looks like:</strong> every page you care about is indexed, loads quickly on a phone, renders its main content without waiting on JavaScript, and carries structured data describing your business, services, and location.</p>
  <p><strong>The failure mode:</strong> publishing months of content onto a site that search engines cannot properly crawl. The work is real, the results are zero, and the team concludes that "SEO doesn't work for us."</p>
  <p>The cheapest way to avoid that outcome is to confirm indexation before you invest in content — not after.</p>`)
  );

  s.push(
    page(T, 10, `  <div class="phase-tag">Stage 02</div>
  <h1 class="platform-name">Coverage</h1>
  <hr class="rule-gold">
  <p>Coverage means having a genuinely useful page for each meaningful question your buyers ask, in the words they actually use.</p>
  <p>Start by writing down every question a prospect asks on a sales call. That list is your content plan, and it beats any keyword tool, because it comes from people who were actually considering buying.</p>
  <p><strong>What done looks like:</strong> a page for each core service, each location you serve, and each recurring buyer question — with each page answering its question directly, in the opening paragraph, before any preamble.</p>
  <p><strong>The failure mode:</strong> publishing high volumes of generic blog posts that rank for readers who will never buy. Ten pages aimed at buyers outperform a hundred aimed at nobody in particular.</p>`)
  );

  s.push(
    page(T, 11, `  <div class="phase-tag">Stage 03</div>
  <h1 class="platform-name">Authority</h1>
  <hr class="rule-gold">
  <p>Authority is the answer to a simple question a search engine or AI tool is always asking: does anyone credible vouch for this business?</p>
  <p>It accumulates through references you mostly cannot buy — other sites linking to yours because you published something worth citing, real reviews from real customers, an accurate and consistent business listing, and named authors with verifiable credentials.</p>
  <p><strong>What done looks like:</strong> your business name, address, and phone number match everywhere they appear online; reviews arrive steadily rather than in suspicious bursts; and at least a few respected industry sites reference your work.</p>
  <p><strong>The failure mode:</strong> buying links or reviews. Both are detectable, both get penalized, and recovering costs far more than the shortcut saved.</p>`)
  );

  s.push(
    page(T, 12, `  <div class="phase-tag">Stage 04 &amp; 05</div>
  <h1 class="platform-name">Conversion, Then Compounding</h1>
  <hr class="rule-gold">
  <p><strong>Conversion</strong> is where traffic turns into pipeline. A page that ranks first and converts nobody is a vanity asset. The fixes are usually unglamorous: state the offer plainly, put the phone number where a thumb can reach it, cut form fields to the ones you truly need, and answer the objection the buyer is already having.</p>
  <p><strong>Compounding</strong> is the stage most businesses never reach, because it requires treating search as an operating rhythm rather than a project. It means a standing cadence: publish, measure, refresh what's slipping, and expand what's working.</p>
  <p class="stat-line">The businesses that win aren't the ones that start. They're the ones that don't stop at month four.</p>
  <p>Stage 5 has no end date. That is the point.</p>`)
  );

  s.push(
    page(T, 13, `  <div class="kicker">Chapter 04</div>
  <h1 class="content-title">What to Measure at Each Stage</h1>
  <hr class="rule-gold">
  <p>The fastest way to lose faith in search is to measure the wrong thing at the wrong time. Revenue is the right final metric and a terrible early one — it lags the work by months.</p>
${table(
      ['Stage', 'Watch This', 'Ignore This For Now'],
      [
        ['Foundation', 'Pages indexed, crawl errors, mobile speed', 'Traffic, rankings'],
        ['Coverage', 'Queries earning impressions, pages published', 'Conversion rate'],
        ['Authority', 'Referring domains, review velocity', 'Day-to-day ranking wobble'],
        ['Conversion', 'Calls, forms, qualified leads', 'Raw sessions'],
        ['Compounding', 'Pipeline from organic, cost per lead', 'Vanity traffic totals'],
      ]
    )}
  <p>Match your metric to your stage and the work stays honest. Mismatch them and you will cut a program two months before it was going to pay off.</p>`)
  );

  s.push(
    page(T, 14, `  <h2 class="content-title" style="font-size:17pt;">The One Number That Matters Most</h2>
  <hr class="rule-gold">
  <p>If you track only one thing, track <strong>qualified leads from organic search per month</strong>. Not sessions. Not rankings. Not impressions.</p>
  <p>Sessions can double while revenue stays flat, if the extra visitors were never buyers. Rankings can improve on terms nobody searches. Qualified leads is the only number that connects the work to the business.</p>
  <p>To track it properly you need three things in place before you start: analytics that records form submissions and phone calls as conversions, a way to mark which leads were genuinely qualified, and the discipline to look at a rolling three-month average rather than reacting to a single bad week.</p>
  <p>Search results move around week to week for reasons that have nothing to do with your site. Three-month averages tell you the truth; weekly snapshots mostly tell you about noise.</p>`)
  );

  s.push(
    page(T, 15, `  <div class="kicker">Chapter 05</div>
  <h1 class="content-title">The Growth Self-Audit</h1>
  <hr class="rule-gold">
  <p>Run this against your own business today. Everything here is checkable in an afternoon, with no specialist tools.</p>
${checklist([
      'Search Google for <em>site:yourdomain.com</em> — does the count roughly match the number of pages you expect?',
      'Open your site on a phone over mobile data. Does the main content appear in under three seconds?',
      'Do you have a dedicated page for each core service, rather than one page listing all of them?',
      'Do you have a page for each city or region you actually serve?',
      'Write down the last ten questions a prospect asked on a sales call. Do you have a page answering each?',
      'Does your business name, address, and phone number match exactly across your site, Google Business Profile, and major directories?',
      'Is your phone number tappable on mobile, and visible without scrolling?',
      'Does your main contact form ask for more than four fields?',
    ])}`)
  );

  s.push(
    page(T, 16, `  <h2 class="content-title" style="font-size:17pt;">Reading Your Results</h2>
  <hr class="rule-gold">
  <p>Count the boxes you could not check honestly.</p>
${table(
      ['Unchecked', 'What It Means', 'Where to Start'],
      [
        ['0–1', 'Strong foundation', 'Move to coverage and authority'],
        ['2–3', 'Normal for a growing business', 'Fix these before publishing more'],
        ['4–5', 'Real leaks', 'Stop new content; repair first'],
        ['6+', 'Foundation problem', 'Full technical and structural review'],
      ]
    )}
  <p>The most common pattern we see: a business with strong service pages, no location pages, an unreadable mobile experience, and an eleven-field contact form. That business does not need more content. It needs the four fixes it already knows about.</p>`)
  );

  s.push(
    page(T, 17, `  <div class="kicker">Chapter 06</div>
  <h1 class="content-title">Your First 90 Days</h1>
  <hr class="rule-gold">
  <div class="phase-tag">Days 1–30 · Foundation</div>
  <p>Confirm every important page is indexed. Fix mobile speed on your top five pages. Add or correct structured data for your business, services, and locations. Claim and complete your Google Business Profile, and make sure the details match your site exactly.</p>
  <p>Do not publish new content this month. If the foundation is broken, new pages inherit the same problem.</p>
  <div class="phase-tag" style="margin-top:1em;">Days 31–60 · Coverage</div>
  <p>Write the sales-call question list. Build one page per core service and one per region you serve. Answer each page's core question in its opening paragraph, before any background.</p>`)
  );

  s.push(
    page(T, 18, `  <div class="phase-tag">Days 61–90 · Authority &amp; Conversion</div>
  <hr class="rule-gold">
  <p>Audit your business listings for consistency and fix every mismatch. Set up a simple, repeatable process for asking satisfied customers to leave a review — steady beats sudden. Publish one piece of genuinely original material: your own data, your own case study, something a competitor cannot copy.</p>
  <p>Then close the leaks. Cut your contact form to the fields you truly need. Make the phone number tappable and visible without scrolling. Add the two or three trust signals a buyer looks for in your industry — licenses, insurance, years in business, named team members.</p>
  <p><strong>At day 90, expect:</strong> a fully indexed site, meaningful page coverage, a cleaner conversion path, and early ranking movement. Expect leads to lag another 60 to 90 days behind that.</p>`)
  );

  s.push(
    page(T, 19, `  <h2 class="content-title" style="font-size:17pt;">What Happens After Day 90</h2>
  <hr class="rule-gold">
  <p>The plan above gets you to a working foundation. What turns that into scale is rhythm.</p>
${numbered([
      '<strong>Monthly:</strong> publish against the buyer-question list. Two strong pages beat eight weak ones.',
      '<strong>Quarterly:</strong> refresh your highest-value pages. Search results shift, and a page that ranked in January can slip by June without anyone noticing.',
      '<strong>Quarterly:</strong> re-run the self-audit in Chapter 5. Sites drift — redesigns break schema, plugins slow pages down, staff change the phone number in one place and not another.',
      '<strong>Continuously:</strong> keep asking for reviews and keep earning references. Authority is the slowest signal to build and the fastest to erode.',
    ])}
  <p>None of this is complicated. It is just consistent, and consistency is the part most businesses cannot sustain without someone owning it.</p>`)
  );

  s.push(
    page(T, 20, `  <div class="kicker">Chapter 07</div>
  <h1 class="content-title">Key Takeaways</h1>
  <hr class="rule-gold">
${numbered([
      'Paid demand is rented and stops the day you stop paying. Organic demand is owned and compounds. Build the second underneath the first.',
      'The five stages run in order — Foundation, Coverage, Authority, Conversion, Compounding — and skipping one wastes the work of the others.',
      'Match your metric to your stage. Judging month two on revenue is the most reliable way to kill a program that was about to work.',
      'If you track one number, track qualified leads from organic search, on a rolling three-month average.',
      'Ten pages written for buyers will out-earn a hundred written for traffic.',
      'The businesses that scale are not the ones that start. They are the ones still publishing at month twelve.',
    ])}`)
  );

  s.push(
    cta(T, 21, {
      heading: 'Build Demand You Own',
      blurb:
        'Gobiya helps small and medium businesses turn organic search into a predictable source of pipeline — the foundation, the coverage, the authority, and the conversion path covered in this guide. We have been doing it from Los Angeles since 2010.',
    })
  );

  return document_(meta.title, s);
}
