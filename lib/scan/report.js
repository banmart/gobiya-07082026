/* The only AI call in the scan.
 *
 * The model receives measured facts and the scoring breakdown. It does not
 * receive the page HTML, the visitor's form answers, or the URL alone, and it
 * is never asked to produce a number. Its entire job is to explain findings
 * that already exist in plain language and put them in a sensible order.
 *
 * This is the whole reason the scan bothers to measure anything. Given only a
 * URL, a model will write a confident, fluent, completely invented audit — and
 * this one goes out with the prospect's own domain on it.
 */

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const TIMEOUT_MS = 25000;

export const SYSTEM_RULES = `You are writing a website health report for a small business owner.

Rules you must follow exactly:
- Use ONLY the measurements provided in the DATA block. They are the complete set of facts.
- Never estimate, infer, or supply a measurement that is not in DATA. If something is marked
  "Not measured", say it was not measured. Do not guess what it might have been.
- Never invent metrics, competitor comparisons, traffic numbers, keyword rankings, or backlink
  counts. None of those were measured.
- Do not produce or restate an overall score. One has already been calculated.
- Write to the owner, in second person, in plain English. No jargon padding, no filler
  reassurance, no sales pitch.
- Be direct about what is wrong and concrete about the fix.

Return ONLY valid JSON matching this shape, with no markdown fence:
{
  "summary": "2-3 sentences on the overall state of the site",
  "findings": [
    { "title": "short label", "severity": "high|medium|low",
      "why": "why this matters to the business, one or two sentences",
      "fix": "what to actually do about it" }
  ],
  "nextSteps": ["3-4 short imperative actions, highest impact first"]
}

Between 3 and 6 findings. Order them by real impact, not by the order of the data.`;

/** Renders the facts the model is allowed to see. Nothing else reaches it. */
export function buildPrompt({ url, score, breakdown }) {
  const lines = breakdown.map(
    (item) => `- ${item.label}: ${item.detail}${item.state === 'unmeasured' ? ' (NOT MEASURED)' : ''}`
  );

  return `${SYSTEM_RULES}

DATA
Site scanned: ${url}
Pages analysed: 1 (the address above only — this was not a full-site crawl)
Calculated score: ${score}/100

Measurements:
${lines.join('\n')}
`;
}

/** Deterministic fallback used when the model is unavailable or unusable. */
export function fallbackReport({ breakdown }) {
  const problems = breakdown.filter((b) => b.state === 'fail' || b.state === 'warn');
  const unmeasured = breakdown.filter((b) => b.state === 'unmeasured');

  return {
    summary:
      problems.length === 0
        ? 'Every check we were able to run on this page passed. The detail is listed below.'
        : `We found ${problems.length} ${problems.length === 1 ? 'issue' : 'issues'} on this page. Each one is listed below with what we measured.`,
    findings: problems.slice(0, 6).map((p) => ({
      title: p.label,
      severity: p.state === 'fail' ? 'high' : 'medium',
      why: `This check did not pass. We measured: ${p.detail}.`,
      fix: 'Steve will walk you through this on the call.',
    })),
    nextSteps: [
      'Book a call to go through these findings',
      ...(unmeasured.length ? ['Ask about the checks we could not complete'] : []),
    ],
    generatedBy: 'fallback',
  };
}

function parseModelJson(text) {
  // Models fence JSON despite instructions often enough to be worth handling.
  const cleaned = String(text || '')
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/,'')
    .trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return undefined;
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return undefined;
  }
}

function isUsable(report) {
  return (
    report &&
    typeof report.summary === 'string' &&
    report.summary.trim().length > 0 &&
    Array.isArray(report.findings) &&
    report.findings.length > 0 &&
    report.findings.every((f) => f && f.title && f.why && f.fix)
  );
}

export async function generateReport({ url, score, breakdown }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return fallbackReport({ breakdown });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: buildPrompt({ url, score, breakdown }) }] }],
        generationConfig: { temperature: 0.3, responseMimeType: 'application/json' },
      }),
    });

    if (!response.ok) return fallbackReport({ breakdown });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = parseModelJson(text);

    if (!isUsable(parsed)) return fallbackReport({ breakdown });

    return {
      summary: parsed.summary,
      findings: parsed.findings.slice(0, 6).map((f) => ({
        title: String(f.title),
        severity: ['high', 'medium', 'low'].includes(f.severity) ? f.severity : 'medium',
        why: String(f.why),
        fix: String(f.fix),
      })),
      nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps.slice(0, 4).map(String) : [],
      generatedBy: 'gemini-2.5-flash',
    };
  } catch {
    return fallbackReport({ breakdown });
  } finally {
    clearTimeout(timer);
  }
}
