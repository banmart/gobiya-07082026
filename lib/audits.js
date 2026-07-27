import { createServerSupabase } from './supabase/server.js';

export async function listClientAudits(clientId) {
  const supabase = await createServerSupabase();
  let query = supabase
    .from('ai_audits')
    .select('id, url, score, report_data, created_at')
    .order('created_at', { ascending: false });

  if (clientId) {
    query = query.eq('client_id', clientId);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching audits:', error);
    return [];
  }
  return data ?? [];
}

export async function createAuditReport({ url, clientId }) {
  const supabase = await createServerSupabase();

  // Generate deterministic/mock health audit report details for target URL
  const domain = url.replace(/^https?:\/\//i, '').split('/')[0];
  const score = Math.floor(75 + Math.random() * 20); // 75 - 95
  
  const reportData = {
    domain,
    scannedAt: new Date().toISOString(),
    categories: {
      performance: Math.floor(70 + Math.random() * 25),
      seo: Math.floor(80 + Math.random() * 18),
      aiReadability: Math.floor(75 + Math.random() * 20),
      security: 92,
    },
    findings: [
      {
        severity: 'warning',
        title: 'Schema Markup Missing',
        description: 'JSON-LD Organization schema could be expanded for AI entity search visibility.',
      },
      {
        severity: 'info',
        title: 'Page Speed Optimization',
        description: 'LCP image load candidate could benefit from preloading.',
      },
      {
        severity: 'good',
        title: 'SSL / HTTPS Security',
        description: 'Valid SSL certificate with TLS 1.3 enabled.',
      },
    ],
  };

  const { data, error } = await supabase
    .from('ai_audits')
    .insert({
      url,
      score,
      report_data: reportData,
      client_id: clientId || null,
    })
    .select('id, url, score, report_data, created_at')
    .single();

  if (error) {
    console.error('Error creating audit:', error);
    return { ok: false, error: error.message };
  }

  return { ok: true, audit: data };
}
