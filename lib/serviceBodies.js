// Authored body copy, keyed by service slug.
//
// Empty by design as of 2026-08-08: all nine service pages now carry their body
// as `featureRows` on the service itself (lib/servicesFlat.js, lib/services.js)
// and render it through components/FeatureRows.js — the homepage's alternating
// content/image band — instead of a single prose column. Every heading,
// paragraph and list item moved across; nothing that was indexed was dropped.
//
// ServiceTemplate still reads this map and still renders the prose column when
// a slug has an entry here, so a future service can author blocks in the old
// vocabulary (h2, h3, h4, excerpt, p, list, button, cta — see
// components/ContentBlocks.js) without any template change. A service must not
// have both: `featureRows` and an entry here would print the same copy twice.
//
// The city pages in lib/areas.js still use the block vocabulary and the same
// ContentBlocks renderer, so that path is not dead.

export const SERVICE_BODIES = {};
