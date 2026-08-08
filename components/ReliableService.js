import Image from 'next/image';
import { TESTIMONIALS } from '../lib/testimonials';
import { CLIENT_LOGOS } from './ClientLogos';

/* Reviews and client marks in one band: the quotes make the claim, the logo
   row shows who is behind them, the button asks.

   Quotes are verbatim Google reviews (see lib/testimonials.js) and are never
   trimmed or reworded here — the cards stretch to fit whichever is longest
   rather than clamping the text.

   `featured` takes a service page's own client quote (lib/servicesFlat.js) and
   runs it first, pushing the third Google review off the row. That quote is
   about the service you are reading, so it earns the lead slot; the row stays
   three wide either way. */

function Stars() {
  return (
    <div className="mw-reliable__stars" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
          <path
            fill="currentColor"
            d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z"
          />
        </svg>
      ))}
    </div>
  );
}

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
}

// Some client quotes run anonymously — lib/servicesFlat.js sets `name: null`
// and the company carries the attribution instead. Never render a bare
// company name where a person's name would go without also dropping the role
// line, or the card reads as if the business itself said it and then works for
// itself.
function attribution(t) {
  const primary = t.name || t.company || t.source;
  const secondary = t.name ? (t.role || t.company || t.source) : t.role;
  return { primary, secondary };
}

export default function ReliableService({
  featured = null,
  heading = 'Reliable service',
  ctaText = 'Join our client roster',
  ctaHref = '/contact',
}) {
  const quotes = featured ? [featured, ...TESTIMONIALS].slice(0, 3) : TESTIMONIALS;

  return (
    <section className="mw-reliable">
      <div className="container">
        <h2 className="mw-reliable__heading">{heading}</h2>

        <div className="mw-reliable__grid">
          {quotes.map((t, i) => {
            const { primary, secondary } = attribution(t);
            return (
              <figure key={primary || i} className="mw-reliable__card">
                <Stars />
                <blockquote className="mw-reliable__quote">{t.quote}</blockquote>
                <figcaption className="mw-reliable__person">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt={primary}
                      width={40}
                      height={40}
                      className="mw-reliable__avatar mw-reliable__avatar--photo"
                    />
                  ) : (
                    <span className="mw-reliable__avatar" aria-hidden="true">{initials(primary)}</span>
                  )}
                  <span>
                    <span className="mw-reliable__name">{primary}</span>
                    {secondary && <span className="mw-reliable__role">{secondary}</span>}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <ul className="mw-reliable__logos">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.src} className="mw-reliable__logo-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={64}
                className="mw-reliable__logo"
              />
            </li>
          ))}
        </ul>

        <div className="mw-reliable__cta">
          <a href={ctaHref} className="mw-reliable__btn">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
