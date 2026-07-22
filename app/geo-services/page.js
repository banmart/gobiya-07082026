import FlatServiceTemplate from '../../components/FlatServiceTemplate';
import { SERVICES_FLAT } from '../../lib/servicesFlat';
import { buildMetadata } from '../../lib/meta';

const service = SERVICES_FLAT['geo-services'];

export const metadata = buildMetadata({
  title: 'GEO Services — Generative Engine & AI Search Optimization | Gobiya',
  description: 'Expert GEO services engineered to get your brand cited in ChatGPT, Perplexity, and Google AI Overviews. Real AI citation study results & free content audit.',
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
