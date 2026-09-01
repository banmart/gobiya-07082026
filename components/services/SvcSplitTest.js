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
 * CRO — a split test.
 *
 * The service is comparison, so the page is built as one: a hero divided down
 * the middle into control and variant, and content sections that alternate
 * sides against a centre line running the length of the page. The only service
 * page with a persistent vertical axis.
 */
export default function SvcSplitTest({ service }) {
  const rows = service.featureRows || [];

  return (
    <main id="top" className="svc svc--split">
      <ServiceSchema service={service} />

      <header className="svc-split__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <p className="svc-split__eyebrow">{serviceEyebrow(service)}</p>
          <h1 className="svc-split__h1">{service.h1 || service.title}</h1>
          <p className="lede">{service.lede || service.blurb || service.intro}</p>

          <div className="svc-split__ab" aria-hidden="true">
            <div className="svc-split__abSide svc-split__abSide--a">
              <span className="svc-split__abLabel">A · what you have</span>
              <div className="svc-split__abBar" style={{ '--fill': '34%' }}>
                <span />
              </div>
              <p className="svc-split__abNote">Traffic arrives. Most of it leaves.</p>
            </div>
            <div className="svc-split__abDivider" />
            <div className="svc-split__abSide svc-split__abSide--b">
              <span className="svc-split__abLabel">B · what we test toward</span>
              <div className="svc-split__abBar svc-split__abBar--win" style={{ '--fill': '78%' }}>
                <span />
              </div>
              <p className="svc-split__abNote">Same traffic. More of it does something.</p>
            </div>
          </div>
          <p className="svc-split__abCaption">
            Illustrative. Real lift depends entirely on where your page currently
            loses people, which is what the first round of research finds out.
          </p>
        </div>
      </header>

      {service.problem && (
        <section className="svc-split__problem">
          <div className="container container--narrow">
            <p className="svc-split__problemEyebrow">{service.problem.eyebrow}</p>
            <p className="svc-split__problemText">{service.problem.statement}</p>
          </div>
        </section>
      )}

      <ExperienceBlock slug={service.slug} variant="svc-exp--split" />

      {/* Content alternates against a centre axis. */}
      <div className="svc-split__axis">
        <div className="container">
          {rows.map((row, i) => (
            <section
              key={row.title}
              className={`svc-split__row ${i % 2 === 0 ? 'svc-split__row--left' : 'svc-split__row--right'}`}
            >
              <div className="svc-split__rowInner">
                <h2>{row.title}</h2>
                {row.lede && <p className="svc-split__rowLede">{row.lede}</p>}
                {Array.isArray(row.dek)
                  ? row.dek.map((d, j) => <p key={j}>{d}</p>)
                  : row.dek && <p>{row.dek}</p>}
                {row.list && (
                  <ul className="svc-split__list">
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
        </div>
      </div>

      <section className="svc-split__caps">
        <div className="container">
          <h2 className="statement statement--small">What we test</h2>
          <div className="svc-split__capPairs">
            {(service.capabilities || []).map((c) => (
              <article key={c.title} className="svc-split__cap">
                <span className="svc-split__capTag">{c.tag}</span>
                <h3>{c.href ? <a href={c.href}>{c.title}</a> : c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-split__process">
        <div className="container container--narrow">
          <h2 className="statement statement--small">How a test cycle runs</h2>
          <ol className="svc-split__cycle">
            {(service.process || []).map((p) => (
              <li key={p.step}>
                <span className="svc-split__cycleNum">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ServiceAreas service={service} />
      <ServiceProof service={service} />

      <ServiceFaqs service={service} />
      <ServiceSiblings service={service} />
      <ServiceCta service={service} />
    </main>
  );
}
