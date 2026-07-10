'use client';

export default function CookiePreferencesLink() {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event('open-cookie-preferences'));
      }}
    >
      Cookie preferences
    </a>
  );
}
