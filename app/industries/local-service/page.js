import IndustryTemplate from '../../../components/IndustryTemplate';
import { INDUSTRIES } from '../../../lib/industries';
import { LOCATIONS_LIST } from '../../../lib/locations';

const industry = INDUSTRIES['local-service'];

export const metadata = {
  title: industry.title,
  description: industry.metaDescription,
};

export default function Page() {
  return <IndustryTemplate industry={industry} cities={LOCATIONS_LIST} />;
}
