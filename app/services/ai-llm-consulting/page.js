import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';
import { buildMetadata } from '../../../lib/meta';

const service = SERVICES['ai-llm-consulting'];

export const metadata = buildMetadata({
  title: service.metaTitle || service.title,
  description: service.metaDescription,
  path: '/services/ai-llm-consulting',
});

export default function Page() {
  return <ServiceTemplate service={service} />;
}
