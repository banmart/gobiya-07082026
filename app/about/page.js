import Breadcrumbs from '../../components/Breadcrumbs';
import SubHero from '../../components/SubHero';
import PlatformStrip from '../../components/PlatformStrip';
import TestimonialStack from '../../components/TestimonialStack';
import ClientLogos from '../../components/ClientLogos';
import { buildMetadata } from '../../lib/meta';
import { heroImage } from '../../lib/heroImages';
import { yearsInBusiness } from '../../lib/authority';

// This page said "16 years" in three places against a 2009 founding date it
// also states twice. The figure is derived from lib/authority.js now, so the
// two halves of the same sentence cannot disagree and neither ages badly.
const YEARS = yearsInBusiness();

export const metadata = buildMetadata({
  title: `About Gobiya | ${YEARS} Years of Getting LA Businesses Found`,
  description:
    'About Gobiya: since 2009, a Los Angeles team that answers its own phone and does its own work — honest search growth, fast web builds, no lock-in deals.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main id="top">
      {/* ══ 2. Hero ══
          The shared SubHero, same as the service and city pages, on position 22
          of the rotation in lib/heroImages.js. */}
      <SubHero
        image={heroImage(22)}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'What We Do' },
        ]}
        eyebrow="About Gobiya · Los Angeles Since 2009"
        title={`About Gobiya: ${YEARS} Years of Getting Los Angeles Businesses Found`}
        excerpt="Expert Service in Los Angeles and the San Fernando Valley"
        dek="About Gobiya in one line: technical SEO, AI search, and web architecture for local businesses — same team on every job, no account managers in between."
        primary={{ text: 'Request a Quote', href: '?onboarding=true' }}
        secondary={{ text: 'Meet Steve Martin', href: '/about/steve-martin' }}
        icon={<svg viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
      />

      {/* ══ 3. Platform Strip ══ */}
      <PlatformStrip />

      {/* ══ 4. Who We Are ══ */}
      <section className="mw-simple">
        <div className="container">
          <h2 className="mw-simple__heading">
            Los Angeles SEO Company that is Dedicated to Honesty &amp; Integrity
          </h2>
          <p className="mw-simple__intro">
            If you are searching for a SEO company in Los Angeles that proudly provides honest, reliable, and trustworthy service, no need to look any further than Gobiya SEO. Since 2009, we&apos;ve been a beacon in the community for our wide spectrum of high-quality SEO services that are always done to make you successful online. From SEO and PPC management to the new AI SEO, GEO, and other new technologies, our professional SEOs are trained to excel in these services that meets standards and guidelines. We are also Google Partners so you can rest assured knowing that your business is in good hands.
          </p>
          <p className="mw-simple__excerpt">
            Ready to make the call to one of the most trusted local SEOs in the area? Reach out to us at{' '}
            <a href="tel:+13237441338" title="Call Gobiya at 323-744-1338">(323) 744-1338</a>!
          </p>
        </div>
      </section>

      {/* ══ 5. Mid Navy CTA Banner ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">
            We Are The Real Deal Los Angeles SEOs
          </h2>
          <p className="mw-navy-banner__dek">
            For {YEARS} years, Gobiya SEO has earned a diamond reputation with business owners in the Greater Los Angeles area including the San Fernando Valley and beyond. We are proud to be the only SEOs that our clients choose for any of their website needs. This is why for every SEO service that we perform, we make sure that we carry the values that our founder, Steve Martin has instilled in us, and that is to serve our local community with integrity and help our neighbors with any of their SEO needs at a fair, competitive rate. No matter the size of the SEO project you face, we build, analyze, and implement ourselves and never use other &apos;overseas&apos; SEOs to ensure the best user experience for your clients.
          </p>
          <p className="mw-navy-banner__note">
            Ready to make the call to one of the most trusted local SEOs in the area? Reach out to us at{' '}
            <a href="tel:+13237441338" title="Call Gobiya at 323-744-1338">(323) 744-1338</a>!
          </p>
          <a href="?onboarding=true" title="Contact Us To See How We Can Help You" className="mw-navy-banner__btn">
            Contact Us To See How We Can Help You
          </a>
        </div>
      </section>

      {/* ══ 7. The 4-Step Method ══ */}
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
                Our assessment helps you determine if you&apos;re ready to scale now and what steps to take before beginning the search process.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 2: Prepare</div>
              <p className="mw-step-card__desc">
                Once you decide to scale, we begin to professionally package your company before going to market, ensuring optimal presentation.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 3: Market</div>
              <p className="mw-step-card__desc">
                We develop and execute a strategic marketing campaign focused on targeting the right type of buyers, including high-intent organic leads.
              </p>
            </div>
            <div className="mw-step-card">
              <div className="mw-step-card__header">Step 4: Scale</div>
              <p className="mw-step-card__desc">
                We&apos;re with you every step of the way until the growth clears, providing support and guidance throughout the process.
              </p>
            </div>
          </div>

          <div className="mw-steps__btn-wrap">
            <a href="/process" title="View our proprietary process for growing a business" className="mw-steps__btn">
              View our proprietary process for growing a business
            </a>
          </div>
        </div>
      </section>

      {/* ══ 8. Real Stories from Real Clients ══ */}
      <TestimonialStack />

      {/* Client Logo Strip */}
      <ClientLogos />

      {/* ══ 5. Schedule a Consultation CTA ══
          No calendar mockup here: .mw-phone-mockup has no CSS anywhere in the
          project, so it rendered as a run of unstyled digits at the foot of the
          page. .mw-consultation__content is the wrapper that is actually
          styled for this block. */}
      <section className="mw-consultation">
        <div className="container">
          <div className="mw-consultation__content">
            <p className="mw-consultation__sub">Scaling your business is a big deal</p>
            <h2 className="mw-consultation__title">Schedule a Free Consultation</h2>
            <p className="mw-consultation__dek">
              You&apos;ve invested your blood, sweat, and tears into an enterprise that has provided for you, your family and your employees. The moment has finally come for you to start a new chapter in your digital growth. Explore your options now.
            </p>
            <a href="?onboarding=true" title="Schedule Your Consultation" className="mw-consultation__btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule Your Consultation
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
