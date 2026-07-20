import Image from 'next/image';
import { buildMetadata } from '../lib/meta';
import { SERVICES } from '../lib/services';
import { INSIGHTS } from '../lib/insights';
import TopicMarquee from '../components/TopicMarquee';
import CountdownBadge from '../components/CountdownBadge';

export const metadata = buildMetadata({
  title: 'AI SEO Company Near Me | LA, Glendale, Koreatown | Gobiya',
  description:
    'Gobiya is an AI SEO company in Los Angeles, Glendale, and Koreatown — technical SEO and AI visibility that gets you found and cited. Free audit.',
  path: '/',
});

const ARROW = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PILLARS = [
  {
    title: 'Findable',
    desc: 'Technical SEO and site architecture a crawler can read on the first pass.',
    d: 'M24 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36M24 14v20M14 24h20',
  },
  {
    title: 'Credible',
    desc: 'Authority signals — links, citations, entities — that hold up to scrutiny.',
    d: 'M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11ZM17 24l5 5 9-10',
  },
  {
    title: 'Cited',
    desc: 'Content structured so AI answer engines quote you, not a competitor.',
    d: 'M12 16h8v8c0 5-3 8-8 8M28 16h8v8c0 5-3 8-8 8',
  },
  {
    title: 'Chosen',
    desc: 'Landing experiences and offers tuned until traffic becomes booked business.',
    d: 'M24 10a14 14 0 1 0 0 28 14 14 0 0 0 0-28M24 18a6 6 0 1 0 0 12 6 6 0 0 0 0-12',
  },
];

const CLIENT_LOGOS = [
  { src: '/assets/img/americanlivescan.webp', alt: 'American Livescan' },
  { src: '/assets/img/smilecenter.webp', alt: 'SmileCenter.com' },
  { src: '/assets/img/totalcapital.webp', alt: 'TotalCapitalInc.Com' },
  { src: '/assets/img/remodelmepros.webp', alt: 'RemodelMePros.com' },
  { src: '/assets/img/safetycentric-logo.png', alt: 'Safety-Centric.com' },
  { src: '/assets/img/dgplumbing-logo.webp', alt: 'DGPlumbingandRooter.com' },
  { src: '/assets/img/mtw-logo-mark-nFG9LpnH.webp', alt: 'MyTrustWills.Com' },
  { src: '/assets/img/quickpass-logo.webp', alt: 'QuickPassAiD.Com' },
  { src: '/assets/img/sonrisa-dental.webp', alt: 'Sonrisa Dental' },
  { src: '/assets/img/trusted-logo.webp', alt: 'Trusted' },
  { src: '/assets/img/client-5.webp', alt: 'Gobiya client' },
];

