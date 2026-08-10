import Image from 'next/image';
import PlatformStrip from '../components/PlatformStrip';
import ExcellenceGrid from '../components/ExcellenceGrid';
import SavingsOffer from '../components/SavingsOffer';
import IridescenceCanvas from '../components/IridescenceCanvas';
import HeroScanWidget from '../components/HeroScanWidget';
import NextMoveCards from '../components/NextMoveCards';
import ReliableService from '../components/ReliableService';
import HomeFeatureRows from '../components/HomeFeatureRows';
import { buildMetadata } from '../lib/meta';
import { SEARCH_WINS } from '../lib/searchWins';
import { HOMEPAGE_FAQ } from '../lib/homepageFaq';

// Written to the page as it now reads: the two outcomes the hero promises
// (found on Google, quoted by AI), the three things the service rail sells,
// and the no-contract line the feature rows make. 48 and 153 characters —
// the title already carries the brand, so buildMetadata appends no suffix.
export const metadata = buildMetadata({
  title: 'SEO, AI Search & Web Design | Gobiya',
  description:
    'Get found on Google and quoted by ChatGPT. Technical SEO, AI search optimization and web builds for businesses. Month to month, no contracts.',
  path: '/',
});

const winById = (id) => SEARCH_WINS.cards.find((c) => c.id === id);
const STAT_IDS = ['ai-citations', 'impressions', 'clicks'];

