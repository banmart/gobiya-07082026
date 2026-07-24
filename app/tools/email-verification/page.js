import { buildMetadata } from '../../../lib/meta';
import EmailTool from './EmailTool';

export const metadata = buildMetadata({
  title: 'Free Email Verification Tool | Gobiya',
  description: 'Check whether an email address is real and can actually receive mail, in real time. Free tool, no signup required.',
  path: '/tools/email-verification',
});

export default function Page() {
  return <EmailTool />;
}
