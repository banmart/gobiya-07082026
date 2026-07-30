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
// `eyebrow`, `excerpt` and `description` are all optional and render in the
// homepage order: eyebrow, headline, bold standfirst, body paragraph, actions.

export default function SubHero({
  image,
  eyebrow,
  title,
  excerpt,
  description,
  primary,
  secondary,
}) {
  return (
    <section
      className="mw-hero mw-hero--sub"
      style={image ? { backgroundImage: `url('${image}')` } : undefined}
    >
      <div className="mw-hero__overlay" />
      <div className="container">
        <div className="mw-hero__card">
          {eyebrow && <div className="mw-hero__eyebrow">{eyebrow}</div>}
          <h1 className="mw-hero__title">{title}</h1>
          {excerpt && <p className="mw-hero__excerpt">{excerpt}</p>}
          {description && <p className="mw-hero__description">{description}</p>}
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
