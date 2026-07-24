import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['geo-services'];

export const metadata = buildMetadata({
  title: 'GEO Services — Get Found by ChatGPT & Google AI | Gobiya',
  description: 'Gobiya writes content that gets your brand mentioned by ChatGPT, Perplexity, and Google\'s AI answers. Real research behind it, plus a free content check.',
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
