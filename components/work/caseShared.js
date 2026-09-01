import Image from 'next/image';
import ClientLogos from '../ClientLogos';
import CaseMediaVideo from '../CaseMediaVideo';
import { FOUNDER } from '../../lib/authority';

const BASE = 'https://www.gobiya.com';

/**
 * Shared pieces for the nine case study pages.
 *
 * Schema, the media player, the testimonial and the closing block. How a study
 * is *arranged* — what leads, whether metrics come before or after the
 * narrative, how the body is chaptered — belongs to each study's own layout.
 */

export function caseSchema(cs) {
  const url = `${BASE}/work/${cs.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: `${cs.client}: ${cs.result}`,
        description: cs.study.metaDescription,
        url,
        about: { '@type': 'Organization', name: cs.client },
        author: { '@id': `${FOUNDER.url}#person` },
        publisher: { '@id': `${BASE}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        isPartOf: { '@id': `${BASE}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${BASE}/work` },
          { '@type': 'ListItem', position: 3, name: cs.client, item: url },
        ],
      },
    ],
  };
}

export function CaseSchema({ cs }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema(cs)) }}
    />
  );
}

export function CaseLogo({ cs, className = '' }) {
  const m = cs.media;
  if (!m?.logo) return null;
  return (
    <Image
      src={m.logo}
      alt={m.logoAlt || `${cs.client} logo`}
      width={m.logoWidth || 200}
      height={m.logoHeight || 37}
      className={`case-logo ${className}`}
    />
  );
}

/** The screencast or commercial. Media lives on cs.media, not cs.study. */
export function CaseVideo({ cs }) {
  const m = cs.media;
  if (!m?.video) return null;
  return (
    <CaseMediaVideo
      src={m.video}
      mp4Src={m.videoMp4}
      sound={m.hasSound}
      label={`${cs.client} ${m.hasSound ? 'commercial' : 'product screencast'}`}
    />
  );
}

/** Body chapters, rendered plainly. Layouts decide how they are framed. */
export function CaseBody({ cs, renderHeading }) {
  return (
    <>
      {cs.study.body.map((block, i) => (
        <section key={block.heading} className="case-chapter">
          {renderHeading ? renderHeading(block, i) : <h2>{block.heading}</h2>}
          {block.paragraphs.map((p, j) =>
            typeof p === 'string' ? (
              <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
            ) : null
          )}
        </section>
      ))}
    </>
  );
}

export function CaseTakeaways({ cs, title = 'What made the difference' }) {
  if (!cs.study.takeaways?.length) return null;
  return (
    <div className="case-takeaways">
      <h2>{title}</h2>
      <ul>
        {cs.study.takeaways.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export function CaseTestimonial({ cs }) {
  const t = cs.study.testimonial;
  if (!t) return null;
  return (
    <section className="case-quote">
      <div className="container container--narrow">
        <blockquote>
          <p>&ldquo;{t.quote}&rdquo;</p>
          <footer>
            {t.photo && (
              <Image
                src={t.photo}
                alt={t.name || cs.client}
                width={44}
                height={44}
                className="case-quote__photo"
              />
            )}
            <span>
              {t.name && <strong>{t.name}</strong>}
              {t.role && <span className="case-quote__role">{t.role}</span>}
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

export function CaseClosing({ cs }) {
  return (
    <>
      <ClientLogos />
      <section className="cta section section--tint" id="contact">
        <div className="container container--narrow">
          <h2 className="cta__title">Your business could be the next case study.</h2>
          <div className="cta__actions">
            <a href="?onboarding=true" className="btn btn--solid btn--big">
              Schedule a Consultation
            </a>
            {cs.serviceHref && (
              <a href={cs.serviceHref} className="btn btn--ghost btn--big">
                {cs.serviceLabel || 'See the service'}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
