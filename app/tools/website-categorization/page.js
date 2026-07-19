import { buildMetadata } from '../../../lib/meta';
import WebCatTool from './WebCatTool';

export const metadata = buildMetadata({
  title: 'Free Website Categorization API Tool | AI Content Classifier',
  description: 'Instantly classify any domain into standardized IAB categories. Powered by AI content clustering and machine learning.',
  path: '/tools/website-categorization',
});

export default function Page() {
  return <WebCatTool />;
}
