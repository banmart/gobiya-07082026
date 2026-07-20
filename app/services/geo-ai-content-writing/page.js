import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['geo-ai-content-writing'];

export const metadata = buildMetadata({
  title: service.metaTitle || service.title,
  description: service.metaDescription,
  path: '/services/geo-ai-content-writing',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
