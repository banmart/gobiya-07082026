import { buildMetadata } from '../../../lib/meta';
import WebCatTool from './WebCatTool';

export const metadata = buildMetadata({
  title: 'Free Website Categorization Tool | Gobiya',
  description: 'Instantly sort any website into standard industry categories, powered by AI. Free tool, no signup required.',
  path: '/tools/website-categorization',
});

export default function Page() {
  return <WebCatTool />;
}
