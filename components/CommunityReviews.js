import { TESTIMONIALS } from '../lib/testimonials';

/* Client reviews, in the homepage's frame: heading and dek on the left, the
   rating on the right, three quote cards under them.
 *
 * Quotes are verbatim Google reviews (lib/testimonials.js) and are never
 * trimmed or reworded here — the cards are top-aligned and stretch to whatever
 * the longest one needs rather than clamping the text.
 *
 * `featured` takes a service page's own client quote (lib/servicesFlat.js) and
 * runs it first, pushing the third Google review off the row. That quote is
 * about the service you are reading, so it earns the lead slot; the row stays
 * three wide either way. */
const STARS = '★★★★★';

export default function CommunityReviews({
  heading = 'Clients love Gobiya',
  dek = 'Let our clients tell you their story of growth, performance, and revenue impact.',
  featured = null,
  more = null,
}) {
  const quotes = featured ? [featured, ...TESTIMONIALS].slice(0, 3) : TESTIMONIALS;

  return (
    <section className="gb-community">
      <div className="container">
        <div className="gb-community__header">
          <h2 className="gb-community__title">{heading}</h2>
          {dek && <p className="gb-community__dek">{dek}</p>}
        </div>

        <div className="gb-community__grid">
          {quotes.map((t, i) => {
            const name = t.name || t.company || t.source;
            const role = t.name ? t.role || t.company || t.source : t.role;
            return (
              <figure key={name || i} className="gb-quote">
                <p className="gb-quote__stars" aria-label="5 stars">{STARS}</p>
                {t.headline && <p className="gb-quote__head">{t.headline}</p>}
                <blockquote className="gb-quote__body">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="gb-quote__by">
                  <span className="gb-quote__name">{name}</span>
                  {role && <span className="gb-quote__role">{role}</span>}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {more && (
          <p className="gb-community__more">
            <a href={more.href} title={more.text}>
              {more.text} <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
