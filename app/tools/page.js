import { buildMetadata } from '../../lib/meta';
import ToolsHub from './ToolsHub';

export const metadata = buildMetadata({
  title: 'Free Los Angeles SEO & Web Tools | Gobiya',
  description: 'Free online SEO and domain tools for Los Angeles business owners. Check DNS, email setup, IP geolocation, and domain health.',
  path: '/tools',
});

export default function Page() {
  return <ToolsHub />;
}
