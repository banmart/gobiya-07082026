import { buildMetadata } from '../../lib/meta';
import ToolsHub from './ToolsHub';

export const metadata = buildMetadata({
  title: 'Intelligence & Research Tools Suite',
  description: 'Enterprise-grade domain intelligence, DNS, and IP research utilities.',
  path: '/tools',
});

export default function Page() {
  return <ToolsHub />;
}
