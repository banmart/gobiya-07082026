import IndustryTemplate from '../../../components/IndustryTemplate';
import { INDUSTRIES } from '../../../lib/industries';
import { buildMetadata } from '../../../lib/meta';

const industry = INDUSTRIES['local-service'];

export const metadata = buildMetadata({
  title: industry.metaTitle || industry.title,
  description: industry.metaDescription,
  path: '/industries/local-service',
});

export default function Page() {
  return <IndustryTemplate industry={industry} />;
}
