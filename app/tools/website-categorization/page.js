import { buildMetadata } from '../../../lib/meta';
import WebCatTool from './WebCatTool';

export const metadata = buildMetadata({
  title: 'Free Website Categorization API | AI Classifier',
  description: 'Instantly classify any domain into standardized IAB categories, powered by AI content clustering and machine learning. Free tool, no signup required.',
  path: '/tools/website-categorization',
});

export default function Page() {
  return <WebCatTool />;
}
