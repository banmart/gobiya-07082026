// One hero for every sub page.
//
// A thin adapter over PageHero, kept because fifteen pages already call it with
// this prop shape. The `image` and `noCard` props are no longer read: the hero
// is the shared navy/WebGL band now, so there is no photo to place and no white
// card to opt out of. They stay in the signature so the callers don't all have
// to be edited at once.
//
// Render order is fixed: breadcrumbs, eyebrow, heading (title), secondary
// heading (excerpt), dek, CTA. Everything but `title` is optional.
//
// `excerpt` is the carmine secondary heading and has to stay SHORT — it is set
// at 24px and runs on one or two lines. Anything that needs a sentence to
// explain the page belongs in `dek`, which is body copy under it.

import PageHero from './PageHero';

export default function SubHero({
  image,    // eslint-disable-line no-unused-vars -- retained for callers
  breadcrumbs, // eslint-disable-line no-unused-vars -- retained for callers
  eyebrow,  // eslint-disable-line no-unused-vars -- retained for callers
  title,
  excerpt,  // eslint-disable-line no-unused-vars -- retained for callers
  dek,
  primary,
  secondary,
  noCard = false, // eslint-disable-line no-unused-vars -- retained for callers
  imageOnly = false,
  showTrust = false,
  logo,
  icon,
}) {
  return (
    <PageHero
      title={title}
      dek={dek}
      primary={primary}
      secondary={secondary}
      logo={logo}
      icon={icon}
      imageOnly={imageOnly}
      showTrust={showTrust}
    />
  );
}
