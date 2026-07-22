// Hand-drawn mark set — one shared technique (Ink) used for every glyph so
// they read as one family: a faint offset "ghost" pass of the same line
// beneath the true stroke, the way a second pen pass looks slightly off
// from the first. Kept to line work only, no gradients or raster art, so
// it sits quietly inside the existing navy/carmine institutional system
// rather than fighting it.

function Ink({ size = 28, viewBox = '0 0 32 32', className, children }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} className={className} aria-hidden="true">
      <g opacity="0.32" transform="translate(0.7 -0.5) rotate(0.8 16 16)" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </svg>
  );
}

/* ── service glyphs (svc-card / capability-card) ── */

export function IconSeo(props) {
  return (
    <Ink {...props}>
      <circle cx="13" cy="13" r="7.2" />
      <path d="M18.4 18.4 L24.5 24.5" />
      <path d="M13 9.5 L14 12 L16.5 13 L14 14 L13 16.5 L12 14 L9.5 13 L12 12 Z" fill="currentColor" stroke="none" />
    </Ink>
  );
}

export function IconGeo(props) {
  return (
    <Ink {...props}>
      <path d="M9 6 H19 L23 10 V26 H9 Z" />
      <path d="M19 6 V10 H23" />
      <path d="M12 16.5 H20" strokeWidth="2" />
      <path d="M12 20.5 H17" />
      <path d="M24.5 8 L25.6 10.2 L27.8 11 L25.6 11.8 L24.5 14 L23.4 11.8 L21.2 11 L23.4 10.2 Z" fill="currentColor" stroke="none" />
    </Ink>
  );
}

export function IconPpc(props) {
  return (
    <Ink {...props}>
      <circle cx="14" cy="15" r="8.3" />
      <circle cx="14" cy="15" r="4.4" />
      <circle cx="14" cy="15" r="1" fill="currentColor" stroke="none" />
      <path d="M20.5 8.5 L27 2" />
      <path d="M27 2 L22.8 2.4" />
      <path d="M27 2 L26.6 6.2" />
    </Ink>
  );
}

export function IconContent(props) {
  return (
    <Ink {...props}>
      <path d="M22.5 5.5 C18 8 12 16.5 9 23.5 L11.6 24.6 C15 18.4 20 11 24.5 8 Z" />
      <path d="M9 23.5 L6.2 27.3" />
      <path d="M15.5 15 C13.5 17.3 11.5 20.3 10 22.8" opacity="0.55" strokeWidth="1" />
    </Ink>
  );
}

export function IconAiVisibility(props) {
  return (
    <Ink {...props}>
      <path d="M4 15.5 C8.5 8 19.5 8 24 15.5 C19.5 23 8.5 23 4 15.5 Z" />
      <circle cx="14" cy="15.5" r="3.1" />
      <path d="M14 13.9 L14.6 15.1 L15.8 15.5 L14.6 15.9 L14 17.1 L13.4 15.9 L12.2 15.5 L13.4 15.1 Z" fill="currentColor" stroke="none" />
    </Ink>
  );
}

export function IconAuthority(props) {
  return (
    <Ink {...props}>
      <rect x="5" y="11" width="11" height="15" rx="5.5" transform="rotate(-20 10.5 18.5)" />
      <rect x="14" y="6" width="11" height="15" rx="5.5" transform="rotate(-20 19.5 13.5)" />
    </Ink>
  );
}

export function IconWebDev(props) {
  return (
    <Ink {...props}>
      <path d="M12 9 L4.5 16 L12 23" />
      <path d="M20 9 L27.5 16 L20 23" />
      <path d="M17.5 6.5 L14.5 25.5" opacity="0.5" strokeWidth="1" />
    </Ink>
  );
}

export function IconCroUx(props) {
  return (
    <Ink {...props}>
      <path d="M9 5.5 L9 24.5 L13.6 20.4 L16.8 27 L19.9 25.5 L16.6 18.9 L22.4 17.8 Z" />
      <path d="M3.5 3.5 L6.2 6.2" opacity="0.55" />
      <path d="M2 10.5 L5.2 11.1" opacity="0.55" />
      <path d="M5.2 1.5 L5.8 4.7" opacity="0.55" />
    </Ink>
  );
}

export function IconAiLlm(props) {
  return (
    <Ink {...props}>
      <circle cx="15" cy="15" r="5.4" />
      <path d="M15 4.5 L15 8.5 M15 21.5 L15 25.5 M4.5 15 L8.5 15 M21.5 15 L25.5 15 M7.5 7.5 L10.3 10.3 M19.7 19.7 L22.5 22.5 M22.5 7.5 L19.7 10.3 M10.3 19.7 L7.5 22.5" strokeWidth="1.5" />
      <path d="M15 12.6 L15.9 14.4 L17.7 15 L15.9 15.6 L15 17.4 L14.1 15.6 L12.3 15 L14.1 14.4 Z" fill="currentColor" stroke="none" />
    </Ink>
  );
}

