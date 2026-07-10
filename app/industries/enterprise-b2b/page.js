import IndustryTemplate from '../../../components/IndustryTemplate';
import { INDUSTRIES } from '../../../lib/industries';
import { buildMetadata } from '../../../lib/meta';

const industry = INDUSTRIES['enterprise-b2b'];

export const metadata = buildMetadata({
  title: industry.title,
  description: industry.metaDescription,
  path: '/industries/enterprise-b2b',
});

export default function Page() {
  return <IndustryTemplate industry={industry} />;
}
