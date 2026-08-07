import Image from 'next/image';
import TestimonialStack from '../components/TestimonialStack';
import StepAccordion from '../components/StepAccordion';
import PlatformStrip from '../components/PlatformStrip';
import ExcellenceGrid from '../components/ExcellenceGrid';
import SavingsOffer from '../components/SavingsOffer';
import HomeHeroVideo from '../components/HomeHeroVideo';
import { buildMetadata } from '../lib/meta';
import { TESTIMONIALS } from '../lib/testimonials';
import { SEARCH_WINS } from '../lib/searchWins';
import { HERO_VIDEO_MP4, HERO_VIDEO_WEBM_MOBILE, HERO_VIDEO_MP4_MOBILE, HERO_VIDEO_POSTER } from '../lib/heroImages';
import { HOMEPAGE_FAQ } from '../lib/homepageFaq';

export const metadata = buildMetadata({
  title: 'Los Angeles Internet Marketing & Web Engineering | Gobiya',
  description:
    'Turn organic search and AI assistants into a steady customer pipeline. Built for business owners who need revenue, designers who demand clean code, and marketing teams that need clear ROI.',
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

const BENTO_SERVICES = [
  {
    title: 'Get Found on Google',
    href: '/seo-services/technical-seo',
    image: '/assets/img/developer-dashboard-review.webp',
    spanClass: 'mw-bento-card--lg',
  },
  {
    title: 'Get Quoted by ChatGPT & AI Search',
    href: '/seo-services/geo',
    image: '/assets/img/tech-lab-standup.webp',
    spanClass: 'mw-bento-card--md',
  },
  {
    title: 'Content That Sells Itself',
    href: '/seo-services/content-marketing',
    image: '/assets/img/hallway-code-review.webp',
    spanClass: 'mw-bento-card--sm',
  },
  {
    title: 'Earn Real Backlinks & Authority',
    href: '/seo-services/link-building',
    image: '/assets/img/office-lounge-meeting.webp',
    spanClass: 'mw-bento-card--sm',
  },
  {
    title: 'Turn Site Visitors Into Buyers',
    href: '/seo-services/cro',
    image: '/assets/img/open-office-team-table.webp',
    spanClass: 'mw-bento-card--sm',
  },
];

const winById = (id) => SEARCH_WINS.cards.find((c) => c.id === id);
const STAT_IDS = ['ai-citations', 'impressions', 'clicks'];

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

      {/* ══ 1. Hero ══ */}
      <div data-hero-pin style={{ position: 'relative' }}>
        <section
          className="mw-hero"
          style={{ backgroundImage: `url('${HERO_VIDEO_POSTER}')` }}
        >
          <HomeHeroVideo
            mp4Src={HERO_VIDEO_MP4}
            webmMobileSrc={HERO_VIDEO_WEBM_MOBILE}
            mp4MobileSrc={HERO_VIDEO_MP4_MOBILE}
            poster={HERO_VIDEO_POSTER}
          />
          <div className="mw-hero__overlay" />
          <div className="container">
            <div className="mw-hero__card">
              <div className="mw-hero__eyebrow">Trusted in Los Angeles Since 2010</div>
              <h1 className="mw-hero__title">
                Found First. Chosen Every Time.
              </h1>
              <h2 className="mw-hero__secondary-heading">
                The moment someone searches, you&apos;re already there.
              </h2>
              <div className="mw-hero__actions">
                <a href="/free-site-scan" className="mw-hero__btn">
                  Get Your Free Site Scan
                </a>
                <a href="/process" className="mw-hero__btn mw-hero__btn--ghost">
                  View Our Process
                </a>
              </div>
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

      {/* ══ 3. Competitive Bento Grid Section ══ */}
      <section className="mw-bento-section">
        <div className="container">
          <h2 className="mw-simple__heading" style={{ textAlign: 'center' }}>
            Your Business, Everywhere People Search
          </h2>
          <p className="mw-simple__intro" style={{ textAlign: 'center', marginInline: 'auto' }}>
            Technical fixes, custom web builds, and AI search optimization — all under one roof. Pick what your business needs.
          </p>

          <div className="mw-bento-grid">
            {BENTO_SERVICES.map((service, i) => (
              <a
                key={i}
                href={service.href}
                className={`mw-bento-card ${service.spanClass}`}
                style={{ backgroundImage: `url('${service.image}')` }}
              >
                <div className="mw-bento-card__overlay" />
                <div className="mw-bento-card__content">
                  <h3 className="mw-bento-card__title">{service.title}</h3>
                </div>
              </a>
            ))}
          </div>

          <div className="mw-simple__footer" style={{ marginTop: '2.5rem' }}>
            <a href="/seo-services" className="mw-simple__btn">
              Explore All Services <span>→</span>
            </a>
          </div>
        </div>
      </section>

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
                For over 16 years, Gobiya has delivered honest internet marketing, AI search optimization, and web design for Los Angeles businesses. No restrictive contracts. Just verified rankings, real AI citations, and websites that convert — backed by data you can see for yourself.
              </p>
            </div>
          </div>

          <div className="mw-person__btn-wrap">
            <a href="/free-site-scan" className="mw-person__btn">
              Get Your Free Strategy Review
            </a>
          </div>
        </div>
      </section>

      {/* ══ 5. Proven Search Performance & Case Studies ══ */}
      <section className="mw-stats">
        <div className="container">
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', textAlign: 'center' }}>
            The Numbers, Not the Sales Pitch
          </h3>
          <div className="mw-stats__grid">
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

      {/* ══ 7. The 4-Step Method Section ══ */}
      <section className="mw-steps" id="process">
        <div className="container">
          <p className="mw-steps__sub">Our Proven Approach</p>
          <h2 className="mw-steps__heading">How We Get You There — In 4 Steps</h2>
          <p className="mw-steps__dek">
            A decade of scaling rankings and AI citations, boiled down to four steps.
          </p>

          <div className="mw-steps__grid mw-steps__grid--accordion">
            <StepAccordion title="Step 1: Assess & Audit">
              We scan your site for every technical issue blocking Google and AI engines from finding you — no guesswork, just a clear list.
            </StepAccordion>
            <StepAccordion title="Step 2: Prepare & Rebuild">
              We fix the code, rebuild the architecture, and package your content so search engines can actually index it.
            </StepAccordion>
            <StepAccordion title="Step 3: Market & Optimize">
              We run organic search, content, and AI visibility campaigns built to put your business in front of people ready to buy.
            </StepAccordion>
            <StepAccordion title="Step 4: Scale & Convert">
              We track rankings, traffic, and conversions every day — so growth keeps compounding, not plateauing.
            </StepAccordion>
          </div>

          <div className="mw-steps__btn-wrap">
            <a href="/process" className="mw-steps__btn">
              See the Full Process
            </a>
          </div>
        </div>
      </section>

      {/* ══ 8. Stacked Testimonials ══ */}
      <TestimonialStack />

      {/* ══ 9. Excellence Grid ══ */}
      <ExcellenceGrid />

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
            <a href="/free-site-scan" className="mw-consultation__btn">
              Get a FREE Site Scan <span>→</span>
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
