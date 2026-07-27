import { createServerSupabase } from '@/lib/supabase/server';
import { createAdminSupabase } from '@/lib/supabase/admin';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export async function runPerplexityScout({ keyword, industry, location, limit = 10, customPrompt, apiKey }) {
  const effectiveKey =
    apiKey ||
    process.env.PERPLEXITY_API ||
    process.env.PERPLEXITY_API_KEY ||
    process.env.NEXT_PUBLIC_PERPLEXITY_API ||
    process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY;
  const targetTopic = (keyword || industry || 'Local Businesses').trim();
  const targetLoc = (location || 'Los Angeles, CA').trim();

  if (!effectiveKey) {
    return {
      ok: false,
      error: 'Perplexity API Key is missing. Please check PERPLEXITY_API in your environment variables.',
    };
  }

  const promptText = customPrompt
    ? customPrompt.replace(/\{industry\}/gi, targetTopic).replace(/\{location\}/gi, targetLoc).replace(/\{limit\}/gi, limit)
    : `MANDATORY REQUIREMENT: EVERY RETURNED LEAD MUST HAVE A DIRECT, VALID BUSINESS EMAIL ADDRESS.
Search the live web and find ${limit} REAL, currently active businesses in ${targetLoc} matching "${targetTopic}".
For each business, crawl public records, contact pages, directories, and official company websites to retrieve their authentic direct email address (e.g. contact@domain.com, sales@domain.com, info@domain.com, or owner email), contact person name, phone number, and website URL.

DO NOT return any business if you cannot find a valid direct email address for them. Having a verified email address is mandatory for every lead.

Return ONLY a strictly valid JSON array of objects with no markdown codeblocks or preamble:
[
  {
    "company": "Exact Real Business Name",
    "contact_name": "Owner or Manager Name",
    "email": "direct_verified_email@domain.com",
    "phone": "(XXX) XXX-XXXX",
    "website": "https://www.realdomain.com",
    "industry": "${targetTopic}",
    "location": "${targetLoc}",
    "notes": "Verified email lead active in ${targetLoc}"
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
              'You are a real-time web scraping and lead intelligence agent. Your #1 HIGHEST PRIORITY requirement is that EVERY lead returned MUST have a valid, verified business email address. Skip any business that lacks an email address. Return strictly raw JSON array without markdown formatting or preamble.',
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
      const emailLeads = parsed.filter(
        (p) => p && p.email && typeof p.email === 'string' && p.email.includes('@') && p.email.trim().length > 3
      );

      if (emailLeads.length > 0) {
        return { ok: true, source: 'perplexity_ai_live', prospects: emailLeads };
      }
    }

    return {
      ok: false,
      error: 'Perplexity AI found no businesses with verified direct email addresses. Please try broadening your search location or keyword.',
    };
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

  // 1. Strict batch-level email deduplication (prevents duplicate emails in the same search payload)
  const uniqueIncomingMap = new Map();
  for (const p of prospectsList) {
    if (p && p.email && typeof p.email === 'string' && p.email.includes('@')) {
      const cleanEmail = p.email.toLowerCase().trim();
      if (!uniqueIncomingMap.has(cleanEmail)) {
        uniqueIncomingMap.set(cleanEmail, {
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
        });
      }
    }
  }

  const formattedRows = Array.from(uniqueIncomingMap.values());

  if (formattedRows.length === 0) {
    return { ok: false, error: 'No prospects with valid email addresses to save.' };
  }

  const emails = formattedRows.map((r) => r.email);

  // 2. Database-level deduplication: query existing prospects matching these email addresses
  const { data: existingRows } = await admin
    .from('prospects')
    .select('id, email')
    .in('email', emails);

  const existingEmailMap = new Map((existingRows || []).map((r) => [r.email.toLowerCase(), r.id]));
  const rowsToInsert = formattedRows.filter((r) => !existingEmailMap.has(r.email));

  let savedIds = Array.from(existingEmailMap.values());
  let newlyInsertedCount = 0;

  // 3. Only insert rows that do NOT already exist in the database
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
      newlyInsertedCount = insertedRows.length;
      savedIds = savedIds.concat(insertedRows.map((r) => r.id));
    }
  }

  // Guarantee savedIds contains only unique prospect IDs
  const uniqueSavedIds = Array.from(new Set(savedIds));

  return {
    ok: true,
    count: newlyInsertedCount,
    totalAssociatedCount: uniqueSavedIds.length,
    prospectIds: uniqueSavedIds,
  };
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
