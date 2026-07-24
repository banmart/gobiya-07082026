import { buildMetadata } from '../../../lib/meta';
import ThreatTool from './ThreatTool';

export const metadata = buildMetadata({
  title: 'Free Threat Intelligence Checker | Gobiya',
  description: 'Check any domain against known threat lists to instantly spot malware, phishing, and other malicious activity. Free tool, no signup required.',
  path: '/tools/threat-intelligence',
});

export default function Page() {
  return <ThreatTool />;
}
