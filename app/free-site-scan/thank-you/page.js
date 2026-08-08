import Link from 'next/link';
import { CONTACT } from '../../../lib/nav';
import { buildMetadata } from '../../../lib/meta';
import TopicMarquee from '../../../components/TopicMarquee';
import Breadcrumbs from '../../../components/Breadcrumbs';

export const metadata = buildMetadata({
  title: 'Thanks',
  description: 'Your free site scan submission was received.',
  robots: { index: false, follow: true },
  path: '/free-site-scan/thank-you',
});

export default function OnboardingThankYouPage() {
  return (
    <main id="top">
      <TopicMarquee topics={["Intake Received", "Personal Founder Audit", "1 Business Day Reply", "No Automated Sequences", "Direct Follow-Up"]} />

    </main>
  );
}
