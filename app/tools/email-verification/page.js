import { buildMetadata } from '../../../lib/meta';
import EmailTool from './EmailTool';

export const metadata = buildMetadata({
  title: 'Free Email Verification API | Check Deliverability',
  description: 'Validate the existence and deliverability of any email address in real-time. Checks SMTP, MX records, syntax, and disposable email providers.',
  path: '/tools/email-verification',
});

export default function Page() {
  return <EmailTool />;
}
