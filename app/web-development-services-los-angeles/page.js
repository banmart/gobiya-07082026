import ServiceTemplate from '../../components/ServiceTemplate';
import { getService } from '../../lib/serviceIndex';
import { buildMetadata } from '../../lib/meta';

const service = getService('web-development-services-los-angeles');

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: '/web-development-services-los-angeles',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
