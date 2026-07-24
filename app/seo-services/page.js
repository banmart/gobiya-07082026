import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['seo-services'];

export const metadata = buildMetadata({
  title: 'SEO Services That Get You Found on Google | Gobiya',
  description: 'Gobiya fixes the technical problems keeping Google and AI tools from finding and reading your site, so your business actually shows up. Free SEO check.',
  path: '/seo-services',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
});

export default function Page() {
  return <FlatServiceTemplate service={service} />;
}
