import { createServerSupabase } from '@/lib/supabase/server';
import { createAdminSupabase } from '@/lib/supabase/admin';

import { resend } from './resend';

const DEFAULT_SEQUENCES = [
  {
    id: 'seq-prospector-drip',
    title: 'Prospector Drip - 4 Step',
    description: 'Multi-touch outreach sequence for cold prospects from the Prospector tool pitching the Custom AI CRM Offer.',
    status: 'active',
    steps: [
      {
        step: 1,
        delay_days: 0,
        subject: 'Quick question regarding {{company}}\'s website & lead generation',
        body: `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
          <p>Hi {{contact_name}},</p>
          <p>I noticed {{company}} is currently active in {{location}}. Are you currently taking on new clients or looking to scale your lead volume this quarter?</p>
          <p>We are offering <strong>The Custom AI CRM Offer</strong> starting at $999 — a CRM built around how {{company}} actually gets leads, with AI handling the busy work: instant replies, lead scoring, and automated follow-up so no inquiry sits in an inbox going cold.</p>
          <p><a href="{{offer_link}}" style="display:inline-block;padding:12px 20px;background:#e41613;color:#fff;text-decoration:none;border-radius:4px;font-weight:bold;">Claim the Custom AI CRM Offer &rarr;</a></p>
          <p>Would you have 10 minutes this week for a brief demo?</p>
          <p>Best regards,<br />Steve &mdash; Gobiya Growth Team<br /><a href="{{site_url}}">gobiya.com</a></p>
        </div>`,
      },
      {
        step: 2,
        delay_days: 2,
        subject: 'Re: {{company}}\'s lead follow-up (or lack of it)',
        body: `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
          <p>Hi {{contact_name}},</p>
          <p>Following up on my previous note. Most businesses in {{location}} spend thousands on ads but lose leads because nobody follows up fast enough.</p>
          <p>With our Custom AI CRM, you get:</p>
          <ul>
            <li><strong>Every Lead in One Place</strong>: Website forms, calls, and emails land in a single dashboard.</li>
            <li><strong>AI Follow-Up</strong>: New leads get an instant reply and an automatic nurture sequence.</li>
            <li><strong>Lead Scoring</strong>: AI flags who's ready to buy now, so you call the right people first.</li>
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
          <p>Thought you might find this interesting — we recently set up a custom AI CRM for a client that doubled inbound inquiries followed up within the hour, instead of days later.</p>
          <p>Our Custom AI CRM combines lead capture, automated nurturing, and lead scoring in one system built around your business.</p>
          <p><a href="{{offer_link}}" style="display:inline-block;padding:10px 18px;background:#111;color:#fff;text-decoration:none;border-radius:4px;">View Custom AI CRM Offer Details</a></p>
        </div>`,
      },
      {
        step: 4,
        delay_days: 7,
        subject: 'Final follow-up for {{company}} — Custom AI CRM offer ending soon',
        body: `<div style="font-family:Helvetica,Arial,sans-serif;line-height:1.6;color:#2b2b2b;max-width:600px;">
          <p>Hi {{contact_name}},</p>
          <p>I know you're busy! This is my final check-in regarding the Custom AI CRM Offer (lead capture + automated AI follow-up + lead scoring, starting at $999).</p>
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

    const offerLink = `${siteUrl}/lp?ref=drip&email=${encodeURIComponent(prospect.email)}`;

    let subject = (currentStepObj.subject || 'Custom AI CRM Offer')
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
