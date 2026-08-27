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
          <div className="gb-close__copy">
            <h2 className="gb-close__title">{title}</h2>
            <p className="gb-close__accent">{accent}</p>
            <p className="gb-close__dek">{dek}</p>
          </div>
          <div className="gb-close__actions">
            <a href={cta.href} className="gb-btn gb-btn--accent gb-close__btn">
              {cta.text}
            </a>
            {phone && (
              <a href={CONTACT.phoneHref} className="gb-close__phone">
                or call {CONTACT.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
