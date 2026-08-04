import Image from 'next/image';
import TestimonialStack from '../components/TestimonialStack';
import StepAccordion from '../components/StepAccordion';
import PlatformStrip from '../components/PlatformStrip';
import ExcellenceGrid from '../components/ExcellenceGrid';
import LocalAreas from '../components/LocalAreas';
import SavingsOffer from '../components/SavingsOffer';
import HomeHeroVideo from '../components/HomeHeroVideo';
import { buildMetadata } from '../lib/meta';
import { TESTIMONIALS } from '../lib/testimonials';
import { SEARCH_WINS } from '../lib/searchWins';
import { HERO_VIDEO_MP4, HERO_VIDEO_MP4_SM, HERO_VIDEO_POSTER } from '../lib/heroImages';

export const metadata = buildMetadata({
  title: 'AI SEO Los Angeles | SEO Agency | SEO Professional | Gobiya',
  description:
    'AI SEO Los Angeles businesses call direct: an SEO agency where an SEO professional does the work. Technical SEO, AI visibility and content that gets you cited.',
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

// The "Our Team Does it All For You" marquee. Titles match NAV_TITLES in
// lib/serviceIndex.js so the card, the sidebar and the /services index all name
// a service the same way. Order runs the funnel: rankings → AI → content →
// authority → ads → conversion.
const SIMPLE_SERVICES = [
  { title: 'Technical & On-Page SEO', href: '/services/seo' },
  { title: 'AI & GEO Search Optimization', href: '/services/geo' },
  { title: 'Content Marketing & Strategy', href: '/services/content-marketing' },
  { title: 'Digital PR & Link Building', href: '/services/link-building' },
  { title: 'PPC & Paid Advertising', href: '/services/ppc' },
  { title: 'CRO & Web UX', href: '/services/cro' },
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
const STAT_IDS = ['ai-citations', 'impressions', 'clicks'];

export default function Home() {
  return (
    <main id="top">
      {/* ══ 1. Hero directly below menubar ══
          The still here is frame 0 of the scrub video, not a slot on the hero
          rotation. It has to be: the background shows through until the video
          paints, and anything other than the video's own first frame reads as a
          cut. See HERO_VIDEO_POSTER in lib/heroImages.js. */}
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
              AI SEO That Makes You the Business Los Angeles Finds First
            </h1>
            <p className="mw-hero__excerpt">
              AI SEO Los Angeles businesses call direct — an SEO agency where an SEO professional does the work. Celebrating 16 Years of Local Service!
            </p>
            <p className="mw-hero__description">
              When rankings drop, Call Gobiya to Help! Expert SEO, paid advertising, Onpage &amp; Content publishing services AI can rely on for citing your business above your competitors.
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

      {/* ══ 2. Platform Strip ══ */}
      <PlatformStrip />

      {/* ══ 3. Our Team Does it All For You ══ */}
      <section className="mw-simple">
        <div className="container">
          <h2 className="mw-simple__heading">
            Our Team Does it All For You
          </h2>
          <p className="mw-simple__intro">
            Whether you have a drop in rankings, not found in AI, or not getting a return from ads, our experts have you covered the whole way.
          </p>
        </div>

        {/* The track holds the service list twice and travels -50%, so the
            second copy is exactly where the first started when the loop
            restarts. Copy 1 is hidden from assistive tech and taken out of the
            tab order — it is the same six links a second time. */}
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
                  {/* The card itself is a plain div — this is the only link in
                      it. Its ::after stretches over the whole card, so clicking
                      anywhere still works without nesting or duplicating an
                      anchor. */}
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
              View All Services <span>→</span>
            </a>
          </div>
        </div>
      </section>



      {/* Solid Navy Divider Line */}
      <div className="mw-navy-divider" />

      {/* ══ 5. Trusted Los Angeles SEOs ══ */}
      <section className="mw-person">
        <div className="container">
          <h2 className="mw-person__heading">Trusted Los Angeles SEOs</h2>

          <div className="mw-person__card">
            {/* Avatar and its caption share the grid's first column, so the
                caption sits under the picture instead of becoming a third
                column of its own. */}
            <figure className="mw-person__figure">
              <Image
                src="/assets/img/sm.jpg"
                alt="Steve Martin — Gobiya SEO"
                width={120}
                height={120}
                className="mw-person__avatar"
              />
              <figcaption className="mw-person__caption">
                Steve Martin — SEO Expert
              </figcaption>
            </figure>
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

      {/* ══ 6. By the Numbers Banner ══ */}
      <section className="mw-stats">
        <div className="container">
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

      {/* ══ 8. The 4-Step Method Section ══ */}
      <section className="mw-steps" id="process">
        <div className="container">
          <p className="mw-steps__sub">Our Proven Approach</p>
          <h2 className="mw-steps__heading">The Gobiya 4-Step Method</h2>
          <p className="mw-steps__dek">
            We&apos;ve spent over a decade perfecting the process of scaling search and AI rankings. Here&apos;s the result:
          </p>

          <div className="mw-steps__grid mw-steps__grid--accordion">
            <StepAccordion title="Step 1: Assess">
              Our technical scan helps you determine if your site is findable by Google and AI tools, and what exact steps to take before launching your growth campaign.
            </StepAccordion>
            <StepAccordion title="Step 2: Prepare">
              Once we begin, we clean up hidden code errors, optimize your site architecture, and package your company content for optimal presentation.
            </StepAccordion>
            <StepAccordion title="Step 3: Market">
              We develop and execute a strategic search &amp; AI marketing campaign focused on placing your business directly in front of high-intent buyers.
            </StepAccordion>
            <StepAccordion title="Step 4: Scale">
              We&apos;re with you every step of the way until your search leads clear, providing continuous optimization and guidance throughout the process.
            </StepAccordion>
          </div>

          <div className="mw-steps__btn-wrap">
            <a href="/process" className="mw-steps__btn">
              View Our Proprietary Process for Business Growth
            </a>
          </div>
        </div>
      </section>

      {/* ══ 9. Pinned Stacked Testimonials ══ */}
      <TestimonialStack />

      {/* ══ Excellence in Every Service ══ */}
      <ExcellenceGrid />

      {/* ══ Quality Services For Our Local Communities ══ */}
      <LocalAreas />

      {/* ══ Exclusive Gobiya Savings / Coupon Section ══ */}
      <SavingsOffer />

      {/* ══ 10. Schedule a Free Consultation Calendar Section ══ */}

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
