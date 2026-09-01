import Breadcrumbs from '../Breadcrumbs';
import { SERVICE_LINKS } from '../../lib/serviceIndex';
import { AREAS } from '../../lib/areas';
import { LocationSchema, LocationProof, LocationCta, officeSchema } from './locationShared';

/**
 * Los Angeles — city coverage.
 *
 * The headquarters page answers a bigger question than the Van Nuys one: not
 * "where are you" but "do you cover me". So it leads with the map of
 * neighbourhoods rather than the office photo, and the address sits as a single
 * quiet line rather than a card. Deliberately the inverse emphasis of
 * LocOfficeVisit, which shares the same data.
 */
export default function LocCityCoverage({ location }) {
  // Every authored city, whether or not it has a page of its own. A city with a
  // liveSlug links there; the rest are coverage claims, not links to nowhere.
  const cities = AREAS.map((a) => ({ name: a.name, href: a.liveSlug ? `/${a.liveSlug}` : null }));

  return (
    <main id="top" className="loc loc--city">
      <LocationSchema schema={officeSchema(location)} />

      <header className="loc-city__hero">
        <div className="container">
          <Breadcrumbs inHero items={[{ label: 'Home', href: '/' }, { label: location.name }]} />
          <p className="loc-city__tagline">{location.tagline}</p>
          <h1 className="loc-city__h1">{location.h1}</h1>
          <p className="lede">{location.dek}</p>

          <p className="loc-city__addressLine">
            {location.streetAddress}, {location.addressLocality}, {location.addressRegion}{' '}
            {location.postalCode} &middot;{' '}
            <a href={location.phoneHref}>{location.phone}</a>
          </p>

          <div className="loc-city__actions">
            <a href="?onboarding=true" className="btn btn--solid btn--big">
              Schedule a Consultation
            </a>
            <a href={location.phoneHref} className="btn btn--ghost btn--big">
              {location.phone}
            </a>
          </div>
        </div>
      </header>

      {/* Coverage first — this page's job. */}
      <section className="loc-city__coverage">
        <div className="container">
          <h2 className="loc-city__coverageTitle">Neighbourhoods and cities we cover</h2>
          <p className="loc-city__coverageNote">
            Work runs out of the {location.addressLocality} office and our Van Nuys
            office. Cities with a page of their own are linked.
          </p>
          <ul className="loc-city__grid">
            {cities.map((c) => (
              <li key={c.name} className={c.href ? 'loc-city__cell loc-city__cell--live' : 'loc-city__cell'}>
                {c.href ? <a href={c.href}>{c.name}</a> : <span>{c.name}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="loc-city__intro">
        <div className="container container--narrow">
          <p>{location.intro}</p>
        </div>
      </section>

      {location.clients?.length > 0 && (
        <section className="loc-city__clients">
          <div className="container container--narrow">
            <h2 className="loc-city__clientsTitle">Some of the businesses we work with</h2>
            <p className="loc-city__clientList">{location.clients.join(' · ')}</p>
          </div>
        </section>
      )}

      <section className="loc-city__services">
        <div className="container">
          <h2 className="statement statement--small">What we do</h2>
          <dl className="loc-city__serviceList">
            {SERVICE_LINKS.map((s) => (
              <div key={s.href}>
                <dt>
                  <a href={s.href}>{s.title}</a>
                </dt>
                <dd>{s.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <LocationProof />
      <LocationCta
        title="Talk to the Los Angeles office"
        phone={location.phone}
        phoneHref={location.phoneHref}
      />
    </main>
  );
}
