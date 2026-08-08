/* "Where We Work" — the LA map band used on /contact.
   All city sub-pages are retired; this component now lists areas as plain text
   (no links) and links once to /areas-we-serve for the full coverage page. */

const AREAS = [
  'Burbank', 'Echo Park', 'Glendale', 'Hollywood',
  'Los Feliz', 'Pasadena', 'Sherman Oaks', 'Silver Lake',
  'Studio City', 'Koreatown', 'Downtown LA',
  'San Fernando Valley', 'Orange County', 'Greater Los Angeles',
];

export default function LocalAreas({
  heading = 'Quality Services For Our Local Communities',
  intro = "From SEO recoveries to content and PPC services, we\u2019re committed to keeping business websites across LA running smoothly.",
}) {
  return (
    <section className="mw-local-areas">
      <div className="container">
        <h2 className="mw-local-areas__heading">{heading}</h2>
        <p className="mw-local-areas__intro">{intro}</p>

        <div className="mw-local-areas__card">
          <div className="mw-local-areas__columns">
            {AREAS.map((area) => (
              <div key={area} className="mw-local-areas__item">
                <span className="mw-local-areas__icon">\uD83D\uDCCD</span> {area}
              </div>
            ))}
            <div className="mw-local-areas__item mw-local-areas__item--highlight">
              <a href="/areas-we-serve" className="mw-local-areas__link">
                <span className="mw-local-areas__icon">\u2728</span> &amp; Beyond!
              </a>
            </div>
          </div>
        </div>

        <div className="mw-local-areas__cta">
          <p className="mw-local-areas__cta-text">
            Call us today! <a href="tel:323-744-1338" className="mw-local-areas__phone">323-744-1338</a> or{' '}
            <a href="?onboarding=true" className="mw-local-areas__btn">
              Request a Quote <span>&rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
