import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['google-ads-ppc'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/services/google-ads-ppc',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
