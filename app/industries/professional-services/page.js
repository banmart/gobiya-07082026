import IndustryTemplate from '../../../components/IndustryTemplate';
import { INDUSTRIES } from '../../../lib/industries';
import { buildMetadata } from '../../../lib/meta';

const industry = INDUSTRIES['professional-services'];

export const metadata = buildMetadata({
  title: industry.title,
  description: industry.metaDescription,
  path: '/industries/professional-services',
});

export default function Page() {
  return <IndustryTemplate industry={industry} />;
}
