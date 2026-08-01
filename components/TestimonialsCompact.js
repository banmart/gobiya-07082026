import Image from 'next/image';
import { TESTIMONIALS } from '../lib/testimonials';

/* Compact testimonial row — the same client quotes the homepage runs, read
   from lib/testimonials.js, but rendered flat.

   The homepage uses TestimonialStack, which pins the section and scrubs a card
   stack through GSAP on scroll. That's wrong on a conversion page: it hijacks
   the scroll immediately below a form the visitor is trying to finish, and it
   drags GSAP + ScrollTrigger onto a route that otherwise ships none. This is a
   server component with no client JS at all. */

const COUNT = 3;

const HONORIFICS = new Set(['dr.', 'mr.', 'mrs.', 'ms.', 'prof.']);

/* Only some entries carry a photo. Rather than leave a ragged row of avatars
   and gaps, the ones without get an initials disc in the same footprint. */
function initials(name) {
  return name
    .split(/\s+/)
    .filter((word) => word && !HONORIFICS.has(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function TestimonialsCompact({
  heading = 'What Our Clients Say',
  count = COUNT,
}) {
  const items = TESTIMONIALS.slice(0, count);

  return (
    <section className="mw-tcompact">
      <div className="container">
        <h2 className="mw-tcompact__heading">{heading}</h2>

        <ul className="mw-tcompact__grid">
          {items.map((t) => (
            <li key={`${t.name}-${t.company}`} className="mw-tcompact__card">
              <blockquote className="mw-tcompact__quote">{t.quote}</blockquote>

              <div className="mw-tcompact__person">
                {t.photo ? (
                  <Image
                    src={t.photo}
                    // Decorative: the name sits right beside it in text, so
                    // announcing the photo as well just doubles it up.
                    alt=""
                    width={40}
                    height={40}
                    className="mw-tcompact__avatar"
                  />
                ) : (
                  <span className="mw-tcompact__initials" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                )}

                <div className="mw-tcompact__meta">
                  <p className="mw-tcompact__name">{t.name}</p>
                  <p className="mw-tcompact__company">{t.company}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
