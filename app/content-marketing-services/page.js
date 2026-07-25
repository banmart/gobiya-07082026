import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['content-marketing-services'];

export const metadata = buildMetadata({
  title: 'Content Marketing That Gets Found and Read',
  description: service.metaDescription,
  path: '/content-marketing-services',
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
