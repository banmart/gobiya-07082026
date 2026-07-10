import IndustryTemplate from '../../../components/IndustryTemplate';
import { INDUSTRIES } from '../../../lib/industries';
import { LOCATIONS_LIST } from '../../../lib/locations';
import { buildMetadata } from '../../../lib/meta';

const industry = INDUSTRIES['local-service'];

export const metadata = buildMetadata({
  title: industry.title,
  description: industry.metaDescription,
  path: '/industries/local-service',
});

export default function Page() {
  return <IndustryTemplate industry={industry} cities={LOCATIONS_LIST} />;
}
