import { buildMetadata } from '../../../lib/meta';
import ThreatTool from './ThreatTool';

export const metadata = buildMetadata({
  title: 'Free Threat Intelligence API | Phishing & Malware',
  description: 'Cross-reference domains against global threat feeds to instantly detect active malware, phishing campaigns, and botnet infrastructure.',
  path: '/tools/threat-intelligence',
});

export default function Page() {
  return <ThreatTool />;
}
