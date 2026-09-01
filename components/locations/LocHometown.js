import Breadcrumbs from '../Breadcrumbs';
import { renderBlock } from '../ContentBlocks';
import { SERVICE_LINKS } from '../../lib/serviceIndex';
import { CAREER_START_YEAR, FOUNDER, yearsExperience } from '../../lib/authority';
import { LocationSchema, LocationProof, LocationCta, areaSchema } from './locationShared';

/**
 * Glendale — a hometown page.
 *
 * Glendale is the one market where the connection is personal: the founder grew
 * up there, went to school there, and built his first sites there in 1996. That
 * is a real differentiator no competitor can copy, so the page is written as a
 * first-person account rather than a coverage claim, opening on a dated
 * timeline instead of a services grid.
 *
 * No address and no LocalBusiness schema — there is no Glendale office, and
 * claiming one is what local spam policies exist to catch.
 */
export default function LocHometown({ area }) {
  const years = yearsExperience();

  return (
    <main id="top" className="loc loc--home">
      <LocationSchema schema={areaSchema(area)} />

      <header className="loc-home__hero">
        <div className="container container--narrow">
          <Breadcrumbs inHero items={[{ label: 'Home', href: '/' }, { label: area.name }]} />
          <p className="loc-home__eyebrow">{area.heroEyebrow || 'Our founder’s home town'}</p>
          <h1 className="loc-home__h1">{area.h1}</h1>
          <p className="loc-home__lede">{area.lede}</p>
        </div>
      </header>

      {/* The claim this page rests on, as dates. */}
      <section className="loc-home__timeline">
        <div className="container container--narrow">
          <ol className="loc-home__years">
            <li>
              <span className="loc-home__year">{CAREER_START_YEAR}</span>
              <p>
                {FOUNDER.name} builds his first commercial websites in Glendale,
                after growing up and going to school here.
              </p>
            </li>
            <li>
              <span className="loc-home__year">Today</span>
              <p>
                {years} years later, Glendale is still the market we know as
                residents rather than only as consultants.
              </p>
            </li>
          </ol>
          <p className="loc-home__note">
            We do not have a Glendale office. The work runs from our{' '}
            <a href="/van-nuys-seo">Van Nuys</a> and{' '}
            <a href="/los-angeles-seo">Los Angeles</a> offices &mdash; close
            enough to meet in person, and honest about where we actually sit.
          </p>
        </div>
      </section>

      <section className="loc-home__body">
        <div className="container container--narrow">
          {(area.body || []).map((block, i) => renderBlock(block, i))}
        </div>
      </section>

      <section className="loc-home__services">
        <div className="container">
          <h2 className="statement statement--small">What we can do for a Glendale business</h2>
          <ul className="loc-home__serviceList">
            {SERVICE_LINKS.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocationProof />
      <LocationCta title="Talk to someone who knows Glendale" />
    </main>
  );
}