export const SERVICE_ICONS = {
  'seo-services': IconSeo,
  'geo-services': IconGeo,
  'ppc-management-services': IconPpc,
  'content-marketing-services': IconContent,
  'ai-visibility': IconAiVisibility,
  'authority-link-building': IconAuthority,
  'web-app-development': IconWebDev,
  'cro-ux': IconCroUx,
  'ai-llm-consulting': IconAiLlm,
};

export function ServiceIcon({ slug, ...props }) {
  const Cmp = SERVICE_ICONS[slug];
  return Cmp ? <Cmp className="svc-card__icon" {...props} /> : null;
}

/* ── AI answer-engine glyphs (offices__row) ──
   Deliberately abstracted, generic forms (bubble, sunburst, compass star,
   twin sparkle) placed next to each platform's name as a label mark — not
   a reproduction of any platform's registered logo artwork. */

export function GoogleAiIcon(props) {
  return (
    <Ink {...props}>
      <path d="M16 4 C16.8 10.2 18 13.2 26 14.5 C18 15.8 16.8 18.8 16 25 C15.2 18.8 14 15.8 6 14.5 C14 13.2 15.2 10.2 16 4 Z" />
    </Ink>
  );
}

export function ChatGptIcon(props) {
  return (
    <Ink {...props}>
      <path d="M6 8 H26 A3 3 0 0 1 29 11 V20 A3 3 0 0 1 26 23 H13 L7 28 V23 H6 A3 3 0 0 1 3 20 V11 A3 3 0 0 1 6 8 Z" />
      <circle cx="12.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="21.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </Ink>
  );
}

export function PerplexityIcon(props) {
  return (
    <Ink {...props}>
      <path d="M16 5 L27 16 L16 27 L5 16 Z" />
      <path d="M16 10.5 L17.2 15 L21.5 16 L17.2 17 L16 21.5 L14.8 17 L10.5 16 L14.8 15 Z" />
    </Ink>
  );
}

export function GeminiIcon(props) {
  return (
    <Ink {...props}>
      <path d="M11 6 C11.6 10.4 12.5 12.4 17.4 13 C12.5 13.6 11.6 15.6 11 20 C10.4 15.6 9.5 13.6 4.6 13 C9.5 12.4 10.4 10.4 11 6 Z" />
      <path d="M22.2 13 C22.6 15.9 23.1 17.1 26.4 17.5 C23.1 17.9 22.6 19.1 22.2 22 C21.8 19.1 21.3 17.9 18 17.5 C21.3 17.1 21.8 15.9 22.2 13 Z" />
    </Ink>
  );
}

export function ClaudeIcon(props) {
  return (
    <Ink {...props}>
      <circle cx="16" cy="16" r="2.2" />
      <path d="M16 6 L16 11.3 M16 20.7 L16 26 M6 16 L11.3 16 M20.7 16 L26 16 M9.3 9.3 L12.9 12.9 M19.1 19.1 L22.7 22.7 M22.7 9.3 L19.1 12.9 M12.9 19.1 L9.3 22.7" />
    </Ink>
  );
}

export const PLATFORM_ICONS = {
  'Google AI Overviews': GoogleAiIcon,
  'ChatGPT': ChatGptIcon,
  'Perplexity': PerplexityIcon,
  'Google Gemini': GeminiIcon,
  'Claude': ClaudeIcon,
};

export function PlatformIcon({ name, ...props }) {
  const Cmp = PLATFORM_ICONS[name];
  return Cmp ? <Cmp className="offices__icon" size={props.size ?? 30} {...props} /> : null;
}

/* ── signature touch: a single hand-drawn annotation mark ── */

export function CircleMark({ size = 60, className }) {
  return (
    <svg width={size} height={size * 0.42} viewBox="0 0 140 58" className={className} aria-hidden="true">
      <path
        d="M9,31 C6,15 34,3 70,3 C108,3 133,13 133,29 C133,46 105,54 69,54 C31,54 8,45 11,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Underline swash — a single confident stroke (plus the usual faint ghost
// pass) that draws itself once via the same [data-draw] mechanism as the
// pillar glyphs, then stays put. No loop, no repeat.
export function Swash({ size = 180, className }) {
  return (
    <svg width={size} height={size * 0.24} viewBox="0 0 220 52" className={className} data-draw aria-hidden="true">
      <path
        d="M4,18 C46,40 96,42 138,26 C164,16 188,8 216,13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.32"
        transform="translate(1 -1) rotate(0.6 110 26)"
      />
      <path
        d="M4,18 C46,40 96,42 138,26 C164,16 188,8 216,13"
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
