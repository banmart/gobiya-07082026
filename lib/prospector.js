import { createServerSupabase } from '@/lib/supabase/server';
import { createAdminSupabase } from '@/lib/supabase/admin';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export async function runPerplexityScout({ keyword, industry, location, limit = 10, customPrompt, apiKey }) {
  const effectiveKey = apiKey || process.env.PERPLEXITY_API_KEY;
  const targetTopic = (keyword || industry || 'Local Businesses').trim();
  const targetLoc = (location || 'Los Angeles, CA').trim();

  if (!effectiveKey) {
    return {
      ok: false,
      error: 'Perplexity API Key is missing. Please enter your PERPLEXITY_API_KEY in the configuration input or add PERPLEXITY_API_KEY to your .env.local file to scout real live businesses.',
    };
  }

  const promptText = customPrompt
    ? customPrompt.replace(/\{industry\}/gi, targetTopic).replace(/\{location\}/gi, targetLoc).replace(/\{limit\}/gi, limit)
    : `Search the live web and find exactly ${limit} REAL, currently active businesses in ${targetLoc} matching the industry or keyword "${targetTopic}".
For each business, crawl public records and websites to retrieve authentic contact details including direct contact email address, contact person/owner, phone number, website URL, and business notes.

Return ONLY a strictly valid JSON array of objects with no markdown codeblocks, matching this structure:
[
  {
    "company": "Exact Real Business Name",
    "contact_name": "Owner or Manager Name",
    "email": "authentic_contact@domain.com",
    "phone": "(XXX) XXX-XXXX",
    "website": "https://www.realdomain.com",
    "industry": "${targetTopic}",
    "location": "${targetLoc}",
    "notes": "Verified business active in ${targetLoc}"
  }
]`;

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${effectiveKey}`,
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content:
              'You are a real-time web intelligence agent. Search live web data to find real businesses with verified contact emails. Return strictly raw JSON array without markdown formatting or preamble.',
          },
          {
            role: 'user',
            content: promptText,
          },
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Perplexity API response error:', response.status, errText);
      return {
        ok: false,
        error: `Perplexity AI API error (${response.status}): ${errText || 'Failed to fetch live web data'}`,
      };
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content || '';
    const cleaned = content.replace(/```json/gi, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const validProspects = parsed.filter((p) => p && (p.company || p.email));
      return { ok: true, source: 'perplexity_ai_live', prospects: validProspects };
    }

    return { ok: false, error: 'Perplexity AI returned no valid business prospect results.' };
  } catch (err) {
    console.error('Perplexity AI execution error:', err);
    return { ok: false, error: `AI Search failed: ${err.message}` };
  }
}

export async function listProspects({ clientId, search, status, category, limit = 25, offset = 0 } = {}) {
  const supabase = await createServerSupabase();
  let query = supabase
    .from('prospects')
    .select('id, company, contact_name, email, phone, website, industry, keywords, location, status, source, notes, created_at', { count: 'exact' });

  if (clientId) {
    query = query.or(`client_id.eq.${clientId},client_id.is.null`);
  }

  if (status && status !== 'All Status') {
    query = query.eq('status', status);
  }

  if (category && category !== 'All Categories') {
    query = query.ilike('industry', `%${category}%`);
  }

  if (search && search.trim() !== '') {
    const term = `%${search.trim()}%`;
    query = query.or(`company.ilike.${term},email.ilike.${term},contact_name.ilike.${term},keywords.ilike.${term},location.ilike.${term}`);
  }

  query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) {
    console.error('Error fetching prospects:', error);
    return { prospects: [], total: 0 };
  }

  return { prospects: data ?? [], total: count ?? 0 };
}

export async function saveProspects(prospectsList, clientId = null) {
  const admin = createAdminSupabase();

  const formattedRows = prospectsList
    .filter((p) => p && (p.email || p.company))
    .map((p) => {
      const cleanEmail = (p.email || `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}@noemail.com`).toLowerCase().trim();
      return {
        client_id: clientId,
        company: p.company || 'Verified Business',
        contact_name: p.contact_name || p.company || 'Business Contact',
        email: cleanEmail,
        phone: p.phone || null,
        website: p.website || null,
        industry: p.industry || p.keywords || null,
        keywords: p.keywords || p.industry || null,
        location: p.location || null,
        status: p.status || 'QUEUED',
        source: p.source || 'perplexity_ai_live',
        notes: p.notes || null,
      };
    });

  if (formattedRows.length === 0) {
    return { ok: false, error: 'No valid prospect rows to save.' };
  }

  // Safe insert/select to avoid missing ON CONFLICT index errors
  const emails = formattedRows.map((r) => r.email);

  // 1. Fetch existing prospects matching these emails
  const { data: existingRows } = await admin
    .from('prospects')
    .select('id, email')
    .in('email', emails);

  const existingEmailMap = new Map((existingRows || []).map((r) => [r.email, r.id]));
  const rowsToInsert = formattedRows.filter((r) => !existingEmailMap.has(r.email));

  let savedIds = Array.from(existingEmailMap.values());

  if (rowsToInsert.length > 0) {
    const { data: insertedRows, error: insertError } = await admin
      .from('prospects')
      .insert(rowsToInsert)
      .select('id, email');

    if (insertError) {
      console.error('Error inserting new prospects:', insertError);
      return { ok: false, error: insertError.message };
    }

    if (insertedRows) {
      savedIds = savedIds.concat(insertedRows.map((r) => r.id));
    }
  }

  return { ok: true, count: savedIds.length, prospectIds: savedIds };
}

export async function deleteProspect(id) {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from('prospects').delete().eq('id', id);
  return { ok: !error };
}

export async function updateProspectStatus(id, status) {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from('prospects').update({ status }).eq('id', id);
  return { ok: !error };
}