// The four numbered steps, previously an accordion. They read as a single
// left-to-right method now, so the copy has to stay short enough to sit in a
// column — one sentence each, no exceptions.
const METHOD_STEPS = [
  {
    lead: 'Assess',
    rest: 'your site',
    body: 'We scan for every technical issue blocking Google and AI engines from finding you.',
  },
  {
    lead: 'Rebuild',
    rest: 'what’s broken',
    body: 'We fix the code and package your content so search engines can actually index it.',
  },
  {
    lead: 'Market',
    rest: 'and optimize',
    body: 'Organic search, content and AI visibility campaigns aimed at people ready to buy.',
  },
  {
    lead: 'Scale',
    rest: 'and convert',
    body: 'We track rankings, traffic and conversions daily so growth keeps compounding.',
  },
];

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ══ 1. Hero ══
             Background is React Bits GradientWaves in brand colors. Nothing
             pins or scrubs any more — the old [data-hero-pin] wrapper went out
             with the scrub video. */}
      <div>
        <section className="mw-hero mw-hero--waves">
          <div className="mw-hero__waves" aria-hidden="true">
            <IridescenceCanvas intensity={0.92} speed={0.65} amplitude={0.12} />
          </div>
          <div className="mw-hero__overlay" />
          <div className="container">
            <div className="mw-hero__layout">
              <div className="mw-hero__card">
                <div className="mw-hero__eyebrow">Trusted Since 2010</div>
                <h1 className="mw-hero__title">
                  Found First. Chosen Every Time.
                </h1>
                <h2 className="mw-hero__secondary-heading">
                  The moment someone searches, you&apos;re already there.
                </h2>
                <div className="mw-hero__actions">
                  <a href="?onboarding=true" className="mw-hero__btn">
                    Request a Quote
                  </a>
                  <a href="/process" className="mw-hero__btn mw-hero__btn--ghost">
                    View Our Process
                  </a>
                </div>

                <div className="mw-hero__trust">
                  <div className="mw-hero__trust-since">
                    <span>Trusted</span>
                    <strong>since 2010</strong>
                  </div>
                  <div className="mw-hero__trust-rating">
                    <div className="mw-hero__trust-stars" aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <svg key={i} viewBox="0 0 20 20" width="14" height="14">
                          <path
                            fill="currentColor"
                            d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="mw-hero__trust-label">
                      Five-star Google reviews from business owners
                    </span>
                  </div>
                </div>
              </div>

              <HeroScanWidget />
            </div>
          </div>
        </section>
      </div>

      {/* ══ 2. Platform Strip ══ */}
      <PlatformStrip />

      {/* ══ 2b. Hero Statement — relocated hero body copy ══ */}
      <section className="mw-hero-statement">
        <div className="container">
          <p className="mw-hero-statement__text">
            We fix the code, build the site, and get your business quoted by Google, ChatGPT, and Perplexity. No long-term contracts — just results you can check yourself.
          </p>
        </div>
      </section>

      {/* ══ 3. Pick Your Next Move — tabbed service picker ══ */}
      <NextMoveCards />

      <div className="mw-navy-divider" />

      {/* ══ 4. Why You'll Love Working With Us / Value Proposition ══ */}
      <section className="mw-person">
        <div className="container">
          <h2 className="mw-person__heading">
            An Agency That Actually Delivers
          </h2>

          <div className="mw-person__card">
            <figure className="mw-person__figure">
              <div className="mw-avatar-stack">
                <Image
                  src="/assets/img/sm.webp"
                  alt="Steve Martin — Gobiya Founder"
                  width={116}
                  height={116}
                  className="mw-avatar-stack__main"
                />
                <Image
                  src="/assets/img/grid-1-sm.webp"
                  alt="Gobiya Strategy & Operations"
                  width={116}
                  height={116}
                  className="mw-avatar-stack__secondary"
                />
              </div>
              <figcaption className="mw-person__caption">
                Steve Martin — Founder &amp; Lead Internet Marketer
              </figcaption>
            </figure>
            <div>
              <h3 className="mw-person__name">
                Built for the Age of AI Search
              </h3>
              <p className="mw-person__bio">
                For over 16 years, Gobiya has delivered honest internet marketing, AI search optimization, and web design for businesses. No restrictive contracts. Just verified rankings, real AI citations, and websites that convert — backed by data you can see for yourself.
              </p>
            </div>
          </div>

          <div className="mw-person__btn-wrap">
            <a href="?onboarding=true" className="mw-person__btn">
              Get Your Free Strategy Review
            </a>
          </div>
        </div>
      </section>

      {/* ══ 5. Proven Search Performance — stat bar floating on a dark band ══ */}
      <section className="mw-stats mw-stats--band">
        <div className="container">
          <h3 className="mw-stats__heading">
            The numbers, not the sales pitch
          </h3>
          <div className="mw-stats__grid mw-stats__grid--bar">
            <div>
              <div className="mw-stats__num">16</div>
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
            Live numbers from every site we run search for — pulled straight from Google Search Console and AI assistant grounding data. Updated {SEARCH_WINS.asOf}.
          </p>
        </div>
      </section>

      {/* ══ 6. The 4-Step Method — numbered row inside a single panel ══ */}
      <section className="mw-method" id="process">
        <div className="container">
          <div className="mw-method__panel">
            <div className="mw-method__head">
              <h2 className="mw-method__heading">Your search visibility, in four steps</h2>
              <a href="/process" className="mw-method__more">See the full process &rarr;</a>
            </div>

            <ol className="mw-method__grid">
              {METHOD_STEPS.map((step, i) => (
                <li key={step.lead} className="mw-method__step">
                  <div className="mw-method__marker">
                    <span className="mw-method__num">{i + 1}</span>
                    <span className="mw-method__arrow" aria-hidden="true">
                      {i === METHOD_STEPS.length - 1 ? '✓✓' : '→'}
                    </span>
                  </div>
                  <h3 className="mw-method__step-title">
                    <strong>{step.lead}</strong> {step.rest}
                  </h3>
                  <p className="mw-method__step-body">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ══ 7. Reliable Service — reviews + client marks ══ */}
      <ReliableService />

      {/* ══ 8. Alternating feature rows ══ */}
      <HomeFeatureRows />

      {/* ══ 9. Excellence Grid ══ */}
      <ExcellenceGrid />

      {/* ══ 10. Live dashboard band ══ */}
      <section className="mw-appband">
        <div className="container">
          <div className="mw-appband__inner">
            <div className="mw-appband__copy">
              <h2 className="mw-appband__title">Your results, on a dashboard you can open</h2>
              <p className="mw-appband__dek">
                Every client gets a live view of rankings, traffic, AI citations and
                leads. Same numbers we look at — no monthly slide deck, no spin.
              </p>
              <div className="mw-appband__badges">
                <a href="?onboarding=true" className="mw-appband__badge">
                  <span className="mw-appband__badge-sub">Start here</span>
                  <span className="mw-appband__badge-main">Request Quote</span>
                </a>
                <a href="/login" className="mw-appband__badge mw-appband__badge--ghost">
                  <span className="mw-appband__badge-sub">Already a client</span>
                  <span className="mw-appband__badge-main">Client Login</span>
                </a>
              </div>
            </div>
            <div className="mw-appband__art">
              <Image
                src="/assets/img/analytics-dashboard-review.webp"
                alt="The Gobiya client dashboard showing rankings and traffic"
                width={720}
                height={480}
                className="mw-appband__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 11. Savings Offer ══ */}
      <SavingsOffer />

      {/* ══ 12. Consultation CTA Section ══ */}
      <section className="mw-consultation">
        <div className="container">
          <div className="mw-consultation__content">
            <p className="mw-consultation__sub">We&apos;re Here When You Need Us</p>
            <h2 className="mw-consultation__title">
              Get Your Free Strategy Review
            </h2>
            <p className="mw-consultation__dek">
              We&apos;ll analyze your site, your internet marketing, your AI citations, and your PPC — free. Call now or start your audit online.
            </p>
            <a href="?onboarding=true" className="mw-consultation__btn">
              Request a Quote <span>→</span>
            </a>
            <div className="mw-cta-arrow-wrapper">
              <img src="/assets/img/get-started-grey.png" alt="Get started today" className="mw-arrow-img mw-arrow-img--light" />
              <img src="/assets/img/get-started-arrow.png" alt="Get started today" className="mw-arrow-img mw-arrow-img--dark" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
