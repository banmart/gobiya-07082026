import { buildMetadata } from '../../../lib/meta';
import IPGeoTool from './IPGeoTool';

export const metadata = buildMetadata({
  title: 'IP Geolocation | IP Geolocation Free | GEO IP Lookup',
  description:
    'Run a GEO IP lookup on any IPv4 or IPv6 address and see the city, country, and internet provider behind it. IP geolocation free from Gobiya, no signup required.',
  path: '/tools/ip-geolocation',
  // Authored to length — ships without the ' — Gobiya' tail.
  brandSuffix: false,
});

export default function Page() {
  return <IPGeoTool />;
}
