'use client';

import { useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import SubHero from '../../../components/SubHero';
import { heroImage } from '../../../lib/heroImages';

export default function IPGeoTool() {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ip) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/tools/ip-geo?ip=${encodeURIComponent(ip.trim())}`);
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.details || json.error || 'Failed to fetch IP intelligence');

      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="top">
      <SubHero image={heroImage(5)} imageOnly={true} />

      <section className="page-hero section" style={{ paddingBottom: '1rem' }}>
        <div className="container container--narrow">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Free Tools', href: '/tools' }, { label: 'IP Geolocation' }]} />
          <h1 className="statement" data-split>See Exactly Where an IP Address Sits on the Map</h1>
          <p className="lede" data-reveal>Run a GEO IP lookup on any address and find out roughly where it is located and which internet provider it belongs to. IP geolocation free, with no signup.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <div className="form-panel" style={{ backgroundColor: 'var(--panel)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="ip" className="form-label" style={{ marginBottom: '0.75rem', display: 'block', fontWeight: 500 }}>Enter an IPv4 or IPv6 Address</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    id="ip"
                    className="form-input"
                    placeholder="8.8.8.8"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)' }}
                  />
                  <button type="submit" className="btn" disabled={loading} style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
                    {loading ? 'Locating...' : 'Track IP Address'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {error && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', border: '1px solid #f87171' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {data && (
            <div style={{ marginTop: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Geolocation Results for: {data.ip || ip}</h3>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Location</h4>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: '1.125rem' }}>
                      {data.location?.city ? `${data.location.city}, ` : ''}
                      {data.location?.region ? `${data.location.region}, ` : ''}
                      {data.location?.country || 'Unknown'}
                    </p>
                    <p style={{ margin: 0, marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                      Lat: {data.location?.lat}, Lng: {data.location?.lng}
                    </p>
                  </div>
                  <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                    <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ISP / Provider</h4>
                    <p style={{ margin: 0, fontWeight: 500, fontSize: '1.125rem' }}>{data.isp || 'N/A'}</p>
                  </div>
                </div>

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0 }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Network Info</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.75' }}>
                    <li><strong>Autonomous System:</strong> {data.as?.asn ? `AS${data.as.asn} - ${data.as.name}` : 'N/A'}</li>
                    <li><strong>Connection Type:</strong> {data.connectionType || 'Unknown'}</li>
                    <li><strong>Proxy Detected:</strong> {data.proxy?.proxy ? 'Yes' : 'No'}</li>
                  </ul>
                </div>

                <div className="capability-card" style={{ padding: '1.5rem', margin: 0, overflowX: 'auto' }}>
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>Raw IP JSON Payload</h4>
                  <pre style={{ fontSize: '0.75rem', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ Explainer copy ══ */}
      <section className="section section--tint">
        <div className="container container--narrow tool-copy">
          <h2 data-reveal>What IP geolocation tells you</h2>
          <p data-reveal>
            Every device on the internet has an IP address, and every IP address is
            registered to a network in a particular place. IP geolocation matches the
            address to that registration and reports the country, region, and usually the
            city, along with the internet provider that owns the block. It is how a site
            can guess your country before you tell it anything.
          </p>
          <p data-reveal>
            The result is a neighborhood, not a doorstep. City-level answers are usually
            right; anything more precise is an estimate, and mobile and VPN traffic often
            reports the location of the provider rather than the person. Treat the answer
            as a strong hint, not proof.
          </p>

          <h2 data-reveal>How to run a GEO IP lookup</h2>
          <p data-reveal>
            Paste an IPv4 or IPv6 address into the box above and press Track IP Address.
            You will get the location, the internet provider, the autonomous system the
            address belongs to, the connection type, whether it looks like a proxy, and
            the raw JSON behind all of it. This GEO IP lookup is free to use and there is
            nothing to sign up for.
          </p>

          <h2 data-reveal>Why people use it</h2>
          <p data-reveal>
            Site owners check unfamiliar addresses in their server logs to tell real
            visitors from bots. Support teams confirm that a login came from somewhere the
            customer has actually been. Marketers sanity-check where their traffic is
            coming from before they read too much into an analytics report. All of it
            starts with the same question this tool answers.
          </p>
          <p data-reveal>
            Gobiya keeps IP geolocation free because we use it ourselves every week. If it
            was useful, our other <a href="/tools">free tools</a> cover DNS records, SSL
            certificates, domain reputation, and email verification, and our{' '}
            <a href="/free-site-scan">free site scan</a> checks your whole website.
          </p>
        </div>
      </section>
    </main>
  );
}
