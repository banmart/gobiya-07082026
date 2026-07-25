import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['geo-services'];

export const metadata = buildMetadata({
  title: 'GEO Services — Get Cited by ChatGPT & AI',
  description:
    'Get your brand named in ChatGPT, Perplexity, and Google AI answers. Content built to be quoted, not just crawled. Free AI visibility check.',
  path: '/geo-services',
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
