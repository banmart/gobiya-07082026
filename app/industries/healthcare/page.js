import IndustryTemplate from '../../../components/IndustryTemplate';
import { INDUSTRIES } from '../../../lib/industries';
import { buildMetadata } from '../../../lib/meta';

const industry = INDUSTRIES['healthcare'];

export const metadata = buildMetadata({
  title: industry.metaTitle || industry.title,
  description: industry.metaDescription,
  path: '/industries/healthcare',
});

export default function Page() {
  return <IndustryTemplate industry={industry} />;
}
