import IndustryTemplate from '../../../components/IndustryTemplate';
import { INDUSTRIES } from '../../../lib/industries';

const industry = INDUSTRIES['professional-services'];

export const metadata = {
  title: industry.title,
  description: industry.metaDescription,
};

export default function Page() {
  return <IndustryTemplate industry={industry} />;
}
