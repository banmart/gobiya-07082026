import ServiceTemplate from '../../components/ServiceTemplate';
import { getService } from '../../lib/serviceIndex';
import { buildMetadata } from '../../lib/meta';

const service = getService('seo-services');

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: '/seo-services',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
