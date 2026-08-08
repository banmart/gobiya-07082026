import OfferCountdown from './OfferCountdown';

/* The CRM offer panel. Lives on the homepage and on /seo-services/web-dev, which
   is why it's a component rather than markup in a page — the offer copy, the
   end date and the countdown all have to say the same thing in both places,
   and two copies of this drift the first time one of them is edited.

   To put it on another service page, set `showOffer: true` on that service in
   lib/services.js. ServiceTemplate reads the flag; nothing here needs editing. */

/* End of the CRM offer, pinned to an explicit Pacific offset rather than a
   bare local-time string — the countdown otherwise ends at a different moment
   for every visitor depending on their own timezone. Keep this in step with
   the "Valid Dec 31, 2026" line below. */
export const OFFER_ENDS = '2026-12-31T23:59:59-08:00';

export default function SavingsOffer() {
  return (
    <section className="mw-savings">
      <div className="container">
        <div className="mw-savings__coupon">
          <div className="mw-savings__coupon-inner">
            <div className="mw-savings__coupon-copy">
              <div className="mw-savings__coupon-badges">
                <div className="mw-savings__coupon-badge">Special Offer</div>
                <div className="mw-savings__coupon-value">$1,200 Value</div>
              </div>
              <h2 className="mw-savings__title">
                A Free CRM. Built Into Every New Site.
              </h2>
              <h3 className="mw-savings__coupon-offer">
                No Extra Cost. No Extra Steps.
              </h3>
              <p className="mw-savings__desc">
                Lead capture, follow-up, and reporting — wired in from day one, on every site we build. Claim it before the offer closes.
              </p>
            </div>

            <div className="mw-savings__coupon-cta">
              <a href="?onboarding=true" className="mw-savings__btn">
                Claim Your FREE CRM <span>→</span>
              </a>
              <p className="mw-savings__coupon-validity">
                Valid Dec 31, 2026
              </p>
            </div>
          </div>

          <OfferCountdown targetDate={OFFER_ENDS} />
        </div>
      </div>
    </section>
  );
}
