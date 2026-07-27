import { createServerSupabase } from './supabase/server.js';
import { createAdminSupabase } from './supabase/admin.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const DEFAULT_SEQUENCES = [
  {
    id: 'seq-prospector-drip',
    title: 'Prospector Drip - 4 Step',
    description: 'Multi-touch outreach sequence for cold prospects from the Prospector tool pitching the Q3 Growth Bundle.',
    status: 'active',
    steps: [
      {
        step: 1,
        delay_days: 0,
        subject: 'Quick question regarding {{company}}\'s website & lead generation',
        body: `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
          <p>Hi {{contact_name}},</p>
          <p>I noticed {{company}} is currently active in {{location}}. Are you currently taking on new clients or looking to scale your lead volume this quarter?</p>
          <p>We are offering <strong>The Q3 Growth Bundle Offer</strong> starting at $2,500 — which gives you a custom high-converting website built on Next.js/React, a fully integrated CRM to organize your leads, plus a professional YouTube AI video pre-roll ad campaign to drive immediate traffic.</p>
          <p><a href="{{offer_link}}" style="display:inline-block;padding:12px 20px;background:#e41613;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;">Claim the Q3 Growth Bundle Offer &rarr;</a></p>
          <p>Would you have 10 minutes this week for a brief demo?</p>
          <p>Best regards,<br />Steve &mdash; Gobiya Growth Team<br /><a href="{{site_url}}">gobiya.com</a></p>
        </div>`,
      },
      {
        step: 2,
        delay_days: 2,
        subject: 'Re: {{company}}\'s CRM & YouTube AI video campaign',
        body: `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
          <p>Hi {{contact_name}},</p>
          <p>Following up on my previous note. Most businesses in {{location}} spend thousands on ads but lose leads due to slow websites or lack of follow-up.</p>
          <p>With our Q3 Growth Bundle, you get:</p>
          <ul>
            <li><strong>Custom Web Dev</strong>: Lightning fast, SEO-optimized, starting at $2,500.</li>
            <li><strong>Integrated Lead CRM</strong>: Track every inquiry instantly.</li>
            <li><strong>YouTube AI Pre-Roll Ad Campaign</strong>: Professional video ad to drive local buyers.</li>
          </ul>
          <p><a href="{{offer_link}}" style="color:#e41613;font-weight:bold;">See details & claim offer before Sept 30th &rarr;</a></p>
          <p>Best,<br />Steve</p>
        </div>`,
      },
      {
        step: 3,
        delay_days: 4,
        subject: 'Case Study: How we turned web visitors into high-value leads for {{industry}}',
        body: `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
          <p>Hi {{contact_name}},</p>
          <p>Thought you might find this interesting — we recently built a custom website and CRM system that doubled inbound inquiries within 30 days.</p>
          <p>Our Q3 Growth Bundle combines high-performance design with direct lead management and video advertising.</p>
          <p><a href="{{offer_link}}" style="display:inline-block;padding:10px 18px;background:#111;color:#fff;text-decoration:none;border-radius:4px;">View Q3 Growth Bundle Offer Details</a></p>
        </div>`,
      },
      {
        step: 4,
        delay_days: 7,
        subject: 'Final follow-up for {{company}} — Q3 Growth Bundle ending soon',
        body: `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
          <p>Hi {{contact_name}},</p>
          <p>I know you're busy! This is my final check-in regarding the Q3 Growth Bundle ($2,500 custom web dev + integrated CRM + YouTube AI pre-roll ad).</p>
          <p>If you're interested in locking in this pricing before September 30, you can claim your offer here:</p>
          <p><a href="{{offer_link}}" style="color:#e41613;font-weight:bold;">{{offer_link}}</a></p>
        </div>`,
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

  if (error || !data || data.length === 0) {
    return DEFAULT_SEQUENCES;
  }
  return data;
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

  // Update prospect status to QUEUED
  await admin.from('prospects').update({ status: 'QUEUED' }).in('id', prospectIds);

  return { ok: true, count: data ? data.length : prospectIds.length };
}

export async function processDripQueue({ sequenceId } = {}) {
  const admin = createAdminSupabase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Fetch active subscribers
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

    const offerLink = `${siteUrl}/lp?ref=drip&email=${encodeURIComponent(prospect.email)}`;

    let subject = (currentStepObj.subject || 'Q3 Growth Bundle')
      .replace(/\{\{company\}\}/gi, prospect.company || 'your business')
      .replace(/\{\{contact_name\}\}/gi, prospect.contact_name || prospect.company || 'there')
      .replace(/\{\{location\}\}/gi, prospect.location || 'your area')
      .replace(/\{\{industry\}\}/gi, prospect.industry || 'your industry');

    let body = (currentStepObj.body || '')
      .replace(/\{\{company\}\}/gi, prospect.company || 'your business')
      .replace(/\{\{contact_name\}\}/gi, prospect.contact_name || prospect.company || 'there')
      .replace(/\{\{location\}\}/gi, prospect.location || 'your area')
      .replace(/\{\{industry\}\}/gi, prospect.industry || 'your industry')
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const offerLink = `${siteUrl}/lp?ref=drip&email=${encodeURIComponent(recipientEmail)}`;

  const subject = `[TEST] Quick question regarding Land Rover Encino's website & lead generation`;
  const body = `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
    <p style="background:#fff3cd;padding:8px 12px;border:1px solid #ffeba8;border-radius:4px;font-size:13px;">⚡ <strong>TEST PREVIEW</strong> for sequence: ${sequenceTitle}</p>
    <p>Hi Land Rover Encino Team,</p>
    <p>We are offering <strong>The Q3 Growth Bundle Offer</strong> starting at $2,500 — which gives you a custom high-converting website built on Next.js/React, a fully integrated CRM to organize your leads, plus a professional YouTube AI video pre-roll ad campaign to drive immediate traffic.</p>
    <p><a href="${offerLink}" style="display:inline-block;padding:12px 20px;background:#e41613;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;">Claim the Q3 Growth Bundle Offer &rarr;</a></p>
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
