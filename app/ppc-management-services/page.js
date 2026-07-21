import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['ppc-management-services'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/ppc-management-services',
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
