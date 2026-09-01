import Breadcrumbs from '../Breadcrumbs';
import {
  ServiceSchema,
  ExperienceBlock,
  ServiceFaqs,
  ServiceCta,
  ServiceAreas,
  ServiceProof,
  ServiceSiblings,
  serviceEyebrow,
} from './serviceShared';

/**
 * Link Building & Digital PR — a network.
 *
 * Links are relationships between sites, so the page is built out of nodes and
 * edges: an SVG constellation in the hero, capabilities as connected cards, and
 * the process as a chain of linked steps rather than a numbered list. The one
 * service page with a drawn diagram doing real explanatory work.
 */
export default function SvcNetwork({ service }) {
  const caps = service.capabilities || [];

  return (
    <main id="top" className="svc svc--network">
      <ServiceSchema service={service} />

      <header className="svc-net__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <div className="svc-net__heroGrid">
            <div>
              <p className="svc-net__eyebrow">{serviceEyebrow(service)}</p>
              <h1 className="svc-net__h1">{service.h1 || service.title}</h1>
              <p className="lede">{service.lede || service.blurb || service.intro}</p>
              <a href="/contact" className="btn btn--solid btn--big" style={{ marginTop: '1.5rem' }}>
                Talk about your link profile
              </a>
            </div>

            {/* One authoritative source, several relevant sites, one target.
                Decorative — the argument is made in the prose below. */}
            <svg className="svc-net__graph" viewBox="0 0 320 240" aria-hidden="true">
              <g className="svc-net__edges">
                <line x1="160" y1="120" x2="60" y2="50" />
                <line x1="160" y1="120" x2="270" y2="60" />
                <line x1="160" y1="120" x2="50" y2="190" />
                <line x1="160" y1="120" x2="260" y2="185" />
                <line x1="160" y1="120" x2="160" y2="30" />
              </g>
              <g className="svc-net__nodes">
                <circle cx="60" cy="50" r="9" />
                <circle cx="270" cy="60" r="7" />
                <circle cx="50" cy="190" r="7" />
                <circle cx="260" cy="185" r="9" />
                <circle cx="160" cy="30" r="6" />
              </g>
              <circle className="svc-net__target" cx="160" cy="120" r="20" />
              <text className="svc-net__targetLabel" x="160" y="125" textAnchor="middle">
                you
              </text>
            </svg>
          </div>
        </div>
      </header>

      {service.problem && (
        <section className="svc-net__problem">
          <div className="container container--narrow">
            <p className="svc-net__problemEyebrow">{service.problem.eyebrow}</p>
            <p className="svc-net__problemText">{service.problem.statement}</p>
          </div>
        </section>
      )}

      <ExperienceBlock slug={service.slug} variant="svc-exp--network" />

      {(service.featureRows || []).map((row) => (
        <section key={row.title} className="svc-net__block">
          <div className="container container--narrow">
            <h2>{row.title}</h2>
            {row.lede && <p className="svc-net__blockLede">{row.lede}</p>}
            {Array.isArray(row.dek)
              ? row.dek.map((d, j) => <p key={j}>{d}</p>)
              : row.dek && <p>{row.dek}</p>}
            {row.list && (
              <ul className="svc-net__list">
                {row.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {row.link && (
              <p>
                <a href={row.link.href} className="btn btn--ghost">
                  {row.link.text}
                </a>
              </p>
            )}
          </div>
        </section>
      ))}

      {/* Capabilities as connected nodes: each card wired to the spine. */}
      <section className="svc-net__caps">
        <div className="container">
          <h2 className="statement statement--small">The work, node by node</h2>
          <div className="svc-net__capSpine">
            {caps.map((c, i) => (
              <article
                key={c.title}
                className={`svc-net__cap ${i % 2 === 0 ? 'svc-net__cap--left' : 'svc-net__cap--right'}`}
              >
                <span className="svc-net__capNode" aria-hidden="true" />
                <span className="svc-net__capTag">{c.tag}</span>
                <h3>{c.href ? <a href={c.href}>{c.title}</a> : c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-net__process">
        <div className="container">
          <h2 className="statement statement--small">How a campaign runs</h2>
          <div className="svc-net__chain">
            {(service.process || []).map((p, i, arr) => (
              <div key={p.step} className="svc-net__link">
                <div className="svc-net__linkBody">
                  <span className="svc-net__linkNum">{p.step}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
                {i < arr.length - 1 && <span className="svc-net__linkArrow" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceAreas service={service} />
      <ServiceProof service={service} packages={false} />

      <ServiceFaqs service={service} />
      <ServiceSiblings service={service} />
      <ServiceCta service={service} />
    </main>
  );
}
