import Image from 'next/image';
import { buildMetadata } from '../lib/meta';
import { TESTIMONIALS } from '../lib/testimonials';
import { SEARCH_WINS } from '../lib/searchWins';

export const metadata = buildMetadata({
  title: 'Gobiya — Los Angeles SEO Consultants & AI Search Optimization',
  description:
    'Independent Web AI & SEO consulting firm in Los Angeles specializing in technical SEO, search engine ranking, and Generative Engine Optimization (GEO).',
  path: '/',
});

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

export default function Home() {
  return (
    <main id="top">

      {/* ══ 1. Hero directly below menubar ══ */}
      <section
        className="mw-hero"
        style={{ backgroundImage: `url('/assets/img/office-collage-montage.webp')` }}
      >
        <div className="mw-hero__overlay" />
        <div className="container">
          <div className="mw-hero__card">
            <h1 className="mw-hero__title">
              Search and AI visibility, run by the person you actually hired.
            </h1>
            <p className="mw-hero__excerpt">
              Gobiya is an independent Los Angeles consultancy. Steve Martin has optimized small and mid-sized businesses for Google, ChatGPT and Perplexity since 2010 — and leads every account himself. No account managers. No long-term contracts.
            </p>
            <div className="mw-hero__actions">
              <a href="/free-site-scan" className="mw-book__btn-solid">
                Get Your Free Site Scan
              </a>
              <a href="#process" className="mw-hero__btn">
                View Our Process
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. Trust Bar / Client Logo Strip ══ */}
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

      {/* ══ 3. Meet Your Point Person ══
          Sits ahead of the methodology on purpose: the named practitioner is the
          differentiator no competing agency can copy, so it should land before
          any process explanation. */}
      <section className="mw-person">
        <div className="container">
          <h2 className="mw-person__heading">Meet Your Point Person</h2>

          <div className="mw-person__card">
            <Image
              src="/assets/img/sm.jpg"
              alt="Steve Martin"
              width={120}
              height={120}
              className="mw-person__avatar"
            />
            <div>
              <h3 className="mw-person__name">Steve Martin</h3>
              <p className="mw-person__role">Founder and Head of Search Strategy</p>
              <p className="mw-person__bio">
                Steve founded Gobiya in 2010 and is an active practitioner in technical search engine optimization, content strategy, and AI search systems. He has over 15 years of experience helping small and medium-sized businesses dominate Google, ChatGPT, and Perplexity search results. Steve manages sell-side search strategies and leads every client account directly.
              </p>
            </div>
          </div>

          <div className="mw-person__btn-wrap">
            <a href="/about/steve-martin" className="mw-person__btn">
              See Our Full Team
            </a>
          </div>
        </div>
      </section>

      {/* ══ 4. The burned-buyer objection ══ */}
      <section className="mw-simple">
        <div className="container">
          <h2 className="mw-simple__heading">
            You&apos;ve probably been burned by an SEO agency before
          </h2>
          <p className="mw-simple__intro">
            Most owners we talk to have already paid someone for a year of reports they couldn&apos;t read and rankings that never turned into phone calls. Here&apos;s how we&apos;re set up differently.
          </p>

          <div className="mw-simple__grid">
            <div>
              <h3 className="mw-simple__col-title">You work with the person doing the work</h3>
              <p className="mw-simple__col-desc">
                There are no account managers here. Steve runs your account, does the analysis, and answers your email himself. That&apos;s also the honest limit on how many clients we take at once.
              </p>
            </div>
            <div>
              <h3 className="mw-simple__col-title">Leave whenever you want</h3>
              <p className="mw-simple__col-desc">
                No long-term contracts and no cancellation penalty. We re-earn the work every month, which is the only real guarantee anyone in this business can honestly offer you.
              </p>
            </div>
            <div>
              <h3 className="mw-simple__col-title">Numbers you can check yourself</h3>
              <p className="mw-simple__col-desc">
                You keep direct access to your own Search Console and analytics — not a slide deck we assembled for you. If a month was flat, you&apos;ll see it before we tell you.
              </p>
            </div>
          </div>
        </div>
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

      {/* ══ 6. Full-Width Navy Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Go with a team of experts whose only specialty is growing your business
          </h2>
          <a href="/free-site-scan" className="mw-navy-banner__btn">
            Schedule a Consultation
          </a>
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

      {/* ══ 8. Real Stories from Real Clients ══ */}
      <section className="mw-stories">
        <div className="container">
          <h2 className="mw-stories__heading">Real Stories from Real Clients</h2>

          <div className="mw-stories__list">
            {TESTIMONIALS.slice(0, 6).map((item, idx) => (
              <div
                key={idx}
                className="mw-story-card"
                style={{ backgroundImage: `url('${STORY_IMAGES[idx % STORY_IMAGES.length]}')` }}
              >
                <div className="mw-story-card__content">
                  <div className="mw-story-card__meta">
                    Industry: <strong>{item.role}</strong> Region: <strong>Southern California</strong>
                  </div>
                  <p className="mw-story-card__desc">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#0B1E36', fontWeight: '700' }}>
                    — {item.name ? `${item.name}, ` : ''}{item.company}
                  </div>
                  <a href={item.href} className="mw-story-card__btn">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. Navy Full-Width Banner ("Scaling Your Business is a Big Deal") ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            Scaling Your Business is a Big Deal
          </h2>
          <p style={{ maxWidth: '44rem', marginInline: 'auto', marginBottom: '2rem', color: '#CBD5E1', fontSize: '1.0625rem', lineHeight: '1.65' }}>
            After investing your blood, sweat, and tears into an enterprise that has provided for you, your family and your employees, the moment has finally come for you to start a new chapter in your digital growth.
          </p>
          <a href="/#process" className="mw-navy-banner__btn">
            View Our Process
          </a>
        </div>
      </section>

      {/* ══ 10. Featured Guide Resource ("The Art of AI Search & SEO") ══ */}
      <section className="mw-book">
        <div className="container">
          <div className="mw-book__grid">
            <div className="mw-book__cover">
              <div className="mw-book__cover-border" />
              <div className="mw-book__cover-top">Gobiya Technical Series</div>
              <div className="mw-book__cover-title">THE ART OF AI SEARCH</div>
              <div className="mw-book__cover-tag">The Complete Guide to Search &amp; AI Visibility</div>
            </div>

            <div>
              <h2 className="mw-book__title">The Art of AI Search</h2>
              <p className="mw-book__subtitle">
                The Complete Guide to Search &amp; AI Visibility for Small &amp; Medium Businesses
              </p>
              <p className="mw-book__desc">
                Less than 10% of businesses actually capture top ChatGPT and Google recommendations. So what does this mean for you? Think about it – with a significant amount of your future lead volume tied to digital discovery, mastering your AI visibility is one of the most critical decisions you&apos;ll make.
              </p>

              <div className="mw-book__author">
                <Image
                  src="/assets/img/sm.jpg"
                  alt="Steve Martin"
                  width={40}
                  height={40}
                  className="mw-book__author-img"
                />
                <span>Written by <strong>Steve Martin</strong>, Founder of Gobiya</span>
              </div>

              <div className="mw-book__actions">
                <a href="/downloads/the-art-of-ai-search.pdf" className="mw-book__btn-solid" download>
                  Download Free Guide (PDF)
                </a>
                <a href="/insights" className="mw-hero__btn">
                  Read Insights
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 11. Schedule a Free Consultation Calendar Section ══ */}
      <section className="mw-consultation">
        <div className="container">
          <div className="mw-consultation__grid">
            <div>
              <h2 className="mw-consultation__title">Schedule a Free Consultation</h2>
              <p className="mw-consultation__sub">Growing your business is a big deal</p>
              <p className="mw-consultation__dek">
                You&apos;ve invested your blood, sweat, and tears into an enterprise that has provided for you, your family and your employees. The moment has finally come for you to start a new chapter in your digital growth. Explore your options now.
              </p>
              <a href="/free-site-scan" className="mw-consultation__btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Schedule Your Consultation
              </a>
            </div>

            <div>
              <div className="mw-calendar-mockup">
                <div className="mw-calendar__header">Select a Date &amp; Time</div>
                <div className="mw-calendar__weekdays">
                  <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
                <div className="mw-calendar__days">
                  <span className="mw-calendar__day mw-calendar__day--muted">26</span>
                  <span className="mw-calendar__day mw-calendar__day--muted">27</span>
                  <span className="mw-calendar__day mw-calendar__day--muted">28</span>
                  <span className="mw-calendar__day mw-calendar__day--muted">29</span>
                  <span className="mw-calendar__day mw-calendar__day--muted">30</span>
                  <span className="mw-calendar__day mw-calendar__day--muted">31</span>
                  <span className="mw-calendar__day">01</span>

                  <span className="mw-calendar__day">02</span>
                  <span className="mw-calendar__day">03</span>
                  <span className="mw-calendar__day">04</span>
                  <span className="mw-calendar__day">05</span>
                  <span className="mw-calendar__day">06</span>
                  <span className="mw-calendar__day mw-calendar__day--selected">07</span>
                  <span className="mw-calendar__day">08</span>

                  <span className="mw-calendar__day">09</span>
                  <span className="mw-calendar__day">10</span>
                  <span className="mw-calendar__day">11</span>
                  <span className="mw-calendar__day">12</span>
                  <span className="mw-calendar__day">13</span>
                  <span className="mw-calendar__day">14</span>
                  <span className="mw-calendar__day">15</span>

                  <span className="mw-calendar__day">16</span>
                  <span className="mw-calendar__day">17</span>
                  <span className="mw-calendar__day">18</span>
                  <span className="mw-calendar__day">19</span>
                  <span className="mw-calendar__day">20</span>
                  <span className="mw-calendar__day">21</span>
                  <span className="mw-calendar__day">22</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
