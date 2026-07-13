export const INSIGHTS = [
  {
    slug: 'what-is-generative-engine-optimization',
    date: '2026-07-09',
    category: 'AI Visibility',
    title: 'What Is Generative Engine Optimization (GEO)? The Complete Guide',
    dek: 'GEO is the practice of structuring content so ChatGPT, Perplexity, and Google AI Overviews cite it directly. Here’s what it actually involves, how AI engines find your content in the first place, and how it differs from a Knowledge Graph entry.',
    metaDescription:
      'What is Generative Engine Optimization (GEO)? A complete guide to how AI search engines crawl and cite content, how GEO differs from Knowledge Graph optimization, and the techniques that earn citations.',
    readTime: '9 min read',
    answer: '<a href="/services/geo-ai-content-writing">Generative Engine Optimization (GEO)</a> is the practice of structuring content so that generative AI systems — ChatGPT, Perplexity, Google AI Overviews, and similar tools — extract, quote, or cite it directly when answering a user’s question, rather than optimizing purely to rank in a list of blue links. It rests on the same foundation as traditional SEO: a page still has to be crawlable, indexable, and credible. What changes is the target output. Instead of earning a click from a ranked result, GEO aims to be the source an AI model actually pulls from and names when it generates an answer.',
    body: [
      {
        heading: 'Generative Engine Optimization, defined properly',
        paragraphs: [
          'Generative Engine Optimization is the discipline of engineering content so it gets selected, extracted, and cited by AI systems that generate answers rather than return a list of links. The term covers the same broad set of platforms: ChatGPT and its web-browsing mode, Perplexity, Google’s AI Overviews and AI Mode, and Microsoft Copilot. Each sources and weighs content a little differently, but all of them share the same basic mechanic — they retrieve candidate pages, extract the passages that best answer the query, and generate a response that either quotes or paraphrases those passages, frequently with a citation link back to the source.',
          'That mechanic is why GEO isn’t really a new field built from nothing. It’s the same underlying requirement search engines have always had — find, understand, and trust a piece of content — pointed at a different final output. A page that’s already technically sound and genuinely authoritative is most of the way to being GEO-ready. What GEO adds is a layer of structure and specificity on top of that foundation, aimed squarely at how these systems extract and quote text rather than how they rank a URL.',
        ],
      },
      {
        heading: 'How AI search engines find, crawl, and render your content',
        paragraphs: [
          'Before an AI system can cite anything, it has to be able to fetch and read the page — and this is the step that quietly disqualifies more sites than any content problem does. Most AI crawlers, including OpenAI’s GPTBot and Google’s existing Googlebot infrastructure that feeds AI Overviews, fetch raw HTML the same way a traditional search crawler does. If your content only appears after client-side JavaScript renders it, and the crawler doesn’t execute that JavaScript, it sees an empty shell — no text to extract, no answer to cite, regardless of how good the finished page looks in a browser.',
          'This is a bigger issue for GEO than it is for traditional SEO in one specific way: Google has years of infrastructure for rendering JavaScript-heavy pages before indexing them, but AI crawlers built by other companies are often more limited, more budget-constrained, or simply newer and less forgiving. <a href="/services/seo-discoverability">Server-side rendering or static generation</a> — serving full HTML on first response rather than an empty div that JavaScript fills in later — is the single highest-leverage technical fix for AI visibility, because it removes the risk entirely rather than hoping a given crawler happens to render your page correctly.',
          'Robots.txt rules matter here too, and they’re easy to get wrong in the AI era. Blocking GPTBot or other AI user agents in robots.txt is a legitimate choice if you don’t want your content used to train or feed AI answers, but it’s sometimes done accidentally through an overly broad rule meant to block a different bot — quietly removing a site from AI visibility entirely without anyone noticing until traffic patterns shift.',
        ],
      },
      {
        heading: 'Knowledge Graph optimization vs. GEO',
        paragraphs: [
          'These two get confused constantly because they both involve appearing in an AI-adjacent surface, but they’re different disciplines solving different problems. Knowledge Graph optimization is about getting an entity — a company, a person, a product — correctly recognized and represented in Google’s structured Knowledge Graph, the database behind Knowledge Panels and some of the factual answers Google surfaces directly. It relies heavily on structured data (Organization and Person schema), consistent entity signals across the web (Wikipedia, Wikidata, consistent NAP data, authoritative mentions), and is fundamentally about identity — making sure Google knows who or what you are and connects the right facts to that identity.',
          'GEO is about content, not identity — see <a href="/insights/seo-vs-geo">SEO vs. GEO</a> for a fuller breakdown of what that distinction actually changes. It’s the practice of structuring the actual prose on a page — the explanations, the direct answers, the supporting detail — so a generative AI system extracts and quotes it when answering a question related to your topic. You can have strong Knowledge Graph presence and weak GEO performance, or the reverse: a well-known entity whose blog content never gets cited, or an unknown brand whose specific, well-structured article on a niche question gets quoted constantly. They reinforce each other — a recognized entity carries more trust weight that helps its content get cited — but optimizing one doesn’t automatically fix the other.',
        ],
      },
      {
        heading: 'The techniques that actually earn AI citations',
        paragraphs: [
          'Lead with the direct answer. AI systems extract text more reliably when a clear, complete answer appears within the first few sentences of a section, rather than after several paragraphs of scene-setting. This is the single biggest structural difference from traditional SEO copywriting, which often builds toward a conclusion; GEO content states the conclusion first and uses the rest of the section to support it.',
          'Structure content around the exact questions people ask. AI queries tend to be phrased as full natural-language questions rather than short keyword strings. Content organized around explicit questions — as H2 or H3 headings, in FAQ sections, or as a direct restatement of the question at the top of a section — maps much more directly onto how these systems match a user’s prompt to a passage worth quoting.',
          'Be specific, not generic. Vague, marketing-toned claims are exactly the kind of content generative models tend to paraphrase loosely or skip in favor of a more concrete competing source. Specific numbers, named examples, clear step-by-step processes, and original data give a model something precise enough to quote directly and attribute confidently.',
          'Keep the technical and authority foundation solid. None of the above matters if the page isn’t crawlable, isn’t indexed, or comes from a domain with no demonstrated expertise or trust signal. AI systems lean on largely the same underlying quality signals traditional search ranking does — they’re just applying them to a citation decision instead of a ranking position.',
        ],
      },
      {
        heading: 'How to actually measure GEO performance',
        paragraphs: [
          'Rank trackers don’t capture this. Measuring GEO means running the actual prompts your buyers would type — into ChatGPT, into Perplexity, into a Google AI Overview-triggering search — and recording whether your brand or content gets cited, paraphrased, or ignored entirely. See <a href="/insights/get-cited-by-chatgpt-perplexity-ai-overviews">how to get cited by ChatGPT, Perplexity, and Google AI Overviews</a> for how each platform actually sources its answers. Some of this can be semi-automated with citation-tracking tools now on the market, but manually testing a core set of 15-20 real buyer questions on a monthly cadence is a reasonable starting point for most businesses and costs nothing but time.',
          'Track it as a distinct metric from organic traffic and rankings, not a replacement for them. A page can rank poorly in a traditional sense while still getting cited reasonably often in AI answers, or vice versa — the two surfaces respond to overlapping but not identical signals, and conflating them in reporting hides which lever actually needs attention.',
        ],
      },
    ],
    takeaways: [
      'GEO structures content to be cited or quoted by AI systems like ChatGPT, Perplexity, and Google AI Overviews — it’s additive to SEO, not a replacement for it.',
      'A page has to be crawlable and render as real HTML before anything else matters — client-side-only JavaScript is the most common reason AI crawlers see nothing to cite.',
      'Knowledge Graph optimization is about entity identity (who you are); GEO is about content structure (what gets quoted) — they reinforce each other but aren’t the same discipline.',
      'The highest-leverage GEO technique is leading with a direct, specific answer in the first few sentences of a section, rather than building toward a conclusion.',
      'Measuring GEO means manually testing real buyer prompts against AI platforms — rank trackers don’t capture citation performance at all.',
    ],
    faqs: [
      { q: 'Do I need separate content for GEO, or can I optimize what I already have?', a: 'Usually the latter — most underperforming pages already contain the right underlying information and mainly need restructuring: a direct answer moved to the top of the relevant section, clearer headings phrased as questions, and more specific detail in place of generic claims. Full rewrites are typically only necessary where the underlying content is genuinely thin.' },
      { q: 'Is GEO only relevant for informational content, or does it matter for service and product pages too?', a: 'It matters for both. Someone asking an AI assistant to shortlist vendors, compare service providers, or explain what a service actually includes is a GEO-relevant moment just as much as someone asking a how-to question — service pages that answer likely buyer questions directly and specifically are just as citable as blog content.' },
      { q: 'How does GEO relate to Knowledge Graph optimization if I’m starting from scratch?', a: 'They’re worth pursuing in parallel rather than sequentially — Knowledge Graph work (structured data, consistent entity signals, authoritative mentions) builds the trust and identity layer, while GEO work on your actual content determines whether that trust translates into being quoted when someone asks a relevant question.' },
    ],
    relatedHref: '/services/geo-ai-content-writing',
    relatedLabel: 'GEO & AI Content Writing',
  },
  {
    slug: 'why-did-my-website-traffic-drop',
    date: '2026-07-08',
    category: 'Algorithm Recovery',
    title: 'Why Did My Website Traffic Drop? A Google Algorithm Update Diagnostic',
    dek: 'A step-by-step way to tell whether a traffic drop is a Google algorithm update, a manual action, or a technical break — and what to check first.',
    metaDescription:
      'Website traffic dropped suddenly? Here’s how to diagnose whether it’s a Google algorithm update, a manual action, or a technical issue, and what to do about each.',
    readTime: '7 min read',
    answer: 'A sudden traffic drop is almost always one of three things: a technical break (a page returning errors, a robots.txt change, an accidental noindex tag), a Google algorithmic update that reassessed your content or site quality, or a manual action tied to a specific policy violation. Check Google Search Console first — a manual action shows up there explicitly. If there’s no manual action notice, compare the exact date of your drop against known Google update rollout dates before assuming anything else.',
    body: [
      {
        heading: 'Rule out a technical break first',
        paragraphs: [
          'Before assuming an algorithm did this, check the boring explanations — they cause more “mystery” traffic drops than any Google update. Confirm the site is actually loading, that a recent deploy didn’t add a stray <code>noindex</code> tag or block crawling in <code>robots.txt</code>, and that Google Search Console isn’t showing a spike in crawl or indexing errors — this is exactly the kind of <a href="/services/seo-discoverability">technical SEO</a> audit worth running first.',
          'A single mistyped line in a robots.txt file or a CMS plugin update that quietly disallows indexing can look identical to an algorithmic penalty from the outside — traffic falls off a cliff — but the fix is a one-line correction, not a content strategy overhaul. <a href="/work/quickpass-aid">QuickPass AiD’s technical foundation rebuild</a> is what fixing indexation issues at the root actually looks like.',
        ],
      },
      {
        heading: 'Check for a manual action',
        paragraphs: [
          'Log into Google Search Console and check the Manual Actions report under Security & Manual Actions. If Google has taken direct action against your site for a specific policy violation — unnatural links, thin content, cloaking — it will be listed there explicitly, with a stated reason.',
          'A manual action is the clearest possible diagnosis, because Google tells you exactly what triggered it. The fix is equally specific: remediate the violation — often a <a href="/insights/toxic-backlinks-disavow-guide">toxic backlink profile</a> that needs disavowing — document what changed, and file a reconsideration request.',
        ],
      },
      {
        heading: 'Match the drop date to a known algorithm update',
        paragraphs: [
          'If there’s no manual action, the next step is timing. Pull the exact date traffic started falling in Google Analytics or Search Console, then check that date against Google’s publicly confirmed core update and spam update rollout windows.',
          'Algorithmic drops tend to have a signature: they hit broad categories of pages at once — usually thin or low-differentiation content — rather than a single URL, and they often coincide almost exactly with a rollout window rather than trailing off gradually over an unrelated period.',
        ],
      },
      {
        heading: 'What algorithmic updates are actually looking for',
        paragraphs: [
          'Google’s core updates broadly reassess content quality, expertise, and user experience signals across the site — they’re not targeting one specific tactic the way a spam update does. Pages most likely to lose ground share a few traits: thin or generic content that doesn’t add anything beyond what’s already ranking, weak demonstration of real expertise or firsthand experience, and content that seems built primarily to attract search traffic rather than to serve a reader.',
          'That means recovery isn’t about finding one broken thing to fix. It’s about genuinely improving the pages that lost visibility — often by consolidating thin content, adding real depth and specificity, and strengthening the trust signals (author credentials, citations, clear sourcing) around it.',
        ],
      },
      {
        heading: 'How long recovery actually takes',
        paragraphs: [
          'Manual action recovery can move within weeks of a successful reconsideration request, since it’s a direct human review. Algorithmic recovery is slower and less predictable — Google needs to recrawl and reprocess the affected pages, and improvements sometimes only show up when the next update of the same type rolls out, which can be months later.',
          'That’s frustrating to hear when revenue is on the line, but it’s the honest timeline. Anyone promising a guaranteed fast algorithmic recovery is either overpromising or describing a manual action fix, not an algorithmic one.',
        ],
      },
    ],
    takeaways: [
      'Rule out technical breaks (robots.txt, noindex tags, crawl errors) before assuming it’s algorithmic.',
      'Check Google Search Console’s Manual Actions report — it will name the exact violation if one exists.',
      'Compare your drop date against confirmed Google update rollout windows to test the algorithmic theory.',
      'Algorithmic drops usually hit broad page categories at once, not a single URL.',
      'Manual action recovery can move in weeks; algorithmic recovery typically takes months.',
    ],
    faqs: [
      { q: 'Can a traffic drop happen without any Google update or manual action?', a: 'Yes — seasonality, a competitor outranking you with better content, a tracking/analytics misconfiguration, or a shift in how a SERP feature (like an AI Overview) displays results can all reduce clicks without any change on your end at all. Always verify the drop is real in a second data source before diagnosing further.' },
      { q: 'Should we disavow links immediately if we suspect a penalty?', a: 'Not immediately, and not without an audit. Disavowing links you don’t need to disavow can remove links that were actually helping you, and disavowing isn’t typically the fix for an algorithmic core update drop at all — it’s specifically for manual actions or clear negative-SEO link spam.' },
      { q: 'Is it worth hiring someone to diagnose this, or can I do it myself?', a: 'A careful business owner can absolutely check Search Console for manual actions and compare dates against public update timelines. Where professional diagnosis earns its cost is in accurately separating overlapping causes — a technical issue and an algorithmic dip that happened to occur around the same time look identical from the outside but require completely different fixes.' },
    ],
    relatedHref: '/outcomes/recovery',
    relatedLabel: 'Google Penalty Recovery',
  },

  {
    slug: 'seo-vs-geo',
    date: '2026-07-08',
    category: 'AI Visibility',
    title: 'SEO vs. GEO: What Generative Engine Optimization Actually Means',
    dek: 'GEO isn’t a replacement for SEO — it’s the layer on top of it that determines whether AI systems quote you directly instead of just linking to you.',
    metaDescription:
      'What is GEO (Generative Engine Optimization) and how is it different from SEO? A clear breakdown of what changes, what stays the same, and whether you need a separate strategy.',
    readTime: '6 min read',
    answer: 'GEO, or Generative Engine Optimization, is the practice of structuring content so AI systems like ChatGPT, Perplexity, and Google AI Overviews will quote or cite it directly in a generated answer — rather than optimizing purely for a ranked list of blue links, which is what traditional SEO targets. GEO builds on the same technical and authority foundation as SEO; it doesn’t replace it. A site with weak crawlability or thin authority will struggle to be cited by AI for largely the same reasons it struggles to rank in Google.',
    body: [
      {
        heading: 'Where the term GEO comes from',
        paragraphs: [
          'Generative Engine Optimization entered common use as AI-generated answers — ChatGPT responses, Google AI Overviews, Perplexity results — started replacing a meaningful share of traditional search clicks. For the full picture of what the term covers, see our <a href="/insights/what-is-generative-engine-optimization">complete guide to GEO</a>. Researchers and marketers needed a term for the specific practice of optimizing to be the source an AI model draws from and cites, as distinct from optimizing to rank in a list of organic links.',
          'It’s a genuinely new discipline in the sense that the target output is different — a paraphrased or quoted answer instead of a clicked link — but it isn’t a new field built from scratch.',
        ],
      },
      {
        heading: 'What actually changes between SEO and GEO',
        paragraphs: [
          'The biggest shift is in content structure. AI systems extract and quote direct, well-structured answers — a clear claim, close to the top of the content, backed by specific supporting detail. Traditional SEO copy is often written to build a narrative toward a ranking-friendly conclusion; GEO content puts the direct answer first and builds supporting depth after it.',
          'The second shift is measurement. SEO is typically measured by rankings and organic sessions. GEO adds a new metric: citation appearances — whether your brand or content actually gets referenced when someone runs a relevant prompt through ChatGPT, Perplexity, or an AI Overview. That requires <a href="/insights/get-cited-by-chatgpt-perplexity-ai-overviews">actively testing prompts</a>, not just checking a rank tracker.',
        ],
      },
      {
        heading: 'What stays exactly the same',
        paragraphs: [
          'AI systems still rely heavily on the same underlying signals that drive organic rankings: whether a crawler can actually read and render your page, whether the content demonstrates real expertise and trustworthiness, and whether the site has the kind of authority — backlinks, citations, consistent entity signals — that make it a credible source to cite in the first place.',
          'A site with broken server-side rendering, thin content, or a spammy backlink profile is unlikely to be cited by AI for essentially the same reasons it’s unlikely to rank well in Google. GEO doesn’t bypass that foundation; it depends on it.',
        ],
      },
      {
        heading: 'Do you need a separate GEO strategy?',
        paragraphs: [
          'Not a separate strategy so much as an added layer on your existing one. If your <a href="/services/seo-discoverability">technical SEO</a> and content strategy are already solid, <a href="/services/geo-ai-content-writing">GEO work</a> is largely about restructuring key pages — clearer direct answers, explicit FAQ sections, cleaner schema — and then actively monitoring AI citation appearances the way you’d monitor rankings.',
          'If your technical foundation isn’t solid yet, that’s the higher-leverage place to start, since it constrains both your SEO and your GEO outcomes equally.',
        ],
      },
    ],
    takeaways: [
      'GEO optimizes for being quoted or cited in an AI-generated answer, not just ranked in a list of links.',
      'GEO content leads with a direct, extractable answer instead of building toward a conclusion.',
      'AI systems still depend on the same crawlability, expertise, and authority signals that drive traditional rankings.',
      'A weak technical or authority foundation limits GEO performance the same way it limits SEO performance.',
      'Measuring GEO requires actively testing real prompts against ChatGPT, Perplexity, and AI Overviews, not just rank tracking.',
    ],
    faqs: [
      { q: 'Will GEO eventually replace SEO entirely?', a: 'Unlikely in the foreseeable future — traditional search with ranked links is still a massive share of how people find information, and AI answer engines themselves still rely on the same crawlable, indexed web that SEO has always targeted. GEO is additive, not a replacement.' },
      { q: 'How do I know if I’m already being cited by AI platforms?', a: 'Run your brand name and your core topics as prompts directly in ChatGPT, Perplexity, and Google AI Overviews, and see what comes back. If a competitor appears instead of you, that gap is your starting point.' },
      { q: 'Does GEO require rewriting all of our existing content?', a: 'Usually not entirely — most underperforming pages already have the right underlying information and just need restructuring around a direct, extractable answer near the top, with cleaner formatting. Full rewrites are typically only needed where the underlying content itself is thin.' },
    ],
    relatedHref: '/ai-visibility',
    relatedLabel: 'AI Visibility',
  },

  {
    slug: 'get-cited-by-chatgpt-perplexity-ai-overviews',
    date: '2026-07-08',
    category: 'AI Visibility',
    title: 'How to Get Cited by ChatGPT, Perplexity, and Google AI Overviews',
    dek: 'Each AI platform sources answers differently. Here’s what each one actually checks before it cites a page — and the content formats that earn citations most reliably.',
    metaDescription:
      'How does content get cited by ChatGPT, Perplexity, and Google AI Overviews? A breakdown of how each platform sources answers and the content formats that earn citations.',
    readTime: '8 min read',
    answer: 'To be cited by AI platforms, a page needs to be crawlable and indexed, structured around a direct and extractable answer near the top of the content, backed by clear expertise or sourcing signals, and reinforced by the kind of backlink and citation profile that signals trustworthiness — the same fundamentals covered in our <a href="/insights/what-is-generative-engine-optimization">complete guide to Generative Engine Optimization</a>. Perplexity and AI Overviews draw primarily from indexed, crawlable web content matched to the query; ChatGPT’s browsing mode does the same when it searches live, while its base training data reflects broader web presence over time.',
    body: [
      {
        heading: 'How each platform actually sources its answers',
        paragraphs: [
          'Google AI Overviews pulls from Google’s existing index, generating a synthesized answer from a small set of pages it already considers authoritative and relevant for that query — meaning your normal organic ranking signals are directly relevant here.',
          'Perplexity is built entirely around live citation: it runs a real-time search, retrieves a set of pages, and generates an answer with explicit source links. Visibility is close to binary — either your page gets pulled into that retrieval set and cited, or it’s invisible for that query.',
          'ChatGPT cites sources when its browsing feature is active for a query — recommendations, comparisons, current-events questions — pulling from live search results in a similar way to Perplexity. Outside of active browsing, its responses are shaped by patterns learned from training data, which rewards broad, sustained web presence and citation over time rather than a single optimized page.',
        ],
      },
      {
        heading: 'The technical baseline: get found and read at all',
        paragraphs: [
          'None of this works if a crawler can’t fetch and render your page. Client-side-only JavaScript rendering that delivers a blank page to a bot, blocked crawl paths, or slow, unindexed pages remove you from consideration before content quality is even evaluated.',
          'This is the same technical foundation <a href="/services/seo-discoverability">traditional SEO</a> depends on — server-side rendering or static generation, clean crawl access, and fast load times aren’t GEO-specific tactics, they’re prerequisites GEO inherits directly from SEO. For more on where the two disciplines actually diverge, see <a href="/insights/seo-vs-geo">SEO vs. GEO</a>.',
        ],
      },
      {
        heading: 'Structure content the way these systems extract it',
        paragraphs: [
          'Lead with a direct, specific answer to the likely query — a clear claim in the first sentence or two, not three paragraphs of scene-setting before the actual answer arrives. AI systems tend to extract the passage that most directly and concisely answers the implied question.',
          'Follow the direct answer with genuine supporting depth: specifics, numbers, examples, and reasoning that a generic competitor page wouldn’t have. This is also what separates content that gets cited once from content that gets cited repeatedly across many related queries.',
          'Explicit FAQ sections, comparison tables, and clearly labeled step-by-step processes are formats these systems parse and extract especially well, because the structure itself signals exactly what question each piece of content answers.',
        ],
      },
      {
        heading: 'Build the trust signals that back the content up',
        paragraphs: [
          'Author credentials, clear sourcing and citations within your own content, and a genuine backlink and mention profile from credible sites all factor into whether a system treats your page as a trustworthy source worth citing, not just a technically well-structured one.',
          'This is where GEO and traditional <a href="/services/authority-link-building">authority building</a> overlap almost entirely — editorial backlinks and consistent citations that build Google trust are largely the same signals that build AI-citation trust.',
        ],
      },
      {
        heading: 'How to actually check whether it’s working',
        paragraphs: [
          'Run your target prompts — the real questions your buyers would ask, not just your brand name — through ChatGPT, Perplexity, and Google AI Overviews on a recurring basis, and track whether your content appears, whether a competitor appears instead, and how the citation is framed.',
          'This kind of monitoring is the GEO equivalent of rank tracking, and it’s the only reliable way to know whether structural and authority changes are actually moving the needle. <a href="/work/medicine-metta">Medicine Metta was restructured specifically for AI-answer citation</a> — a concrete example of what that work looks like applied to a real site.',
        ],
      },
    ],
    takeaways: [
      'AI Overviews and Perplexity draw heavily from live, indexed, crawlable content — the same technical foundation as SEO.',
      'ChatGPT cites sources directly when browsing is active; otherwise its answers reflect broader training-data web presence.',
      'Lead content with a direct, specific answer before adding supporting depth.',
      'FAQ sections, comparison tables, and step-by-step formats are extracted and cited especially reliably.',
      'Author credentials, sourcing, and a genuine backlink profile all factor into whether a system treats a page as trustworthy enough to cite.',
      'Track citation appearances by running real target prompts on a recurring basis — it’s the GEO equivalent of rank tracking.',
    ],
    faqs: [
      { q: 'Can I optimize specifically for one AI platform over the others?', a: 'To a limited degree — Perplexity rewards live crawlability and freshness particularly heavily, for instance — but the underlying work overlaps so much across platforms that optimizing broadly for extractable, well-sourced, technically sound content improves visibility across all of them rather than requiring separate strategies.' },
      { q: 'Does paying for ads or being a big brand guarantee AI citations?', a: 'No — citation is based on the retrieval and relevance systems each platform uses, not paid placement. A smaller, well-structured, genuinely authoritative page on a specific topic can out-cite a much bigger brand’s thinner, less specific content.' },
      { q: 'How often should we check whether we’re being cited?', a: 'Monthly is a reasonable baseline for most businesses, though a business actively investing in GEO work should check more frequently right after major content or technical changes to see whether they moved the needle.' },
    ],
    relatedHref: '/services/geo-ai-content-writing',
    relatedLabel: 'GEO & AI Content Writing',
  },

  {
    slug: 'google-business-profile-seo-checklist',
    date: '2026-07-08',
    category: 'Local SEO',
    title: 'Google Business Profile SEO: The Complete Local Ranking Checklist',
    dek: 'Map pack visibility comes down to a specific, checkable set of factors — category selection, review signals, and citation consistency chief among them.',
    metaDescription:
      'A complete Google Business Profile SEO checklist: category selection, review strategy, citation consistency, and the common mistakes that quietly suppress local rankings.',
    readTime: '7 min read',
    answer: 'Google Business Profile ranking in the <a href="/industries/local-service">local map pack</a> is driven primarily by relevance (category and description match to the search), distance from the searcher, and prominence (review volume, review recency, citation consistency, and overall web authority). The highest-leverage fixes for most underperforming profiles are correcting the primary category, closing gaps in profile completeness, and building a consistent flow of recent, responded-to reviews.',
    body: [
      {
        heading: 'Get the fundamentals genuinely complete',
        paragraphs: [
          'A profile with the business name, address, phone, hours, website, and a real description filled in accurately and completely is table stakes — Google explicitly favors complete profiles over partial ones. This includes precise service area settings for businesses that travel to customers rather than a single fixed location.',
          'It’s worth auditing this even on an older, seemingly established listing — profiles accumulate small inconsistencies over time (an outdated phone number, stale hours) that quietly erode trust signals without any obvious warning.',
        ],
      },
      {
        heading: 'Category selection matters more than most owners realize',
        paragraphs: [
          'The primary category is one of the strongest relevance signals Google uses to match a profile to a search. A business that self-selects a broad or slightly incorrect category — a general "Contractor" instead of the more specific "Kitchen Remodeler" — can lose meaningful visibility on the exact searches it most wants to win.',
          'Secondary categories are worth using deliberately too, to capture adjacent searches, but the primary category should be the single most precise match available for the core service.',
        ],
      },
      {
        heading: 'Reviews: volume, recency, and response all count',
        paragraphs: [
          'Review count and average rating matter, but recency matters nearly as much — a profile with fifty reviews from three years ago and nothing since sends a weaker freshness signal than a profile with steady, recent review flow, even at a lower total count.',
          'Responding to reviews, positive and negative, is a signal Google explicitly considers and — separately — a real trust signal to the human reading the profile before deciding whether to call.',
        ],
      },
      {
        heading: 'Photos and posts keep the profile active',
        paragraphs: [
          'Regularly added, genuine photos (not just stock imagery) and periodic Google Posts contribute to the ongoing activity signal Google associates with a legitimate, currently operating business, and they directly improve how the profile converts once someone views it. <a href="/work/american-livescan">American Livescan’s Google Business Profile rebuild</a> turned that activity signal directly into a 3x increase in online bookings.',
        ],
      },
      {
        heading: 'Common mistakes that quietly suppress rankings',
        paragraphs: [
          'Inconsistent <a href="/services/authority-link-building">NAP (name, address, phone) data</a> across directories — a slightly different phone number on Yelp, an old suite number on Facebook — undermines the trust signal Google is trying to verify. Keyword-stuffing the business name field is against Google’s guidelines and risks suspension, not just a ranking penalty. And duplicate listings, often created accidentally during a move or rebrand, split review volume and confuse both Google and searchers.',
        ],
      },
    ],
    takeaways: [
      'Local ranking is driven by relevance (category match), distance, and prominence (reviews, citations, authority).',
      'Primary category selection is one of the highest-leverage, most commonly misconfigured settings on a profile.',
      'Review recency matters nearly as much as total review count.',
      'Responding to reviews is both a ranking signal and a real conversion factor.',
      'Inconsistent NAP data across directories and duplicate listings are the two most common silent rank-suppressors.',
    ],
    faqs: [
      { q: 'How many reviews do we need to rank well?', a: 'There’s no fixed threshold — it’s relative to your local competitors. The more useful benchmark is checking review count and recency against the businesses currently ranking above you for your target searches, and closing that specific gap.' },
      { q: 'Can we change our primary category without losing our current ranking?', a: 'A category correction can cause short-term ranking fluctuation while Google reprocesses the profile, but if the previous category was genuinely a poor match, a correction almost always improves relevance-driven visibility once it settles, typically within a few weeks.' },
      { q: 'Do Google Posts actually affect rankings, or just engagement?', a: 'Their direct ranking impact is modest, but they contribute to the overall activity and completeness signal, and — more importantly — they directly influence conversion once a searcher is already viewing the profile.' },
    ],
    relatedHref: '/industries/local-service',
    relatedLabel: 'Local Service Business',
  },

  {
    slug: 'core-web-vitals-2026',
    date: '2026-07-08',
    category: 'Technical SEO',
    title: 'Core Web Vitals in 2026: What Actually Affects Rankings',
    dek: 'LCP, INP, and CLS are the three metrics Google measures — here’s what each one means, what commonly breaks them, and how much they really move rankings.',
    metaDescription:
      'Core Web Vitals explained: what LCP, INP, and CLS actually measure, the most common causes of failing scores, and how much they really affect Google rankings.',
    readTime: '6 min read',
    answer: 'Core Web Vitals are three specific performance metrics Google uses as a <a href="/outcomes/rankings">ranking signal</a>: Largest Contentful Paint (LCP, how fast the main content loads), Interaction to Next Paint (INP, how responsive the page feels to a click or tap), and Cumulative Layout Shift (CLS, how much the layout jumps around while loading). They function as a modest ranking signal on their own, but a poor score usually indicates deeper technical issues that hurt crawlability and user experience more broadly — which is where the real ranking damage happens.',
    body: [
      {
        heading: 'The three metrics, explained plainly',
        paragraphs: [
          '<strong>Largest Contentful Paint (LCP)</strong> measures how long it takes for the largest visible element — usually a hero image or headline block — to render. Google’s threshold for “good” is under 2.5 seconds.',
          '<strong>Interaction to Next Paint (INP)</strong> measures how quickly the page responds after a user clicks, taps, or types — essentially, whether the interface feels laggy. It replaced First Input Delay (FID) as the official responsiveness metric, and it’s a stricter, more holistic measurement across the full page lifecycle rather than just the first interaction.',
          '<strong>Cumulative Layout Shift (CLS)</strong> measures unexpected visual movement — an image loading in and pushing text down after a user has already started reading it, for example. It’s scored on a unitless scale where lower is better.',
        ],
      },
      {
        heading: 'What typically causes each one to fail',
        paragraphs: [
          'LCP problems usually trace back to unoptimized images, render-blocking JavaScript or CSS, or slow server response times — often compounded on sites still relying on a heavy plugin stack or an unoptimized CMS theme.',
          'INP issues most often come from excessive or poorly optimized JavaScript running on the main thread, third-party scripts (chat widgets, ad tags, analytics tools) competing for processing time, and components that re-render more than necessary in response to a simple interaction.',
          'CLS problems are almost always missing size attributes on images and embeds, web fonts swapping in and shifting text after the page has already rendered, or content — banners, cookie notices — injecting into the layout after initial load without reserved space.',
        ],
      },
      {
        heading: 'How much this actually moves rankings',
        paragraphs: [
          'Core Web Vitals are one input among many in Google’s ranking systems, and by Google’s own repeated statements, a relatively modest one on their own — they’re more of a tie-breaker between otherwise comparable pages than a dominant ranking factor.',
          'The bigger practical risk isn’t the direct ranking penalty — it’s what a poor score usually indicates: a site architecture that’s also likely struggling with crawl efficiency, mobile usability, and conversion rate, since slow, janky pages perform worse on every one of those dimensions simultaneously, not just search rankings.',
        ],
      },
      {
        heading: 'Where to actually check your scores',
        paragraphs: [
          'Google Search Console’s Core Web Vitals report shows real-world field data collected from actual visitors (CrUX), which is what Google’s ranking systems use — this is different from a lab test like Lighthouse, which simulates a single load under controlled conditions and can show a materially different result.',
          'Field data is the one that matters for ranking purposes; lab data is more useful for diagnosing and debugging specific issues during development.',
        ],
      },
    ],
    takeaways: [
      'LCP measures load speed, INP measures interactivity, and CLS measures visual stability.',
      'INP replaced FID as the official responsiveness metric and measures the full page lifecycle, not just the first click.',
      'Unoptimized images and render-blocking scripts are the most common LCP problem; excess JavaScript is the most common INP problem.',
      'Core Web Vitals are a modest direct ranking signal, but poor scores usually indicate broader technical issues with larger performance and conversion impact.',
      'Use Search Console’s field data (CrUX), not just a Lighthouse lab test, to see what Google actually measures for ranking.',
    ],
    faqs: [
      { q: 'Is it worth chasing a perfect Core Web Vitals score?', a: 'Diminishing returns set in past the “good” threshold — the jump from failing to passing matters far more than the jump from passing to a perfect score, both for ranking and for actual user experience.' },
      { q: 'Why does my site pass in Lighthouse but fail in Search Console?', a: 'Lighthouse is a lab test run once, under simulated conditions; Search Console’s Core Web Vitals report uses real field data collected from actual visitors across different devices, connections, and locations, which almost always tells a more accurate and often less flattering story.' },
      { q: 'Can a WordPress site pass Core Web Vitals, or do we need a rebuild?', a: 'A well-optimized WordPress site can pass, but it typically requires disciplined plugin management, image optimization, and caching configuration that most default setups don’t have — for sites that have tried and plateaued, a move to a framework like <a href="/services/web-app-development">Next.js with server-side rendering</a> is often the more durable fix.' },
    ],
    relatedHref: '/services/seo-discoverability',
    relatedLabel: 'SEO & Discoverability',
  },

  {
    slug: 'how-much-does-seo-cost',
    date: '2026-07-08',
    category: 'Pricing & Strategy',
    title: 'How Much Does SEO Cost? A Realistic Pricing Breakdown',
    dek: 'SEO pricing ranges widely because the work itself varies widely. Here’s what actually drives cost up or down, and how to evaluate an offer that looks too cheap.',
    metaDescription:
      'How much does SEO cost? A realistic breakdown of monthly retainer, project-based, and hourly pricing models, what drives cost, and red flags in cheap SEO offers.',
    readTime: '6 min read',
    answer: 'Most professional SEO services run as a monthly retainer, typically ranging from roughly $1,500 to $10,000+ per month depending on competitiveness, scope, and market, though project-based pricing (for a technical audit or site rebuild) and hourly consulting are also common. Price is driven primarily by competitiveness of the target keywords, the technical condition of the existing site, and how much content and link-building work is required — not by a fixed formula based on business size alone.',
    body: [
      {
        heading: 'The three common pricing models',
        paragraphs: [
          '<strong>Monthly retainers</strong> are the most common model for ongoing SEO, covering continuous technical monitoring, content production, and link building. They range widely — a local service business in a low-competition market might be well served in the low thousands per month, while a competitive national or B2B campaign can run well into five figures monthly.',
          '<strong>Project-based pricing</strong> fits scoped, one-time work — a technical audit, a site migration, a full rebuild — priced against the defined deliverable rather than ongoing hours.',
          '<strong>Hourly consulting</strong> suits businesses that want strategic guidance or a second opinion without handing over execution, though it’s less common for full-service engagements since SEO work benefits from continuity a pure hourly arrangement doesn’t naturally provide.',
        ],
      },
      {
        heading: 'What actually drives the price up or down',
        paragraphs: [
          'Keyword and market competitiveness is the single biggest driver — ranking a local plumber for “plumber near me” and ranking a SaaS company for a competitive B2B software category require dramatically different amounts of content and authority-building work.',
          'The starting technical condition of the site matters too: a site with a solid technical foundation needs comparably less initial investment than one requiring a significant rebuild or migration before content and authority work can even be effective.',
          'Scope is the third lever — how many pages, how much new content, how aggressive the link-building and digital PR component is — and it’s the one most directly negotiable based on budget and priority.',
        ],
      },
      {
        heading: 'Red flags in a cheap SEO offer',
        paragraphs: [
          'A guaranteed #1 ranking is not something any legitimate agency can actually promise, since no outside party controls Google’s algorithm — this is one of the clearest signals of a low-quality offer.',
          'Extremely low flat-rate pricing (a few hundred dollars a month for “full SEO”) usually means either automated, low-effort tactics, or bulk low-quality link building that risks a future penalty rather than building durable rankings.',
          'Vague reporting — rankings for obscure, low-value keywords with no connection to actual traffic or leads — is often used to paper over a lack of real progress on metrics that matter to the business.',
        ],
      },
      {
        heading: 'Evaluating ROI instead of just cost',
        paragraphs: [
          'The right comparison isn’t agency cost against agency cost — it’s cost against the value of what SEO actually returns for your specific business: <a href="/outcomes/sales">cost per lead</a> relative to other channels, and the compounding nature of <a href="/outcomes/traffic">organic traffic</a> that doesn’t require paying for the same click twice, the way <a href="/services/google-ads-ppc">paid ads</a> do.',
          'A more expensive engagement that reliably produces qualified leads at a lower blended cost per acquisition than your current channels is a better investment than a cheaper one that never moves the needle on real business metrics. <a href="/work/remodel-me-pros">Remodel Me Pros cut cost per lead by 61%</a> — the kind of number that actually settles the cost-versus-value question.',
        ],
      },
    ],
    takeaways: [
      'Monthly retainers are the most common SEO pricing model, typically ranging from roughly $1,500 to $10,000+ depending on competitiveness and scope.',
      'Keyword competitiveness is the single biggest driver of price, followed by the site’s starting technical condition.',
      'A guaranteed #1 ranking is a clear red flag — no outside party controls Google’s algorithm.',
      'Very low flat-rate pricing often signals automated tactics or risky bulk link building.',
      'Evaluate SEO against cost per qualified lead relative to other channels, not against agency price alone.',
    ],
    faqs: [
      { q: 'Is a cheaper agency ever the right call?', a: 'For a very low-competition local market with a modest scope of work, a lower-cost engagement can be entirely appropriate — the key is matching price to realistic scope and competitiveness, not assuming cheaper is always worse or more expensive is always better.' },
      { q: 'How soon should we expect to see ROI from paid SEO work?', a: 'Meaningful movement typically takes three to six months depending on competitiveness and starting point, since SEO is a compounding channel rather than an instant one — anyone promising significant results within a few weeks is likely describing paid ads, not organic SEO.' },
      { q: 'Should we pay for SEO and Google Ads at the same time?', a: 'Often yes, especially early on — paid ads can generate leads immediately while SEO compounds over months, and the two channels can share keyword and landing page insights that improve both.' },
    ],
    relatedHref: '/outcomes/sales',
    relatedLabel: 'Sales',
  },

  {
    slug: 'dental-seo-rank-your-practice',
    date: '2026-07-08',
    category: 'Healthcare & Dental SEO',
    title: 'Dental SEO: How to Rank Your Practice on Google',
    dek: 'Dental SEO runs on the same fundamentals as local SEO, plus a trust layer patients specifically look for before booking a provider.',
    metaDescription:
      'Dental SEO guide: how to rank your dental practice on Google, optimize Google Business Profile for multiple providers, and build the content and reviews patients trust.',
    readTime: '7 min read',
    answer: 'Dental practices rank primarily through the same local SEO fundamentals as any local business — an optimized Google Business Profile, consistent citations, and a fast, mobile-friendly website — plus a stronger emphasis on trust signals specific to healthcare decisions: provider credentials, patient-question content, and a steady flow of recent, genuine reviews. Multi-provider practices need deliberate structuring so individual dentist profiles reinforce rather than compete with the main practice listing.',
    body: [
      {
        heading: 'Why dental SEO carries a higher trust bar',
        paragraphs: [
          'Choosing a dentist is a higher-stakes trust decision than most local searches — it involves someone’s health, often some anxiety, and a longer relationship than a one-time service call. Patients research more before booking, which means the content and signals that build confidence matter more here than for, say, a locksmith or a landscaper.',
          'That shows up directly in what wins: practices with clear provider credentials, genuine patient reviews, and content that actually answers pre-appointment questions consistently outperform practices with a generic, templated web presence — even when both have similar technical SEO. See <a href="/work/smile-center-dentistry">how this played out for Smile Center Dentistry</a>, a 5x increase in patient inquiries after a technical rebuild and local search overhaul.',
        ],
      },
      {
        heading: 'Structure Google Business Profiles for multiple providers correctly',
        paragraphs: [
          'A practice with several dentists needs a deliberate structure: individual provider listings or pages, correctly scoped local business schema, and <a href="/insights/google-business-profile-seo-checklist">Google Business Profile management</a> that avoids the providers effectively competing against each other in local search results instead of against actual outside competitors.',
          'Done poorly, this fragmentation splits review volume and search visibility across multiple weak listings instead of concentrating it behind one strong, well-optimized practice profile.',
        ],
      },
      {
        heading: 'Write content around what patients actually ask before booking',
        paragraphs: [
          'The highest-value dental content answers specific pre-appointment questions directly: what a procedure actually involves, what it costs or what insurance typically covers, what recovery looks like, and how to know if a symptom needs urgent attention versus a routine visit.',
          'This content serves two purposes simultaneously — it captures real, high-intent search volume, and increasingly, it’s the exact kind of content AI answer engines pull from when someone asks a health-adjacent question through ChatGPT or an AI Overview instead of typing it into Google directly.',
        ],
      },
      {
        heading: 'Reviews and compliance, together',
        paragraphs: [
          'Review volume and recency are strong <a href="/services/authority-link-building">local ranking</a> signals, but healthcare marketing carries real compliance considerations — incentivized reviews, and testimonials that imply a guaranteed outcome, can create genuine exposure. A sustainable review process asks satisfied patients to share their experience without steering the content of what they say or offering anything in exchange for a positive review specifically.',
        ],
      },
    ],
    takeaways: [
      'Dental SEO runs on standard local SEO fundamentals, with a heavier weight on trust signals specific to healthcare decisions.',
      'Multi-provider practices need deliberately structured listings so dentists reinforce, not compete with, the main practice profile.',
      'Content answering real pre-appointment questions — cost, procedure, recovery — captures both search traffic and AI-answer citations.',
      'Review generation should stay clear of incentivization or outcome-guarantee language to avoid healthcare marketing compliance risk.',
    ],
    faqs: [
      { q: 'Do we need a separate page for every procedure we offer?', a: 'For procedures with real, distinct search demand — implants, Invisalign, cosmetic dentistry — yes, a dedicated page performs better than folding everything into one general services page. For less-searched procedures, a strong general page is usually sufficient.' },
      { q: 'How do we handle SEO for a practice with multiple locations?', a: 'Each location needs its own genuinely distinct, locally-relevant page and its own Google Business Profile — thin, duplicated location pages across a multi-location practice can actively hurt rankings rather than help them.' },
      { q: 'Can new patient reviews really move the needle that much?', a: 'Yes — for a trust-driven decision like choosing a dentist, review recency and volume are among the strongest signals both to Google’s local ranking algorithm and to the patient deciding whether to book, often outweighing small differences in website polish.' },
    ],
    relatedHref: '/industries/healthcare',
    relatedLabel: 'Healthcare & Dental',
  },

  {
    slug: 'toxic-backlinks-disavow-guide',
    date: '2026-07-08',
    category: 'Authority & Links',
    title: 'Toxic Backlinks: How to Identify and Disavow Bad Links',
    dek: 'Not every low-quality link needs to be disavowed. Here’s how to tell which ones are actually a risk, and how to build a disavow file correctly.',
    metaDescription:
      'How to identify toxic backlinks and use Google’s disavow tool correctly: what makes a link risky, how to audit your backlink profile, and when disavowing isn’t necessary.',
    readTime: '6 min read',
    answer: 'A toxic backlink is one that Google is likely to view as manipulative rather than editorially earned — typically from link farms, private blog networks (PBNs), sites with no topical relevance and clearly commercial link-selling intent, or sites that appear to exist purely to host outbound links. Most sites accumulate some low-quality links naturally and don’t need to disavow anything; disavowing is generally reserved for sites with a manual action for unnatural links, or clear evidence of a negative SEO attack — see <a href="/outcomes/recovery">Google penalty recovery</a> for how that process actually runs.',
    body: [
      {
        heading: 'What actually makes a backlink toxic',
        paragraphs: [
          'The core test is editorial intent: would a genuine reader plausibly find this link useful, on a page that exists for reasons other than selling or manipulating links? Links from link farms, private blog networks built specifically to pass authority, or sites with obvious paid-link marketplaces fail that test clearly.',
          'Other red flags include links from sites with no topical relevance whatsoever to your business, unnatural anchor text patterns (the same exact-match commercial keyword phrase repeated across many links), and a sudden, unexplained spike in backlinks from low-quality domains — often a sign of either a bad past link-building campaign or a negative SEO attack from a competitor.',
        ],
      },
      {
        heading: 'How to audit a backlink profile',
        paragraphs: [
          'Start with a full backlink export from Google Search Console (which shows what Google itself has indexed) alongside a third-party tool for broader coverage, since no single source captures every link. Sort by domain authority and relevance, and flag domains that are clearly link farms, expired-domain PBNs, or completely unrelated to your industry.',
          'Look for patterns rather than judging links one at a time — a handful of unrelated links from years ago are rarely worth worrying about, while a large cluster of similar low-quality links appearing in a short window is a much stronger signal of a real problem.',
        ],
      },
      {
        heading: 'Building and submitting a disavow file',
        paragraphs: [
          'Google’s disavow tool accepts a plain text file listing individual URLs or entire domains to disregard when evaluating your site. Disavowing at the domain level (using <code>domain:</code>) is generally safer and more efficient than disavowing individual URLs one at a time on a clearly bad domain.',
          'Submit the file through Search Console under the disavow links tool, and keep a dated record of what was submitted and why — this documentation becomes directly relevant if a reconsideration request is ever needed afterward.',
        ],
      },
      {
        heading: 'When disavowing isn’t necessary',
        paragraphs: [
          'Google’s systems are generally good at ignoring low-quality links on their own without any site-level penalty being triggered — disavowing every mediocre link a site has ever accumulated is unnecessary busywork for most sites and, done carelessly, risks undermining the same <a href="/outcomes/rankings">rankings</a> you’re trying to protect.',
          'Disavowing is most clearly warranted when there’s an active manual action specifically citing unnatural links, or clear, concentrated evidence of a negative SEO campaign — not as a routine, ongoing maintenance task for a healthy site. Sometimes the real fix is earning fresh authority rather than just cleaning up the old profile — <a href="/work/safetycentric">SafetyCentric rebuilt its authority</a> this way after a name change, through citation reconciliation and genuine editorial link acquisition.',
        ],
      },
    ],
    takeaways: [
      'A toxic link fails a simple test: would a genuine reader find it useful on a page that isn’t primarily a link marketplace?',
      'Audit backlinks using both Search Console and a third-party tool, and look for patterns rather than judging links individually.',
      'Domain-level disavowing is generally safer and more efficient than disavowing individual URLs.',
      'Google’s systems typically discount low-quality links automatically — disavowing everything mediocre isn’t necessary for most sites.',
      'Disavowing is most clearly warranted for an active manual action or a concentrated negative SEO attack, not as routine maintenance.',
    ],
    faqs: [
      { q: 'Will disavowing links improve our rankings right away?', a: 'Not immediately, and not for sites without an active manual action or clear negative SEO issue — Google typically already discounts low-quality links algorithmically, so disavowing them rarely produces a fast, visible ranking change on its own.' },
      { q: 'Can disavowing the wrong links hurt us?', a: 'Yes — disavowing links that were actually providing some authority value, out of overcaution, can remove signal you didn’t need to remove. This is why a careful audit before submission matters more than acting quickly.' },
      { q: 'How do we know if a bad link profile was caused by a past agency or a competitor attack?', a: 'Timing and pattern are the main clues — links tied to a past campaign tend to share consistent anchor text and link-building tactics from a specific period matching when that agency was active, while a negative SEO attack tends to appear as a sudden, unexplained spike from unrelated low-quality domains with no connection to any of your own past marketing activity.' },
    ],
    relatedHref: '/services/authority-link-building',
    relatedLabel: 'Authority & Link Building',
  },
];

export function getInsight(slug) {
  return INSIGHTS.find((i) => i.slug === slug);
}
