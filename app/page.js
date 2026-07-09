import Ballpit from '../components/BallpitLazy';
import Hyperspeed from '../components/HyperspeedLazy';
import ScrollReveal from '../components/ScrollReveal';
import SplitText from '../components/SplitText';

export default function Home() {
  return (
    <main id="top">

      {/* ══════════ Hero ══════════ */}
      <section className="hero" id="hero">
        <div className="container">
          <p className="eyebrow hero__eyebrow" data-reveal><span className="eyebrow__dot"></span>Technical SEO &amp; AI Visibility · Est. 2010</p>
          <h1 className="hero__title">
            <SplitText tag="span" className="hero__title-line" text="Findable." splitType="chars" delay={22} duration={1} textAlign="left" />
            <br />
            <SplitText tag="span" className="hero__title-line" text="By humans" splitType="chars" delay={22} duration={1} textAlign="left" />{' '}
            <SplitText tag="span" className="hero__title-line hero__title-accent" text="and AI." splitType="chars" delay={22} duration={1} textAlign="left" />
          </h1>
          <div className="hero__row">
            <p className="hero__sub" data-reveal>Technical SEO, algorithm recovery, and AI-visibility engineering for companies that are tired of paying for&nbsp;traffic that&nbsp;never converts.</p>
            <div className="hero__ctas" data-reveal>
              <a href="/contact" className="btn btn--solid">Get an AI visibility audit</a>
              <a href="/ai-visibility" className="btn btn--ghost">How AI visibility works</a>
            </div>
          </div>
        </div>
        <div className="hero__media">
          <div className="hero__media-canvas">
            <Hyperspeed
              effectOptions={{
                distortion: 'turbulentDistortion',
                length: 400,
                roadWidth: 10,
                islandWidth: 2,
                lanesPerRoad: 3,
                fov: 90,
                fovSpeedUp: 150,
                speedUp: 2,
                carLightsFade: 0.4,
                totalSideLightSticks: 14,
                lightPairsPerRoadWay: 24,
                colors: {
                  roadColor: 0x1a1a1a,
                  islandColor: 0x0d0d0d,
                  background: 0x000000,
                  shoulderLines: 0x2b2b2b,
                  brokenLines: 0x2b2b2b,
                  leftCars: [0xe41613, 0xff4d4a, 0xb3110f],
                  rightCars: [0xaaaaaa, 0xe5e5e5, 0x808080],
                  sticks: 0xe41613,
                },
              }}
            />
          </div>
          <div className="hero__media-caption">
            <span>Signal <i>/ˈsɪɡ.nəl/</i> — the thread search engines and AI both follow back to you.</span>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <i className="hero__scroll-line"></i>
        </div>
      </section>

      {/* ══════════ About statement ══════════ */}
      <section className="about section section--tint" id="about">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>About Gobiya</p>
          <ScrollReveal containerClassName="statement about__reveal">
            {`A Los Angeles technical SEO and AI-visibility firm, making ambitious companies findable — by search engines and by the language models now answering their customers' questions.`}
          </ScrollReveal>
          <p className="credentials-strip" data-reveal>BBB A+ Rated &nbsp;·&nbsp; Google Partner 2015–2019 &nbsp;·&nbsp; Operating since 2012</p>
        </div>
      </section>

      {/* ══════════ Results ══════════ */}
      <section className="numbers section">
        <div className="container numbers__grid">
          <div className="numbers__intro">
            <p className="numbers__lede" data-reveal>Founded in 2010 by Steve Martin, Gobiya specializes in recovering organic traffic lost to algorithm updates and building the technical, content, and authority signals that get brands cited by ChatGPT, Perplexity, and Google AI Overviews.</p>
            <a href="/about" className="link-arrow" data-reveal>Our story<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
          </div>
          <ul className="numbers__list">
            <li className="numbers__item" data-reveal>
              <span className="numbers__value"><i data-count="5">0</i>x</span>
              <span className="numbers__label">Patient inquiry increase — dental practice client</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__value"><i data-count="5.7" data-decimals="1">0</i>x</span>
              <span className="numbers__label">Google Ads ROAS on a $15K/month budget</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__value"><i data-count="213" data-plain>0</i>K</span>
              <span className="numbers__label">Monthly search impressions, one client</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__value">+<i data-count="47" data-plain>0</i></span>
              <span className="numbers__label">Keywords ranked page one after rebuild</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__value"><i data-count="3">0</i>x</span>
              <span className="numbers__label">Online booking increase — fingerprinting service</span>
            </li>
            <li className="numbers__item" data-reveal>
              <span className="numbers__value"><i data-count="61" data-plain>0</i>%</span>
              <span className="numbers__label">Reduction in cost per lead after campaign rebuild</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ══════════ Three pillars ══════════ */}
      <section className="solutions section section--tint" id="solutions">
        <div className="container container--narrow solutions__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How we work</p>
          <h2 className="statement statement--small" data-words>Three disciplines, one mandate — make you the answer, not just a result.</h2>
        </div>

        <div className="stack">

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">01</span>
                <h3 className="stack__title">Performance<br /><em>Engineering</em></h3>
                <p className="stack__desc">Technical SEO, algorithm and penalty recovery, custom React/Next.js builds, Google Ads rebuilt around cost per lead — the foundation search engines and AI crawlers can actually read.</p>
                <dl className="stack__meta">
                  <div><dt>Includes</dt><dd>SEO &amp; Discoverability</dd></div>
                  <div><dt></dt><dd>Web &amp; App Development</dd></div>
                  <div><dt></dt><dd>AI &amp; LLM Systems Consulting</dd></div>
                </dl>
                <a href="/services/seo-discoverability" className="link-arrow">Explore Performance<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1800&auto=format&fit=crop" alt="Layered mountain ridges in morning mist" width="1800" height="1072" loading="lazy" decoding="async" />
              </figure>
            </div>
          </article>

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">02</span>
                <h3 className="stack__title">Creativity<br /><em>&amp; Content</em></h3>
                <p className="stack__desc">SEO-mapped web copy and content strategy, written to rank in Google and be cited verbatim in AI-generated answers — the words that make an entity worth linking to.</p>
                <dl className="stack__meta">
                  <div><dt>Includes</dt><dd>SEO &amp; Web Copywriting</dd></div>
                  <div><dt></dt><dd>GEO &amp; AI Content Writing</dd></div>
                  <div><dt></dt><dd>AI Video &amp; Ads</dd></div>
                </dl>
                <a href="/services/geo-ai-content-writing" className="link-arrow">Explore Creativity<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <img src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1800&auto=format&fit=crop" alt="Deep blue open sea meeting the horizon" width="1800" height="3204" loading="lazy" decoding="async" />
              </figure>
            </div>
          </article>

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">03</span>
                <h3 className="stack__title">Relations<br /><em>&amp; Authority</em></h3>
                <p className="stack__desc">Editorial link acquisition, digital PR, and entity alignment that build the domain trust search engines and AI knowledge graphs use to decide who to cite first.</p>
                <dl className="stack__meta">
                  <div><dt>Includes</dt><dd>Authority &amp; Link Building</dd></div>
                  <div><dt></dt><dd>Digital PR &amp; Media Outreach</dd></div>
                  <div><dt></dt><dd>Entity &amp; Knowledge Graph Mapping</dd></div>
                </dl>
                <a href="/services/authority-link-building" className="link-arrow">Explore Relations<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
              </div>
              <figure className="stack__media">
                <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1800&auto=format&fit=crop" alt="Waterfall cutting through a green gorge" width="1800" height="2700" loading="lazy" decoding="async" />
              </figure>
            </div>
          </article>

        </div>
      </section>

      {/* ══════════ AI Visibility teaser (dark) ══════════ */}
      <section className="offices section section--dark" id="ai-visibility-teaser">
        <div className="container">
          <p className="eyebrow eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Where buyers ask first, now</p>
          <h2 className="offices__title" data-words>Search didn&apos;t disappear. It moved into a conversation.</h2>
          <ul className="offices__list">
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city">Google AI Overviews</span>
              <span className="offices__addr">Summarized answers above the fold, sourced from a handful of cited pages</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city">ChatGPT</span>
              <span className="offices__addr">Browses and cites live sources when asked for recommendations or comparisons</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city">Perplexity</span>
              <span className="offices__addr">Built entirely around citing sources — visibility here is binary: cited or invisible</span>
              <span className="offices__tag">Live</span>
            </li>
          </ul>
          <a href="/ai-visibility" className="link-arrow" data-reveal style={{ marginTop: '2.5rem' }}>See how AI visibility works<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
        </div>
      </section>

      {/* ══════════ Client sectors marquee ══════════ */}
      <section className="portfolio section" id="portfolio">
        <div className="container container--narrow portfolio__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Who we&apos;ve built for</p>
          <h2 className="statement statement--small" data-words>Local service businesses and B2B firms, engineered for search and cited by AI.</h2>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span className="marquee__item">Smile Center Dentistry</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">American Livescan</span><i>✳</i>
            <span className="marquee__item">SafetyCentric</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">QuickPass AiD</span><i>✳</i>
            <span className="marquee__item">The ARK</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">Remodel Me Pros</span><i>✳</i>
          </div>
        </div>
        <div className="marquee marquee--reverse" aria-hidden="true">
          <div className="marquee__track">
            <span className="marquee__item marquee__item--serif">Medicine Metta</span><i>✳</i>
            <span className="marquee__item">Trusted Home Contractors</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">Total Capital</span><i>✳</i>
            <span className="marquee__item">Tidder</span><i>✳</i>
            <span className="marquee__item marquee__item--serif">QuickPass AiD</span><i>✳</i>
            <span className="marquee__item">American Livescan</span><i>✳</i>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="cta section" id="contact">
        <div className="cta__canvas" aria-hidden="true">
          <Ballpit
            count={90}
            colors={['#e41613', '#2b2b2b', '#aaaaaa']}
            gravity={0.35}
            friction={0.9975}
            wallBounce={0.9}
            followCursor={true}
            minSize={0.4}
            maxSize={0.9}
          />
        </div>
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-words>Be the answer AI gives — not the link it skips.</h2>
          <div className="cta__actions" data-reveal>
            <a href="mailto:hello@gobiya.com" className="btn btn--solid btn--big">hello@gobiya.com</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
