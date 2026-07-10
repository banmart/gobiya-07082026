import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['authority-link-building'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/services/authority-link-building',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
