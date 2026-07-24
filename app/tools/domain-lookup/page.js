import { buildMetadata } from '../../../lib/meta';
import DomainLookupTool from './DomainLookupTool';

export const metadata = buildMetadata({
  title: 'Free WHOIS Domain Lookup Tool | Gobiya',
  description: 'Free tool to check if a domain is available, who registered it, when, and which servers manage it. No signup required.',
  path: '/tools/domain-lookup',
});

export default function Page() {
  return <DomainLookupTool />;
}
