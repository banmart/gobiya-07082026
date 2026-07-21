# /lp Offer Landing Page — Design Spec

Date: 2026-07-21

## Purpose

A dedicated, conversion-first landing page at `/lp` for paid traffic (`?ref=Google`, etc.) promoting the existing "Q3 Growth Bundle" offer (currently only shown as a card on the homepage). The page strips normal site navigation to minimize exit paths, embeds a lead form directly in the offer hero instead of linking out to `/onboarding`, and captures the `ref` query param for attribution — without building per-source copy variants yet. Copy variants can be added later once real channel data shows which sources send traffic worth tailoring for.

## Non-goals

- No per-`ref` copy branching at launch (single generic page, `ref` captured for attribution only).
- No changes to the existing homepage offer card or `/onboarding` flow.
- No A/B testing infrastructure.

## Architecture: stripped chrome for /lp routes

`Header`, `Footer`, and `AIChatBubble` currently render unconditionally in `app/layout.js`, wrapping every route. Restructuring all existing routes into Next.js route groups (to give `/lp` its own root layout) would touch ~15 route folders for one new page, so instead:

1. New `middleware.js` at the project root, matching `/lp` and `/lp/thank-you`. It clones the request headers and sets `x-minimal-chrome: 1` on the outgoing request before calling `NextResponse.next()`.
2. `app/layout.js` becomes an `async` function, calls `headers()` (Next 16 server API), and checks for `x-minimal-chrome`. When present, it skips rendering `<Header />`, `<Footer />`, and `<AIChatBubble />`. `SiteSchema`, `BrandWatermark`, `Motion`, and `ConsentAnalytics` (cookie consent banner — legally required) render unconditionally on every route, including `/lp`.
3. `/lp` and `/lp/thank-you` render their own minimal inline header (logo linking to `/`, no topbar, no nav links) and a lightweight footer strip (copyright line + Privacy/Terms links + phone number) directly in the page markup — not the shared `Header`/`Footer` components.

This is additive and isolated: no existing route's rendered output changes.

## Page content (app/lp/page.js)

Server component. Next 16 passes `searchParams` as an awaited prop to page components, so `ref` is read there directly — no `useSearchParams`/Suspense boundary needed:

```js
export default async function LpPage({ searchParams }) {
  const params = await searchParams;
  const ref = params.ref || params.utm_source || 'direct';
  ...
}
```

`ref` is passed as a prop into the client form component so it can be included as a hidden field in the POST payload.

Page structure, single column, no other sections beyond this:

1. Minimal header (logo only)
2. Offer hero — reuses the existing `.offer-card` visual system from `app/globals.css` (video background, `CountdownBadge` targeting `2026-09-30T23:59:59`, title "The Q3 Growth Bundle Offer", price pill "Custom Web Dev Starting at **$3,500**", same description copy as the homepage card) — but the visual slot that holds the looping video on the homepage is replaced here by the lead form, since this page's whole job is capturing the lead inline rather than linking to `/onboarding`.
3. Offer disclaimer fine print, directly below the offer content: pricing basis, what's included (custom Next.js/React build, integrated CRM, one YouTube AI video pre-roll ad campaign), the September 30, 2026 expiration, and "cannot be combined with other offers."
4. Minimal footer strip

Metadata via `buildMetadata()`: `robots: { index: false, follow: true }` (matches the pattern already used on `/onboarding/thank-you`) — this page duplicates homepage offer content and exists for paid traffic, not organic discovery.

## Form + API

New `components/LpOfferForm.js`, a client component modeled directly on `components/HeroQuickForm.js`:

- Same fields: name (required), email (required), phone, message
- Same honeypot field (`company_website`, hidden, bot trap)
- Same validation pattern (client shows inline error from API response)
- Additional hidden fields: `ref` (from the server-passed prop) and `offer` (hardcoded `"Q3 Growth Bundle"`)
- On successful submit: `router.push('/lp/thank-you')` instead of swapping to an inline success message (this project's existing `/onboarding` flow already uses a dedicated thank-you page, so this is consistent, and it gives a clean URL for ad-platform conversion pixels to fire on)

New `app/api/lp-offer/route.js`, modeled on `app/api/quick-contact/route.js`:

- Same honeypot check, same name/email required validation, same email regex
- Sends via Resend to the same recipient, but subject/body tagged distinctly (e.g. subject `New Q3 Growth Bundle lead — {name}`, body includes a `Source (ref)` row) so these leads are distinguishable from general contact-form leads in the inbox

`app/lp/thank-you/page.js`: short thank-you message, same minimal-chrome treatment (covered by the middleware matcher), `noindex, follow` metadata.

## Files touched/added

- `middleware.js` — new
- `app/layout.js` — edit (async, conditional chrome)
- `app/lp/page.js` — new
- `app/lp/thank-you/page.js` — new
- `components/LpOfferForm.js` — new
- `app/api/lp-offer/route.js` — new

## Testing / verification

No automated test suite exists for form/page behavior in this codebase (verified by inspecting existing form components — manual QA is the established pattern here). Verification is manual, in-browser:

- Load `/lp?ref=Google` — confirm no header nav, no footer sitemap, no chat bubble; confirm other pages (`/`, `/about`) are unaffected
- Submit the form with valid data — confirm redirect to `/lp/thank-you` and confirm the received email includes `ref=Google` and the offer tag
- Submit with the honeypot field populated (simulated) — confirm it's silently accepted without sending an email
- Submit with invalid/missing email — confirm inline error, no redirect
- View source / check metadata on `/lp` and `/lp/thank-you` — confirm `noindex` is present
- Confirm countdown badge and offer copy match the homepage card
