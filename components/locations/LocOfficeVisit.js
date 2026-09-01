import Image from 'next/image';
import Breadcrumbs from '../Breadcrumbs';
import { SERVICE_LINKS } from '../../lib/serviceIndex';
import { LocationSchema, LocationProof, LocationCta, officeSchema } from './locationShared';

/**
 * Van Nuys — an office visit.
 *
 * This page's whole advantage is that there is a real office behind it, so the
 * page opens on the room: the photo runs full-bleed beside a NAP card set like
 * a directory listing. Named clients sit directly under it, because "we are
 * actually here and these are actually our neighbours" is the argument.
 *
 * The Los Angeles page deliberately does not do this — see LocCityCoverage.
 */
export default function LocOfficeVisit({ location }) {
  return (
    <main id="top" className="loc loc--office">
      <LocationSchema schema={officeSchema(location)} />

      <header className="loc-office__hero">
        <div className="container">
          <Breadcrumbs inHero items={[{ label: 'Home', href: '/' }, { label: location.name }]} />
          <p className="loc-office__tagline">{location.tagline}</p>
          <h1 className="loc-office__h1">{location.h1}</h1>
          <p className="lede">{location.dek}</p>
        </div>
      </header>

      <div className="container">
        <div className="loc-office__split">
          {location.image && (
            <figure className="loc-office__figure">
              <Image
                src={location.image.src}
                alt={location.image.alt}
                width={location.image.width}
                height={location.image.height}
                className="loc-office__photo"
                priority
              />
              {location.image.caption && <figcaption>{location.image.caption}</figcaption>}
            </figure>
          )}

          {/* NAP set as a directory card — the same details Google matches
              against the Business Profile, in one readable block. */}
          <aside className="loc-office__nap" aria-label={`${location.name} office details`}>
            <p className="loc-office__napLabel">Visit us</p>
            <address className="loc-office__address">
              <span className="loc-office__street">{location.streetAddress}</span>
              <span>
                {location.addressLocality}, {location.addressRegion} {location.postalCode}
              </span>
            </address>
            <dl className="loc-office__meta">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={location.phoneHref}>{location.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>Monday &ndash; Friday, 9&ndash;5 PT</dd>
              </div>
            </dl>
            <a href={location.phoneHref} className="btn btn--solid" style={{ width: '100%' }}>
              Call the {location.name} office
            </a>
            {location.reviewUrl && (
              <a
                href={location.reviewUrl}
                className="btn btn--ghost"
                style={{ width: '100%', marginTop: '0.625rem' }}
              >
                Leave us a review
              </a>
            )}
          </aside>
        </div>
      </div>

      <section className="loc-office__intro">
        <div className="container container--narrow">
          <p>{location.intro}</p>
        </div>
      </section>

      {location.clients?.length > 0 && (
        <section className="loc-office__clients">
          <div className="container container--narrow">
            <h2 className="loc-office__clientsTitle">Businesses we work with here</h2>
            <ul className="loc-office__clientList">
              {location.clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="loc-office__services">
        <div className="container">
          <h2 className="statement statement--small">What we do from this office</h2>
          <div className="loc-office__serviceGrid">
            {SERVICE_LINKS.map((s) => (
              <a key={s.href} href={s.href} className="loc-office__serviceCard">
                <span>{s.title}</span>
                <span className="loc-office__serviceArrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <LocationProof />
      <LocationCta
        title={`Talk to the ${location.name} office`}
        phone={location.phone}
        phoneHref={location.phoneHref}
      />
    </main>
  );
}
