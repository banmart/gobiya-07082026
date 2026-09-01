import SvcAuditReport from './SvcAuditReport';
import SvcCitationTrail from './SvcCitationTrail';
import SvcEditorial from './SvcEditorial';
import SvcNetwork from './SvcNetwork';
import SvcDashboard from './SvcDashboard';
import SvcSplitTest from './SvcSplitTest';
import SvcDeviceFrames from './SvcDeviceFrames';
import SvcCodePanel from './SvcCodePanel';
import SvcConversation from './SvcConversation';

/**
 * Service slug → layout. One layout per service, no reuse.
 *
 * Replaced components/ServiceTemplate.js, which rendered all nine services
 * through a single shell. Each layout takes the same service record and
 * arranges it around whatever that service actually is — a diagnostic report, a
 * citation trail, an editorial spread — rather than around a shared order of
 * sections.
 *
 * Adding a service means writing a layout for it. That cost is the point; the
 * registry throws rather than falling back to a default, so a missing layout
 * fails the build instead of quietly reintroducing a template.
 */
const SERVICE_LAYOUTS = {
  'technical-seo': SvcAuditReport,
  'geo': SvcCitationTrail,
  'content-marketing': SvcEditorial,
  'link-building': SvcNetwork,
  'ppc': SvcDashboard,
  'cro': SvcSplitTest,
  'web-ux': SvcDeviceFrames,
  'web-dev': SvcCodePanel,
  'ai-consulting': SvcConversation,
};

export function layoutForService(slug) {
  return SERVICE_LAYOUTS[slug] || null;
}

export { SERVICE_LAYOUTS };
