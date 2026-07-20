import { buildMetadata } from '../../../lib/meta';
import IPGeoTool from './IPGeoTool';

export const metadata = buildMetadata({
  title: 'Free IP Geolocation Lookup Tool | Find IP Location',
  description: 'Lookup the geographical location of any IPv4 or IPv6 address. Find the country, city, ISP, Autonomous System (AS) and coordinates instantly.',
  path: '/tools/ip-geolocation',
});

export default function Page() {
  return <IPGeoTool />;
}
