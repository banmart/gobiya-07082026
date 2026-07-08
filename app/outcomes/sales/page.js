import OutcomeTemplate from '../../../components/OutcomeTemplate';
import { OUTCOMES } from '../../../lib/outcomes';

const outcome = OUTCOMES['sales'];

export const metadata = {
  title: outcome.title,
  description: outcome.metaDescription,
};

export default function Page() {
  return <OutcomeTemplate outcome={outcome} />;
}
