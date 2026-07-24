import { buildMetadata } from '../../../lib/meta';
import ReputationTool from './ReputationTool';

export const metadata = buildMetadata({
  title: 'Free Domain Reputation Checker & Threat Score',
  description: 'Check any domain for security threats, phishing, and malware, and get an instant trust score. Free tool, no signup required.',
  path: '/tools/domain-reputation',
});

export default function Page() {
  return <ReputationTool />;
}
