import OutcomeTemplate from '../../../components/OutcomeTemplate';
import { OUTCOMES } from '../../../lib/outcomes';
import { buildMetadata } from '../../../lib/meta';

const outcome = OUTCOMES['sales'];

export const metadata = buildMetadata({
  title: outcome.metaTitle || outcome.title,
  description: outcome.metaDescription,
  path: '/outcomes/sales',
});

export default function Page() {
  return <OutcomeTemplate outcome={outcome} />;
}
