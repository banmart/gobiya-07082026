import HeroQuickForm from '../../components/HeroQuickForm';
import Image from 'next/image';
import { buildMetadata } from '../../lib/meta';
import TopicMarquee from '../../components/TopicMarquee';
import { PlatformIcon } from '../../components/icons/HandDrawn';

export const metadata = buildMetadata({
  title: 'AI Visibility — Get Recommended by ChatGPT & Google AI | Gobiya',
  description:
    'Gobiya helps your brand get recommended by ChatGPT, Perplexity, and Google\'s AI answers — not just ranked in a list of links.',
  path: '/ai-visibility',
});

export default function AIVisibilityPage() {
  return (
    <main id="top">

      
      <section className="page-hero page-hero--left section" style={{ paddingBottom: '3rem' }}>
        <div className="container seo-hero__grid">
          <div>
            
        
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>AI Visibility · Get Found by ChatGPT &amp; Google&apos;s AI</p>
          <h1 className="statement" style={{ textAlign: 'left', marginInline: 0 }} data-split>The biggest shift in how people find businesses since mobile search.</h1>
          <p className="lede" style={{ marginInline: 0 }} data-reveal>More and more people now get their answer straight from AI tools — ChatGPT, Perplexity, Google&apos;s AI&nbsp;Overviews — before they ever click through to a website. If your site isn&apos;t set up so those tools can read, understand, and recommend it, you&apos;re invisible to a fast-growing part of search.</p>
          <div className="hero__ctas" data-reveal>
            <a href="/onboarding?goal=ai-visibility" className="btn btn--solid">Check Your Brand&apos;s AI Visibility</a>
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
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>What this actually means</p>
          <h2 className="statement" data-split>Getting your business built so an AI tool trusts it enough to recommend it.</h2>
        </div>
      </section>

      {/* ══════════ Where buyers ask now (dark) ══════════ */}
      <section className="offices section section--dark" id="platforms">
        <div className="container">
          <p className="eyebrow eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Where we make sure you show up</p>
          <h2 className="offices__title" data-split>Every major AI tool reads your site a little differently. We make sure you show up well in all of them.</h2>
          <ul className="offices__list">
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="Google AI Overviews" />Google AI Overviews</span>
              <span className="offices__addr">Shows a summarized answer above the regular results, pulled from just a handful of pages</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="ChatGPT" />ChatGPT</span>
              <span className="offices__addr">Looks up real websites when someone asks for a recommendation, comparison, or a &quot;best of&quot; list</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="Perplexity" />Perplexity</span>
              <span className="offices__addr">Built entirely around quoting sources — you&apos;re either mentioned, or you&apos;re invisible here</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="Google Gemini" />Google Gemini</span>
              <span className="offices__addr">Powers Google&apos;s AI Mode and Overviews, and leans heavily on businesses Google already recognizes</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col" data-reveal>
              <span className="offices__city"><PlatformIcon name="Claude" />Claude</span>
              <span className="offices__addr">Increasingly used for research and business recommendations, with growing use of real web sources</span>
              <span className="offices__tag">Growing</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ══════════ How we build it ══════════ */}
      <section className="solutions section section--tint" id="how">
        <div className="container container--narrow solutions__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>How we build it</p>
          <h2 className="statement statement--small" data-split>Four steps, always in this order — skip one and the rest doesn&apos;t hold up.</h2>
        </div>

        <div className="stack">

          <article className="stack__card">
            <div className="stack__inner">
              <div className="stack__text">
                <span className="stack__index">01</span>
                <h3 className="stack__title">Technical<br /><em>Foundation</em></h3>
                <p className="stack__desc">If an AI tool can&apos;t even load your page properly, nothing else matters. We fix the basic technical problems — like pages that load up blank — before touching anything else.</p>
                <dl className="stack__meta">
                  <div><dt>Fixes</dt><dd>Pages Google &amp; AI can actually read</dd></div>
                  <div><dt></dt><dd>Making sure AI tools are allowed in</dd></div>
                  <div><dt></dt><dd>Faster loading speed</dd></div>
                </dl>
                <a href="/seo-services" className="link-arrow">See our SEO work<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
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
                <p className="stack__desc">Clear, behind-the-scenes details tell AI tools exactly what your business is, so they can confidently connect you to the right information instead of guessing.</p>
                <dl className="stack__meta">
                  <div><dt>Builds</dt><dd>Clear business details behind the scenes</dd></div>
                  <div><dt></dt><dd>Getting recognized as one trusted business</dd></div>
                </dl>
                <a href="/services/authority-link-building" className="link-arrow">See our trust-building work<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
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
                <p className="stack__desc">AI tools quote clear, direct answers — not typical marketing copy. We write pages built around the exact questions your customers actually ask an AI assistant.</p>
                <dl className="stack__meta">
                  <div><dt>Writes</dt><dd>Content AI tools want to quote</dd></div>
                  <div><dt></dt><dd>FAQ &amp; comparison pages</dd></div>
                </dl>
                <a href="/geo-services" className="link-arrow">See our AI content writing<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></a>
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
                <p className="stack__desc">AI tools trust sources that the rest of the web already trusts. Real links from other sites, and consistent business listings, are what earn that trust in the first place.</p>
                <dl className="stack__meta">
                  <div><dt>Builds</dt><dd>Real links from other websites</dd></div>
                  <div><dt></dt><dd>Media coverage &amp; consistent listings</dd></div>
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
              <dt>Is this different from SEO, or the same thing?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Same foundation, different goal. Traditional <a href="/seo-services">SEO</a> aims for a spot in the ranked list of links. This aims for being the source an AI tool actually quotes or paraphrases directly. Almost everything that makes a page rank well — a clean technical setup, clear structure, real trust — is also what makes it worth quoting. Read the full breakdown in <a href="/insights/seo-vs-geo">SEO vs. GEO, explained simply</a>.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>How do I know if I&apos;m already being mentioned by AI tools?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Try typing your brand name and your main topics into ChatGPT, Perplexity, and Google&apos;s AI answers and see what comes back. If you don&apos;t show up, or a competitor does instead, that&apos;s the gap — see <a href="/insights/get-cited-by-chatgpt-perplexity-ai-overviews">how to get recommended by ChatGPT, Perplexity, and AI Overviews</a> for what each one actually checks. We run this same check across dozens of real customer questions as the first step of any project.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>Will this replace the need for traditional SEO?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'No — it actually depends on it. AI tools still rely heavily on the same basics that drive good Google rankings: can they read your site, and do they trust it? A site with weak <a href="/seo-services">SEO</a> will struggle to get recommended by AI for the same reason it struggles to rank: these tools can&apos;t reliably read or trust it.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>How long before we see AI mentions after the work is done?</dt>
              <dd dangerouslySetInnerHTML={{ __html: 'Technical fixes can start affecting how AI tools read your site within weeks. Content and trust-building take longer to build up, usually months, similar to regular SEO timelines — see <a href="/seo-services">how we approach rankings</a>. We track whether you&apos;re actually being mentioned by AI tools directly, not just your Google rankings, so you can see progress along the way.' }} />
            </div>
            <div className="faq__item" data-reveal>
              <dt>What is the role of AI in search results today?</dt>
              <dd>AI now writes its own answer at the top of search results (like Google&apos;s AI Overviews), instead of just showing a list of links. That means someone can often get their answer without ever clicking through to a website. To stay visible, a business needs to be the source that AI actually mentions and links to inside that answer.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How do you track AI mentions, if regular website analytics can&apos;t see them?</dt>
              <dd>Regular website analytics track clicks and visits, but they miss it completely when someone gets their answer from AI without ever visiting your site. We use a different kind of tracking that watches how often — and how positively — your brand gets mentioned across AI tools like ChatGPT and Perplexity. It lets us measure visibility in places a normal website tracker simply can&apos;t see.</dd>
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
