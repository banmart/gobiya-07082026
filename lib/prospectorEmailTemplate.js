// Shared HTML shell for the Prospector drip sequence's branded emails —
// pulled out of lib/drip.js because 4 near-identical ~150-line bulletproof
// HTML documents inline in that file would bury the actual send logic.
//
// Merge fields use the {{tag}} syntax processDripQueue() already
// interpolates (see lib/drip.js) — this file only ever emits that syntax
// literally, never resolves it, so the same output works whether it's sent
// live or previewed with {{tags}} still showing.

const SITE = 'https://www.gobiya.com';

function button(url, label) {
  return `
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${url}" style="height:50px;v-text-anchor:middle;width:280px;" arcsize="4%" strokecolor="#E1420F" fillcolor="#E1420F">
              <w:anchorlock/>
              <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${label}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${url}" style="background-color:#E1420F;border-radius:2px;color:#ffffff;display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:280px;-webkit-text-size-adjust:none;mso-hide:all;">${label}</a>
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

/**
 * @param {object} opts
 * @param {string} opts.preheader - hidden preview text
 * @param {string} opts.badge - small carmine eyebrow label
 * @param {string} opts.heading - h1, may contain {{merge}} tags
 * @param {string} opts.bodyHtml - paragraph HTML, may contain {{merge}} tags
 * @param {{file: string, height: number, alt: string}} opts.image
 * @param {string} opts.ctaUrl - usually the literal string "{{offer_link}}"
 * @param {string} opts.ctaLabel
 * @param {{url: string, label: string}} [opts.secondary]
 * @param {boolean} [opts.showTrust]
 * @param {string} [opts.signOff]
 */
export function renderProspectorEmail({ preheader, badge, heading, bodyHtml, image, ctaUrl, ctaLabel, secondary, showTrust, signOff }) {
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

          <tr>
            <td style="line-height:0;font-size:0;">
              <img src="${SITE}/assets/img/email/${image.file}" width="600" height="${image.height}" alt="${image.alt}" class="hero-img" style="display:block;width:100%;height:auto;">
            </td>
          </tr>

          <tr>
            <td style="padding:32px 40px 0 40px;" class="px-sm">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#C4380C;">${badge}</span>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 40px 0 40px;" class="px-sm">
              <h1 class="heading" style="margin:0;font-family:'Open Sans',Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;font-weight:800;color:#0C1050;">${heading}</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 40px 0 40px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#2E3563;" class="px-sm">
              ${bodyHtml}
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:28px 40px 8px 40px;" class="px-sm">
              ${button(ctaUrl, ctaLabel)}
            </td>
          </tr>

          ${secondary ? `
          <tr>
            <td align="center" style="padding:0 40px 8px 40px;font-family:Arial,Helvetica,sans-serif;font-size:13px;" class="px-sm">
              <a href="${secondary.url}" style="color:#6B7192;text-decoration:underline;">${secondary.label}</a>
            </td>
          </tr>` : ''}

          ${signOff ? `
          <tr>
            <td style="padding:24px 40px 0 40px;font-family:'Inter',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#474D74;" class="px-sm">
              ${signOff}
            </td>
          </tr>` : ''}

          <tr><td style="padding:24px 40px 0 40px;" class="px-sm"></td></tr>

          ${showTrust ? trustStrip() : ''}

          <tr>
            <td style="background-color:#0C1050;padding:28px 40px;" class="px-sm">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;color:#B9BEDA;">
                    <strong style="color:#FFFFFF;">Gobiya</strong> — 14553 Delano St #315, Van Nuys, CA 91411<br>
                    (323) 744-1338 &nbsp;|&nbsp; <a href="${SITE}" style="color:#FF7A4D;text-decoration:none;">gobiya.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8A90B4;">
                    You're receiving this because {{company}} was identified as a potential fit for Gobiya's services.
                    <a href="mailto:hello@gobiya.com?subject=Unsubscribe" style="color:#B9BEDA;text-decoration:underline;">Reply to unsubscribe</a>
                    &nbsp;|&nbsp;
                    <a href="${SITE}/privacy" style="color:#B9BEDA;text-decoration:none;">Privacy Policy</a>
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
