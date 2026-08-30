/* The local-coverage band.

   Most city names here are plain text: those cities have no page, and a link
   to a URL that 301s elsewhere is worth less than no link at all. The four
   that do have pages are linked, because this band is the main internal path
   to them — /studio-city-seo and /glendale-seo in particular were brand new
   when this was written, and an orphaned page is one Google has no reason to
   crawl. "& Beyond!" still goes to the Los Angeles page, which owns the
   coverage claim for everything unlinked. */

// Cities with a real page, mapped to it. Anything not in here renders as text.
const AREA_LINKS = {
  Glendale: '/glendale-seo',
  'Studio City': '/studio-city-seo',
  'Van Nuys': '/van-nuys-seo',
};

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
              {AREA_LINKS[area] ? (
                <a href={AREA_LINKS[area]}>{area}</a>
              ) : (
                area
              )}
            </li>
          ))}
        </ul>

        <p className="mw-local-areas__beyond">
          <a href="/los-angeles-seo" className="mw-local-areas__beyond-link">
            &amp; Beyond!
          </a>{' '}
          <span>(Greater Los Angeles Area &amp; San Fernando Valley)</span>
        </p>
      </div>
    </section>
  );
}
