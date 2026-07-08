import OutcomeTemplate from '../../../components/OutcomeTemplate';
import { OUTCOMES } from '../../../lib/outcomes';

const outcome = OUTCOMES['rankings'];

export const metadata = {
  title: outcome.title,
  description: outcome.metaDescription,
};

export default function Page() {
  return <OutcomeTemplate outcome={outcome} />;
}
