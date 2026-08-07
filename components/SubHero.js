// One hero for every sub page.
//
// It renders the same markup the homepage hero does — full-bleed image, navy
// overlay, white card held left — so a visitor moving from / to a service or a
// city page keeps the same frame. Below 768px the shared `.mw-hero` rules in
// globals.css lift the media into a 16:9 band at the top of the section and
// stack the card content underneath it on white; nothing here needs to know
// about that, which is the point of having one component instead of a hero per
// page.
//
// `eyebrow` and `excerpt` are both optional. Render order is fixed:
// breadcrumbs, eyebrow, heading (title), secondary heading (excerpt), CTA.

import Breadcrumbs from './Breadcrumbs';

export default function SubHero({
  image,
  breadcrumbs,
  eyebrow,
  title,
  excerpt,
  primary,
  secondary,
  noCard = false,
  imageOnly = false,
  logo,
}) {
  if (imageOnly) {
    return (
      <section
        className="mw-hero mw-hero--sub mw-hero--image-only"
        style={image ? { backgroundImage: `url('${image}')` } : undefined}
      >
        <div className="mw-hero__overlay" />
      </section>
    );
  }

  return (
    <section
      className={`mw-hero mw-hero--sub ${noCard ? 'mw-hero--no-card' : ''}`.trim()}
      style={image ? { backgroundImage: `url('${image}')` } : undefined}
    >
      <div className="mw-hero__overlay" />
      <div className="container">
        <div className={noCard ? 'mw-hero__banner-plain' : 'mw-hero__card'}>
          {logo && (
            <div className="mw-hero__client-logo" style={{ marginBottom: '1rem' }}>
              <img
                src={typeof logo === 'string' ? logo : logo.src}
                alt={typeof logo === 'string' ? '' : (logo.alt || '')}
                style={{ maxHeight: '44px', maxWidth: '220px', objectFit: 'contain' }}
              />
            </div>
          )}
          {breadcrumbs && (
            Array.isArray(breadcrumbs) ? (
              <Breadcrumbs items={breadcrumbs} inHero light={noCard} />
            ) : (
              breadcrumbs
            )
          )}
          {eyebrow && (
            <div className={noCard ? 'mw-hero__eyebrow mw-hero__eyebrow--light' : 'mw-hero__eyebrow'}>
              {eyebrow}
            </div>
          )}
          <h1 className={noCard ? 'mw-hero__title mw-hero__title--light' : 'mw-hero__title'}>
            {title}
          </h1>
          {excerpt && (
            <p className={noCard ? 'mw-hero__excerpt mw-hero__excerpt--light' : 'mw-hero__excerpt'}>
              {excerpt}
            </p>
          )}
          {primary && (
            <div className="mw-hero__actions">
              <a href={primary.href} className="mw-hero__btn">
                {primary.text}
              </a>
              {secondary && (
                <a href={secondary.href} className="mw-hero__btn mw-hero__btn--ghost">
                  {secondary.text}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
