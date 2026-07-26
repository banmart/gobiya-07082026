import ServiceTemplate from '../../components/ServiceTemplate';
import { SERVICES } from '../../lib/services';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES['cro-ux-services-los-angeles'];

export const metadata = buildMetadata({
  title: service.metaTitle || service.title,
  description: service.metaDescription,
  path: '/cro-ux-services-los-angeles',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
