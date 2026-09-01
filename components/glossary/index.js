import HubPipeline from './HubPipeline';
import HubLedger from './HubLedger';
import HubWaterfall from './HubWaterfall';
import HubGates from './HubGates';
import HubAnatomy from './HubAnatomy';
import HubDossier from './HubDossier';

/**
 * Hub slug → layout. One layout per hub, no reuse.
 *
 * These are not variants of a shared template: each component lays its terms out
 * differently because the subject suggests a different shape. Adding a seventh
 * hub means writing a seventh layout, which is the intended cost.
 */
const HUB_LAYOUTS = {
  'ai-search-and-geo': HubPipeline,
  'ppc-and-paid-media': HubLedger,
  'site-speed-ux-and-conversion': HubWaterfall,
  'technical-seo-and-indexing': HubGates,
  'on-page-and-content-seo': HubAnatomy,
  'authority-links-and-local-seo': HubDossier,
};

export function layoutForHub(slug) {
  return HUB_LAYOUTS[slug] || null;
}

export { HUB_LAYOUTS };
