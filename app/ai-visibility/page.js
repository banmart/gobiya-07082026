import SplitText from '../../components/SplitText';

export const metadata = {
  title: 'AI Visibility (GEO) — Get Cited by ChatGPT, Perplexity & AI Overviews',
  description:
    'Generative Engine Optimization from Gobiya: the technical, content, and authority engineering that gets your brand cited in AI-generated answers, not just ranked in blue links.',
};

export default function AIVisibilityPage() {
  return (
    <main id="top">

      <section className="page-hero section">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>AI Visibility / GEO</p>
          <SplitText tag="h1" className="statement" text="The biggest shift in how people find businesses since mobile search." splitType="words" delay={18} duration={0.9} />
          <p className="lede" data-reveal>A growing share of research now ends inside an AI answer — ChatGPT, Perplexity, Google AI&nbsp;Overviews — before a user ever clicks a blue link. If your site isn&apos;t structured to be read, understood, and cited by those systems, you&apos;re invisible to the fastest-growing slice of search.</p>
          <div className="hero__ctas" data-reveal>
            <a href="/contact" className="btn btn--solid">Get an AI visibility audit</a>
            <a href="#how" className="btn btn--ghost">How it works</a>
          </div>
        </div>
      </section>

      {/* ══════════ What GEO means ══════════ */}
      <section className="about section section--tint" id="what-is-geo">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>What GEO actually is</p>
          <h2 className="statement" data-words>Generative Engine Optimization: engineering to be the source an AI model trusts enough to cite.</h2>
        </div>
      </section>

      {/* ══════════ Where buyers ask now (dark) ══════════ */}
      <section className="offices section section--dark" id="platforms">
        <div className="container">
          <p className="eyebrow eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Platforms we engineer for</p>
          <h2 className="offices__title" data-words>Every major AI answer engine reads your site differently. We build for all of them.</h2>
          <ul className="offices__list">
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city">Google AI Overviews</span>
              <span className="offices__addr">Synthesized answers above organic results, drawn from a small set of cited pages per query</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city">ChatGPT</span>
              <span className="offices__addr">Browses and cites live sources for recommendations, comparisons, and "best of" queries</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city">Perplexity</span>
              <span className="offices__addr">An answer engine built entirely around citation — visibility here is binary: cited or invisible</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city">Google Gemini</span>
              <span className="offices__addr">Powers AI Mode and Overviews, weighted heavily toward Google&apos;s existing Knowledge Graph entities</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city">Claude</span>
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
          <h2 className="statement statement--small" data-words>Four layers, engineered in order — skip one and the rest doesn&apos;t hold.</h2>
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
                <a href="/services/seo-discoverability" className="link-arrow">See SEO &amp; Discoverability<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1800&auto=format&fit=crop" alt="Rows of server infrastructure and code" width="1800" height="1198" loading="lazy" decoding="async" />
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
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1800&auto=format&fit=crop" alt="Open sea meeting the horizon" width="1800" height="1200" loading="lazy" decoding="async" />
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
                <a href="/services/geo-ai-content-writing" className="link-arrow">See GEO &amp; AI Content Writing<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop" alt="Mountain ridges in mist" width="1800" height="1200" loading="lazy" decoding="async" />
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
                <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1800&auto=format&fit=crop" alt="Waterfall through a green gorge" width="1800" height="2700" loading="lazy" decoding="async" />
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
              <dd>Same foundation, different endpoint. Traditional SEO optimizes for a ranked list of links; GEO optimizes for being the source an AI model paraphrases or quotes directly. Nearly everything that makes a page rank well — clean technical delivery, clear structure, real authority — is also what makes it citable. GEO adds a layer on top: structuring answers the way a language model actually extracts and quotes them.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How do I know if I&apos;m already being cited by AI platforms?</dt>
              <dd>Run your brand and your core topics as prompts in ChatGPT, Perplexity, and Google AI Overviews and see what comes back. If you don&apos;t appear, or a competitor does instead, that's the gap. We run this audit systematically across dozens of buyer-intent prompts as the first step of any engagement.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>Will this replace the need for traditional SEO?</dt>
              <dd>No — it depends on it. AI systems still rely heavily on the same crawlability, indexation, and authority signals that drive organic rankings. A site with weak technical SEO will struggle to be cited by AI for the same reasons it struggles to rank: the systems can&apos;t reliably read or trust it.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How long before we see AI citations after the work is done?</dt>
              <dd>Technical and structured-data fixes can affect crawler behavior within weeks. Content and authority signals compound over months, similar to organic SEO timelines. We track citation appearances directly, not just rankings, so progress is visible before full compounding.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-words>Find out what AI is already saying about you.</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
