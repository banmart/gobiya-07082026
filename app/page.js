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
import { HERO_VIDEO_MP4, HERO_VIDEO_MP4_SM, HERO_VIDEO_POSTER } from '../lib/heroImages';
import { HOMEPAGE_FAQ } from '../lib/homepageFaq';

export const metadata = buildMetadata({
  title: 'Los Angeles SEO Company | #1 AI Search & Web Design',
  description:
    'Premier Los Angeles SEO company and web design agency. Proven AI search visibility, technical SEO audits, and custom web builds that drive revenue.',
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
  { title: 'Technical & On-Page SEO', href: '/services/seo' },
  { title: 'AI & GEO Search Optimization', href: '/services/geo' },
  { title: 'Content Marketing & Strategy', href: '/services/content-marketing' },
  { title: 'Digital PR & Link Building', href: '/services/link-building' },
  { title: 'PPC & Paid Advertising', href: '/services/ppc' },
  { title: 'CRO & Web UX', href: '/services/cro' },
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
            mp4SmSrc={HERO_VIDEO_MP4_SM}
            poster={HERO_VIDEO_POSTER}
          />
          <div className="mw-hero__overlay" />
          <div className="container">
            <div className="mw-hero__card">
              <div className="mw-hero__eyebrow">Proudly Serving Los Angeles Since 2010</div>
              <h1 className="mw-hero__title">
                Los Angeles SEO Company &amp; AI Search Optimization Agency
              </h1>
              <p className="mw-hero__excerpt">
                An SEO services company for the age of artificial intelligence. We build custom websites, execute white-hat SEO, and make your business the #1 answer AI search tools quote.
              </p>
              <p className="mw-hero__description">
                Whether you need technical SEO fixes, high-converting web design, or AI citations in ChatGPT and Perplexity, Gobiya delivers transparent, data-backed results with no long-term contracts.
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

      {/* ══ 3. Competitive Overview Section ══ */}
      <section className="mw-simple" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <h2 className="mw-simple__heading">
            Los Angeles SEO Company That Generates Measurable Organic Growth &amp; AI Dominance
          </h2>
          <p className="mw-simple__intro">
            Gobiya is a leading web design &amp; SEO company. Unlike generic marketing agencies that rely on outdated tactics, we combine technical code fixes, custom Next.js web development, and Generative Engine Optimization (GEO) to give your business total search engine control.
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
            <a href="/services" className="mw-simple__btn">
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
            Why You&apos;ll Love Working With Gobiya SEO
          </h2>

          <div className="mw-person__card">
            <figure className="mw-person__figure">
              <Image
                src="/assets/img/sm.jpg"
                alt="Steve Martin — Gobiya SEO"
                width={120}
                height={120}
                className="mw-person__avatar"
              />
              <figcaption className="mw-person__caption">
                Steve Martin — Founder &amp; Lead SEO
              </figcaption>
            </figure>
            <div>
              <h3 className="mw-person__name">
                An SEO Services Company for the Age of Artificial Intelligence
              </h3>
              <p className="mw-person__bio">
                For over 16 years, Gobiya SEO has provided honest, highly reliable SEO services, AI search optimization, and web design for Los Angeles businesses. We don&apos;t lock you into restrictive long-term agency contracts. Instead, we deliver verified ranking growth, AI citations, and high-converting websites backed by transparent performance data.
              </p>
            </div>
          </div>

          <div className="mw-person__btn-wrap">
            <a href="/free-site-scan" className="mw-person__btn">
              Get a Free Account &amp; Competitor Strategy Review Now!
            </a>
          </div>
        </div>
      </section>

      {/* ══ 5. Proven Search Performance & Case Studies ══ */}
      <section className="mw-stats">
        <div className="container">
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', textAlign: 'center' }}>
            Proven Search Performance: Real Verified Results &amp; AI Citations
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
            Live numbers across every site we run search for, from Google Search Console and AI assistant grounding data. Last updated {SEARCH_WINS.asOf}.
          </p>
        </div>
      </section>

      {/* ══ 6. What SEO, Web Design & Digital Marketing Can Do ══ */}
      <section style={{ backgroundColor: 'var(--mw-surface-dark, #0b132b)', color: '#ffffff', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem' }}>
            What Our Full-Service SEO &amp; Web Design Agency Can Do for You
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: '#64ffda' }}>
                What SEO Can Do for You
              </h3>
              <p style={{ lineHeight: 1.6, color: '#e0e6ed' }}>
                Organic SEO captures high-intent customers at the exact moment they search for your services. We fix technical code errors, optimize on-page copy, and build domain trust to put your business at the top of Google Search and Google Maps.
              </p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: '#64ffda' }}>
                What Web Design Can Do for You
              </h3>
              <p style={{ lineHeight: 1.6, color: '#e0e6ed' }}>
                Custom web design engineered with Next.js ensures your site loads instantly and presents a stunning visual brand identity. Fast loading speeds and responsive UX keep visitors engaged and maximize conversion rates.
              </p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: '#64ffda' }}>
                What Digital Marketing &amp; AI Search Can Do for You
              </h3>
              <p style={{ lineHeight: 1.6, color: '#e0e6ed' }}>
                Generative Engine Optimization (GEO) positions your brand as the primary source quoted by ChatGPT, Perplexity, and Google AI Overviews—building a future-proof lead engine for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. The 4-Step Method Section ══ */}
      <section className="mw-steps" id="process">
        <div className="container">
          <p className="mw-steps__sub">Our Proven Approach</p>
          <h2 className="mw-steps__heading">Learn About Gobiya&apos;s Results-Driven 4-Step Method</h2>
          <p className="mw-steps__dek">
            We&apos;ve spent over a decade perfecting our process of scaling search engine rankings and AI citations. Here&apos;s how we do it:
          </p>

          <div className="mw-steps__grid mw-steps__grid--accordion">
            <StepAccordion title="Step 1: Assess & Audit">
              Our technical scan assesses if your site is findable by Google and AI engines, highlighting exact technical issues holding your rankings back.
            </StepAccordion>
            <StepAccordion title="Step 2: Prepare & Rebuild">
              We clean up hidden code errors, optimize your site architecture, and package your company content for optimal search engine indexation.
            </StepAccordion>
            <StepAccordion title="Step 3: Market & Optimize">
              We execute targeted organic search, content marketing, and AI visibility strategies focused on putting your business in front of active buyers.
            </StepAccordion>
            <StepAccordion title="Step 4: Scale & Convert">
              We monitor daily rank tracking, organic traffic, and conversion metrics to ensure continuous revenue growth and maximum ROI.
            </StepAccordion>
          </div>

          <div className="mw-steps__btn-wrap">
            <a href="/process" className="mw-steps__btn">
              View Our Proprietary Process for Business Growth
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
            Frequently Asked Questions (FAQs) — Los Angeles SEO &amp; AI Search
          </h2>
          <p style={{ textAlign: 'center', color: '#e0e6ed', maxWidth: '700px', margin: '0 auto 3rem auto', fontSize: '1.1rem' }}>
            Clear, straight answers on how our Los Angeles SEO company and web design agency helps your business dominate search rankings and AI recommendations.
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
              Get a Free Account &amp; Competitor Strategy Review Now!
            </h2>
            <p className="mw-consultation__dek">
              Our expert team is ready to analyze your website, technical SEO, AI citations, and PPC campaigns. Call now or start your free audit online.
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
