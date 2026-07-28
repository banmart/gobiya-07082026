import { page, cover, toc, cta, document_, numbered, table, checklist } from '../book-shell.mjs';

const T = 'Closing the Deal';

export const meta = {
  slug: 'closing-the-deal',
  out: 'closing-the-deal-cro.pdf',
  title: T,
};

export function build() {
  const s = [];

  s.push(
    cover({
      title: 'Closing<br>the Deal',
      tagline: 'Turning search traffic into booked revenue, one friction point at a time',
    })
  );

  s.push(
    toc([
      { num: '01', label: 'Traffic Was Never the Goal', pg: 3 },
      { num: '02', label: 'Reading Search Intent', pg: 5 },
      { num: '03', label: 'The Anatomy of a Page That Converts', pg: 8 },
      { num: '04', label: 'Forms, Calls, and Friction', pg: 11 },
      { num: '05', label: 'Trust Signals That Do the Work', pg: 14 },
      { num: '06', label: 'Measuring the Right Things', pg: 16 },
      { num: '07', label: 'The Conversion Audit', pg: 18 },
      { num: '08', label: 'Key Takeaways', pg: 20 },
      { num: '09', label: 'About Gobiya', pg: 21 },
    ])
  );

  s.push(
    page(T, 3, `  <div class="kicker">Chapter 01</div>
  <h1 class="content-title">Traffic Was Never the Goal</h1>
  <hr class="rule-gold">
  <p>Plenty of businesses have doubled their organic traffic and seen no change in revenue at all. It is one of the most demoralizing outcomes in marketing, and it is almost always caused by the same thing: the work optimized for visits instead of for customers.</p>
  <p>Traffic is a means. The goal is a booked job, a signed contract, a scheduled call. Every chapter here is about the distance between those two things.</p>
  <p class="stat-line">Doubling traffic to a page that converts nobody doubles nothing.</p>
  <p>The encouraging part is that conversion work is fast. Where search improvements take months to compound, removing friction from a form or making a phone number tappable can change results within days. If your site already has visitors, this is the highest-return work available to you.</p>`)
  );

  s.push(
    page(T, 4, `  <h2 class="content-title" style="font-size:17pt;">Where Deals Actually Leak</h2>
  <hr class="rule-gold">
  <p>Across the sites we audit, the same five leaks account for most of the lost revenue — and none of them require a redesign to fix.</p>
${numbered([
      '<strong>Intent mismatch.</strong> The page ranks for a question it does not really answer, so the visitor leaves within seconds.',
      '<strong>A buried offer.</strong> The visitor is ready, and cannot quickly work out what to do next or what it will cost.',
      '<strong>Form friction.</strong> Eleven fields, three of which feel intrusive, for what should be a simple enquiry.',
      '<strong>Missing trust.</strong> No licences, no real names, no reviews, nothing that says a competent human is behind the site.',
      '<strong>Mobile neglect.</strong> The page works on a laptop and fights the visitor on a phone, which is where most of them are.',
    ])}
  <p>Work through them in that order. Intent problems cap everything below them — perfecting a form on a page that attracts the wrong visitor improves nothing.</p>`)
  );

  s.push(
    page(T, 5, `  <div class="kicker">Chapter 02</div>
  <h1 class="content-title">Reading Search Intent</h1>
  <hr class="rule-gold">
  <p>Intent is what the person actually wants when they type the words. Two searches that look similar can want entirely different things, and a page that answers the wrong one will never convert however good it is.</p>
${table(
      ['Intent', 'The Search Looks Like', 'What the Page Must Do'],
      [
        ['Informational', '"why is my drain slow"', 'Answer plainly, build trust, offer help'],
        ['Comparison', '"best plumber in glendale"', 'Show proof, reviews, differences'],
        ['Transactional', '"emergency plumber near me"', 'Phone number, hours, book now'],
        ['Navigational', '"gobiya pricing"', 'Take them straight there'],
      ]
    )}
  <p>The most common and costly mistake is treating an informational search as a transactional one. Someone diagnosing a problem is not ready to buy, and a page that opens with a hard sell loses them immediately.</p>`)
  );

  s.push(
    page(T, 6, `  <h2 class="content-title" style="font-size:17pt;">How to Tell What a Page Should Be</h2>
  <hr class="rule-gold">
  <p>You do not have to guess. Search the term yourself and look at what already ranks — those results reflect what the search engine has learned that searchers want.</p>
${numbered([
      '<strong>If the results are mostly guides and articles,</strong> the intent is informational. A sales page will not rank there, however well written.',
      '<strong>If the results are mostly lists and comparisons,</strong> the searcher is evaluating options. Give them a real comparison, including where you are not the right fit.',
      '<strong>If the results are mostly service and product pages,</strong> the searcher is ready. Make the next step obvious and immediate.',
      '<strong>If the results are mixed,</strong> the intent is split. Build the page for the dominant type and serve the other with a clear link.',
    ])}
  <p>This five-minute check prevents the most expensive error in content: writing a genuinely good page of entirely the wrong kind.</p>`)
  );

  s.push(
    page(T, 7, `  <h2 class="content-title" style="font-size:17pt;">Matching the Offer to the Stage</h2>
  <hr class="rule-gold">
  <p>A visitor who is still diagnosing a problem will not book a consultation. But they will take something smaller, and that smaller step is how you stay in the conversation.</p>
${table(
      ['Visitor Stage', 'Wrong Ask', 'Right Ask'],
      [
        ['Just researching', 'Book a paid consultation', 'Read the guide, get the checklist'],
        ['Comparing options', 'Sign the contract', 'See pricing, view case studies'],
        ['Ready to act', 'Download a PDF', 'Call now, book a time'],
      ]
    )}
  <p>Each page should carry one primary action matched to its stage, plus at most one secondary option. Pages offering five equally weighted choices reliably produce fewer conversions than pages offering one clear one.</p>
  <p>When in doubt, ask what the visitor is realistically willing to do in the next sixty seconds, and ask for exactly that.</p>`)
  );

  s.push(
    page(T, 8, `  <div class="kicker">Chapter 03</div>
  <h1 class="content-title">The Anatomy of a Page That Converts</h1>
  <hr class="rule-gold">
  <p>High-converting pages are not clever. They are clear, and they are clear in a specific order.</p>
${numbered([
      '<strong>Say what this is, immediately.</strong> The visitor should know within five seconds what you do, who it is for, and where you do it.',
      '<strong>Answer the question they arrived with,</strong> in the first paragraph, before any company background.',
      '<strong>Show proof.</strong> Reviews, results, credentials, named people — evidence that you have done this before.',
      '<strong>Handle the obvious objection.</strong> Price, timeline, disruption, risk. The one they are already thinking about.',
      '<strong>Make the next step obvious,</strong> and repeat it where a reader would naturally be ready to take it.',
    ])}
  <p>Notice what is absent: company history, mission statements, and stock photography. None of them move a decision, and all of them push the useful content further down the page.</p>`)
  );

  s.push(
    page(T, 9, `  <h2 class="content-title" style="font-size:17pt;">The First Screen</h2>
  <hr class="rule-gold">
  <p>Most visitors decide whether to stay before scrolling. That first screen has to carry four things, and on a phone it has very little room to do it.</p>
${checklist([
      'A headline naming what you do and, for local businesses, where',
      'One line of supporting detail that answers "is this for me?"',
      'A visible, tappable primary action',
      'One immediate trust signal — a rating, a licence, years in business',
    ])}
  <p>The most common failure here is a large hero image with a vague slogan across it. It looks designed and communicates nothing. A visitor who cannot tell what you do will not scroll to find out.</p>
  <p>Test it honestly: open your page on a phone, and without scrolling, ask whether a stranger could say what you sell and where you operate.</p>`)
  );

  s.push(
    page(T, 10, `  <h2 class="content-title" style="font-size:17pt;">Writing That Converts</h2>
  <hr class="rule-gold">
  <p>The way you write changes the result as much as the layout does.</p>
${numbered([
      '<strong>Lead with the answer.</strong> Do not build up to it. Buyers skim, and so do the AI tools that increasingly summarize your page for them.',
      '<strong>Write to one person.</strong> "You" and "your" outperform "our clients" and "businesses like yours" consistently.',
      '<strong>Be specific.</strong> "Most jobs completed in one visit" beats "fast, reliable service" because it can be checked and remembered.',
      '<strong>Name the price, or the range, or why you cannot.</strong> Silence on price is read as expensive, and it is the single most common reason a visitor leaves for a competitor.',
      '<strong>Cut every sentence that would survive being deleted.</strong> Most first drafts lose a third with no loss of meaning.',
    ])}
  <p>Plain writing converts better and is easier for AI tools to quote — the same clarity serves both audiences.</p>`)
  );

  s.push(
    page(T, 11, `  <div class="kicker">Chapter 04</div>
  <h1 class="content-title">Forms, Calls, and Friction</h1>
  <hr class="rule-gold">
  <p>Every field you add costs you completions. Sometimes the trade is worth it. Usually nobody has checked.</p>
  <p>The honest question for each field is: will we genuinely refuse to follow up without this? If a salesperson would happily call a lead missing that detail, the field should not be there.</p>
${table(
      ['Field', 'Keep It?', 'Why'],
      [
        ['Name', 'Yes', 'Needed to reply at all'],
        ['Phone or email', 'One of them', 'Asking for both reduces completion'],
        ['What do you need?', 'Yes', 'Lets you qualify and route'],
        ['Company size', 'Rarely', 'Ask on the call instead'],
        ['Budget', 'No', 'Scares off good leads, invites bad answers'],
        ['How did you hear about us?', 'No', 'Your analytics already knows'],
      ]
    )}`)
  );

  s.push(
    page(T, 12, `  <h2 class="content-title" style="font-size:17pt;">The Phone Still Wins</h2>
  <hr class="rule-gold">
  <p>For most local and service businesses, the phone converts better than any form on the site — and it is routinely treated as an afterthought.</p>
${checklist([
      'The number appears in the header on every page',
      'On mobile it is a tappable link, not plain text or an image',
      'Your opening hours are stated near it, so nobody wonders',
      'Somebody actually answers during those hours',
      'Calls are tracked as conversions in your analytics',
      'If you cannot answer, a callback promise with a real timeframe is offered',
    ])}
  <p>That last point matters more than it looks. A missed call with no acknowledgement is a lost customer, and they rarely try twice. A visible "we return every call within an hour" recovers a meaningful share of them.</p>`)
  );

  s.push(
    page(T, 13, `  <h2 class="content-title" style="font-size:17pt;">Removing Friction You Cannot See</h2>
  <hr class="rule-gold">
  <p>Some friction is invisible from a desk. These are the ones we find most often, and each is quick to fix.</p>
${numbered([
      '<strong>A form that fails silently.</strong> Submissions go nowhere, or into a spam folder nobody checks. Test yours today, from a phone, using an outside email address.',
      '<strong>No confirmation after submitting.</strong> The visitor cannot tell whether it worked, so they either leave or submit again.',
      '<strong>Required fields that are not marked</strong> until an error appears on submission.',
      '<strong>A slow page on mobile data.</strong> Visitors leave before the form ever renders.',
      '<strong>Chat widgets covering the call button</strong> on small screens — a common and expensive overlap.',
    ])}
  <p>Fill in your own form once a month from a phone, on mobile data, as if you were a customer. It is the cheapest diagnostic in this book and it catches most of these.</p>`)
  );

  s.push(
    page(T, 14, `  <div class="kicker">Chapter 05</div>
  <h1 class="content-title">Trust Signals That Do the Work</h1>
  <hr class="rule-gold">
  <p>Visitors arriving from search have no relationship with you. Trust has to be established on the page, quickly, using evidence rather than adjectives.</p>
${table(
      ['Signal', 'Weak Version', 'Strong Version'],
      [
        ['Reviews', '"Our clients love us"', 'Real rating, real count, real names'],
        ['Experience', '"Industry leaders"', '"Serving Glendale since 2010"'],
        ['Credentials', '"Fully qualified"', 'Named licence and number'],
        ['Team', 'Stock photography', 'Real photographs and real names'],
        ['Results', '"Proven results"', 'A specific outcome for a named client'],
      ]
    )}
  <p>The pattern is consistent: anything checkable builds trust, anything unverifiable is discounted. Buyers have learned to skip past claims that could be written by anyone.</p>`)
  );

  s.push(
    page(T, 15, `  <h2 class="content-title" style="font-size:17pt;">Reviews as Infrastructure</h2>
  <hr class="rule-gold">
  <p>Reviews now serve three jobs at once: they persuade the visitor, they feed local search rankings, and they are one of the strongest signals AI tools use when deciding which business to recommend.</p>
  <p>That makes review generation infrastructure rather than a nice-to-have. It should be a routine, not a campaign.</p>
${numbered([
      '<strong>Ask every satisfied customer, at the moment they are satisfied.</strong> A week later the goodwill has faded.',
      '<strong>Make it one tap.</strong> A direct link, sent by text, outperforms every other method by a wide margin.',
      '<strong>Respond to all of them,</strong> including the critical ones. How you handle a complaint is read closely by people deciding whether to call.',
      '<strong>Aim for steady, not sudden.</strong> A trickle every week reads as genuine. Thirty in one afternoon reads as bought.',
    ])}`)
  );

  s.push(
    page(T, 16, `  <div class="kicker">Chapter 06</div>
  <h1 class="content-title">Measuring the Right Things</h1>
  <hr class="rule-gold">
  <p>You cannot improve conversion without measuring it, and most sites measure it badly — usually by counting the wrong event or by reacting to samples far too small to mean anything.</p>
  <p>Set up these four, in order, before optimizing anything:</p>
${numbered([
      '<strong>Form submissions</strong> recorded as a conversion, verified end to end by submitting one yourself.',
      '<strong>Phone calls</strong> tracked as conversions, including taps on mobile.',
      '<strong>Lead quality,</strong> marked somewhere — even a spreadsheet. Volume without quality misleads.',
      '<strong>Landing page,</strong> so you know which pages produce leads rather than merely visits.',
    ])}
  <p>Without the third, you can double your leads and halve your revenue while every dashboard shows improvement.</p>`)
  );

  s.push(
    page(T, 17, `  <h2 class="content-title" style="font-size:17pt;">Testing Without Fooling Yourself</h2>
  <hr class="rule-gold">
  <p>Most small-business conversion testing produces confident conclusions from meaningless data. Two rules prevent it.</p>
  <p><strong>Change one thing at a time.</strong> If you rewrite the headline, shorten the form, and move the button in one release, you learn nothing about which of them mattered.</p>
  <p><strong>Wait for enough data.</strong> A page with forty visitors a month cannot tell you anything reliable in a week. If your volumes are low, prefer changes that are obviously correct — a tappable phone number, a shorter form — over tests you cannot resolve.</p>
  <p class="stat-line">Below a few hundred conversions, trust judgement over tests.</p>
  <p>The fixes in this book are the obviously-correct kind. Make those first, then test refinements once you have the volume to read the result.</p>`)
  );

  s.push(
    page(T, 18, `  <div class="kicker">Chapter 07</div>
  <h1 class="content-title">The Conversion Audit</h1>
  <hr class="rule-gold">
  <p>Run this on your top three landing pages. Use a phone, on mobile data.</p>
${checklist([
      'Within five seconds, is it clear what you do and where you do it?',
      'Is the question the visitor searched for answered in the first paragraph?',
      'Is there one obvious primary action, visible without scrolling?',
      'Is the phone number tappable and present in the header?',
      'Does the form ask for four fields or fewer?',
      'Is there a real review, rating, or named credential on the page?',
      'Is price, or a price range, addressed somewhere?',
      'Does submitting the form produce a visible confirmation?',
      'Does the submission actually arrive in an inbox somebody reads?',
      'Does anything overlap or cover the call button on a small screen?',
    ])}`)
  );

  s.push(
    page(T, 19, `  <h2 class="content-title" style="font-size:17pt;">What to Fix First</h2>
  <hr class="rule-gold">
  <p>If you found several problems, this is the order that returns the most for the least effort.</p>
${table(
      ['Priority', 'Fix', 'Typical Effort'],
      [
        ['1', 'Broken form or untracked calls', 'An hour'],
        ['2', 'Tappable phone number in header', 'An hour'],
        ['3', 'Cut form fields to four or fewer', 'An hour'],
        ['4', 'Rewrite the first screen for clarity', 'Half a day'],
        ['5', 'Add real reviews and credentials', 'A few days'],
        ['6', 'Address price honestly', 'Half a day'],
      ]
    )}
  <p>The first three are usually a single afternoon, and between them they recover more revenue than most redesigns. Start there before commissioning anything larger.</p>`)
  );

  s.push(
    page(T, 20, `  <div class="kicker">Chapter 08</div>
  <h1 class="content-title">Key Takeaways</h1>
  <hr class="rule-gold">
${numbered([
      'Traffic is a means, not the goal. Doubling visits to a page that converts nobody doubles nothing.',
      'Match the page to the intent behind the search. A good page of the wrong type is the most expensive content mistake there is.',
      'Answer the visitor\'s question in the first paragraph. Company background belongs further down, if at all.',
      'Every form field costs completions. Keep the ones you would genuinely refuse to follow up without.',
      'For most service businesses the phone outperforms every form — make it tappable, staffed, and tracked.',
      'Trust comes from checkable evidence. Named people, real licences, real reviews, specific outcomes.',
      'Fix the obviously-correct things first. Save testing for when you have the volume to read a result.',
    ])}`)
  );

  s.push(
    cta(T, 21, {
      heading: 'Turn Visits Into Revenue',
      blurb:
        'Gobiya works on both halves of the problem — earning the right visitors from search, then removing the friction between their arrival and a booked job. If your traffic is healthy and your pipeline is not, that gap is usually fixable in weeks rather than quarters.',
    })
  );

  return document_(meta.title, s);
}
