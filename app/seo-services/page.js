import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['seo-services'];

export const metadata = buildMetadata({
  title: 'Expert SEO Services & Organic Search Strategy | Gobiya Internet Marketing',
  description: 'Gobiya provides technical SEO services fixing crawlability, indexation, Core Web Vitals, and structured data so your business ranks on Google and AI crawlers. Free SEO audit.',
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
