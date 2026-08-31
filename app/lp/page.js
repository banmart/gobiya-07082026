import { CONTACT } from '../../lib/nav';
import { buildMetadata } from '../../lib/meta';
import CountdownBadge from '../../components/CountdownBadge';
import LpOfferForm from '../../components/LpOfferForm';
import SubHero from '../../components/SubHero';
import ClientLogos from '../../components/ClientLogos';
import { heroImage } from '../../lib/heroImages';

export const metadata = buildMetadata({
  title: 'The Custom AI CRM Offer',
  description: 'A custom CRM built for lead generation and nurturing, with AI handling instant replies, lead scoring, and follow-up. Starting at $999. Limited time — ends September 30.',
  path: '/lp',
  robots: { index: false, follow: true },
});

const INCLUDED = [
  {
    title: 'Every Lead in One Place',
    desc: 'Website forms, calls, and emails land in a single dashboard you can see, assign, and track — no more digging through inboxes to find out who reached out.',
  },
  {
    title: 'AI Follow-Up',
    desc: 'New leads get an instant reply and a scheduled follow-up sequence automatically, so no one waits a day to hear back from you.',
  },
  {
    title: 'Lead Scoring',
    desc: 'AI flags which leads are ready to buy now versus just browsing, so your team spends time on the ones worth calling first.',
  },
];

const STEPS = [
  { n: 'Step 1: Scope', d: 'A short call to map out how leads reach you today and what you need the CRM to do. You get a fixed quote before anything starts.' },
  { n: 'Step 2: Build', d: 'We set up your CRM, connect it to your website and inbox, and configure the AI follow-up and lead scoring around your business.' },
  { n: 'Step 3: Launch', d: 'Leads start flowing in and getting followed up on automatically — no more manual data entry or forgotten follow-ups.' },
  { n: 'Step 4: Measure', d: 'You see exactly how many leads came in, how fast they were followed up with, and which ones converted.' },
];

export default async function LpPage({ searchParams }) {
  const params = await searchParams;
  const ref = params.ref || params.utm_source || 'direct';

  return (
    <main id="top">
      <SubHero
        image={heroImage(15)}
        eyebrow="Custom AI CRM · Los Angeles"
        title="A Lead System That Follows Up So You Don't Have To"
        excerpt="Starting at $999"
        dek="A CRM built around how your business actually gets leads, with AI doing the follow-up work so nothing sits in an inbox going cold."
        primary={{ text: 'Request a Quote', href: '?onboarding=true' }}
        secondary={{ text: 'Call 323-744-1338', href: 'tel:+13237441338' }}
      />

      {/* ══ 2. What's included ══ */}
      <section className="mw-simple" id="whats-included">
        <div className="container">
          <h2 className="mw-simple__heading">What&apos;s <em>Included</em></h2>
          <p className="mw-simple__intro">
            One system that captures every lead the moment it comes in, then does the follow-up work
            automatically so nothing falls through the cracks.
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
          <p className="mw-steps__sub">How the CRM Gets Built</p>
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
          <h2 className="mw-navy-banner__title">Claim the Custom AI CRM Offer Before September 30</h2>
          <p className="lp-banner__dek">
            Tell us what you need and Steve will reply within one business day — or call{' '}
            <a href={CONTACT.phoneHref} title="Call Gobiya at 323-744-1338">{CONTACT.phone}</a> and skip the form entirely.
          </p>
          <a href="#claim" className="mw-navy-banner__btn" title="Claim the Custom AI CRM Offer">Claim the Custom AI CRM Offer</a>
          <p className="lp-fine">
            Starting price shown; final price depends on project scope. Includes CRM setup, integration
            with your website and inbox, and AI-powered lead follow-up and scoring. Offer valid through
            September 30, 2026 and cannot be combined with other offers.
          </p>
        </div>
      </section>
    </main>
  );
}
