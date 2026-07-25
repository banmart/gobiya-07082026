import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['ppc-management-services'];

export const metadata = buildMetadata({
  // Explicit rather than service.title — that field also drives the on-page
  // heading via split(' - '), so it can't be tuned for SERP length.
  title: 'PPC Management — Google Ads That Convert',
  description:
    'Google Ads managed for real customers, not clicks — tighter campaigns, matching landing pages, and tracking that shows what works. Free ad account check.',
  path: '/ppc-management-services',
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
