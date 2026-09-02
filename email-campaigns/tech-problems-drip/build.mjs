// Generates the 5 static HTML files for the "Website Tech Problems" drip
// campaign from one shared layout, so every email shares pixel-identical
// header/footer/button markup instead of 5 hand-edited copies drifting apart.
//
// Run: node email-campaigns/tech-problems-drip/build.mjs
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;
const SITE = 'https://www.gobiya.com';
const CAMPAIGN = 'tech-problems-drip';

// { url: bare domain merge tag, urlEnc: pre-encoded version for the query string }
const cta = (goal, content) => {
  const params = new URLSearchParams();
  params.set('url', '{{website_url}}');
  if (goal) params.set('goal', goal);
  params.set('utm_source', 'email');
  params.set('utm_medium', 'drip');
  params.set('utm_campaign', CAMPAIGN);
  params.set('utm_content', content);
  // URLSearchParams encodes the merge tag braces; undo that so the ESP's
  // merge syntax survives untouched in the final href.
  const qs = params.toString().replace(/%7B%7B/g, '{{').replace(/%7D%7D/g, '}}');
  return `${SITE}/free-site-scan?${qs}`;
};

const contactCta = (content) =>
  `${SITE}/contact?utm_source=email&utm_medium=drip&utm_campaign=${CAMPAIGN}&utm_content=${content}`;

function button(url, label, id) {
  return `
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${url}" style="height:50px;v-text-anchor:middle;width:280px;" arcsize="4%" strokecolor="#E1420F" fillcolor="#E1420F">
              <w:anchorlock/>
              <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${label}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${url}" id="${id}" style="background-color:#E1420F;border-radius:2px;color:#ffffff;display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:280px;-webkit-text-size-adjust:none;mso-hide:all;">${label}</a>
              <!--<![endif]-->`;
}

