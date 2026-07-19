import { buildMetadata } from '../../../lib/meta';
import ReputationTool from './ReputationTool';

export const metadata = buildMetadata({
  title: 'Free Domain Reputation Checker | Threat Intelligence API',
  description: 'Analyze any domain for security threats, phishing, and malware. Get an instant domain reputation score using our enterprise threat intelligence API.',
  path: '/tools/domain-reputation',
});

export default function Page() {
  return <ReputationTool />;
}
