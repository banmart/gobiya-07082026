import { createServerSupabase } from '@/lib/supabase/server';
import { createAdminSupabase } from '@/lib/supabase/admin';

import { resend } from './resend';
import { renderProspectorEmail } from './prospectorEmailTemplate';

const DEFAULT_SEQUENCES = [
  {
    id: 'seq-prospector-drip',
    title: 'Prospector Drip - 4 Step',
    description: 'Multi-touch outreach sequence for cold prospects from the Prospector tool, diagnosing site issues and routing to the free website scan.',
    status: 'active',
    steps: [
      {
        step: 1,
        delay_days: 0,
        subject: "Quick question about {{company}}'s website",
        body: renderProspectorEmail({
          preheader: "A free 60-second scan shows you exactly what's slowing {{company}} down.",
          badge: 'Free Website Check',
          heading: "Most site owners never check what's under the hood",
          image: { file: 'hero-tech-seo.jpg', height: 336, alt: 'A technical SEO consultant reviewing a website' },
          bodyHtml: `
            <p style="margin:0 0 14px 0;">Hi {{contact_name}},</p>
            <p style="margin:0 0 14px 0;">I noticed {{company}} is active in {{location}} — and most business owners in {{industry}} never open their website's "engine." They just assume it works.</p>
            <p style="margin:0 0 14px 0;">Under the hood, small technical issues quietly cost real customers: pages that load too slow, broken links, information Google can't find, or a site that ChatGPT and other AI tools skip over entirely.</p>
            <p style="margin:0 0 0 0;">We built a free tool that checks all of it in about a minute — speed, on-page SEO, security, and whether AI search engines can even find {{company}}. No forms first, just a quick report back.</p>
          `,
          ctaUrl: '{{offer_link}}',
          ctaLabel: 'Scan My Site Free',
          signOff: '— Steve<br>Gobiya Growth Team',
        }),
      },
      {
        step: 2,
        delay_days: 2,
        subject: 'How slow is {{website}}, really?',
        body: renderProspectorEmail({
          preheader: 'Slow-loading pages lose visitors before they see what you offer.',
          badge: 'Site Speed Check',
          heading: 'How slow is {{website}}, really?',
          image: { file: 'developer-dashboard-review.jpg', height: 336, alt: 'A developer reviewing website performance data on a dashboard' },
          bodyHtml: `
            <p style="margin:0 0 14px 0;">Hi {{contact_name}},</p>
            <p style="margin:0 0 14px 0;">Here's a number worth knowing: most visitors decide whether to stay on a page within the first few seconds. If {{website}} takes too long to load, they're gone before they ever see what {{company}} offers — and Google notices the same slowdown.</p>
            <p style="margin:0 0 14px 0;">Core Web Vitals — Google's speed and stability scores — factor directly into how often your site shows up in search. A slow site doesn't just lose visitors. It loses rankings.</p>
            <p style="margin:0 0 0 0;">The free scan measures your load speed the same way Google does, and flags exactly what's dragging it down.</p>
          `,
          ctaUrl: '{{offer_link}}',
          ctaLabel: 'Check My Site Speed Free',
        }),
      },
      {
        step: 3,
        delay_days: 4,
        subject: 'Can ChatGPT even find {{company}}?',
        body: renderProspectorEmail({
          preheader: 'AI Overviews, ChatGPT, and Perplexity read sites differently than Google does.',
          badge: 'AI Visibility Check',
          heading: 'Can ChatGPT even find {{company}}?',
          image: { file: 'hero-analytics-man.jpg', height: 336, alt: 'A marketer analyzing AI search visibility data' },
          bodyHtml: `
            <p style="margin:0 0 14px 0;">Hi {{contact_name}},</p>
            <p style="margin:0 0 14px 0;">Search doesn't only mean Google anymore. More people in {{industry}} are asking ChatGPT, Perplexity, and Google's AI Overviews for recommendations before they ever type a traditional search.</p>
            <p style="margin:0 0 14px 0;">The problem: most websites were built for the old rules. If {{website}} is missing clear structured information or blocks AI crawlers without knowing it, {{company}} may be invisible in exactly the answers your future customers are reading.</p>
            <p style="margin:0 0 0 0;">The free scan checks your AI visibility alongside your traditional SEO, so you know whether ChatGPT and Google AI Overviews can actually find you.</p>
          `,
          ctaUrl: '{{offer_link}}',
          ctaLabel: 'See My AI Visibility Free',
        }),
      },
      {
        step: 4,
        delay_days: 7,
        subject: "Last look: what's {{website}} missing?",
        body: renderProspectorEmail({
          preheader: 'Two ways to find out — a free scan, or five minutes with a real person.',
          badge: 'Last Call',
          heading: "Last look: what's {{website}} missing?",
          image: { file: 'analytics-dashboard-review.jpg', height: 336, alt: 'An analytics dashboard showing improved website performance' },
          bodyHtml: `
            <p style="margin:0 0 14px 0;">Hi {{contact_name}},</p>
            <p style="margin:0 0 14px 0;">This is my last note, so let's make it useful. Since 2009, we've helped more than 500 Los Angeles businesses fix exactly the kind of technical issues the free scan catches — slow load times, pages Google can't crawl, and sites AI search tools skip right past. Clients rate us 5.0 on Google and 5.0 on Clutch.</p>
            <p style="margin:0 0 0 0;">If {{company}}'s website has never been checked for speed, SEO, security, and AI visibility, the free scan takes about a minute and hands you a plain-language report — no sales call required. And if you'd rather just talk it through, we're happy to take a look at {{website}} together and tell you what we'd fix first.</p>
          `,
          ctaUrl: '{{offer_link}}',
          ctaLabel: 'Scan My Site Free',
          secondary: { url: '{{site_url}}/contact', label: 'Or talk to a real person →' },
          showTrust: true,
          signOff: '— Steve<br>Gobiya Growth Team',
        }),
      },
    ],
  },
  {
    id: 'seq-welcome',
    title: 'Welcome Sequence',
    description: 'Single welcome email sent to brand-new prospects.',
    status: 'paused',
    steps: [
      { step: 1, delay_days: 0, subject: 'Welcome to Gobiya Growth Toolkit', body: '<p>Welcome!</p>' },
      { step: 2, delay_days: 3, subject: 'Exploring your marketing goals', body: '<p>Checking in!</p>' },
      { step: 3, delay_days: 7, subject: 'Your free SEO & AI audit', body: '<p>Audit ready!</p>' },
    ],
  },
  {
    id: 'seq-general',
    title: 'General Outreach',
    description: 'Main sequence for organic website leads.',
    status: 'paused',
    steps: [
      { step: 1, delay_days: 0, subject: 'Introduction from Gobiya', body: '<p>Intro!</p>' },
      { step: 2, delay_days: 3, subject: 'How Gobiya drives growth', body: '<p>Growth info!</p>' },
      { step: 3, delay_days: 7, subject: 'Let\'s connect', body: '<p>Connect!</p>' },
    ],
  },
  {
    id: 'seq-new-outreach',
    title: 'New Outreach Sequence',
    description: 'A multi-step email drip for prospecting.',
    status: 'paused',
    steps: [
      { step: 1, delay_days: 0, subject: 'Outreach step 1', body: '<p>Step 1</p>' },
      { step: 2, delay_days: 3, subject: 'Outreach step 2', body: '<p>Step 2</p>' },
      { step: 3, delay_days: 7, subject: 'Outreach step 3', body: '<p>Step 3</p>' },
    ],
  },
  {
    id: 'seq-holiday',
    title: 'Holiday Campaigns',
    description: 'Seasonal touchpoints (Thanksgiving, Year-End, Independence Day).',
    status: 'paused',
    steps: [
      { step: 1, delay_days: 0, subject: 'Special seasonal offer for {{company}}', body: '<p>Holiday offer!</p>' },
      { step: 2, delay_days: 3, subject: 'Holiday marketing checklist', body: '<p>Checklist!</p>' },
      { step: 3, delay_days: 7, subject: 'Year-end growth strategy', body: '<p>Year-end!</p>' },
    ],
  },
];

