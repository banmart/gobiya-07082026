import Image from 'next/image';
import TopicMarquee from '../components/TopicMarquee';
import TestimonialStack from '../components/TestimonialStack';
import { buildMetadata } from '../lib/meta';
import { TESTIMONIALS } from '../lib/testimonials';
import { SEARCH_WINS } from '../lib/searchWins';
import { HOMEPAGE_FAQ } from '../lib/homepageFaq';

export const metadata = buildMetadata({
  title: 'Los Angeles Internet Marketing & SEO | Gobiya SEO',
  description:
    'Get white-hat & affordable services from Gobiya Internet Marketing & SEO, a top ranking SEO expert in Los Angeles. We offer AI, GEO, SEO, PPC, Content Marketing, PR & more. Get a FREE Consultation Today!',
  path: '/',
});

const TEXT_LOGOS = [
  'Google Partners',
  'Yelp!',
  'Clutch',
  'ChatGPT',
  'Claude',
  'Perplexity',
  'Facebook Partner',
  'Instagram Partner',
  'GitHub',
  'Next.JS',
  'React',
  'Web 2',
];

const CLIENT_LOGOS = [
  { src: '/assets/img/americanlivescan.webp', alt: 'American Livescan' },
  { src: '/assets/img/smilecenter.webp', alt: 'SmileCenter.com' },
  { src: '/assets/img/totalcapital.webp', alt: 'TotalCapitalInc.Com' },
  { src: '/assets/img/remodelmepros.webp', alt: 'RemodelMePros.com' },
  { src: '/assets/img/safetycentric-logo.png', alt: 'Safety-Centric.com' },
  { src: '/assets/img/dgplumbing-logo.webp', alt: 'DGPlumbingandRooter.com' },
];

const STORY_IMAGES = [
  '/assets/img/smilecenter.webp',
  '/assets/img/americanlivescan.webp',
  '/assets/img/access-control-lady.webp',
  '/assets/img/remodelmepros.webp',
  '/assets/img/totalcapital.webp',
  '/assets/img/hallway-code-review.webp',
  '/assets/img/open-office-desks.webp',
  '/assets/img/office-lounge-meeting.webp',
];

// The stats bar shows real Google Search Console and AI-grounding numbers from
// lib/searchWins.js rather than hardcoded claims. Look cards up by id, never by
// index — the weekly refresh job swaps which metrics are presentable (CTR
// replaces clicks when clicks have no honest window, and so on), so positions
// are not stable. A missing id renders nothing rather than crashing the page.
const winById = (id) => SEARCH_WINS.cards.find((c) => c.id === id);
const STAT_IDS = ['ai-citations', 'impressions', 'position'];

