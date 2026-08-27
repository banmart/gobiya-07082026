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
export default function CommunityReviews({
  heading = 'Hear From the Community',
  dek = 'Let our clients tell you their story of growth, performance, and revenue impact.',
  score = '5.0',
  scoreLabel = '50+ Client Case Studies & Reviews',
  featured = null,
  more = null,
}) {
  const quotes = featured ? [featured, ...TESTIMONIALS].slice(0, 3) : TESTIMONIALS;

  return (
    <section className="gb-community">
      <div className="container">
        <div className="gb-sechead">
          <div>
            <h2 className="gb-sechead__title">{heading}</h2>
            <p className="gb-sechead__dek">{dek}</p>
          </div>
          <p className="gb-community__score">
            <strong>{score}</strong>
            <span>{scoreLabel}</span>
          </p>
        </div>

        <div className="gb-community__grid">
          {quotes.map((t, i) => {
            // A service page's featured quote may run anonymously, with the
            // company carrying the attribution instead of a person.
            const name = t.name || t.company || t.source;
            const role = t.name ? t.role || t.company || t.source : t.role;
            return (
              <figure key={name || i} className="gb-quote">
                {t.headline && <p className="gb-quote__head">&ldquo;{t.headline}&rdquo;</p>}
                <blockquote className="gb-quote__body">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="gb-quote__by">
                  {name}
                  {role ? ` — ${role}` : ''}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {more && (
          <p className="gb-community__more">
            <a href={more.href}>
              {more.text} <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
