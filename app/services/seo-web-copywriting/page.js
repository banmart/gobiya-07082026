import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['seo-web-copywriting'];

export const metadata = buildMetadata({
  title: service.metaTitle || service.title,
  description: service.metaDescription,
  path: '/services/seo-web-copywriting',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
