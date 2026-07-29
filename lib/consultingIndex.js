// The service list used by the /services index, the ItemList in SiteSchema,
// and the MCP service resources.
//
// This used to be built from SERVICES_FLAT alone, which covered four of the
// eight service pages — link building, CRO, web development and AI consulting
// were absent from the services index and from the site's own schema. It also
// carried a second 'AI Search & Visibility' entry pointing at the GEO page,
// listing one page twice. Both are fixed by reading the canonical list.

import { SERVICE_LINKS } from './serviceIndex';

export const CONSULTING_ITEMS = SERVICE_LINKS.map((s) => ({
  slug: s.slug,
  href: s.href,
  tag: 'Consulting',
  title: s.title,
  desc: s.desc,
}));
