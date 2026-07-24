import { buildMetadata } from '../../lib/meta';
import ToolsHub from './ToolsHub';

export const metadata = buildMetadata({
  title: 'Free SEO & Domain Tools | Gobiya',
  description: 'Free tools from Gobiya to check a domain\'s DNS records, ownership, security certificate, and more. No signup required — try them now.',
  path: '/tools',
});

export default function Page() {
  return <ToolsHub />;
}
