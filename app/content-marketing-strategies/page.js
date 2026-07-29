import ServiceTemplate from '../../components/ServiceTemplate';
import { getService } from '../../lib/serviceIndex';
import { buildMetadata } from '../../lib/meta';

const service = getService('content-marketing-strategies');

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: '/content-marketing-strategies',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
