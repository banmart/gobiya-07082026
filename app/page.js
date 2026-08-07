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
  title: 'Los Angeles Internet Marketing Agency | Found First, Chosen Every Time',
  description:
    'Los Angeles Internet Marketing and web design agency built around one outcome: your business as the first answer Google and ChatGPT give. Real rankings, real AI citations, real revenue.',
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

const SIMPLE_SERVICES = [
  { title: 'Get Found on Google', href: '/seo-services/technical-seo' },
  { title: 'Get Quoted by ChatGPT', href: '/seo-services/geo' },
  { title: 'Content That Sells Itself', href: '/seo-services/content-marketing' },
  { title: 'Earn Real Backlinks', href: '/seo-services/link-building' },
  { title: 'Leads Today, Not Someday', href: '/seo-services/ppc' },
  { title: 'Turn Visitors Into Buyers', href: '/seo-services/cro' },
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
              <p className="mw-hero__excerpt">
                The moment someone searches, you&apos;re already there.
              </p>
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

      {/* ══ 3. Competitive Overview Section ══ */}
      <section className="mw-simple" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <h2 className="mw-simple__heading">
            Your Business, Everywhere People Search
          </h2>
          <p className="mw-simple__intro">
            Technical fixes, custom web builds, and AI search optimization — all under one roof. Pick what your business needs.
          </p>
        </div>

        <div className="mw-simple__marquee">
          <div className="mw-simple__track">
            {[0, 1].map((copy) =>
              SIMPLE_SERVICES.map((service) => (
                <div
                  key={`${copy}-${service.href}`}
                  className="mw-simple__card"
                  aria-hidden={copy === 1 ? 'true' : undefined}
                >
                  <h3 className="mw-simple__col-title">{service.title}</h3>
                  <a
                    href={service.href}
                    className="mw-simple__card-link"
                    tabIndex={copy === 1 ? -1 : undefined}
                  >
                    Learn More <span aria-hidden="true">→</span>
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="container">
          <div className="mw-simple__footer">
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
              <Image
                src="/assets/img/sm.jpg"
                alt="Steve Martin — Gobiya Internet Marketing"
                width={120}
                height={120}
                className="mw-person__avatar"
              />
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

      {/* ══ 6. What Internet Marketing, Web Design & AI Search Can Do ══ */}
      <section style={{ backgroundColor: 'var(--mw-surface-dark, #0b132b)', color: '#ffffff', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem' }}>
            What We Actually Do for Your Business
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: '#64ffda' }}>
                Internet Marketing That Gets You Found
              </h3>
              <p style={{ lineHeight: 1.6, color: '#e0e6ed' }}>
                We fix technical errors, optimize your content, and build domain trust — so your business shows up first on Google and Google Maps, right when people are ready to buy.
              </p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: '#64ffda' }}>
                Websites Built to Convert
              </h3>
              <p style={{ lineHeight: 1.6, color: '#e0e6ed' }}>
                Custom-built on Next.js, your site loads instantly and looks sharp on every device. Fast pages keep visitors around — and turn them into customers.
              </p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: '#64ffda' }}>
                Get Quoted by AI, Not Buried by It
              </h3>
              <p style={{ lineHeight: 1.6, color: '#e0e6ed' }}>
                Generative Engine Optimization puts your brand in the answers ChatGPT, Perplexity, and Google AI Overviews give — a lead engine that keeps working even when people stop clicking search results.
              </p>
            </div>
          </div>
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

      {/* ══ 10. Frequently Asked Questions Section ══ */}
      <section style={{ backgroundColor: 'var(--mw-surface, #1c2541)', color: '#ffffff', padding: '4rem 0' }} id="faq">
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>
            Questions? We&apos;ve Got Straight Answers.
          </h2>
          <p style={{ textAlign: 'center', color: '#e0e6ed', maxWidth: '700px', margin: '0 auto 3rem auto', fontSize: '1.1rem' }}>
            No fluff — just what you need to know about how we get your business found.
          </p>

          <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {HOMEPAGE_FAQ.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '1.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                  {faq.q}
                </h3>
                <p style={{ color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
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
