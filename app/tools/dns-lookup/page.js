import { buildMetadata } from '../../../lib/meta';
import DNSLookupTool from './DNSLookupTool';

export const metadata = buildMetadata({
  title: 'DNS Lookup | See Where Your Domain Points, Free | Gobiya',
  description: 'DNS lookup for any domain — see the A, MX, TXT, and NS records behind it, spot connection problems, and verify email setup. Free, no signup.',
  path: '/tools/dns-lookup',
});

export default function Page() {
  return <DNSLookupTool />;
}
