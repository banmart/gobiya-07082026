import { CONTACT } from '../../lib/nav';
import { buildMetadata } from '../../lib/meta';
import CountdownBadge from '../../components/CountdownBadge';
import LpOfferForm from '../../components/LpOfferForm';
import SubHero from '../../components/SubHero';
import ClientLogos from '../../components/ClientLogos';
import { heroImage } from '../../lib/heroImages';

export const metadata = buildMetadata({
  title: 'The Q3 Growth Bundle Offer',
  description: 'Custom Next.js/React web development starting at $2,500, with an integrated CRM and a YouTube AI video pre-roll ad campaign included. Limited time — ends September 30.',
  path: '/lp',
  robots: { index: false, follow: true },
});

const INCLUDED = [
  {
    title: 'A Custom Next.js Build',
    desc: 'Not a template and not a page builder. A server-rendered site whose content is in the HTML, so search engines and AI crawlers can actually read it — the foundation everything else depends on.',
  },
  {
    title: 'An Integrated CRM',
    desc: 'Every enquiry lands somewhere you can see it, assign it, and follow up on it. Forms and calls are tracked as conversions from day one, so you know which pages produce leads rather than visits.',
  },
  {
    title: 'A YouTube Pre-Roll Campaign',
    desc: 'An AI-produced video ad running as pre-roll, so the site has traffic pointed at it the week it launches instead of waiting on organic to compound.',
  },
];

const STEPS = [
  { n: 'Step 1: Scope', d: 'A short call to establish what you sell, who buys it, and which pages the business actually needs. You get a fixed quote before anything starts.' },
  { n: 'Step 2: Build', d: 'We design and build the site, wire up the CRM, and set conversion tracking so the reporting is honest from the first day it is live.' },
  { n: 'Step 3: Launch', d: 'The site ships, the pre-roll campaign goes live, and traffic starts arriving while the organic foundation begins to compound underneath it.' },
  { n: 'Step 4: Measure', d: 'You see qualified leads by landing page, not vanity sessions. We tune what is working and cut what is not.' },
];

export default async function LpPage({ searchParams }) {
  const params = await searchParams;
  const ref = params.ref || params.utm_source || 'direct';

  return (
    <main id="top">
      <SubHero
        image={heroImage(15)}
        eyebrow="Affordable Solutions, Exceptional Service"
        title="Everything You Need to Grow, Bundled Into One Quarter"
        excerpt="Keep your website running smoothly and your ROI increase with our latest savings and special offers."
        primary={{ text: 'Request a Quote', href: '?onboarding=true' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      {/* ══ 2. What's included ══ */}
      <section className="mw-simple" id="whats-included">
        <div className="container">
          <h2 className="mw-simple__heading">What&apos;s <em>Included</em></h2>
          <p className="mw-simple__intro">
            Three things that normally get quoted separately, bundled into one fixed-scope engagement —
            the site, the system that captures leads from it, and the traffic to prove it works.
          </p>
          <div className="mw-simple__grid">
            {INCLUDED.map((item) => (
              <div key={item.title}>
                <h3 className="mw-simple__col-title">{item.title}</h3>
                <p className="mw-simple__col-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. How it works ══ */}
      <section className="mw-steps mw-steps--plain" id="process">
        <div className="container">
          <p className="mw-steps__sub">How the Bundle Runs</p>
          <h2 className="mw-steps__heading">From Scope to Measurable Leads</h2>
          <p className="mw-steps__dek">
            No long-term contract and no retainer attached to the build. Here is the whole sequence:
          </p>
          <div className="mw-steps__grid">
            {STEPS.map((s) => (
              <div className="mw-step-card" key={s.n}>
                <div className="mw-step-card__header">{s.n}</div>
                <p className="mw-step-card__desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. Client Logo Strip ══ */}
      <ClientLogos />

      {/* ══ 5. Closing CTA ══ */}
      <section className="mw-navy-banner">
        <div className="container">
          <h2 className="mw-navy-banner__title">Claim the Bundle Before September 30</h2>
          <p className="lp-banner__dek">
            Tell us what you need and Steve will reply within one business day — or call{' '}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> and skip the form entirely.
          </p>
          <a href="#claim" className="mw-navy-banner__btn">Claim the Q3 Growth Bundle</a>
          <p className="lp-fine">
            Starting price shown; final price depends on project scope. Includes one custom Next.js/React
            build, one integrated CRM setup, and one YouTube AI video pre-roll ad campaign. Offer valid
            through September 30, 2026 and cannot be combined with other offers.
          </p>
        </div>
      </section>
    </main>
  );
}