export async function getDripSequences() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('drip_sequences')
    .select('id, title, description, status, steps, created_at')
    .order('created_at', { ascending: false });

  if (!error && data && data.length > 0) {
    return data;
  }

  // First run: the table is empty, so persist the defaults as real rows with real
  // UUIDs. Sequences only work as editable, enrollable records once they exist here —
  // the hardcoded DEFAULT_SEQUENCES array can't be enrolled into or updated.
  const admin = createAdminSupabase();
  const { data: seeded, error: seedError } = await admin
    .from('drip_sequences')
    .insert(DEFAULT_SEQUENCES.map(({ id, ...rest }) => rest))
    .select('id, title, description, status, steps, created_at');

  if (seedError || !seeded) {
    console.error('Error seeding default drip sequences:', seedError);
    return DEFAULT_SEQUENCES;
  }
  return seeded;
}

// The sequence prospects get auto-enrolled into after a scout/CSV save.
export async function getActiveDripSequence() {
  const sequences = await getDripSequences();
  return (
    sequences.find((s) => s.title === 'Prospector Drip - 4 Step') ||
    sequences.find((s) => s.status === 'active') ||
    sequences[0] ||
    null
  );
}

export async function updateDripSequence(id, updates) {
  const admin = createAdminSupabase();
  const allowed = {};
  if (updates.status !== undefined) allowed.status = updates.status;
  if (updates.title !== undefined) allowed.title = updates.title;
  if (updates.description !== undefined) allowed.description = updates.description;
  if (updates.steps !== undefined) allowed.steps = updates.steps;

  const { data, error } = await admin
    .from('drip_sequences')
    .update(allowed)
    .eq('id', id)
    .select('id, title, description, status, steps, created_at')
    .single();

  if (error) {
    console.error('Error updating drip sequence:', error);
    return { ok: false, error: error.message };
  }
  return { ok: true, sequence: data };
}

