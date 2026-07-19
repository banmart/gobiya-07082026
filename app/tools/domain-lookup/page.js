import { buildMetadata } from '../../../lib/meta';
import DomainLookupTool from './DomainLookupTool';

export const metadata = buildMetadata({
  title: 'Domain Name Lookup Tool',
  description: 'Instantly check domain availability and WHOIS registration data.',
  path: '/tools/domain-lookup',
});

export default function Page() {
  return <DomainLookupTool />;
}
