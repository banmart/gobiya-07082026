import Image from 'next/image';

// The row of platform marks that sits directly below the hero.
//
// These are the platforms we work across, not partners or endorsers — the
// label is what keeps a bare row of Google/OpenAI/Anthropic marks from reading
// as an affiliation claim, so it is part of the component rather than a prop
// a caller can drop.
//
// `width`/`height` are the intrinsic aspect ratio scaled to a 92px box — twice
// the 46px the row renders at — so next/image requests a file sized for a 2x
// screen instead of shipping the 3840px ChatGPT original. CSS pins the height
// and lets each width follow its own ratio.
const PLATFORM_LOGOS = [
  { src: '/assets/img/gmb-logo.svg', alt: 'Google Business Profile', width: 105, height: 92 },
  { src: '/assets/img/google-logo.png', alt: 'Google', width: 90, height: 92 },
  { src: '/assets/img/bing-logo.png', alt: 'Microsoft Bing', width: 62, height: 92 },
  { src: '/assets/img/gemini-logo.png', alt: 'Google Gemini', width: 92, height: 92 },
  { src: '/assets/img/claude-icon-logo-1024x1024.png', alt: 'Claude', width: 92, height: 92 },
  // Alone among the six, this one ships on a padded 16:9 canvas — see the
  // --wide modifier in globals.css.
  { src: '/assets/img/ChatGPT-Logo.png', alt: 'ChatGPT', width: 164, height: 92, wide: true, isChatGpt: true },
];

export default function PlatformStrip() {
  return (
    <section className="mw-platforms">
      <div className="container">
        <p className="mw-platforms__label">
          Where we get you found
        </p>
        <ul className="mw-platforms__logos">
          {PLATFORM_LOGOS.map((logo) => (
            <li key={logo.src} className="mw-platforms__logo-item">
              {logo.isChatGpt ? (
                <>
                  <Image
                    src="/assets/img/ChatGPT-Logo.png"
                    alt="ChatGPT"
                    width={164}
                    height={92}
                    className="mw-platforms__logo mw-platforms__logo--wide mw-platforms__logo--light-only"
                  />
                  <Image
                    src="/assets/img/ChatGPT-Logo-white.png"
                    alt="ChatGPT"
                    width={164}
                    height={92}
                    className="mw-platforms__logo mw-platforms__logo--wide mw-platforms__logo--dark-only"
                  />
                </>
              ) : (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`mw-platforms__logo${logo.wide ? ' mw-platforms__logo--wide' : ''}`}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
