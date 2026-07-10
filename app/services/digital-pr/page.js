import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['digital-pr'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/services/digital-pr',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
