'use client';

/* Sub-page hero — 800.com integration-page pattern.
 *
 * Centred layout: optional icon card → title → dek → pill buttons.
 * Breadcrumbs, eyebrow, badge, accent heading, and trust badges are gone.
 * Props are kept in the signature so existing callers don't need to change.
 */
export default function PageHero({
  // eslint-disable-next-line no-unused-vars
  badge,
  // eslint-disable-next-line no-unused-vars
  eyebrow,
  // eslint-disable-next-line no-unused-vars
  breadcrumbs,
  title,
  // eslint-disable-next-line no-unused-vars
  accent,
  dek,
  primary,
  secondary,
  icon = null,   // React node (SVG) shown in a white rounded card
  logo = null,   // legacy image logo — still rendered if icon is absent
  imageOnly = false,
  // eslint-disable-next-line no-unused-vars
  showTrust,
  children = null,
}) {
  if (imageOnly) {
    return (
      <section className="gb-hero gb-hero--band">
        <span className="gb-hero__dot gb-hero__dot--left"  aria-hidden="true" />
        <span className="gb-hero__dot gb-hero__dot--right" aria-hidden="true" />
      </section>
    );
  }

  return (
    <section className="gb-hero">
      <span className="gb-hero__dot gb-hero__dot--left"  aria-hidden="true" />
      <span className="gb-hero__dot gb-hero__dot--right" aria-hidden="true" />

      <div className="container">
        <div className="gb-hero__body">

          {/* Icon card */}
          {icon && (
            <div className="gb-hero__icon-card" aria-hidden="true">
              {icon}
            </div>
          )}

          {/* Legacy logo fallback */}
          {!icon && logo && (
            <div className="gb-hero__logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={typeof logo === 'string' ? logo : logo.src}
                alt={typeof logo === 'string' ? '' : (logo.alt || '')}
              />
            </div>
          )}

          <h1 className="gb-hero__title">{title}</h1>

          {dek && <p className="gb-hero__dek">{dek}</p>}

          {primary && (
            <div className="gb-hero__actions">
              <a href={primary.href} className="gb-btn gb-btn--accent" title={primary.text}>
                {primary.text}
              </a>
              {secondary && (
                <a href={secondary.href} className="gb-btn gb-btn--ghost" title={secondary.text}>
                  {secondary.text}
                </a>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
