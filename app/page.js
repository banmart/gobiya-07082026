import Image from 'next/image';
import { buildMetadata } from '../lib/meta';
import { CONSULTING_ITEMS } from '../lib/consultingIndex';
import { INSIGHTS } from '../lib/insights';
import { SEARCH_WINS } from '../lib/searchWins';
import { TESTIMONIALS } from '../lib/testimonials';
import CountdownBadge from '../components/CountdownBadge';
import TestimonialRotator from '../components/TestimonialRotator';
import ScrollStory from '../components/ScrollStory';
import HeroQuickForm from '../components/HeroQuickForm';
import TopicMarquee from '../components/TopicMarquee';
import HeroIntroVideo from '../components/HeroIntroVideo';
import { ServiceIcon, PlatformIcon, CircleMark, Swash } from '../components/icons/HandDrawn';

export const metadata = buildMetadata({
  // Was 'Gobiya - Be Seen First'. That is a brand promise, not a title — it
  // targets nothing but the brand name, which a domain with this much
  // authority already wins by default. The brand still leads the H1 and the
  // template appends ' — Gobiya' here anyway, so nothing is lost by spending
  // the title on what people actually search for.
  // Brand stated explicitly: title.template in app/layout.js does not apply
  // to the root page, so nothing appends it here.
  title: 'Gobiya SEO Consultants Los Angeles',
  description:
    'Get found on Google and recommended by ChatGPT. SEO, AI visibility, content, and web design from one accountable Los Angeles team. Free audit.',
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
    desc: 'We fix the behind-the-scenes parts of your site so Google can actually find and read it.',
    d: 'M24 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36M24 14v20M14 24h20',
  },
  {
    title: 'Credible',
    desc: 'We build real trust online — through other websites linking to you and mentions that hold up when people check.',
    d: 'M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11ZM17 24l5 5 9-10',
  },
  {
    title: 'Cited',
    desc: 'We write content in a way that AI tools like ChatGPT choose to quote — not your competitor.',
    d: 'M12 16h8v8c0 5-3 8-8 8M28 16h8v8c0 5-3 8-8 8',
  },
  {
    title: 'Chosen',
    desc: 'We keep improving your website and offers until visitors turn into paying customers.',
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
  const services = CONSULTING_ITEMS;
  const latest = [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <main id="top">

      {/* ══ 1. Hero ══ */}
      <section className="hero" id="hero">
        <div className="container seo-hero__grid">
          <div>
            <h1 className="hero__title" data-split>
              Web AI &amp; <em className="hero__title-accent">SEO Experts<span className="hero__title-swash-wrap"><Swash className="hero__title-swash" /></span></em>
            </h1>
            <p className="hero__sub" data-reveal>We&apos;re an independent Web AI &amp; SEO consulting firm specializing in the optimization and rankings of small and medium-sized businesses.</p>
            <div className="hero__ctas" data-reveal>
              <a href="/onboarding" className="btn btn--solid">Get an AI visibility audit</a>
              <a href="/ai-visibility" className="btn btn--ghost">How AI visibility works</a>
            </div>
          </div>
          <HeroIntroVideo />
        </div>
        <div className="hero__scrub" data-scrub-video>
          <div className="hero__media">
            <video
              src="/assets/videos/gobiyaRace-scrub.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/assets/videos/gobiyaRace-scrub-poster.jpg"
              aria-label="Race video that advances frame by frame as you scroll, illustrating every search as a race to be seen first"
            />
          </div>
        </div>
      </section>
      <TopicMarquee topics={["Los Angeles SEO Agency", "ChatGPT & Perplexity Visibility", "Technical Search Audits", "PPC & CRO Strategy", "Proven Search Console Growth"]} />

      {/* ══ 2.5 Recent search wins ══ */}
      <section className="section" id="search-wins" aria-label="Search Console performance across clients">
        <div className="container">
          <p className="search-wins__note" data-reveal>Real Search Console data from active Gobiya clients across Los Angeles and Southern California.</p>
          <div className="search-wins__grid">
            {SEARCH_WINS.cards.map((c) => (
              <div className="search-wins__card" key={c.id} data-reveal>
                <span className="search-wins__label">{c.label}</span>
                <span className="search-wins__value">
                  <i data-count={c.value} data-decimals={c.decimals}>{c.display}</i>
                  {c.suffix && <em>{c.suffix}</em>}
                </span>
                <p className="search-wins__detail">{c.detail}</p>
                <span className="search-wins__window">{c.window}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2.6 Scroll story: pinned client reel ══ */}
      <ScrollStory />

      {/* ══ 3. Services grid ══ */}
      <section className="section" id="services">
        <div className="container">
          <h2 className="statement statement--small" data-split style={{ textAlign: 'left' }}>Everything your business needs to get found — all from one team.</h2>
          <div className="svc-grid">
            {services.map((s) => (
              <a className="svc-card" href={s.href} key={s.slug} data-reveal>
                <ServiceIcon slug={s.slug} />
                <span className="svc-card__tag">{s.tag}</span>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.desc}</p>
                <span className="link-arrow">Explore{ARROW}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. AI Visibility feature ══ */}
      <section className="geo-section section section--dark" id="geo">
        <div className="container">
          <h2 className="offices__title" data-split>Search didn&apos;t disappear. It moved into a conversation.</h2>
          <p className="offices__intro" data-reveal>We&apos;re not just chasing a higher spot on a Google results page. Most people trust the first answer they get and stop looking — so our job is making sure that answer is you, wherever the question gets asked.</p>
          <ul className="offices__list">
            <li className="offices__row offices__row--3col">
              <span className="offices__city"><PlatformIcon name="Google AI Overviews" />Google AI Overviews</span>
              <span className="offices__addr">Shows a short summary at the top of the page, pulled from a handful of trusted websites</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col">
              <span className="offices__city"><PlatformIcon name="ChatGPT" />ChatGPT</span>
              <span className="offices__addr">Looks up real websites when someone asks for a recommendation or comparison</span>
              <span className="offices__tag">Live</span>
            </li>
            <li className="offices__row offices__row--3col">
              <span className="offices__city"><PlatformIcon name="Perplexity" />Perplexity</span>
              <span className="offices__addr">Built entirely around quoting its sources — you&apos;re either mentioned, or you&apos;re invisible here</span>
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
                Custom Web Dev Starting at <strong className="price-mark">$2,500<CircleMark className="price-mark__circle" /></strong>
              </div>
              <p className="offer-card__desc">
                Turn your new website into a complete lead generation machine. For a limited time (ends Sept 30th), every custom Next.js or React build includes a fully integrated CRM to manage your leads, plus a professional YouTube AI video pre-roll ad campaign to drive traffic from day one.
              </p>
              <a href="/lp?ref=homepage" className="btn btn--solid">Claim Offer</a>
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
      <section className="section" id="capabilities">
        <div className="container container--narrow" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2 className="statement statement--small" data-split>Four things we build for every engagement.</h2>
          <div className="pillars__grid">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title} data-reveal>
                <svg className="pillar__glyph" viewBox="0 0 48 48" width="48" height="48" data-draw aria-hidden="true">
                  <path d={p.d} fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.32" transform="translate(0.8 -0.6) rotate(0.8 24 24)" />
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
      <section className="section section--tint" id="insights">
        <div className="container">
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

      {/* ══ 7.5 Testimonials ══ */}
      <section className="testimonials section section--dark" id="testimonials">
        <div className="container container--narrow">
          <h2 className="statement statement--small" data-split style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {TESTIMONIALS.length} owners, {TESTIMONIALS.length} different problems, one accountable team.
          </h2>
          <TestimonialRotator items={TESTIMONIALS} />
        </div>
      </section>

      {/* ══ 8. FAQ ══ */}
      <section className="faq section section--tint" id="faq">
        <div className="container container--narrow">
          <h2 className="statement statement--small" data-reveal style={{ marginBottom: '3rem' }}>Common questions about our Los Angeles SEO services, plainly explained.</h2>
          <dl className="faq__list">
            <div className="faq__item" data-reveal>
              <dt>What&apos;s changing about search right now?</dt>
              <dd>More people are getting answers straight from AI tools like ChatGPT and Perplexity, not just a list of Google links. These tools look for clear, original information from a business they can trust — not pages stuffed with the same keyword over and over. If your website isn&apos;t built with that in mind, you&apos;re missing a growing part of where people actually search.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How has search changed over the years?</dt>
              <dd>Search used to just match the words on your page to the words someone typed in. Then it got better at understanding what people actually meant. Now, tools like ChatGPT read whole pages and write a summary answer. That means having the most complete page isn&apos;t enough anymore — you need to be a source clear and trustworthy enough that an AI tool wants to quote you.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>What does an SEO company actually do, day to day?</dt>
              <dd>Less blog writing than most people expect. We usually start by checking whether Google — and AI tools — can even read your site properly. From there, we clean up what&apos;s broken, write content people are genuinely searching for, and help other trusted websites mention and link to you. One team handles all of it, instead of passing pieces between different vendors. See how the <a href="/about/approach">full process</a> works from start to finish.</dd>
            </div>
            <div className="faq__item" data-reveal>
              <dt>How do I choose a local SEO company instead of a big national chain?</dt>
              <dd>With a local team, you&apos;re usually talking directly to the person doing the actual work, not an account manager passing along updates from someone overseas. Ask who really works on your account, whether they can show you real, verified results — not just numbers they typed up themselves — and whether they think about AI tools, not just Google. <a href="/work">Our case studies</a> show real results our clients have confirmed.</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ══ 9. CTA ══ */}
      <section className="cta section section--dark" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title" data-split>Ready to see what&apos;s holding your search traffic back?</h2>
          <div className="cta__actions" data-reveal>
            <a href="/onboarding" className="btn btn--solid btn--big">Book a strategy call</a>
            <a href="tel:+13237441338" className="btn btn--ghost btn--ghost-light btn--big">323-744-1338</a>
          </div>
        </div>
      </section>

    </main>
  );
}
