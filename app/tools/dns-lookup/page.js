import { buildMetadata } from '../../../lib/meta';
import DNSLookupTool from './DNSLookupTool';

export const metadata = buildMetadata({
  title: 'Free DNS Lookup Tool | Check DNS Records Instantly',
  description: 'Instantly look up a domain\'s DNS records to spot connection problems and verify server setup. Free tool, no signup required.',
  path: '/tools/dns-lookup',
});

export default function Page() {
  return <DNSLookupTool />;
}
