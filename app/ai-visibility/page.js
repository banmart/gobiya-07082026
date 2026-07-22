import HeroQuickForm from '../../components/HeroQuickForm';
import Image from 'next/image';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';
import { PlatformIcon } from '../../components/icons/HandDrawn';

export const metadata = buildMetadata({
  title: 'AI Visibility & GEO — AI Marketing Tools That Get You Cited',
  description:
    'AI visibility (GEO) from Gobiya: AI marketing tools, content optimization, and authority engineering that get your brand cited in AI-generated search engine results — not just ranked in blue links.',
  path: '/ai-visibility',
});

export default function AIVisibilityPage() {
  return (
    <main id="top">

      
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            
        
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>AI Visibility / GEO</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>The biggest shift in how people find businesses since mobile search.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>A growing share of research now ends inside an AI answer — ChatGPT, Perplexity, Google AI&nbsp;Overviews — before a user ever clicks a blue link. If your site isn&apos;t structured to be read, understood, and cited by those systems, you&apos;re invisible to the fastest-growing slice of search.</p>
          <div className="hero__ctas" data-reveal>
            <a href="/onboarding" className="btn btn--solid">Get an AI visibility audit</a>
            <a href="#how" className="btn btn--ghost">How it works</a>
          </div>
        
          </div>
          <div>
            <HeroQuickForm />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["AI Overviews", "ChatGPT Citations", "Perplexity Search", "Generative AI SEO", "Answer Engine Optimization"]} />



      {/* ══════════ What GEO means ══════════ */}
      <section className="about section section--tint" id="what-is-geo">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>What GEO actually is</p>
          <h2 className="statement" data-split>Generative Engine Optimization: engineering to be the source an AI model trusts enough to cite.</h2>
        </div>
      </section>

      {/* ══════════ Where buyers ask now (dark) ══════════ */}
      <section className="offices section section--dark" id="platforms">
        <div className="container">
          <p className="eyebrow eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Platforms we engineer for</p>
          <h2 className="offices__title" data-split>Every major AI answer engine reads your site differently. We build for all of them.</h2>
          <ul className="offices__list">
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="Google AI Overviews" />Google AI Overviews</span>
              <span className="offices__addr">Synthesized answers above organic results, drawn from a small set of cited pages per query</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="ChatGPT" />ChatGPT</span>
              <span className="offices__addr">Browses and cites live sources for recommendations, comparisons, and "best of" queries</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="Perplexity" />Perplexity</span>
              <span className="offices__addr">An answer engine built entirely around citation — visibility here is binary: cited or invisible</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="Google Gemini" />Google Gemini</span>
              <span className="offices__addr">Powers AI Mode and Overviews, weighted heavily toward Google&apos;s existing Knowledge Graph entities</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="Claude" />Claude</span>
              <span className="offices__addr">Growing web-search and citation use in research and business-recommendation contexts</span>
              <span className="offices__tag">Growing</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ══════════ How we build it ══════════ */}
      <section className="solutions section section--tint" id="how">
        <div className="container container--narrow solutions__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How we build it</p>
          <h2 className="statement statement--small" data-split>Four layers, engineered in order — skip one and the rest doesn&apos;t hold.</h2>
        </div>

        <div className="stack">

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">01</span>
                <h3 className="stack__title">Technical<br /><em>Foundation</em></h3>
                <p className="stack__desc">If an AI crawler can&apos;t fetch and parse your page, nothing else matters. We fix server-side rendering, crawl budget, and blank-page JavaScript errors first.</p>
                <dl className="stack__meta">
                  <div><dt>Fixes</dt><dd>SSR &amp; crawlability</dd></div>
                  <div><dt></dt><dd>Bot access &amp; robots.txt</dd></div>
                  <div><dt></dt><dd>Core Web Vitals</dd></div>
                </dl>
                <a href="/seo-services" className="link-arrow">See SEO &amp; Discoverability<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/hallway-code-review.webp"
                  alt="Two colleagues reviewing code together on a laptop in an office hallway"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">02</span>
                <h3 className="stack__title">Entity &amp;<br /><em>Structured Data</em></h3>
                <p className="stack__desc">JSON-LD schema and clean semantic markup tell AI systems exactly what your business is, so they can link you to verified entities instead of guessing.</p>
                <dl className="stack__meta">
                  <div><dt>Builds</dt><dd>Organization &amp; LocalBusiness schema</dd></div>
                  <div><dt></dt><dd>Knowledge-graph alignment</dd></div>
                </dl>
                <a href="/services/authority-link-building" className="link-arrow">See Authority &amp; Link Building<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/developer-dashboard-review.webp"
                  alt="A developer writing code beside a colleague reviewing a data dashboard"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">03</span>
                <h3 className="stack__title">Citable<br /><em>Content</em></h3>
                <p className="stack__desc">AI models quote direct, well-structured answers — not marketing copy. We write pages built around the exact questions your buyers ask an AI assistant.</p>
                <dl className="stack__meta">
                  <div><dt>Writes</dt><dd>GEO &amp; AI content</dd></div>
                  <div><dt></dt><dd>FAQ &amp; comparison pages</dd></div>
                </dl>
                <a href="/geo-services" className="link-arrow">See GEO &amp; AI Content Writing<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/office-huddle-skyline.webp"
                  alt="A team huddled around a laptop with a city skyline visible through the windows"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">04</span>
                <h3 className="stack__title">Trust &amp;<br /><em>Authority</em></h3>
                <p className="stack__desc">AI systems weight citations from sites the web already trusts. Editorial backlinks and consistent citations are what earn that trust in the first place.</p>
                <dl className="stack__meta">
                  <div><dt>Builds</dt><dd>Editorial backlinks</dd></div>
                  <div><dt></dt><dd>Digital PR &amp; NAP consistency</dd></div>
                </dl>
                <a href="/contact" className="link-arrow">Talk to us<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <Image
                  src="/assets/img/agency-team-walking.webp"
                  alt="A group of professionals walking together through a glass-walled office corridor"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  loading="lazy"
                />
              </figure>
            </div>
          </article>

        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>AI visibility, plainly explained.</h2>
          <dl className="faq__list">
            <div className="faq__item" data-reveal>
              <dt>Is GEO different from SEO, or the same discipline?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Same foundation, different endpoint. Traditional <a href="/seo-services">technical SEO</a> optimizes for a ranked list of links; GEO optimizes for being the source an AI model paraphrases or quotes directly. Nearly everything that makes a page rank well — clean technical delivery, clear structure, real authority — is also what makes it citable. Read the full breakdown in <a href="/insights/seo-vs-geo">SEO vs. GEO</a>.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>How do I know if I&apos;m already being cited by AI platforms?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Run your brand and your core topics as prompts in ChatGPT, Perplexity, and Google AI Overviews and see what comes back. If you don&apos;t appear, or a competitor does instead, that&apos;s the gap — see <a href="/insights/get-cited-by-chatgpt-perplexity-ai-overviews">how to get cited by ChatGPT, Perplexity, and AI Overviews</a> for what each platform actually checks. We run this audit systematically across dozens of buyer-intent prompts as the first step of any engagement.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>Will this replace the need for traditional SEO?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'No — it depends on it. AI systems still rely heavily on the same crawlability, indexation, and authority signals that drive organic rankings. A site with weak <a href="/seo-services">technical SEO</a> will struggle to be cited by AI for the same reasons it struggles to rank: the systems can&apos;t reliably read or trust it.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>How long before we see AI citations after the work is done?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Technical and structured-data fixes can affect crawler behavior within weeks. Content and authority signals compound over months, similar to organic SEO timelines — see <a href="/seo-services">how we approach rankings</a>. We track citation appearances directly, not just rankings, so progress is visible before full compounding.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>What is the role of AI in search engine results today?</dt>
              <dd>AI now directly generates answers at the top of search results (like Google&apos;s AI Overviews) rather than just ranking links. This means a user often gets their answer without ever clicking through to a website. To remain visible, brands must optimize to be the source that the AI actually cites and links to within its generated response.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How does AI-driven web analytics fit into visibility tracking?</dt>
              <dd>Traditional analytics track clicks and sessions, but they miss when a user gets their answer from an AI without visiting your site. AI-driven analytics track brand mentions, sentiment, and citation frequency across major AI models like ChatGPT and Perplexity. It allows us to measure visibility in places where a traditional web tracker simply can&apos;t reach.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Find out what AI is already saying about you.</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
