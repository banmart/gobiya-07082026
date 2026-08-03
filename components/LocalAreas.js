/* "Quality Services For Our Local Communities" — the LA map band.
   Lives here rather than inline on the homepage because /contact runs the same
   band underneath its form; the duotone map backdrop is on .mw-local-areas in
   globals.css, so both pages get it from the one class.

   Entries without an href are areas we serve that have no city page yet — they
   render as plain text, not dead links. */

const AREAS = [
  { name: 'Burbank', href: '/areas-we-serve/burbank' },
  { name: 'Echo Park', href: '/areas-we-serve/echo-park' },
  { name: 'Glendale', href: '/areas-we-serve/glendale' },
  { name: 'Hollywood', href: '/areas-we-serve/hollywood' },
  { name: 'Los Feliz', href: '/areas-we-serve/los-feliz' },
  { name: 'Pasadena' },
  { name: 'Sherman Oaks', href: '/areas-we-serve/sherman-oaks' },
  { name: 'Silver Lake', href: '/areas-we-serve/silverlake' },
  { name: 'Studio City', href: '/areas-we-serve/studio-city' },
  { name: 'Koreatown', href: '/areas-we-serve/koreatown' },
  { name: 'Downtown LA', href: '/areas-we-serve/downtown' },
  { name: 'San Fernando Valley' },
  { name: 'Greater Los Angeles Area' },
];

export default function LocalAreas({
  heading = 'Quality Services For Our Local Communities',
  intro = "From SEO recoveries to content and ppc services, we're committed to keeping business websites across LA running smoothly.",
}) {
  return (
    <section className="mw-local-areas">
      <div className="container">
        <h2 className="mw-local-areas__heading">{heading}</h2>
        <p className="mw-local-areas__intro">{intro}</p>

        <div className="mw-local-areas__card">
          <div className="mw-local-areas__columns">
            {AREAS.map((area) => (
              <div key={area.name} className="mw-local-areas__item">
                {area.href ? (
                  <a href={area.href} className="mw-local-areas__link">
                    <span className="mw-local-areas__icon">📍</span> {area.name}
                  </a>
                ) : (
                  <>
                    <span className="mw-local-areas__icon">📍</span> {area.name}
                  </>
                )}
              </div>
            ))}
            <div className="mw-local-areas__item mw-local-areas__item--highlight">
              <a href="/areas-we-serve" className="mw-local-areas__link">
                <span className="mw-local-areas__icon">✨</span> &amp; Beyond!
              </a>
            </div>
          </div>
        </div>

        <div className="mw-local-areas__cta">
          <p className="mw-local-areas__cta-text">
            Call us today! <a href="tel:323-744-1338" className="mw-local-areas__phone">323-744-1338</a> or{' '}
            <a href="/free-site-scan" className="mw-local-areas__btn">
              Get a FREE Site Scan <span>→</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
