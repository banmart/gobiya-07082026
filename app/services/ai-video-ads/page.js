import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['ai-video-ads'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/services/ai-video-ads',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