function trustStrip() {
  return `
        <tr>
          <td style="padding:0 40px 8px 40px;" class="px-sm">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6B7192;padding:14px 0;border-top:1px solid #E4E7EE;">
                  <span style="color:#0C1050;font-weight:700;">★★★★★ 5.0 on Google</span>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <span style="color:#0C1050;font-weight:700;">★★★★★ 5.0 on Clutch</span>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  500+ Los Angeles businesses since 2009
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
}

function layout({ preheader, badge, heading, bodyHtml, image, ctaUrl, ctaLabel, ctaId, secondary, showTrust, signOff }) {
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Gobiya</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  body, table, td { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
  body { margin:0; padding:0; width:100% !important; background-color:#F5F6F8; }
  a { color:#C4380C; }
  .preheader { display:none !important; visibility:hidden; mso-hide:all; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; }
  @media screen and (max-width:600px) {
    .container { width:100% !important; }
    .px-sm { padding-left:24px !important; padding-right:24px !important; }
    .heading { font-size:22px !important; line-height:1.3 !important; }
    .hero-img { height:auto !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#F5F6F8;">
  <div class="preheader">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F6F8;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#FFFFFF;">

          <!-- header -->
          <tr>
            <td style="background-color:#0C1050;padding:20px 40px;" class="px-sm">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right:10px;">
                          <img src="${SITE}/assets/img/email/logo-gobiya-red.png" width="26" height="26" alt="" style="display:block;">
                        </td>
                        <td valign="middle" style="font-family:'Open Sans',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;letter-spacing:0.5px;color:#FFFFFF;">
                          GOBIYA
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#B9BEDA;">
                    Los Angeles Digital Marketing
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- hero image -->
          <tr>
            <td style="line-height:0;font-size:0;">
              <img src="${SITE}/assets/img/email/${image.file}" width="600" height="${image.height}" alt="${image.alt}" class="hero-img" style="display:block;width:100%;height:auto;">
            </td>
          </tr>

          <!-- badge -->
          <tr>
            <td style="padding:32px 40px 0 40px;" class="px-sm">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#C4380C;">${badge}</span>
            </td>
          </tr>

          <!-- heading -->
          <tr>
            <td style="padding:10px 40px 0 40px;" class="px-sm">
              <h1 class="heading" style="margin:0;font-family:'Open Sans',Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;font-weight:800;color:#0C1050;">${heading}</h1>
            </td>
          </tr>

          <!-- body copy -->
          <tr>
            <td style="padding:16px 40px 0 40px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#2E3563;" class="px-sm">
              ${bodyHtml}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:28px 40px 8px 40px;" class="px-sm">
              ${button(ctaUrl, ctaLabel, ctaId)}
            </td>
          </tr>

          ${secondary ? `
          <!-- secondary CTA -->
          <tr>
            <td align="center" style="padding:0 40px 8px 40px;font-family:Arial,Helvetica,sans-serif;font-size:13px;" class="px-sm">
              <a href="${secondary.url}" style="color:#6B7192;text-decoration:underline;">${secondary.label}</a>
            </td>
          </tr>` : ''}

          ${signOff ? `
          <!-- sign-off -->
          <tr>
            <td style="padding:24px 40px 0 40px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#474D74;" class="px-sm">
              ${signOff}
            </td>
          </tr>` : ''}

          <tr><td style="padding:24px 40px 0 40px;" class="px-sm"></td></tr>

          ${showTrust ? trustStrip() : ''}

          <!-- footer -->
          <tr>
            <td style="background-color:#0C1050;padding:28px 40px;margin-top:24px;" class="px-sm">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;color:#B9BEDA;">
                    <strong style="color:#FFFFFF;">Gobiya</strong> — 14553 Delano St #315, Van Nuys, CA 91411<br>
                    (323) 744-1338 &nbsp;|&nbsp; <a href="${SITE}" style="color:#FF7A4D;text-decoration:none;">gobiya.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8A90B4;">
                    You're receiving this because {{company_name}} was identified as a potential fit for a free website check.
                    <a href="{{unsubscribe_url}}" style="color:#B9BEDA;text-decoration:underline;">Unsubscribe</a>
                    &nbsp;|&nbsp;
                    <a href="${SITE}/privacy" style="color:#B9BEDA;text-decoration:underline;">Privacy Policy</a>
                    &nbsp;|&nbsp;
                    <a href="{{view_in_browser_url}}" style="color:#B9BEDA;text-decoration:underline;">View in browser</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

const emails = [
  {
    file: 'email-1-diagnostic.html',
    preheader: "A free 60-second scan shows you exactly what's slowing you down.",
    badge: 'Free Website Check',
    heading: "Most site owners never check what's under the hood",
    image: { file: 'hero-tech-seo.jpg', height: 336, alt: 'A technical SEO consultant reviewing a website' },
    bodyHtml: `
      <p style="margin:0 0 14px 0;">Hi {{first_name}},</p>
      <p style="margin:0 0 14px 0;">Most business owners never open their website's "engine" — they just assume it works.</p>
      <p style="margin:0 0 14px 0;">Under the hood, small technical issues quietly cost real customers: pages that load too slow, broken links, information Google can't find, or a site that ChatGPT and other AI tools skip over entirely.</p>
      <p style="margin:0 0 0 0;">We built a free tool that checks all of it in about a minute — speed, on-page SEO, security, and whether AI search engines can even find {{company_name}}. No forms first. Just enter {{website_url}} and see what comes back.</p>
    `,
    ctaUrl: cta(null, 'email1-cta'),
    ctaLabel: 'Scan My Site Free',
    ctaId: 'cta-email1-primary',
    showTrust: false,
    signOff: `— Steve Martin<br>Founder, Gobiya`,
  },
  {
    file: 'email-2-speed.html',
    preheader: "Slow-loading pages lose visitors before they see what you offer.",
    badge: 'Site Speed Check',
    heading: 'How slow is {{website_url}}, really?',
    image: { file: 'developer-dashboard-review.jpg', height: 336, alt: 'A developer reviewing website performance data on a dashboard' },
    bodyHtml: `
      <p style="margin:0 0 14px 0;">Hi {{first_name}},</p>
      <p style="margin:0 0 14px 0;">Here's a number worth knowing: most visitors decide whether to stay on a page within the first few seconds. If {{website_url}} takes too long to load, they're gone before they ever see what {{company_name}} offers — and Google notices the same slowdown.</p>
      <p style="margin:0 0 14px 0;">Core Web Vitals — Google's speed and stability scores — factor directly into how often your site shows up in search. A slow site doesn't just lose visitors. It loses rankings.</p>
      <p style="margin:0 0 0 0;">The free scan measures your load speed the same way Google does, and flags exactly what's dragging it down.</p>
    `,
    ctaUrl: cta('ux', 'email2-cta'),
    ctaLabel: 'Check My Site Speed Free',
    ctaId: 'cta-email2-primary',
    showTrust: false,
    signOff: null,
  },
  {
    file: 'email-3-ai-visibility.html',
    preheader: 'AI Overviews, ChatGPT, and Perplexity read sites differently than Google does.',
    badge: 'AI Visibility Check',
    heading: 'Can ChatGPT even find {{company_name}}?',
    image: { file: 'hero-analytics-man.jpg', height: 336, alt: 'A marketer analyzing AI search visibility data' },
    bodyHtml: `
      <p style="margin:0 0 14px 0;">Hi {{first_name}},</p>
      <p style="margin:0 0 14px 0;">Search doesn't only mean Google anymore. More people are asking ChatGPT, Perplexity, and Google's AI Overviews for recommendations before they ever type a traditional search.</p>
      <p style="margin:0 0 14px 0;">The problem: most websites were built for the old rules. If {{website_url}} is missing clear structured information or blocks AI crawlers without knowing it, {{company_name}} may be invisible in exactly the answers your future customers are reading.</p>
      <p style="margin:0 0 0 0;">The free scan checks your AI visibility alongside your traditional SEO, so you know whether ChatGPT and Google AI Overviews can actually find you.</p>
    `,
    ctaUrl: cta('ai-visibility', 'email3-cta'),
    ctaLabel: 'See My AI Visibility Free',
    ctaId: 'cta-email3-primary',
    showTrust: false,
    signOff: null,
  },
  {
    file: 'email-4-proof.html',
    preheader: 'Real results from LA businesses who found (and fixed) the same issues.',
    badge: 'Why Businesses Choose Gobiya',
    heading: 'What a fixed website actually looks like',
    image: { file: 'analytics-dashboard-review.jpg', height: 336, alt: 'An analytics dashboard showing improved website performance' },
    bodyHtml: `
      <p style="margin:0 0 14px 0;">Hi {{first_name}},</p>
      <p style="margin:0 0 14px 0;">Since 2009, we've helped more than 500 Los Angeles businesses fix exactly the kind of technical issues the free scan catches — slow load times, pages Google can't crawl, and sites that AI search tools skip right past.</p>
      <p style="margin:0 0 14px 0;">Clients rate us 5.0 on Google and 5.0 on Clutch, and it's usually the same story: a website that looked fine on the surface, but was quietly working against them underneath.</p>
      <p style="margin:0 0 0 0;">If {{company_name}} hasn't run the free scan yet, it takes about a minute and tells you exactly where you stand.</p>
    `,
    ctaUrl: cta(null, 'email4-cta'),
    ctaLabel: 'Scan My Site Free',
    ctaId: 'cta-email4-primary',
    showTrust: true,
    signOff: null,
  },
  {
    file: 'email-5-close.html',
    preheader: 'Two ways to find out — a free scan, or five minutes with a real person.',
    badge: 'Last Call',
    heading: "Last look: what's {{website_url}} missing?",
    image: { file: 'hero-tech-seo.jpg', height: 336, alt: 'A website consultant reviewing final site recommendations' },
    bodyHtml: `
      <p style="margin:0 0 14px 0;">Hi {{first_name}},</p>
      <p style="margin:0 0 14px 0;">This is the last note in this series, so let's make it useful.</p>
      <p style="margin:0 0 14px 0;">If {{company_name}}'s website has never been checked for speed, SEO, security, and AI visibility, the free scan takes about a minute and hands you a plain-language report — no sales call required.</p>
      <p style="margin:0 0 0 0;">And if you'd rather just talk it through, we're happy to take a look at {{website_url}} together and tell you what we'd fix first. No pressure either way.</p>
    `,
    ctaUrl: cta(null, 'email5-cta-primary'),
    ctaLabel: 'Scan My Site Free',
    ctaId: 'cta-email5-primary',
    secondary: { url: contactCta('email5-cta-secondary'), label: 'Or talk to a real person →' },
    showTrust: false,
    signOff: `— Steve Martin<br>Founder, Gobiya`,
  },
];

mkdirSync(OUT_DIR, { recursive: true });
for (const e of emails) {
  const html = layout(e);
  writeFileSync(join(OUT_DIR, e.file), html, 'utf8');
  console.log('wrote', e.file);
}
