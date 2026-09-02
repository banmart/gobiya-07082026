import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';

/**
 * The hero. One of them, for the whole site.
 *
 * The homepage is the theme, so the homepage's hero markup is the hero markup:
 * badge, headline, dek, a gold primary and a ghost secondary, the trust pills,
 * and a picture on the right. This component owns it, and both HomeSplitHero
 * and PageHero render it rather than each carrying a copy.
 *
 * That is the point. Before this, the homepage had one hero, fifteen pages had
 * a centred navy band through PageHero, and the twenty-five bespoke layouts had
 * twenty-five headers of their own — so "make the sub pages look like the
 * homepage" was a change in twenty-seven places and stayed consistent for about
 * a week. Now there is one place.
 *
 * The classes stay `gh-split-hero__*` — the homepage's own — so there is a
 * single set of hero styles in globals.css and no second one to drift from it.
 */
export default function SplitHero({
  breadcrumbs,
  eyebrow,
  title,
  dek,
  primary,
  secondary,
  image,
  imageAlt = '',
  showTrust = true,
  children = null,
}) {
  // The homepage passes {src,width,height} and gets intrinsic sizing, which is
  // what it renders today and must keep rendering. Sub pages pass a bare path
  // from lib/heroImages — those are 2752x1536 rather than 800x447, so they fill
  // the column and crop instead of dictating its shape.
  const sized = image && typeof image === 'object' && image.width;
  const src = typeof image === 'string' ? image : image?.src;

  return (
    <section className="gh-split-hero">
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs inHero light items={breadcrumbs} />
        )}

        <div className="gh-split-hero__grid">
          <div className="gh-split-hero__copy">
            {eyebrow && <p className="gh-split-hero__badge">{eyebrow}</p>}

            <h1 className="gh-split-hero__title">{title}</h1>

            {dek && <p className="gh-split-hero__dek">{dek}</p>}

            {primary && (
              <div className="gh-split-hero__actions">
                <a
                  href={primary.href}
                  className="gh-split-hero__btn-gold"
                  title={primary.text}
                >
                  {primary.text}
                </a>
                {secondary && (
                  <a
                    href={secondary.href}
                    className="gh-split-hero__btn-ghost"
                    title={secondary.text}
                  >
                    {secondary.text}
                  </a>
                )}
              </div>
            )}

            {showTrust && (
              <div className="gh-split-hero__social-proof">
                <span className="gh-split-hero__proof-label">
                  Trusted by over 500+ companies
                </span>
                <div className="gh-split-hero__badges">
                  <div className="gh-badge-pill gh-badge-pill--google" title="Google 5-Star Rated">
                    <span className="gh-badge-pill__icon">G</span>
                    <span className="gh-badge-pill__brand">Google</span>
                    <span className="gh-badge-pill__stars">★★★★★</span>
                  </div>
                  <div className="gh-badge-pill gh-badge-pill--clutch" title="Clutch 5.0 Rated">
                    <span className="gh-badge-pill__brand">Clutch</span>
                    <span className="gh-badge-pill__score">5.0</span>
                    <span className="gh-badge-pill__stars">★★★★★</span>
                  </div>
                </div>
              </div>
            )}

            {children}
          </div>

          {src && (
            <div
              className={`gh-split-hero__visual${sized ? '' : ' gh-split-hero__visual--fill'}`}
              aria-hidden={imageAlt ? undefined : true}
            >
              {sized ? (
                <Image
                  src={src}
                  alt={imageAlt}
                  width={image.width}
                  height={image.height}
                  priority
                  className="gh-split-hero__img"
                />
              ) : (
                <Image
                  src={src}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 60rem) 100vw, 55vw"
                  priority
                  className="gh-split-hero__img"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
