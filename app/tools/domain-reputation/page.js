import { buildMetadata } from '../../../lib/meta';
import ReputationTool from './ReputationTool';

export const metadata = buildMetadata({
  title: 'Domain Reputation | Trust It Before You Link | Gobiya',
  description: 'Free domain reputation checker — score any domain for phishing, malware, spam flags, and blacklist reports before you link to it or trust it.',
  path: '/tools/domain-reputation',
});

export default function Page() {
  return <ReputationTool />;
}
