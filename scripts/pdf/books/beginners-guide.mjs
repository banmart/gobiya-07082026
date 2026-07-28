import { page, cover, toc, cta, document_, numbered, table, checklist } from '../book-shell.mjs';

const T = "A Beginner's Guide to AI Search";

export const meta = {
  slug: 'beginners-guide',
  out: 'beginners-guide-to-ai-search.pdf',
  title: T,
};

export function build() {
  const s = [];

  s.push(
    cover({
      title: "A Beginner's<br>Guide to<br>AI Search",
      tagline: 'Plain-English answers to what changed, what matters, and what to do first',
    })
  );

  s.push(
    toc([
      { num: '01', label: 'What Actually Changed', pg: 3 },
      { num: '02', label: 'The Vocabulary, Decoded', pg: 5 },
      { num: '03', label: 'How AI Decides Who to Name', pg: 8 },
      { num: '04', label: 'The Five Fixes That Matter Most', pg: 11 },
      { num: '05', label: 'What You Can Safely Ignore', pg: 16 },
      { num: '06', label: 'Your First 30 Days', pg: 18 },
      { num: '07', label: 'Key Takeaways', pg: 20 },
      { num: '08', label: 'About Gobiya', pg: 21 },
    ])
  );

  s.push(
    page(T, 3, `  <div class="kicker">Chapter 01</div>
  <h1 class="content-title">What Actually Changed</h1>
  <hr class="rule-gold">
  <p>For twenty-five years, searching meant typing a few words and getting a list of links. You picked one, and the business behind it got a visitor.</p>
  <p>Now a growing share of people ask a full question in plain language and get a written answer back — often with two or three businesses named inside it. They may never see a list of links at all.</p>
  <p class="stat-line">Either your business is named in that answer, or it isn't. There is no page two.</p>
  <p>That is the whole change, and it is worth being precise about what it does and does not mean. It does not mean websites stopped mattering — AI tools build those answers by reading websites. It does mean the way you get chosen has shifted, from ranking on a list to being the source an answer is built from.</p>`)
  );

  s.push(
    page(T, 4, `  <h2 class="content-title" style="font-size:17pt;">The Good News First</h2>
  <hr class="rule-gold">
  <p>If you have been putting this off because it sounds like a whole new discipline, here is the reassuring part: most of what earns AI citations is what already earned good rankings.</p>
${numbered([
      '<strong>A site machines can read.</strong> Same requirement as always, now with less tolerance for pages that only work after JavaScript runs.',
      '<strong>Clear, direct answers.</strong> Always good for readers. Now essential, because a model has to be able to lift a self-contained answer from your page.',
      '<strong>Verifiable facts about your business.</strong> Consistent name, address, hours, credentials. Already important for local search.',
      '<strong>Genuine trust signals.</strong> Real reviews, real authors, real references from other sites.',
    ])}
  <p>There is no separate AI strategy that ignores these. What changes is emphasis: clarity and verifiability now matter more than they did, and clever keyword tactics matter less.</p>`)
  );

  s.push(
    page(T, 5, `  <div class="kicker">Chapter 02</div>
  <h1 class="content-title">The Vocabulary, Decoded</h1>
  <hr class="rule-gold">
  <p>The industry has generated an unhelpful number of acronyms for closely related ideas. Here is what each actually means, so you can follow a conversation without pretending.</p>
${table(
      ['Term', 'Stands For', 'What It Actually Means'],
      [
        ['SEO', 'Search Engine Optimization', 'Getting found in traditional search results'],
        ['GEO', 'Generative Engine Optimization', 'Getting cited inside AI-written answers'],
        ['AEO', 'Answer Engine Optimization', 'Much the same as GEO, different vendor'],
        ['AIO', 'AI Overviews', 'Google\'s AI answer above the normal results'],
        ['LLMO', 'Large Language Model Optimization', 'Again largely the same idea'],
      ]
    )}
  <p>If it seems as though several of those describe the same work, that is because they largely do. Different agencies coined different labels for overlapping practice. Do not let the vocabulary convince you there are five separate projects to buy.</p>`)
  );

  s.push(
    page(T, 6, `  <h2 class="content-title" style="font-size:17pt;">Who Are the Players?</h2>
  <hr class="rule-gold">
  <p>Five tools account for most AI answers your customers will see, and they do not behave identically.</p>
${table(
      ['Tool', 'Where It Gets Information', 'Worth Knowing'],
      [
        ['Google AI Overviews', 'Google index and Knowledge Graph', 'Favours pages already ranking well'],
        ['ChatGPT', 'Bing index plus live web', 'Names fewer sources, so each matters more'],
        ['Perplexity', 'Its own live crawl', 'Cites generously, updates quickly'],
        ['Gemini', 'Google index', 'Leans on structured data and profiles'],
        ['Claude', 'Live web search', 'Prefers clear, well-organized sources'],
      ]
    )}
  <p>You do not need a separate plan for each. Work that makes your site clear and verifiable helps with all of them, because they are solving fundamentally the same problem.</p>`)
  );

  s.push(
    page(T, 7, `  <h2 class="content-title" style="font-size:17pt;">A Word About "AI Visibility" Claims</h2>
  <hr class="rule-gold">
  <p>You will be sold tools and reports promising a precise measurement of your AI visibility. Be a careful buyer, because parts of this genuinely cannot be measured yet.</p>
${numbered([
      '<strong>Countable:</strong> visits arriving from an AI tool. These carry a referrer, and your analytics can count them exactly.',
      '<strong>Sampleable:</strong> how often an AI names you. Real, but measured by asking the same questions repeatedly and recording results — a survey, not a census.',
      '<strong>Not measurable:</strong> total times your brand appeared in an AI answer across all platforms. Nobody reports this. Any figure is modeled.',
    ])}
  <p>A tool that distinguishes clearly between those three is worth paying for. One that presents a single confident number for all of them is selling certainty it does not have.</p>`)
  );

  s.push(
    page(T, 8, `  <div class="kicker">Chapter 03</div>
  <h1 class="content-title">How AI Decides Who to Name</h1>
  <hr class="rule-gold">
  <p>These tools do not read the whole internet for every question. They search an index for passages that match, hand a few of them to the model, and ask it to write an answer with sources attached.</p>
  <p>To be one of those sources, your page has to clear three gates in order.</p>
${numbered([
      '<strong>Retrieval —</strong> your page has to be crawled and indexed at all. A page that only appears after JavaScript runs can look blank to the bot.',
      '<strong>Extraction —</strong> the model has to find a clear, self-contained answer it can lift. Long wind-ups get skipped for a competitor\'s plainer paragraph.',
      '<strong>Attribution —</strong> the model decides whether it trusts your page enough to name you, rather than absorbing the fact without credit.',
    ])}
  <p>Most businesses that struggle here fail at the first or second gate, not the third. That is encouraging, because those two are the most fixable.</p>`)
  );

  s.push(
    page(T, 9, `  <h2 class="content-title" style="font-size:17pt;">What Makes a Passage Quotable</h2>
  <hr class="rule-gold">
  <p>The single highest-return habit in AI search: answer the question in the first two sentences under the heading, in a way that would still make sense quoted on its own.</p>
  <p>Compare these two openings for a page about response times.</p>
${table(
      ['Hard to quote', 'Easy to quote'],
      [
        [
          'For over two decades our dedicated team has been proud to serve the greater Los Angeles area with a commitment to excellence…',
          'Most emergency calls in Glendale are answered within 90 minutes. Standard appointments are usually available within two days.',
        ],
      ]
    )}
  <p>The second can be lifted directly into an answer and still make sense. The first cannot be lifted at all, because it says nothing specific. Both are on real websites today; only one gets cited.</p>`)
  );

  s.push(
    page(T, 10, `  <h2 class="content-title" style="font-size:17pt;">Why Trust Decides the Tie</h2>
  <hr class="rule-gold">
  <p>When several pages answer a question equally well, the tie is broken on trust — and trust is assembled from things a machine can check.</p>
${checklist([
      'Your business name, address, and phone number match everywhere they appear',
      'Real people are named as authors, with real credentials',
      'Reviews are genuine, recent, and arriving steadily',
      'Other credible sites reference yours',
      'Facts on your site do not contradict each other page to page',
      'Claims are specific enough to be verified',
    ])}
  <p>None of that is exotic. It is the same evidence a careful human buyer looks for — which is unsurprising, since these tools are trained on how humans judge credibility.</p>`)
  );

  s.push(
    page(T, 11, `  <div class="kicker">Chapter 04</div>
  <h1 class="content-title">The Five Fixes That Matter Most</h1>
  <hr class="rule-gold">
  <p>If you do nothing else from this guide, do these five, in this order. They account for most of the available improvement for a typical small or medium business.</p>
${numbered([
      '<strong>Make sure your content is in the raw HTML.</strong>',
      '<strong>Answer questions directly, at the top.</strong>',
      '<strong>Add structured data describing your business.</strong>',
      '<strong>Make your facts consistent everywhere.</strong>',
      '<strong>Publish something only you could publish.</strong>',
    ])}
  <p>The next four pages take each in turn: how to check it, and what good looks like.</p>`)
  );

  s.push(
    page(T, 12, `  <div class="phase-tag">Fix 01</div>
  <h1 class="platform-name">Content in the Raw HTML</h1>
  <hr class="rule-gold">
  <p>Several AI crawlers do not run JavaScript. If your text is assembled in the browser after the page loads, those crawlers see an empty page — even though it looks perfect to you.</p>
  <p><strong>How to check, in thirty seconds:</strong> open your page, right-click, choose "View Page Source", and use Ctrl-F to search that raw source for a sentence from your main content.</p>
  <p><strong>If it is there:</strong> you are fine. Move on to the next fix.</p>
  <p><strong>If it is not:</strong> this is your highest priority, ahead of everything else in this book. Nothing else you do matters if the content is invisible. Ask whoever maintains your site about server-side rendering or static generation.</p>`)
  );

  s.push(
    page(T, 13, `  <div class="phase-tag">Fix 02</div>
  <h1 class="platform-name">Answer Directly, at the Top</h1>
  <hr class="rule-gold">
  <p>Under each heading, answer that heading's question in the first two sentences. Then elaborate. This one habit does more for AI citation than any technical change.</p>
  <p><strong>What to do:</strong> take your ten most important pages. For each, read the first paragraph and ask whether it answers the question the page is about. Most will not — they will open with company background.</p>
  <p><strong>Rewrite them so the answer comes first.</strong> The background can stay, further down, where it belongs.</p>
  <p>A useful test: if someone read only your opening paragraph, would they have their answer? If yes, an AI tool can quote it. If no, it will quote whoever did this properly.</p>`)
  );

  s.push(
    page(T, 14, `  <div class="phase-tag">Fix 03</div>
  <h1 class="platform-name">Structured Data</h1>
  <hr class="rule-gold">
  <p>Structured data is a small block of machine-readable facts in your page's code, stating plainly what the page is: this is a business, here is the address, these are the hours, this person wrote this.</p>
  <p>Visitors never see it. Machines rely on it heavily, because it removes guesswork.</p>
  <p><strong>Where to start,</strong> in order of return:</p>
${numbered([
      '<strong>Organization</strong> on your home page — who you are.',
      '<strong>LocalBusiness</strong> on location pages — address, hours, area served.',
      '<strong>Service</strong> on service pages — what you actually do.',
      '<strong>FAQPage</strong> anywhere you have real questions and answers.',
    ])}
  <p>One rule above all: it must match what is visible on the page. Mismatches get the markup ignored, or worse.</p>`)
  );

  s.push(
    page(T, 15, `  <div class="phase-tag">Fixes 04 &amp; 05</div>
  <h1 class="platform-name">Consistency, Then Originality</h1>
  <hr class="rule-gold">
  <p><strong>Consistency.</strong> Your business name, address, and phone number must match exactly across your website, Google Business Profile, and every directory listing you have. "Suite 200" in one place and "Ste 200" in another reads as two different businesses to a machine, and inconsistency directly reduces confidence in naming you.</p>
  <p>Spend an afternoon finding every listing and making them identical. It is dull and it is one of the highest-return hours available to you.</p>
  <p><strong>Originality.</strong> Publish at least one thing a competitor cannot copy: your own data, your own case study with real numbers, your own analysis of something you actually measured.</p>
  <p class="stat-line">AI tools cite original sources. Everything else is a summary of someone else's work.</p>`)
  );

  s.push(
    page(T, 16, `  <div class="kicker">Chapter 05</div>
  <h1 class="content-title">What You Can Safely Ignore</h1>
  <hr class="rule-gold">
  <p>A lot of advice in this space is noise, and some of it is actively expensive. These are the ones we are asked about most.</p>
${numbered([
      '<strong>Keyword density.</strong> Writing naturally about a subject covers the words you need. Deliberately repeating a phrase reads badly to humans and buys nothing with machines.',
      '<strong>Publishing volume for its own sake.</strong> Ten pages aimed at real buyer questions outperform a hundred written to hit a quota.',
      '<strong>Chasing a perfect speed score.</strong> Get your main content loading quickly on a phone; the last few points rarely change what anyone experiences.',
      '<strong>Special "AI-only" files sold as a shortcut.</strong> Some are harmless and mildly useful. None substitute for the five fixes in Chapter 4.',
      '<strong>Any tool promising guaranteed AI rankings.</strong> Nobody can guarantee this. The answer is generated fresh each time.',
    ])}`)
  );

  s.push(
    page(T, 17, `  <h2 class="content-title" style="font-size:17pt;">Questions Worth Asking a Vendor</h2>
  <hr class="rule-gold">
  <p>If you are considering hiring help, these five questions separate a serious partner from a confident one.</p>
${checklist([
      '"Which of the numbers in your report are counted, and which are estimated?"',
      '"Can you show me a page you fixed, and what specifically changed?"',
      '"How will we know in 90 days whether this is working?"',
      '"What would you tell me not to bother with?"',
      '"Who actually does the work, and can I speak with them?"',
    ])}
  <p>The fourth question is the most revealing. Anyone who says everything matters equally either has not done this often, or is selling by the hour.</p>`)
  );

  s.push(
    page(T, 18, `  <div class="kicker">Chapter 06</div>
  <h1 class="content-title">Your First 30 Days</h1>
  <hr class="rule-gold">
  <div class="phase-tag">Week 1 · Find Out Where You Stand</div>
  <p>Run the raw-HTML check on your three most important pages. Search your business name in ChatGPT and in Google, and write down what comes back. Search <em>site:yourdomain.com</em> and see whether the page count looks right. You are not fixing anything yet — you are establishing a baseline you can compare against later.</p>
  <div class="phase-tag" style="margin-top:1em;">Week 2 · Fix the Foundation</div>
  <p>If the raw-HTML check failed, this is the whole week's work and it is worth it. If it passed, spend the time on structured data for your home page, service pages, and location pages instead.</p>`)
  );

  s.push(
    page(T, 19, `  <div class="phase-tag">Week 3 · Rewrite the Openings</div>
  <hr class="rule-gold">
  <p>Take your ten most important pages and rewrite the first paragraph of each so it answers the page's question directly. Keep the company background — move it down. This is the highest-return writing work available to you, and it typically takes a single focused day.</p>
  <div class="phase-tag" style="margin-top:1em;">Week 4 · Consistency and Proof</div>
  <p>Find every listing of your business online and make the details identical. Then set up a simple, repeatable way to ask satisfied customers for a review.</p>
  <p><strong>At 30 days you will have:</strong> content machines can read, pages that answer directly, structured data describing your business, consistent facts everywhere, and a review habit. That is the foundation. Expect visible change over the following two to three months, not immediately.</p>`)
  );

  s.push(
    page(T, 20, `  <div class="kicker">Chapter 07</div>
  <h1 class="content-title">Key Takeaways</h1>
  <hr class="rule-gold">
${numbered([
      'People increasingly get an answer instead of a list of links. Either you are named in it or you are not.',
      'Most of what earns AI citations is what already earned good rankings — with more weight on clarity and verifiability.',
      'GEO, AEO, AIO and LLMO largely describe the same work. Do not buy four projects.',
      'Check that your content exists in the raw HTML. If it does not, nothing else matters until it does.',
      'Answer the question in the first two sentences under each heading. It is the single highest-return habit.',
      'Make your business facts identical everywhere, and publish at least one thing only you could publish.',
      'Be skeptical of any single confident number for AI visibility. Ask which parts are counted and which are modeled.',
    ])}`)
  );

  s.push(
    cta(T, 21, {
      heading: 'Start Where It Counts',
      blurb:
        'Gobiya helps small and medium businesses get found, cited, and chosen — by search engines and by the AI tools a growing share of customers ask first. If you want a second opinion on where your site actually stands, that is where every engagement starts.',
    })
  );

  return document_(meta.title, s);
}
