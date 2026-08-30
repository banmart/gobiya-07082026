import { buildMetadata } from '../../../lib/meta';
import ThreatTool from './ThreatTool';

export const metadata = buildMetadata({
  title: 'Threat Intelligence | Spot a Threat Before It Lands | Gobiya',
  description: 'Free threat intelligence lookup — check any IP or domain against global security feeds for malware, phishing, and suspicious network activity.',
  path: '/tools/threat-intelligence',
});

export default function Page() {
  return <ThreatTool />;
}
