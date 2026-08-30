import { buildMetadata } from '../../../lib/meta';
import EmailTool from './EmailTool';

export const metadata = buildMetadata({
  title: "Email Verification | Know It's Real Before You Send | Gobiya",
  description: 'Free email verification — check in real time whether an address exists, can receive mail, and is not disposable, before it hurts your sender score.',
  path: '/tools/email-verification',
});

export default function Page() {
  return <EmailTool />;
}
