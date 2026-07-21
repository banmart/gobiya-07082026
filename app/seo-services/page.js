import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['seo-services'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/seo-services',
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
