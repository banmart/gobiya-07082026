import { buildMetadata } from '../../../lib/meta';
import SSLTool from './SSLTool';

export const metadata = buildMetadata({
  title: 'Free SSL Certificate Checker | Audit HTTPS Issuer Chains',
  description: 'Verify SSL certificate validity, issuer chains, Subject Alternative Names (SANs), and expiration dates across extensive server infrastructures.',
  path: '/tools/ssl-certificates',
});

export default function Page() {
  return <SSLTool />;
}