// Same array drives the visible markup and this schema, so the answer a person
// reads is byte-for-byte the answer an AI tool ingests. Matches the pattern in
// app/seo-myths/page.js.
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOMEPAGE_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function Home() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ══ 1. Hero directly below menubar ══ */}
      <section
        className="mw-hero"
        style={{ backgroundImage: `url('/img/Change_room_logo_right_people_202607291545.webp')` }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="mw-hero__bg-video"
          poster="/img/Change_room_logo_right_people_202607291545.webp"
        >
          <source src="/img/Change_room_logo_right_people_202607291545.webm" type="video/webm" />
        </video>
        <div className="mw-hero__overlay" />
        <div className="container">
          <div className="mw-hero__card">
            <div className="mw-hero__eyebrow">Proudly Serving Los Angeles Since 2010</div>
            <h1 className="mw-hero__title">
              Experience Driven. Trusted by Many.
            </h1>
            <p className="mw-hero__excerpt">
              Celebrating 16 Years of Local Service!
            </p>
            <p className="mw-hero__description">
              When rankings drop, Call Gobiya to Help! Expert SEO, paid advertising, Onpage &amp; Content publishing services AI can rely on for citing your business above your competitors.
            </p>
            <div className="mw-hero__actions">
              <a href="/free-site-scan" className="mw-hero__btn">
                Get Your Free Site Scan
              </a>
              <a href="#process" className="mw-hero__btn mw-hero__btn--ghost">
                View Our Process
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. Our Team Does it All For You ══ */}
      <section className="mw-simple">
        <div className="container">
          <h2 className="mw-simple__heading">
            Our Team Does it All For You
          </h2>
          <p className="mw-simple__intro">
            Whether you have a drop in rankings, not found in AI, or not getting a return from ads, our experts have you covered the whole way.
          </p>

          <div className="mw-simple__grid">
            <div className="mw-simple__card">
              <div className="mw-simple__card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div className="mw-simple__card-tag">Ranking Drops &amp; Organic Search</div>
              <h3 className="mw-simple__col-title">Technical &amp; On-Page SEO</h3>
              <p className="mw-simple__col-desc">
                Recover lost rankings and dominate organic search. We perform full technical repairs, schema optimization, and content publishing strategies that keep your business at the top of Google.
              </p>
              <ul className="mw-simple__card-features">
                <li><span>✓</span> Technical Audits &amp; Indexing Repairs</li>
                <li><span>✓</span> On-Page &amp; Schema Optimization</li>
                <li><span>✓</span> Authority &amp; Rank Protection</li>
              </ul>
              <a href="/seo-services" className="mw-simple__card-link">
                Explore SEO Services <span>→</span>
              </a>
            </div>

            <div className="mw-simple__card">
              <div className="mw-simple__card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <div className="mw-simple__card-tag">Not Found in AI</div>
              <h3 className="mw-simple__col-title">AI &amp; GEO Search Optimization</h3>
              <p className="mw-simple__col-desc">
                Ensure your business is cited and recommended when customers search on ChatGPT, Perplexity, and Google AI Overviews. We build entity authority AI models rely on.
              </p>
              <ul className="mw-simple__card-features">
                <li><span>✓</span> LLM Citation Engineering</li>
                <li><span>✓</span> Knowledge Graph &amp; Entity Building</li>
                <li><span>✓</span> AI Answer Engine Content</li>
              </ul>
              <a href="/geo-services-los-angeles" className="mw-simple__card-link">
                Explore GEO Services <span>→</span>
              </a>
            </div>

            <div className="mw-simple__card">
              <div className="mw-simple__card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="mw-simple__card-tag">Low Return on Ads</div>
              <h3 className="mw-simple__col-title">PPC &amp; Paid Advertising</h3>
              <p className="mw-simple__col-desc">
                Stop wasting ad budget on empty clicks. We restructure your Google Ads and paid campaigns around actual lead cost and ROI, turning wasted spend into profitable revenue.
              </p>
              <ul className="mw-simple__card-features">
                <li><span>✓</span> High-ROI Campaign Restructuring</li>
                <li><span>✓</span> Negative Keyword &amp; Bid Control</li>
                <li><span>✓</span> Conversion Rate Optimization</li>
              </ul>
              <a href="/ppc-management-services" className="mw-simple__card-link">
                Explore PPC Services <span>→</span>
              </a>
            </div>
          </div>

          <div className="mw-simple__footer">
            <a href="/services" className="mw-simple__btn">
              View All Services <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══ 3. Trust Bar / Client Logo Strip ══ */}
      <section className="mw-trust">
        <div className="container">
          <h2 className="mw-trust__heading">
            Southern California businesses we&apos;ve run search for since 2010
          </h2>
          <div className="mw-trust__logos">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div key={idx} className="mw-trust__logo-item">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={65}
                  style={{ objectFit: 'contain', maxHeight: '55px', width: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solid Navy Divider Line */}
      <div className="mw-navy-divider" />

      {/* ══ 4. Trusted Los Angeles SEOs ══ */}
      <section className="mw-person">
        <div className="container">
          <h2 className="mw-person__heading">Trusted Los Angeles SEOs</h2>

          <div className="mw-person__card">
            <Image
              src="/assets/img/sm.jpg"
              alt="Steve Martin — Gobiya SEO"
              width={120}
              height={120}
              className="mw-person__avatar"
            />
            <div>
              <h3 className="mw-person__name">Professional SEO Recovery &amp; Service Since 2010</h3>
              <p className="mw-person__bio">
                For over 16 years, the Gobiya SEO team has been completely honest, affordable and reliable SEO services in Los Angeles and throughout the San Fernando Valley. For the time we&apos;ve been doing business, we are proud to have served the local area and community by recovering their websites and pay per click issues.
              </p>
            </div>
          </div>

          <div className="mw-person__btn-wrap">
            <a href="/free-site-scan" className="mw-person__btn">
              Get a FREE Website Scan Today!
            </a>
          </div>
        </div>
      </section>

      {/* ══ Text Logo Marquee Section ══ */}
      <section className="mw-text-marquee-section">
        <TopicMarquee topics={TEXT_LOGOS} />
      </section>

      {/* ══ 5. By the Numbers Banner ══ */}
      <section className="mw-stats">
        <div className="container">
          <div className="mw-stats__grid">
            <div>
              <div className="mw-stats__num">15+</div>
              <div className="mw-stats__label">Years Experience</div>
              <div className="mw-stats__detail">Optimizing search for small and mid-sized businesses since 2010.</div>
            </div>
            {STAT_IDS.map((id) => {
              const card = winById(id);
              if (!card) return null;
              return (
                <div key={id}>
                  <div className="mw-stats__num">
                    {card.display}
                    {card.suffix || ''}
                  </div>
                  <div className="mw-stats__label">{card.label}</div>
                  <div className="mw-stats__detail">
                    {card.detail} <span className="mw-stats__window">{card.window}.</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mw-stats__note">
            Live numbers across every site we run search for, from Google Search Console and AI assistant grounding data. Last updated {SEARCH_WINS.asOf}.
          </p>
        </div>
      </section>

      {/* ══ 7. The 4-Step Method Section ══ */}
      <section className="mw-steps" id="process">
        <div className="container">
          <p className="mw-steps__sub">Our Proven Approach</p>
          <h2 className="mw-steps__heading">The Gobiya 4-Step Method</h2>
          <p className="mw-steps__dek">
            We&apos;ve spent over a decade perfecting the process of scaling search and AI rankings. Here&apos;s the result:
          </p>

          <div className="mw-steps__grid">
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 1: Assess</div>
              <p className="mw-step-card__desc">
                Our technical scan helps you determine if your site is findable by Google and AI tools, and what exact steps to take before launching your growth campaign.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 2: Prepare</div>
              <p className="mw-step-card__desc">
                Once we begin, we clean up hidden code errors, optimize your site architecture, and package your company content for optimal presentation.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 3: Market</div>
              <p className="mw-step-card__desc">
                We develop and execute a strategic search &amp; AI marketing campaign focused on placing your business directly in front of high-intent buyers.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 4: Scale</div>
              <p className="mw-step-card__desc">
                We&apos;re with you every step of the way until your search leads clear, providing continuous optimization and guidance throughout the process.
              </p>
            </div>
          </div>

          <div className="mw-steps__btn-wrap">
            <a href="/#process" className="mw-steps__btn">
              View Our Proprietary Process for Business Growth
            </a>
          </div>
        </div>
      </section>

      {/* ══ 8. Pinned Stacked Testimonials ══ */}
      <TestimonialStack />

      {/* ══ Excellence in Every Service ══ */}
      <section className="mw-excellence">
        <div className="container">
          <h2 className="mw-excellence__heading">
            Excellence in Every Service
          </h2>
          <p className="mw-excellence__intro">
            From our clear communication to our premium output and quality, we always put your business first.
          </p>

          <div className="mw-excellence__grid">
            <div className="mw-excellence__card">
              <div className="mw-excellence__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="mw-excellence__card-title">Communication You Can Count On</h3>
              <p className="mw-excellence__card-desc">
                Our expert SEO strategy team ensures clear, direct, and transparent communication every step of the way — with no account manager middlemen.
              </p>
            </div>

            <div className="mw-excellence__card">
              <div className="mw-excellence__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3 className="mw-excellence__card-title">Transparency You Can Trust</h3>
              <p className="mw-excellence__card-desc">
                You’ll always know what to expect with our open, no-surprise pricing, month-to-month contracts, and free site scans.
              </p>
            </div>

            <div className="mw-excellence__card">
              <div className="mw-excellence__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <h3 className="mw-excellence__card-title">White-Hat Standards You Can Rely On</h3>
              <p className="mw-excellence__card-desc">
                Our team maintains strict search engine guidelines and white-hat SEO practices to protect your brand authority and search rankings.
              </p>
            </div>

            <div className="mw-excellence__card">
              <div className="mw-excellence__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="mw-excellence__card-title">Sixteen Years of Service Excellence</h3>
              <p className="mw-excellence__card-desc">
                Proudly serving Los Angeles and Southern California businesses since 2010 with the same commitment to quality, rankings, and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Quality Services For Our Local Communities ══ */}
      <section className="mw-local-areas">
        <div className="container">
          <h2 className="mw-local-areas__heading">
            Quality Services For Our Local Communities
          </h2>
          <p className="mw-local-areas__intro">
            From SEO recoveries to content and ppc services, we&apos;re committed to keeping business websites across LA running smoothly.
          </p>

          <div className="mw-local-areas__card">
            <div className="mw-local-areas__columns">
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Burbank
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Echo Park
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Glendale
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Hollywood
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Los Feliz
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Pasadena
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Sherman Oaks
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Silver Lake
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Studio City
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> San Fernando Valley
              </div>
              <div className="mw-local-areas__item">
                <span className="mw-local-areas__icon">📍</span> Greater Los Angeles Area
              </div>
              <div className="mw-local-areas__item mw-local-areas__item--highlight">
                <span className="mw-local-areas__icon">✨</span> &amp; Beyond!
              </div>
            </div>
          </div>

          <div className="mw-local-areas__cta">
            <p className="mw-local-areas__cta-text">
              Call us today! <a href="tel:323-744-1338" className="mw-local-areas__phone">323-744-1338</a> or{' '}
              <a href="/free-site-scan" className="mw-local-areas__btn">
                Get a FREE Site Scan <span>→</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ══ Exclusive Gobiya Savings / Coupon Section ══ */}
      <section className="mw-savings">
        <div className="container">
          <div className="mw-savings__box">
            <div className="mw-savings__content">
              <div className="mw-savings__ribbon" />
              <h2 className="mw-savings__title">
                AFFORDABLE SOLUTIONS,<br />EXCEPTIONAL SERVICE
              </h2>
              <h3 className="mw-savings__subtitle">Exclusive Gobiya Savings</h3>
              <p className="mw-savings__desc">
                Keep your website running smoothly and your wallet happy with our latest coupons and special offers.
              </p>
              <a href="/free-site-scan" className="mw-savings__btn">
                SAVE MORE TODAY <span>--→</span>
              </a>
            </div>

            <div className="mw-savings__coupon">
              <div className="mw-savings__coupon-inner">
                <div className="mw-savings__coupon-badge">FREE</div>
                <h4 className="mw-savings__coupon-offer">
                  CRM with any new website build.
                </h4>
                <p className="mw-savings__coupon-validity">
                  Valid Dec 31, 2026
                </p>
                <div className="mw-savings__coupon-actions">
                  <a href="/contact" className="mw-savings__action-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Text
                  </a>
                  <a href="/contact" className="mw-savings__action-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email
                  </a>
                  <a href="/free-site-scan" className="mw-savings__action-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. Schedule a Free Consultation Calendar Section ══ */}

      {/* ══ Consultation CTA Section ══ */}
      <section className="mw-consultation">
        <div className="container">
          <div className="mw-consultation__content">
            <p className="mw-consultation__sub">We&apos;re Here When You Need Us</p>
            <h2 className="mw-consultation__title">
              Don&apos;t Wait, Get More Sales Today!
            </h2>
            <p className="mw-consultation__dek">
              Our expert team is ready to tackle your website, SEO, AI and PPC issues quickly. Call now and get reliable service you can trust.
            </p>
            <a href="/free-site-scan" className="mw-consultation__btn">
              Get a FREE Site Scan <span>→</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
