import { buildMetadata } from '../../../lib/meta';
import DomainLookupTool from './DomainLookupTool';

export const metadata = buildMetadata({
  title: 'Free WHOIS Domain Name Lookup Tool | DNS & Registration Check',
  description: 'Use our free enterprise-grade WHOIS domain name lookup tool to check registration status, domain age, nameservers, registrar info, and full DNS details instantly.',
  path: '/tools/domain-lookup',
});

export default function Page() {
  return <DomainLookupTool />;
}
