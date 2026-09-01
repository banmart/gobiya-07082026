import Breadcrumbs from '../Breadcrumbs';
import { renderBlock } from '../ContentBlocks';
import { SERVICE_LINKS } from '../../lib/serviceIndex';
import { LocationSchema, LocationProof, LocationCta, areaSchema } from './locationShared';

/**
 * Studio City — a service-area brief.
 *
 * There is no office here and no personal history, so the page makes the
 * smaller, honest claim: this is an area we cover, here is what that means, and
 * here is where we actually work from. Set as a compact brief with a
 * fact-strip masthead — the tightest of the four location pages, because
 * padding it out would mean inventing a connection that does not exist.
 */
export default function LocAreaBrief({ area }) {
  return (
    <main id="top" className="loc loc--brief">
      <LocationSchema schema={areaSchema(area)} />

      <header className="loc-brief__hero">
        <div className="container container--narrow">
          <Breadcrumbs inHero items={[{ label: 'Home', href: '/' }, { label: area.name }]} />
          <h1 className="loc-brief__h1">{area.h1}</h1>
          <p className="loc-brief__lede">{area.lede}</p>
        </div>
      </header>

      <section className="loc-brief__facts">
        <div className="container container--narrow">
          <dl className="loc-brief__factRow">
            <div>
              <dt>Area</dt>
              <dd>{area.name}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{area.region}</dd>
            </div>
            <div>
              <dt>County</dt>
              <dd>{area.county}</dd>
            </div>
            <div>
              <dt>Worked from</dt>
              <dd>
                <a href="/van-nuys-seo">Van Nuys</a>
              </dd>
            </div>
          </dl>
          <p className="loc-brief__disclosure">
            A service area, not an office. We cover {area.name} from our{' '}
            <a href="/van-nuys-seo">Van Nuys</a> and{' '}
            <a href="/los-angeles-seo">Los Angeles</a> locations rather than
            claiming an address here.
          </p>
        </div>
      </section>

      <section className="loc-brief__body">
        <div className="container container--narrow">
          {(area.body || []).map((block, i) => renderBlock(block, i))}
        </div>
      </section>

      <section className="loc-brief__services">
        <div className="container container--narrow">
          <h2 className="loc-brief__servicesTitle">What we handle</h2>
          <ul className="loc-brief__serviceList">
            {SERVICE_LINKS.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.title}</a>
                <span>{s.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocationProof />
      <LocationCta title={`Talk about ${area.name}`} />
    </main>
  );
}