export async function enrollProspectsInSequence(sequenceId, prospectIds) {
  const admin = createAdminSupabase();
  const now = new Date().toISOString();

  const rows = prospectIds.map((pid) => ({
    sequence_id: sequenceId,
    prospect_id: pid,
    current_step: 1,
    status: 'active',
    next_send_at: now,
  }));

  const { data, error } = await admin
    .from('drip_subscribers')
    .upsert(rows, { onConflict: 'sequence_id,prospect_id' })
    .select('id');

  if (error) {
    console.error('Error enrolling prospects:', error);
    return { ok: false, error: error.message };
  }

  await admin.from('prospects').update({ status: 'QUEUED' }).in('id', prospectIds);
  return { ok: true, count: data ? data.length : prospectIds.length };
}

// The scan CTA's landing headline is matched to each step's angle via
// FreeSiteScanApp's ?goal= param — step 2 pitches speed (ux copy covers
// Core Web Vitals), step 3 pitches AI visibility. Steps without an entry
// land on the default "why aren't you being found" copy.
const SCAN_GOAL_BY_STEP = { 2: 'ux', 3: 'ai-visibility' };

export async function processDripQueue({ sequenceId } = {}) {
  const admin = createAdminSupabase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gobiya.com';

  let query = admin
    .from('drip_subscribers')
    .select('id, sequence_id, prospect_id, current_step, drip_sequences (title, steps), prospects (company, contact_name, email, location, website, industry)')
    .eq('status', 'active');

  if (sequenceId) {
    query = query.eq('sequence_id', sequenceId);
  }

  const { data: subscribers, error } = await query;
  if (error || !subscribers || subscribers.length === 0) {
    return { ok: true, processed: 0, message: 'No active subscribers due for drip dispatch.' };
  }

  let processedCount = 0;

  for (const sub of subscribers) {
    const seq = sub.drip_sequences || DEFAULT_SEQUENCES[0];
    const steps = seq.steps || DEFAULT_SEQUENCES[0].steps;
    const currentStepObj = steps.find((s) => s.step === sub.current_step) || steps[0];
    const prospect = sub.prospects;

    if (!prospect || !prospect.email) continue;

    // Route to the free scan, pre-filled with the prospect's own domain, so
    // the CTA opens straight into a ready-to-run check instead of a generic
    // landing page. Falls back to the old /lp path when a prospect has no
    // website on file — the scan tool can't prefill what it doesn't have.
    let offerLink;
    if (prospect.website) {
      const scanParams = new URLSearchParams({
        url: prospect.website,
        utm_source: 'prospector',
        utm_medium: 'drip',
        utm_campaign: 'prospector-drip-4step',
        utm_content: `step${sub.current_step}`,
      });
      const goal = SCAN_GOAL_BY_STEP[sub.current_step];
      if (goal) scanParams.set('goal', goal);
      offerLink = `${siteUrl}/free-site-scan?${scanParams.toString()}`;
    } else {
      offerLink = `${siteUrl}/lp?ref=drip&email=${encodeURIComponent(prospect.email)}`;
    }

    let subject = (currentStepObj.subject || 'Custom AI CRM Offer')
      .replace(/\{\{company\}\}/gi, prospect.company || 'your business')
      .replace(/\{\{contact_name\}\}/gi, prospect.contact_name || prospect.company || 'there')
      .replace(/\{\{location\}\}/gi, prospect.location || 'your area')
      .replace(/\{\{industry\}\}/gi, prospect.industry || 'your industry')
      .replace(/\{\{website\}\}/gi, prospect.website || 'your website');

    let body = (currentStepObj.body || '')
      .replace(/\{\{company\}\}/gi, prospect.company || 'your business')
      .replace(/\{\{contact_name\}\}/gi, prospect.contact_name || prospect.company || 'there')
      .replace(/\{\{location\}\}/gi, prospect.location || 'your area')
      .replace(/\{\{industry\}\}/gi, prospect.industry || 'your industry')
      .replace(/\{\{website\}\}/gi, prospect.website || 'your website')
      .replace(/\{\{offer_link\}\}/gi, offerLink)
      .replace(/\{\{site_url\}\}/gi, siteUrl);

    try {
      const fromEmail = process.env.ONBOARDING_FROM_EMAIL || 'Gobiya Growth <onboarding@updates.gobiya.com>';
      
      const res = await resend.emails.send({
        from: fromEmail,
        to: prospect.email,
        subject,
        html: body,
      });

      const nextStepIndex = sub.current_step + 1;
      const isComplete = nextStepIndex > steps.length;

      await admin
        .from('drip_subscribers')
        .update({
          current_step: isComplete ? sub.current_step : nextStepIndex,
          status: isComplete ? 'completed' : 'active',
          last_sent_at: new Date().toISOString(),
          next_send_at: new Date(Date.now() + 86400000 * 2).toISOString(),
        })
        .eq('id', sub.id);

      await admin.from('prospects').update({ status: 'CONTACTED' }).eq('id', sub.prospect_id);

      await admin.from('drip_logs').insert({
        sequence_id: sub.sequence_id,
        prospect_id: sub.prospect_id,
        step_index: sub.current_step,
        recipient_email: prospect.email,
        status: res.error ? 'failed' : 'sent',
        error_message: res.error ? res.error.message : null,
      });

      processedCount++;
    } catch (err) {
      console.error('Error sending drip email:', err);
    }
  }

  return { ok: true, processed: processedCount };
}