export default function Home() {
  const services = Object.values(SERVICES);
  const latest = [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <main id="top">

      {/* ══ 1. Hero ══ */}
      <section className="hero" id="hero">
        <div className="container">
          <p className="eyebrow hero__eyebrow" data-reveal><span className="eyebrow__dot"></span>AI SEO Company · LA · Glendale · Koreatown</p>
          <h1 className="hero__title" data-split>
            The top-rated AI SEO company near you, built for the{' '}
            <span className="hero__title-video">
              <video
                src="/assets/videos/gobiyaRace.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="hero__title-video-el"
                aria-hidden="true"
              />
            </span>{' '}
            <em className="hero__title-accent">era of answers.</em>
          </h1>
          <div className="hero__row">
            <p className="hero__sub" data-reveal>If you are searching for an &quot;AI SEO company near me,&quot; Gobiya is your local partner in Los Angeles, Glendale, and Koreatown. We make local and global brands findable in Google and cited by ChatGPT, Perplexity, and AI Overviews through expert technical SEO and organic search strategy.</p>
            <div className="hero__ctas" data-reveal>
              <a href="/onboarding" className="btn btn--solid">Get an AI visibility audit</a>
              <a href="/ai-visibility" className="btn btn--ghost">How AI visibility works</a>
            </div>
          </div>
        </div>
        <div className="hero__media" data-parallax>
          <Image
            src="/assets/img/team-desk-huddle.webp"
            alt="A team of five reviewing code and a strategy whiteboard around a shared desk"
            width={1800}
            height={1005}
            sizes="100vw"
            priority
            fetchPriority="high"
          />
        </div>
      </section>
      <TopicMarquee topics={["Los Angeles AI SEO", "Generative Engine Optimization", "ChatGPT Optimization", "Technical SEO", "Semantic Search"]} />


      {/* ══ 2. Stats band ══ */}
      <section className="stats-band" aria-label="Results and credentials">
        <div className="container">
          <i className="stats-band__rule" data-rule></i>
          <ul className="stats-band__grid">
            {/* Server-rendered text is the FINAL value — no-JS and reduced-motion
                users see real numbers; Motion.js animates 0→value on capable clients. */}
            <li><span className="stat__value"><i data-count="16" data-plain>16</i></span><span className="stat__label">Years in practice</span></li>
            <li><span className="stat__value">A+</span><span className="stat__label">BBB rating</span></li>
            <li><span className="stat__value"><i data-count="5.7" data-decimals="1">5.7</i>x</span><span className="stat__label">Google Ads ROAS</span></li>
            <li><span className="stat__value"><i data-count="213" data-plain>213</i>K</span><span className="stat__label">Monthly impressions, one client</span></li>
            <li><span className="stat__value"><i data-count="61" data-plain>61</i>%</span><span className="stat__label">Cost-per-lead reduction</span></li>
            <li><span className="stat__value">+<i data-count="47" data-plain>47</i></span><span className="stat__label">Page-one keywords after rebuild</span></li>
          </ul>
          <i className="stats-band__rule" data-rule></i>
        </div>
      </section>

      {/* ══ 3. Services grid ══ */}
      <section className="section section--tint" id="services">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Consulting</p>
          <h2 className="statement statement--small" data-split style={{ textAlign: 'left' }}>Every discipline a search-first company needs, under one mandate.</h2>
          <div className="svc-grid">
            {services.map((s) => (
              <a className="svc-card" href={`/services/${s.slug}`} key={s.slug} data-reveal>
                <span className="svc-card__tag">{s.pillar}</span>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.blurb}</p>
                <span className="link-arrow">Explore{ARROW}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. AI Visibility feature ══ */}
      <section className="offices section section--dark" id="ai-visibility-teaser">
        <div className="container">
          <p className="eyebrow eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Where buyers ask first, now</p>
          <h2 className="offices__title" data-split>Search didn&apos;t disappear. It moved into a conversation.</h2>
          <ul className="offices__list">
            <li className="offices__row offices__row--3col">
              <span className="offices__city">Google AI Overviews</span>
              <span className="offices__addr">Summarized answers above the fold, sourced from a handful of cited pages</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col">
              <span className="offices__city">ChatGPT</span>
              <span className="offices__addr">Browses and cites live sources when asked for recommendations or comparisons</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col">
              <span className="offices__city">Perplexity</span>
              <span className="offices__addr">Built entirely around citing sources — visibility here is binary: cited or invisible</span>
              <span className="offices__tag">Live</span>
            </li>
          </ul>
          <a href="/ai-visibility" className="link-arrow link-arrow--light" data-reveal style={{ marginTop: '2.5rem' }}>See how AI visibility works{ARROW}</a>
        </div>
      </section>

      {/* ══ 4.5 Offer ══ */}
      <section className="section offer-section" id="special-offer">
        <div className="container">
          <div className="offer-card" data-reveal>
            <Image
              src="/assets/img/office-collage-montage.webp"
              alt="Office background collage"
              fill
              className="offer-card__bg"
              style={{ objectFit: 'cover' }}
              aria-hidden="true"
            />
            <div className="offer-card__content">
              <CountdownBadge targetDate="2026-09-30T23:59:59" />
              <h2 className="offer-card__title">
                The Q3 <span>Growth Bundle</span> Offer
              </h2>
              <div className="offer-card__price-pill">
                Custom Web Dev Starting at <strong>$3,500</strong> &amp; up
              </div>
              <p className="offer-card__desc">
                Turn your new website into a complete lead generation machine. For a limited time (ends Sept 30th), every custom Next.js or React build includes a fully integrated CRM to manage your leads, plus a professional YouTube AI video pre-roll ad campaign to drive traffic from day one.
              </p>
              <a href="/onboarding" className="btn btn--solid">Claim Offer</a>
            </div>
            <div className="offer-card__visual">
              <video
                src="/assets/videos/home-hero-background.webm"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: 'auto', display: 'block' }}
                aria-label="Video looping of hero background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. Four pillars ══ */}
      <section className="pillars section">
        <div className="container">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>The mandate</p>
          <h2 className="statement statement--small" data-split>Make you the answer, not just a result.</h2>
          <div className="pillars__grid">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title} data-reveal>
                <svg className="pillar__glyph" viewBox="0 0 48 48" width="48" height="48" data-draw aria-hidden="true">
                  <path d={p.d} fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. Insights ══ */}
      <section className="section section--tint" id="insights-teaser">
        <div className="container">
          <p className="eyebrow" data-reveal><span className="eyebrow__dot"></span>Latest insights</p>
          <div className="insights__grid">
            {latest.map((a) => (
              <a className="insights__card" href={`/insights/${a.slug}`} key={a.slug} data-reveal>
                <span className="insights__card-cat">{a.category}</span>
                <h3 className="insights__card-title">{a.title}</h3>
                <p className="insights__card-dek">{a.dek}</p>
                <span className="link-arrow">Read{ARROW}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. Client logo strip ══ */}
      <section className="logo-strip section" aria-label="Selected clients">
        <div className="container container--narrow portfolio__head">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Who we&apos;ve built for</p>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l, i) => (
              <span className="logo-strip__item" key={i}>
                <Image src={l.src} alt={i < CLIENT_LOGOS.length ? l.alt : ''} width={220} height={80} loading="lazy" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. FAQ ══ */}
      <section className="faq section" id="faq">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center" data-reveal><span className="eyebrow__dot"></span>Common questions</p>
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>
            The future of search, plainly explained.
          </h2>
          <dl className="faq__list">
            <div className="faq__item" data-reveal>
              <dt>What are the most important trends in SEO for 2026?</dt>
              <dd>The biggest shift is from traditional ten-blue-links optimization to Generative Engine Optimization (GEO). AI models like ChatGPT and Perplexity are becoming primary search interfaces, and they look for direct answers, original data, and strong entity signals rather than just keyword density. If your SEO strategy doesn&apos;t include an AI citation plan, you&apos;re optimizing for yesterday&apos;s search engine.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How has the evolution of search engine algorithms changed the game?</dt>
              <dd>Algorithms have moved from lexical matching (finding words on a page) to semantic understanding (understanding the topic) to generative answers (reading the page and synthesizing an answer). The result is that you can no longer win by just having the most complete guide; you have to be the most citable authority with unique insights that an AI model actually wants to quote.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ══ 9. CTA ══ */}
      <section className="cta section section--dark" id="contact">
        <div className="container container--narrow">
          <p className="eyebrow eyebrow--center eyebrow--light" data-reveal><span className="eyebrow__dot"></span>Start a conversation</p>
          <h2 className="cta__title" data-split>Be the answer AI gives — not the link it skips.</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--ghost-light btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
