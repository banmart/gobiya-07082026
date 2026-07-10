import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['web-app-development'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/services/web-app-development',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
