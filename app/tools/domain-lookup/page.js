import { buildMetadata } from '../../../lib/meta';
import DomainLookupTool from './DomainLookupTool';

export const metadata = buildMetadata({
  title: 'Domain Lookup | Know Who Owns It Before You Bid | Gobiya',
  description: 'Free WHOIS domain lookup — find out instantly whether a domain is available, who registered it, when, and which servers manage it. No signup.',
  path: '/tools/domain-lookup',
});

export default function Page() {
  return <DomainLookupTool />;
}
