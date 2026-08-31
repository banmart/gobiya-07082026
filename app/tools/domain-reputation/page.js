import { buildMetadata } from '../../../lib/meta';
import ReputationTool from './ReputationTool';

export const metadata = buildMetadata({
  title: 'Domain Reputation Check',
  description: 'Free domain reputation checker — score any domain for phishing, malware, spam flags, and blacklist reports before you link to it or trust it.',
  path: '/tools/domain-reputation',
  parent: 'Tools',
});

export default function Page() {
  return <ReputationTool />;
}
