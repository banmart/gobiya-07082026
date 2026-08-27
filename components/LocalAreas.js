/* The local-coverage band. All city sub-pages are retired, so the names are
   plain text on a hairline grid rather than links; the one link is on
   "& Beyond!", which goes to the full coverage page. */

const AREAS = [
  'Burbank',
  'Echo Park',
  'Encino',
  'Glendale',
  'Hollywood',
  'Los Feliz',
  'Pasadena',
  'Sherman Oaks',
  'Silverlake',
  'Studio City',
  'Van Nuys',
];

export default function LocalAreas({
  heading = 'Quality Optimization For Our Local Communities',
  intro = 'From local map pack dominance to national enterprise architecture, we’re committed to scaling businesses across LA.',
  areas = AREAS,
}) {
  return (
    <section className="mw-local-areas">
      <div className="container">
        <h2 className="mw-local-areas__heading">{heading}</h2>
        <p className="mw-local-areas__intro">{intro}</p>

        <ul className="mw-local-areas__columns">
          {areas.map((area) => (
            <li key={area} className="mw-local-areas__item">
              {area}
            </li>
          ))}
        </ul>

        <p className="mw-local-areas__beyond">
          <a href="/areas-we-serve" className="mw-local-areas__beyond-link">
            &amp; Beyond!
          </a>{' '}
          <span>(Greater Los Angeles Area &amp; San Fernando Valley)</span>
        </p>
      </div>
    </section>
  );
}
