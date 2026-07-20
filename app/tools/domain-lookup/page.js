import { buildMetadata } from '../../../lib/meta';
import DomainLookupTool from './DomainLookupTool';

export const metadata = buildMetadata({
  title: 'Free WHOIS Domain Lookup Tool | DNS & Registration',
  description: 'Free WHOIS domain lookup tool: check registration status, domain age, nameservers, registrar info, and DNS details instantly. No signup required.',
  path: '/tools/domain-lookup',
});

export default function Page() {
  return <DomainLookupTool />;
}
