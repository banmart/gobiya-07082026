import { buildMetadata } from '../../../lib/meta';
import SSLTool from './SSLTool';

export const metadata = buildMetadata({
  title: 'Free SSL Certificate Checker | Gobiya',
  description: 'Check whether a website\'s security certificate is valid, who issued it, and when it expires. Free tool, no signup required.',
  path: '/tools/ssl-certificates',
});

export default function Page() {
  return <SSLTool />;
}
