import { buildMetadata } from '../../../lib/meta';
import WebCatTool from './WebCatTool';

export const metadata = buildMetadata({
  title: 'Website Categorization | See How the Web Reads You | Gobiya',
  description: 'Free website categorization — see instantly how security filters, ad networks, and AI content analyzers classify any domain, and whether it matches.',
  path: '/tools/website-categorization',
});

export default function Page() {
  return <WebCatTool />;
}
