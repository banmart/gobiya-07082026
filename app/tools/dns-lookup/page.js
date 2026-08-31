import { buildMetadata } from '../../../lib/meta';
import DNSLookupTool from './DNSLookupTool';

export const metadata = buildMetadata({
  title: 'DNS Lookup',
  description: 'DNS lookup for any domain — see the A, MX, TXT, and NS records behind it, spot connection problems, and verify email setup. Free, no signup.',
  path: '/tools/dns-lookup',
  parent: 'Tools',
});

export default function Page() {
  return <DNSLookupTool />;
}
