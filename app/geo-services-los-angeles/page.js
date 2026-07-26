import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['geo-services-los-angeles'];

export const metadata = buildMetadata({
  title: service.title,
  description: service.metaDescription,
  path: '/geo-services-los-angeles',
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
