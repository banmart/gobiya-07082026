import { buildMetadata } from '../../lib/meta';
import ToolsHub from './ToolsHub';

export const metadata = buildMetadata({
  title: 'Free SEO & Domain Tools | DNS, WHOIS, SSL & More',
  description: 'Free SEO and domain research tools from Gobiya: DNS lookup, WHOIS, SSL checker, threat intelligence, and more. No signup required — try them now.',
  path: '/tools',
});

export default function Page() {
  return <ToolsHub />;
}
