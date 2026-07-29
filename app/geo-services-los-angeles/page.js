import ServiceTemplate from '../../components/ServiceTemplate';
import { getService } from '../../lib/serviceIndex';
import { buildMetadata } from '../../lib/meta';

const service = getService('geo-services-los-angeles');

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: '/geo-services-los-angeles',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
