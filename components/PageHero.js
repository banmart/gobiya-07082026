import SplitHero from './SplitHero';

/**
 * The sub-page hero.
 *
 * This used to be its own thing: a centred navy band with an icon card, which
 * looked nothing like the homepage. It is now the homepage's hero with the
 * page's own copy in it — the whole component is a prop mapping onto SplitHero.
 *
 * Three props it had been throwing away are read again, because the homepage
 * structure has a slot for each of them:
 *
 *   eyebrow      → the pill badge above the headline
 *   image        → the picture in the right-hand column
 *   breadcrumbs  → above the badge, in the band
 *
 * `icon`, `logo` and `accent` are gone from the output. The split hero has no
 * icon card and no accent heading, and inventing places to put them would be
 * the drift this consolidation exists to remove. They stay in the signature so
 * the callers still passing them keep working.
 */
export default function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  dek,
  primary,
  secondary,
  image,
  imageAlt,
  showTrust = true,
  imageOnly = false,
  // eslint-disable-next-line no-unused-vars
  badge,
  // eslint-disable-next-line no-unused-vars
  accent,
  // eslint-disable-next-line no-unused-vars
  icon = null,
  // eslint-disable-next-line no-unused-vars
  logo = null,
  children = null,
}) {
  // A handful of pages ask for the band with nothing in it, as a spacer under
  // the fixed nav.
  if (imageOnly) {
    return <section className="gh-split-hero gh-split-hero--bare" />;
  }

  return (
    <SplitHero
      breadcrumbs={breadcrumbs}
      eyebrow={eyebrow}
      title={title}
      dek={dek}
      primary={primary}
      secondary={secondary}
      image={image}
      imageAlt={imageAlt}
      showTrust={showTrust}
    >
      {children}
    </SplitHero>
  );
}
