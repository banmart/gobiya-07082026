import Breadcrumbs from '../Breadcrumbs';
import {
  ServiceSchema,
  ExperienceBlock,
  ServiceFaqs,
  ServiceCta,
  ServiceAreas,
  ServiceProof,
} from './serviceShared';

/**
 * Web Design & Development — a code panel.
 *
 * A build page for people who will read the source. Dark editor-style hero with
 * a gutter of line numbers, capabilities as a file tree, and the process as
 * commits. The only service page that runs dark above the fold and uses a
 * monospace face for structure rather than decoration.
 */
export default function SvcCodePanel({ service }) {
  const caps = service.capabilities || [];

  return (
    <main id="top" className="svc svc--code">
      <ServiceSchema service={service} />

      <header className="svc-code__hero">
        <div className="container">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.navTitle || service.title },
            ]}
          />
          <div className="svc-code__heroGrid">
            <div>
              <p className="svc-code__eyebrow">{service.eyebrow || service.pillar}</p>
              <h1 className="svc-code__h1">{service.h1 || service.title}</h1>
              <p className="svc-code__lede">{service.lede || service.blurb || service.intro}</p>
              <a href="/contact" className="btn btn--solid btn--big" style={{ marginTop: '1.5rem' }}>
                Talk about a build
              </a>
            </div>

            <pre className="svc-code__editor" aria-hidden="true">
              <code>
                <span className="svc-code__ln" data-n="1">
                  <span className="svc-code__kw">export default async function</span>{' '}
                  <span className="svc-code__fn">Page</span>() {'{'}
                </span>
                <span className="svc-code__ln" data-n="2">
                  {'  '}
                  <span className="svc-code__cm">// content in the first response,</span>
                </span>
                <span className="svc-code__ln" data-n="3">
                  {'  '}
                  <span className="svc-code__cm">// not after a script runs</span>
                </span>
                <span className="svc-code__ln" data-n="4">
                  {'  '}
                  <span className="svc-code__kw">const</span> data ={' '}
                  <span className="svc-code__kw">await</span> getContent();
                </span>
                <span className="svc-code__ln" data-n="5">
                  {'  '}
                  <span className="svc-code__kw">return</span>{' '}
                  <span className="svc-code__tag">&lt;Article</span> {'{...data}'}{' '}
                  <span className="svc-code__tag">/&gt;</span>;
                </span>
                <span className="svc-code__ln" data-n="6">
                  {'}'}
                </span>
              </code>
            </pre>
          </div>
        </div>
      </header>

      {service.problem && (
        <section className="svc-code__problem">
          <div className="container container--narrow">
            <p className="svc-code__problemEyebrow">{service.problem.eyebrow}</p>
            <p className="svc-code__problemText">{service.problem.statement}</p>
          </div>
        </section>
      )}

      <ExperienceBlock slug={service.slug} variant="svc-exp--code" />

      {/* Capabilities as a file tree. */}
      <section className="svc-code__tree">
        <div className="container">
          <h2 className="statement statement--small">What a build includes</h2>
          <ul className="svc-code__files">
            {caps.map((c) => (
              <li key={c.title} className="svc-code__file">
                <span className="svc-code__filePath" aria-hidden="true">
                  {c.tag.toLowerCase().replace(/\s+/g, '-')}/
                </span>
                <div className="svc-code__fileBody">
                  <h3>{c.href ? <a href={c.href}>{c.title}</a> : c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(service.featureRows || []).map((row) => (
        <section key={row.title} className="svc-code__block">
          <div className="container container--narrow">
            <h2>{row.title}</h2>
            {row.lede && <p className="svc-code__blockLede">{row.lede}</p>}
            {Array.isArray(row.dek)
              ? row.dek.map((d, j) => <p key={j}>{d}</p>)
              : row.dek && <p>{row.dek}</p>}
            {row.list && (
              <ul className="svc-code__list">
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

      {/* Process as a commit log. */}
      <section className="svc-code__log">
        <div className="container container--narrow">
          <h2 className="statement statement--small">How a build progresses</h2>
          <ol className="svc-code__commits">
            {(service.process || []).map((p) => (
              <li key={p.step} className="svc-code__commit">
                <span className="svc-code__sha" aria-hidden="true">
                  {p.step}
                </span>
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
      <ServiceProof service={service} packages={false} />

      <ServiceFaqs service={service} />
      <ServiceCta service={service} />
    </main>
  );
}
