import ServiceTemplate from '../../../components/ServiceTemplate';
import { SERVICES } from '../../../lib/services';

const service = SERVICES['geo-ai-content-writing'];

export const metadata = {
  title: service.title,
  description: service.metaDescription,
};

export default function Page() {
  return <ServiceTemplate service={service} />;
}
