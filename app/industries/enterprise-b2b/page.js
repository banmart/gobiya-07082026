import IndustryTemplate from '../../../components/IndustryTemplate';
import { INDUSTRIES } from '../../../lib/industries';

const industry = INDUSTRIES['enterprise-b2b'];

export const metadata = {
  title: industry.title,
  description: industry.metaDescription,
};

export default function Page() {
  return <IndustryTemplate industry={industry} />;
}
