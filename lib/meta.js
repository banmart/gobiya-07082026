// Shared page-metadata builder: canonical URL + Open Graph + Twitter Card.
// Every page exports metadata through this so social shares render a card and
// every URL declares its own canonical. `path` is the site-relative route
// ('' for home); absolute URLs resolve against metadataBase in app/layout.js.

export const SITE_NAME = 'Gobiya';
export const DEFAULT_TITLE = 'Gobiya — Predictable Search Growth & High-Converting Web Engineering';
export const OG_IMAGE = {
  url: '/assets/img/og-default.jpg',
  width: 1200,
  height: 630,
  alt: 'Gobiya — Search Engineering & Web Development for Business Owners, Designers & Marketing Teams',
};

// `brandSuffix: false` ships the title exactly as authored — for pages whose
// title is written to a specific length or wording and has no room for the
// ' | Gobiya' tail.
// `parent` adds a parent section name: '{title} | Gobiya {parent}'.
export function buildMetadata({ title, description, path, robots, brandSuffix = true, parent }) {
  let metaTitle;
  if (!title) {
    metaTitle = DEFAULT_TITLE;
  } else if (parent) {
    // Strip any trailing " | Gobiya…" or " — Gobiya…" from authored titles before re-formatting.
    const bare = title.replace(/\s*[|—]\s*Gobiya.*$/i, '').trim();
    metaTitle = `${bare} | ${SITE_NAME} ${parent}`;
  } else {
    const needsSuffix = brandSuffix && !title.toLowerCase().includes(SITE_NAME.toLowerCase());
    metaTitle = needsSuffix ? `${title} | ${SITE_NAME}` : title;
  }
  return {
    // `absolute` opts out of the root layout's '%s — Gobiya' template. Without
    // it the suffix lands twice: once here, once from the template.
    ...(title ? { title: { absolute: metaTitle } } : {}),
    description,
    alternates: { canonical: path || '/' },
    openGraph: {
      title: metaTitle,
      description,
      url: path || '/',
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description,
    },
    robots: robots || {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
