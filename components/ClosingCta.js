import Image from 'next/image';
import { CONTACT } from '../lib/nav';

/* The navy card that closes every page. Copy on the left, one button on the
   right, a phone line under it — the same shape the homepage ends on.

   `phone` defaults on because a sub page is usually the end of the visit and
   the number is the fastest path off it; the homepage turns it off and lets the
   button carry the ask alone. */
export default function ClosingCta({
  title = 'We’re Here When You Need Scalable Growth',
  accent = 'Don’t Wait, Outrank Your Competition Today!',
  dek = 'Our expert team is ready to resolve your search, code, or conversion challenges quickly. Get scalable, reliable results you can trust.',
  cta = { text: 'Schedule Your Free Consultation', href: '?onboarding=true' },
  phone = false,
}) {
  return (
    <section className="gb-close">
      <div className="container">
        <div className="gb-close__card">
          {/* Halftone flourishes, one per side. Decorative only — they carry no
              meaning and are clipped by the card's own radius. */}
          <span className="gb-close__dots gb-close__dots--left" aria-hidden="true" />
          <span className="gb-close__dots gb-close__dots--right" aria-hidden="true" />

          <div className="gb-close__copy">
            <h2 className="gb-close__title">{title}</h2>
            <p className="gb-close__accent">{accent}</p>
            <p className="gb-close__dek">{dek}</p>
          </div>
          <div className="gb-close__actions">
            <Image
              src="/assets/img/traffic-sources-1.webp"
              alt="Traffic sources breakdown"
              width={720}
              height={405}
              className="gb-close__traffic-img"
            />
            <a href={cta.href} className="gb-btn gb-btn--accent gb-close__btn" title={cta.text}>
              {cta.text}
            </a>
            {phone && (
              <a href={CONTACT.phoneHref} className="gb-close__phone" title={`Call Gobiya at ${CONTACT.phone}`}>
                or call {CONTACT.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
