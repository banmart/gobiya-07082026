import Breadcrumbs from '../Breadcrumbs';
import {
  SolutionSchema,
  RecommendedServices,
  SolutionFaqs,
  SolutionProof,
  SolutionCta,
} from './solutionShared';

/**
 * "Not showing up in ChatGPT" — a visibility check.
 *
 * The question is per-platform and people assume it is not, so the page opens
 * on a row of surfaces to be checked one at a time. The causes are then set as
 * a checklist of things that are either true of your site or are not, rather
 * than as a numbered differential like the triage page.
 */
export default function SolVisibilityCheck({ sol }) {
  const SURFACES = [
    { name: 'ChatGPT', note: 'Searches the live web, cites a handful of sources.' },
    { name: 'Perplexity', note: 'Cites far more sources per answer than most.' },
    { name: 'Google AI Overviews', note: 'Leans on pages already ranking organically.' },
    { name: 'Gemini', note: 'Its own retrieval, its own set of cited domains.' },
    { name: 'Copilot', note: 'Fed by the Bing index rather than Google.' },
  ];

  return (
    <main id="top" className="sol sol--check">
      <SolutionSchema sol={sol} />

      <header className="sol-check__hero">
        <div className="container container--narrow">
          <Breadcrumbs
            inHero
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/solutions' },
              { label: sol.title },
            ]}
          />
          <p className="sol-check__eyebrow">{sol.eyebrow}</p>
          <h1 className="sol-check__h1">{sol.title}</h1>
          <p className="sol-check__sub">{sol.subtitle}</p>
        </div>
      </header>

      {/* Five surfaces, checked separately — the point of the page. */}
      <section className="sol-check__surfaces">
        <div className="container">
          <h2 className="sol-check__surfacesTitle">Five surfaces, checked separately</h2>
          <p className="sol-check__surfacesNote">
            In our analysis of 3,217 citations, only 2.7% of cited domains
            appeared across all five. Being invisible on one says almost nothing
            about the others, which is why a single &ldquo;AI visibility
            score&rdquo; is not worth much.
          </p>
          <ul className="sol-check__surfaceRow">
            {SURFACES.map((s) => (
              <li key={s.name} className="sol-check__surface">
                <span className="sol-check__surfaceMark" aria-hidden="true">
                  ?
                </span>
                <strong>{s.name}</strong>
                <span className="sol-check__surfaceNote">{s.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sol-check__complaint">
        <div className="container container--narrow">
          <p className="sol-check__complaintLabel">Why this happens</p>
          <p className="sol-check__complaintText">{sol.painPoint}</p>
        </div>
      </section>

      {/* Causes as a checklist rather than a ranked differential. */}
      <section className="sol-check__list">
        <div className="container container--narrow">
          <h2 className="sol-check__listTitle">What has to be true before you get cited</h2>
          <ul className="sol-check__checks">
            {(sol.diagnosis || []).map((item) => (
              <li key={item.title} className="sol-check__check">
                <span className="sol-check__box" aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  {item.serviceLink && (
                    <a href={item.serviceLink.href}>{item.serviceLink.title} &rarr;</a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RecommendedServices sol={sol} heading="The work that changes this" />
      <SolutionFaqs sol={sol} />
      <SolutionProof />
      <SolutionCta title="Find out which assistants can see you" />
    </main>
  );
}
