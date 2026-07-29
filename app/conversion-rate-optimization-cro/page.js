import ServiceTemplate from '../../components/ServiceTemplate';
import { getService } from '../../lib/serviceIndex';
import { buildMetadata } from '../../lib/meta';

const service = getService('conversion-rate-optimization-cro');

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: '/conversion-rate-optimization-cro',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
