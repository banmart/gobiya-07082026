import Image from 'next/image';
import { LogoMark } from '../../components/Logo';
import { CONTACT } from '../../lib/nav';
import { buildMetadata } from '../../lib/meta';
import CountdownBadge from '../../components/CountdownBadge';
import LpOfferForm from '../../components/LpOfferForm';

export const metadata = buildMetadata({
  title: 'The Q3 Growth Bundle Offer',
  description: 'Custom Next.js/React web development starting at $3,500, with an integrated CRM and a YouTube AI video pre-roll ad campaign included. Limited time — ends September 30.',
  path: '/lp',
  robots: { index: false, follow: true },
});

export default async function LpPage({ searchParams }) {
  const params = await searchParams;
  const ref = params.ref || params.utm_source || 'direct';

  return (
    <main id="top">
      <header style={{ padding: '1.5rem clamp(1.5rem, 5vw, 3rem)' }}>
        <a href="/" aria-label="Gobiya — home" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
          <LogoMark size={30} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem' }}>Gobiya</span>
        </a>
      </header>

      <section className="section offer-section" id="lp-offer">
        <div className="container">
          <div className="offer-card" data-reveal>
            <Image
              src="/assets/img/office-collage-montage.webp"
              alt="Office background collage"
              fill
              className="offer-card__bg"
              style={{ objectFit: 'cover' }}
              aria-hidden="true"
            />
            <div className="offer-card__content">
              <CountdownBadge targetDate="2026-09-30T23:59:59" />
              <h1 className="offer-card__title">
                The Q3 <span>Growth Bundle</span> Offer
              </h1>
              <div className="offer-card__price-pill">
                Custom Web Dev Starting at <strong>$3,500</strong>
              </div>
              <p className="offer-card__desc">
                Turn your new website into a complete lead generation machine. For a limited time (ends Sept 30th), every custom Next.js or React build includes a fully integrated CRM to manage your leads, plus a professional YouTube AI video pre-roll ad campaign to drive traffic from day one.
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', maxWidth: '32rem', lineHeight: '1.5' }}>
                Starting price shown; final price depends on project scope. Includes one custom Next.js/React build, one integrated CRM setup, and one YouTube AI video pre-roll ad campaign. Offer valid through September 30, 2026 and cannot be combined with other offers.
              </p>
            </div>
            <div className="offer-card__visual">
              <LpOfferForm source={ref} />
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '2rem clamp(1.5rem, 5vw, 3rem)', textAlign: 'center', fontSize: '0.8125rem', color: '#6b7280' }}>
        <p>
          &copy; {new Date().getFullYear()} Gobiya &middot; <a href="/privacy" style={{ color: 'inherit' }}>Privacy</a> &middot; <a href="/terms" style={{ color: 'inherit' }}>Terms</a> &middot; <a href={CONTACT.phoneHref} style={{ color: 'inherit' }}>{CONTACT.phone}</a>
        </p>
      </footer>
    </main>
  );
}
