// The single source of truth for who Gobiya is and what it can claim.
//
// Written because the site contradicted itself on the one page Google reads as
// its author-credibility source: /about/steve-martin carried "Thirty years" in
// the meta description and "Fifteen Years of Hands-On Search Work" in the
// on-page excerpt, while four other files claimed "since 2010" against "since
// 2009" everywhere else.
//
// Every experience figure, founding date and credential on the site reads from
// here. Two numbers that must agree cannot drift apart if only one of them
// exists.
//
// Facts confirmed by Steve, 2026-09-01. Nothing may be added to this file that
// is not independently verifiable — it is the file that decides what the site
// is allowed to assert about itself.

/** Steve started building commercial websites in 1996. */
export const CAREER_START_YEAR = 1996;

/** Gobiya began trading in 2009 and was registered as an LLC in 2012. */
export const FOUNDED_YEAR = 2009;
export const LLC_YEAR = 2012;

/**
 * Years of experience, derived rather than written down.
 *
 * A hardcoded "30 years" is correct for exactly one year and quietly wrong
 * after that. Deriving it means the site ages correctly on its own.
 */
export function yearsExperience(now = new Date()) {
  return now.getFullYear() - CAREER_START_YEAR;
}

export function yearsInBusiness(now = new Date()) {
  return now.getFullYear() - FOUNDED_YEAR;
}

export const FOUNDER = {
  name: 'Steve Martin',
  jobTitle: 'Founder & Principal',
  url: 'https://www.gobiya.com/about/steve-martin',
  image: 'https://www.gobiya.com/assets/img/steve-portrait.webp',
  homeLocation: 'Glendale, CA',
  alumniOf: 'Glendale College',
};

/**
 * Subjects Steve works in, for Person.knowsAbout.
 *
 * These map to service pages that actually exist — a knowsAbout claim the site
 * cannot back up with a page is a claim worth deleting.
 */
export const KNOWS_ABOUT = [
  'Search Engine Optimization',
  'Generative Engine Optimization',
  'Technical SEO',
  'Local SEO',
  'Web Development',
  'Conversion Rate Optimization',
  'Pay-Per-Click Advertising',
  'Content Strategy',
];

/**
 * Verifiable experience claims, in the form the site is allowed to state them.
 *
 * Deliberately not certifications: no certification has been supplied, and
 * inventing one on the page Google reads for trust signals is the precise
 * opposite of the job.
 */
export function credentials(now = new Date()) {
  return [
    {
      label: `${yearsExperience(now)} years building for the web`,
      detail: `Commercial websites since ${CAREER_START_YEAR}, through static HTML to AI-driven search.`,
    },
    {
      label: `Gobiya since ${FOUNDED_YEAR}`,
      detail: `Founded ${FOUNDED_YEAR} in Los Angeles, registered as an LLC in ${LLC_YEAR}.`,
    },
    {
      label: 'The person who does the work',
      detail: 'No junior account managers between the strategy and the execution.',
    },
  ];
}

/** Person schema, shared by SiteSchema and any page that bylines an author. */
export function personSchema(now = new Date()) {
  return {
    '@type': 'Person',
    '@id': `${FOUNDER.url}#person`,
    name: FOUNDER.name,
    url: FOUNDER.url,
    image: FOUNDER.image,
    jobTitle: FOUNDER.jobTitle,
    description: `${FOUNDER.name} has ${yearsExperience(now)} years of experience building for the web, and founded Gobiya in ${FOUNDED_YEAR}.`,
    knowsAbout: KNOWS_ABOUT,
    homeLocation: { '@type': 'Place', name: FOUNDER.homeLocation },
    alumniOf: { '@type': 'CollegeOrUniversity', name: FOUNDER.alumniOf },
  };
}
