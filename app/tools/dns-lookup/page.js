import { buildMetadata } from '../../../lib/meta';
import DNSLookupTool from './DNSLookupTool';

export const metadata = buildMetadata({
  title: 'Free DNS Lookup Tool | Check A, MX, TXT, CNAME Records',
  description: 'Instantly query global DNS records. Check A, MX, TXT, NS, and CNAME records to diagnose routing issues and verify server configurations.',
  path: '/tools/dns-lookup',
});

export default function Page() {
  return <DNSLookupTool />;
}
