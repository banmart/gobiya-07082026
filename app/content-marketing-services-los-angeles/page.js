import ServiceTemplate from '../../components/ServiceTemplate';
import { getService } from '../../lib/serviceIndex';
import { buildMetadata } from '../../lib/meta';

const service = getService('content-marketing-services-los-angeles');

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: '/content-marketing-services-los-angeles',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
