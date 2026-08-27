import IridescenceCanvas from './IridescenceCanvas';
import Breadcrumbs from './Breadcrumbs';

/* One hero for every page on the site — homepage, services, solutions, work,
 * about, legal.
 *
 * The background is two layers: the WebGL iridescence field, and a scrim over
 * it. The scrim is a horizontal gradient, heavy under the copy column and
 * nearly clear on the right — that is what lets the field actually read on the
 * page while keeping the headline and the carmine accent line above contrast
 * where the text sits. It is not decoration: the canvas's warm passes are
 * bright enough on their own to drop white text below 3:1.
 *
 * Render order inside the copy column is fixed: logo, breadcrumbs, badge or
 * eyebrow, h1, accent line, dek, actions. Everything except `title` is
 * optional, so a legal page passes three props and a service page passes seven
 * and both come out on the same frame.
 */
export default function PageHero({
  badge,
  eyebrow,
  breadcrumbs,
  title,
  accent,
  dek,
  primary,
  secondary,
  logo = null,
  imageOnly = false,
  children = null,
}) {
  if (imageOnly) {
    return (
      <section className="gb-hero gb-hero--band">
        <div className="gb-hero__waves" aria-hidden="true">
          <IridescenceCanvas intensity={0.92} speed={0.65} amplitude={0.12} />
        </div>
        <div className="gb-hero__scrim" aria-hidden="true" />
      </section>
    );
  }

  return (
    <section className="gb-hero">
      <div className="gb-hero__waves" aria-hidden="true">
        <IridescenceCanvas intensity={0.92} speed={0.65} amplitude={0.12} />
      </div>
      <div className="gb-hero__scrim" aria-hidden="true" />

      <div className="container">
        <div className="gb-hero__layout">
          <div className="gb-hero__copy">
            {logo && (
              <div className="gb-hero__logo">
                <img
                  src={typeof logo === 'string' ? logo : logo.src}
                  alt={typeof logo === 'string' ? '' : (logo.alt || '')}
                />
              </div>
            )}

            {breadcrumbs &&
              (Array.isArray(breadcrumbs) ? (
                <Breadcrumbs items={breadcrumbs} inHero light />
              ) : (
                breadcrumbs
              ))}

            {badge && <p className="gb-hero__badge">{badge}</p>}
            {eyebrow && <p className="gb-hero__eyebrow">{eyebrow}</p>}

            <h1 className="gb-hero__title">{title}</h1>

            {/* The secondary heading is an h2 on sub pages, where it carries the
                city and the service — it is the page's second real heading, not
                decoration. The homepage passes a plain accent line instead. */}
            {accent && <h2 className="gb-hero__accent">{accent}</h2>}
            {dek && <p className="gb-hero__dek">{dek}</p>}

            {primary && (
              <div className="gb-hero__actions">
                <a href={primary.href} className="gb-btn gb-btn--accent">
                  {primary.text}
                </a>
                {secondary && (
                  <a href={secondary.href} className="gb-btn gb-btn--ghost">
                    {secondary.text}
                  </a>
                )}
              </div>
            )}

            {/* Anything a page needs under the actions — the byline and read
                time on an article, for instance. */}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
