import OutcomeTemplate from '../../../components/OutcomeTemplate';
import { OUTCOMES } from '../../../lib/outcomes';
import { buildMetadata } from '../../../lib/meta';

const outcome = OUTCOMES['traffic'];

export const metadata = buildMetadata({
  title: outcome.title,
  description: outcome.metaDescription,
  path: '/outcomes/traffic',
});

export default function Page() {
  return <OutcomeTemplate outcome={outcome} />;
}
