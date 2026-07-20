import OutcomeTemplate from '../../../components/OutcomeTemplate';
import { OUTCOMES } from '../../../lib/outcomes';
import { buildMetadata } from '../../../lib/meta';

const outcome = OUTCOMES['rankings'];

export const metadata = buildMetadata({
  title: outcome.metaTitle || outcome.title,
  description: outcome.metaDescription,
  path: '/outcomes/rankings',
});

export default function Page() {
  return <OutcomeTemplate outcome={outcome} />;
}
