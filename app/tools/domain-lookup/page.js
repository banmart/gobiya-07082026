import { buildMetadata } from '../../../lib/meta';
import DomainLookupTool from './DomainLookupTool';

export const metadata = buildMetadata({
  title: 'Domain Lookup',
  description: 'Free WHOIS domain lookup — find out instantly whether a domain is available, who registered it, when, and which servers manage it. No signup.',
  path: '/tools/domain-lookup',
  parent: 'Tools',
});

export default function Page() {
  return <DomainLookupTool />;
}