export async function sendTestDripEmail(recipientEmail, sequenceTitle = 'Prospector Drip - 4 Step') {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gobiya.com';
  const offerLink = `${siteUrl}/lp?ref=drip&email=${encodeURIComponent(recipientEmail)}`;

  const subject = `[TEST] Quick question regarding Land Rover Encino's website & lead generation`;
  const body = `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
    <p style="background:#fff3cd;padding:8px 12px;border:1px solid #ffeba8;border-radius:4px;font-size:13px;">⚡ <strong>TEST PREVIEW</strong> for sequence: ${sequenceTitle}</p>
    <p>Hi Land Rover Encino Team,</p>
    <p>We are offering <strong>The Custom AI CRM Offer</strong> starting at $999 — a CRM built around how Land Rover Encino actually gets leads, with AI handling instant replies, lead scoring, and automated follow-up so no inquiry sits in an inbox going cold.</p>
    <p><a href="${offerLink}" style="display:inline-block;padding:12px 20px;background:#e41613;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;">Claim the Custom AI CRM Offer &rarr;</a></p>
  </div>`;

  try {
    const fromEmail = process.env.ONBOARDING_FROM_EMAIL || 'Gobiya Growth <onboarding@updates.gobiya.com>';
    const res = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject,
      html: body,
    });
    return { ok: !res.error, error: res.error ? res.error.message : null };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
