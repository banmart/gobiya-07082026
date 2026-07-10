import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['cro-ux'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/services/cro-ux',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
