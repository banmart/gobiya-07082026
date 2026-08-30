import { buildMetadata } from '../../../lib/meta';
import SSLTool from './SSLTool';

export const metadata = buildMetadata({
  title: 'SSL Certificate Checker | Your Padlock, Verified | Gobiya',
  description: "Free SSL certificate checker — confirm a site's certificate is valid, see who issued it, which domains it covers, and exactly when it expires.",
  path: '/tools/ssl-certificates',
});

export default function Page() {
  return <SSLTool />;
}
