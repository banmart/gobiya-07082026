import Image from 'next/image';

export const CLIENT_LOGOS = [
  { src: '/assets/img/americanlivescan.webp', alt: 'American Livescan' },
  { src: '/assets/img/smilecenter.webp', alt: 'SmileCenter.com' },
  { src: '/assets/img/totalcapital.webp', alt: 'TotalCapitalInc.Com' },
  { src: '/assets/img/remodelmepros.webp', alt: 'RemodelMePros.com' },
  { src: '/assets/img/safetycentric-logo.png', alt: 'Safety-Centric.com' },
  { src: '/assets/img/dgplumbing-logo.webp', alt: 'DGPlumbingandRooter.com' },
];

export default function ClientLogos({
  heading = "Southern California businesses we've run search for since 2009",
  className = '',
}) {
  return (
    <section className={`mw-trust ${className}`.trim()}>
      <div className="container">
        {heading && <h2 className="mw-trust__heading">{heading}</h2>}
        <div className="mw-trust__logos">
          {CLIENT_LOGOS.map((logo, idx) => (
            <div key={idx} className="mw-trust__logo-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={65}
                style={{ objectFit: 'contain', maxHeight: '55px', width: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
