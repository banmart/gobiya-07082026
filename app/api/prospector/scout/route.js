import { NextResponse } from 'next/server';
import { runPerplexityScout, saveProspects } from '../../../../lib/prospector';

export async function POST(request) {
  try {
    const body = await request.json();
    const { keyword, industry, location, limit, customPrompt, apiKey, autoSave, clientId } = body;

    const result = await runPerplexityScout({
      keyword,
      industry,
      location,
      limit: parseInt(limit, 10) || 10,
      customPrompt,
      apiKey,
    });

    if (result.ok && autoSave && Array.isArray(result.prospects)) {
      const saveRes = await saveProspects(result.prospects, clientId || null);
      return NextResponse.json({
        ok: true,
        source: result.source,
        prospects: result.prospects,
        savedCount: saveRes.count || 0,
      });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('Scout API route error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
