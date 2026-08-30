import { buildMetadata } from '../../lib/meta';
import ToolsHub from './ToolsHub';

export const metadata = buildMetadata({
  title: 'Free SEO Tools | Answers About Your Site in Seconds | Gobiya',
  description: 'Free SEO tools that answer questions about any domain in seconds — DNS, WHOIS, SSL, reputation, threat signals, and more. No signup, no limits.',
  path: '/tools',
});

export default function Page() {
  return <ToolsHub />;
}
