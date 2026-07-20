# Chat Assistant Grounding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ground the Gobiya chat assistant (`app/api/chat/route.js`) in the real content of `lib/services.js`, `lib/industries.js`, `lib/locations.js`, `lib/outcomes.js`, and `lib/work.js`, so it answers specific questions accurately and can pitch using real capabilities, FAQs, and client-approved case-study numbers, linking to the specific page it cites.

**Architecture:** A new module, `lib/chatKnowledge.js`, walks the five data sources once at module load and flattens them into a single text corpus (`CHAT_KNOWLEDGE`), each entry headed with its title and real site URL, HTML stripped. `app/api/chat/route.js` appends that corpus to the existing Gemini `systemInstruction`, and the system prompt's rules are extended to (a) allow linking to any page named in the corpus and (b) forbid stating facts, numbers, or client names not present in the corpus or the existing static company-facts block.

**Tech Stack:** Next.js 15 App Router (ESM, `"type": "module"` in `package.json`), Gemini 2.5 Flash via the existing `app/api/chat/route.js` fetch call. No new dependencies.

## Global Constraints

- v1 scope is services, industries, locations, outcomes, and work/case studies only. Insights articles are explicitly out of scope (see spec's "Future: retrieval" section).
- Case studies: extract only `client`, `tag`, `result`, `study.dek`, `study.answer`, `study.metrics`, `study.takeaways` — never the long narrative `study.body` paragraphs.
- Only the 9 case studies in `lib/work.js` that have a `study` object are included (`CASE_STUDIES.filter(c => c.study)`); the 3 cards-only entries (`tidder`, `sonrisa-dental`, `trusted-home-contractors`) are excluded.
- All HTML must be stripped from extracted text (source fields contain `<a href="...">text</a>` throughout).
- Every corpus entry must be headed with its title and real site URL so the model can link to it.
- The bot may cite real client names and numbers by name — this was explicitly approved (see the source-of-truth comment at the top of `lib/work.js`: "Metrics in `study` content must be client-approved before an entry ships").
- No frontend changes — `components/AIChatBubble.js` already renders `[text](/path)` markdown links from any assistant response.
- No test framework exists in this repo (confirmed: no jest/vitest/mocha in `package.json`). Verification uses plain Node scripts (consistent with how title/description lengths were verified earlier in this project) and manual `curl` checks against the dev server — not a new test framework.

---

### Task 1: Build the knowledge corpus module

**Files:**
- Create: `lib/chatKnowledge.js`

**Interfaces:**
- Produces: `export const CHAT_KNOWLEDGE` — a single string, computed once at module load. Task 2 imports this directly.

- [ ] **Step 1: Write `lib/chatKnowledge.js`**

```js
import { SERVICES } from './services';
import { INDUSTRIES } from './industries';
import { LOCATIONS } from './locations';
import { OUTCOMES } from './outcomes';
import { CASE_STUDIES } from './work';

function stripHtml(value) {
  return String(value ?? '')
    .replace(/<a[^>]*>(.*?)<\/a>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatFaqs(faqs) {
  if (!faqs || !faqs.length) return '';
  return faqs.map((f) => `Q: ${stripHtml(f.q)} A: ${stripHtml(f.a)}`).join(' ');
}

function formatCapabilities(capabilities) {
  if (!capabilities || !capabilities.length) return '';
  return capabilities.map((c) => `${stripHtml(c.title)}: ${stripHtml(c.desc)}`).join('; ');
}

function formatProcess(process) {
  if (!process || !process.length) return '';
  return process.map((p) => `${stripHtml(p.title)} — ${stripHtml(p.desc)}`).join('; ');
}

function serviceDoc(service) {
  const lines = [
    `### ${service.title} — /services/${service.slug}`,
    stripHtml(service.blurb),
    stripHtml(service.lede),
  ];
  if (service.problem) lines.push(`Problem: ${stripHtml(service.problem.statement)}`);
  const caps = formatCapabilities(service.capabilities);
  if (caps) lines.push(`Capabilities: ${caps}`);
  const proc = formatProcess(service.process);
  if (proc) lines.push(`Process: ${proc}`);
  const faqs = formatFaqs(service.faqs);
  if (faqs) lines.push(`FAQ: ${faqs}`);
  return lines.filter(Boolean).join('\n');
}

function industryDoc(industry) {
  const lines = [
    `### ${industry.title} — /industries/${industry.slug}`,
    stripHtml(industry.metaDescription),
    stripHtml(industry.lede),
  ];
  if (industry.problem) lines.push(`Problem: ${stripHtml(industry.problem.statement)}`);
  const caps = formatCapabilities(industry.capabilities);
  if (caps) lines.push(`Capabilities: ${caps}`);
  const proc = formatProcess(industry.process);
  if (proc) lines.push(`Process: ${proc}`);
  const faqs = formatFaqs(industry.faqs);
  if (faqs) lines.push(`FAQ: ${faqs}`);
  return lines.filter(Boolean).join('\n');
}

function locationDoc(location) {
  const title = location.title || `Local SEO in ${location.name}, CA`;
  const lines = [
    `### ${title} — /industries/local-service/${location.slug}`,
    stripHtml(location.intro),
  ];
  const faqs = [location.faq, ...(location.faqs || [])].filter(Boolean);
  const faqText = formatFaqs(faqs);
  if (faqText) lines.push(`FAQ: ${faqText}`);
  return lines.filter(Boolean).join('\n');
}

function outcomeDoc(outcome) {
  const lines = [
    `### ${outcome.title} — /outcomes/${outcome.slug}`,
    stripHtml(outcome.lede),
  ];
  if (outcome.stats && outcome.stats.length) {
    const stats = outcome.stats
      .map((s) => `${s.prefix || ''}${s.value}${s.suffix || ''} — ${stripHtml(s.label)}`)
      .join('; ');
    lines.push(`Real results: ${stats}`);
  }
  const caps = formatCapabilities(outcome.capabilities);
  if (caps) lines.push(`Capabilities: ${caps}`);
  const faqs = formatFaqs(outcome.faqs);
  if (faqs) lines.push(`FAQ: ${faqs}`);
  return lines.filter(Boolean).join('\n');
}

function caseStudyDoc(caseStudy) {
  const { study } = caseStudy;
  const lines = [
    `### Case study: ${caseStudy.client} — /work/${caseStudy.slug}`,
    `Industry: ${caseStudy.tag}. Result: ${caseStudy.result}.`,
    stripHtml(study.dek),
    stripHtml(study.answer),
  ];
  if (study.metrics && study.metrics.length) {
    const metrics = study.metrics.map((m) => `${m.value} ${stripHtml(m.label)}`).join('; ');
    lines.push(`Metrics: ${metrics}`);
  }
  if (study.takeaways && study.takeaways.length) {
    lines.push(`Takeaways: ${study.takeaways.map(stripHtml).join(' ')}`);
  }
  return lines.filter(Boolean).join('\n');
}

function buildKnowledge() {
  const sections = [
    ['SERVICES', Object.values(SERVICES).map(serviceDoc)],
    ['INDUSTRIES', Object.values(INDUSTRIES).map(industryDoc)],
    ['LOCATIONS', Object.values(LOCATIONS).map(locationDoc)],
    ['OUTCOMES', Object.values(OUTCOMES).map(outcomeDoc)],
    ['CASE STUDIES', CASE_STUDIES.filter((c) => c.study).map(caseStudyDoc)],
  ];

  return sections
    .map(([heading, docs]) => `## ${heading}\n\n${docs.join('\n\n')}`)
    .join('\n\n');
}

export const CHAT_KNOWLEDGE = buildKnowledge();
```

- [ ] **Step 2: Write a scratch verification script**

Working directory: `C:\Users\banma\projects\gobiya-07082026`. Write this file to `./.verify-knowledge.mjs` (repo-relative, deleted in Step 4 — never committed):

```js
import { CHAT_KNOWLEDGE } from './lib/chatKnowledge.js';

const checks = [
  ['non-empty', CHAT_KNOWLEDGE.length > 1000],
  ['has SERVICES section', CHAT_KNOWLEDGE.includes('## SERVICES')],
  ['has INDUSTRIES section', CHAT_KNOWLEDGE.includes('## INDUSTRIES')],
  ['has LOCATIONS section', CHAT_KNOWLEDGE.includes('## LOCATIONS')],
  ['has OUTCOMES section', CHAT_KNOWLEDGE.includes('## OUTCOMES')],
  ['has CASE STUDIES section', CHAT_KNOWLEDGE.includes('## CASE STUDIES')],
  ['has seo-discoverability URL', CHAT_KNOWLEDGE.includes('/services/seo-discoverability')],
  ['has SmileCenter case study URL', CHAT_KNOWLEDGE.includes('/work/smile-center-dentistry')],
  ['has SmileCenter client name', CHAT_KNOWLEDGE.includes('SmileCenter.com')],
  ['has SmileCenter 5x metric', CHAT_KNOWLEDGE.includes('5x')],
  ['has outcomes stat 61%', CHAT_KNOWLEDGE.includes('61%')],
  ['no leftover HTML tags', !/<a\s|<\/a>|<strong>|<em>/i.test(CHAT_KNOWLEDGE)],
  ['exactly 9 case study docs', (CHAT_KNOWLEDGE.match(/### Case study:/g) || []).length === 9],
  ['exactly 8 service docs', (CHAT_KNOWLEDGE.match(/## SERVICES[\s\S]*?## INDUSTRIES/)[0].match(/^### /gm) || []).length === 8],
];

let failed = 0;
for (const [name, pass] of checks) {
  console.log(`${pass ? 'PASS' : 'FAIL'} - ${name}`);
  if (!pass) failed++;
}
console.log(`\nCorpus length: ${CHAT_KNOWLEDGE.length} chars (~${Math.round(CHAT_KNOWLEDGE.length / 4)} tokens)`);
console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
```

- [ ] **Step 3: Run the verification script**

Run: `node .verify-knowledge.mjs`

Expected: every line prints `PASS`, ending with `All checks passed` and exit code 0. If any line prints `FAIL`, fix `lib/chatKnowledge.js` (most likely cause: a field name mismatch against the actual `lib/*.js` shape) and re-run until all pass.

- [ ] **Step 4: Delete the scratch verification script**

```bash
rm .verify-knowledge.mjs
```

- [ ] **Step 5: Commit**

```bash
git add lib/chatKnowledge.js
git commit -m "feat: add chat knowledge corpus built from services/industries/locations/outcomes/work data"
```

---

### Task 2: Wire the corpus into the chat route and extend the system prompt

**Files:**
- Modify: `app/api/chat/route.js:1-35` (imports and `SYSTEM_PROMPT`), `app/api/chat/route.js:71-74` (`systemInstruction` in the Gemini payload)

**Interfaces:**
- Consumes: `CHAT_KNOWLEDGE` (string) from `lib/chatKnowledge.js`, produced in Task 1.

- [ ] **Step 1: Add the import**

In `app/api/chat/route.js`, after the existing imports (after line 3, `import { Resend } from 'resend';`):

```js
import { CHAT_KNOWLEDGE } from '../../../lib/chatKnowledge';
```

- [ ] **Step 2: Extend rule 3 (internal links) in `SYSTEM_PROMPT`**

Replace this block (current lines 20-26):

```js
3. ALWAYS suggest relevant internal pages when applicable to funnel users:
  - Onboarding / Free AI Audit / Quote & Estimate: [Get a Quote / AI Visibility Audit](/onboarding)
  - Contact Us: [Contact Us](/contact)
  - Core SEO Services: [SEO & Discoverability](/services/seo-discoverability)
  - Web Development: [Web & App Development](/services/web-app-development)
  - AI Consulting: [AI & LLM Consulting](/services/ai-llm-consulting)
  - Tools Hub (Domain, IP, SSL checks): [Free Tools Hub](/tools)
```

with:

```js
3. ALWAYS suggest relevant internal pages when applicable to funnel users:
  - Onboarding / Free AI Audit / Quote & Estimate: [Get a Quote / AI Visibility Audit](/onboarding)
  - Contact Us: [Contact Us](/contact)
  - Core SEO Services: [SEO & Discoverability](/services/seo-discoverability)
  - Web Development: [Web & App Development](/services/web-app-development)
  - AI Consulting: [AI & LLM Consulting](/services/ai-llm-consulting)
  - Tools Hub (Domain, IP, SSL checks): [Free Tools Hub](/tools)
  You may ALSO link to any specific service, industry, location, outcome, or case-study page named in the GOBIYA KNOWLEDGE BASE below when it directly answers what the user is asking — use the same [Link Text](/path) format with the exact URL shown for that entry.
```

- [ ] **Step 3: Add a grounding rule to `SYSTEM_PROMPT`**

Insert as a new rule 7, after the existing rule 6 (LEAD CAPTURE INSTRUCTION) and before the closing backtick of the template literal:

```js
7. GROUNDING RULE (CRITICAL):
   - Only state facts, numbers, capabilities, or client names that appear in the COMPANY DETAILS above or the GOBIYA KNOWLEDGE BASE below. Never invent a statistic, client name, or capability that isn't in that data.
   - If a user asks something not covered by the company details or the knowledge base, say so honestly and suggest [Contact Us](/contact) instead of guessing.
```

- [ ] **Step 4: Append the knowledge base to the Gemini `systemInstruction`**

Replace this line (current line 73):

```js
        parts: [{ text: SYSTEM_PROMPT }]
```

with:

```js
        parts: [{ text: `${SYSTEM_PROMPT}\n\nGOBIYA KNOWLEDGE BASE:\n\n${CHAT_KNOWLEDGE}` }]
```

- [ ] **Step 5: Verify the build**

Run: `npx next build 2>&1 | tail -20`

Expected: build completes with no errors, `/api/chat` still listed among the routes.

- [ ] **Step 6: Start the dev server in the background**

Run: `npm run dev` (background)

Wait for `Ready` in the output before proceeding.

- [ ] **Step 7: Verify grounded answer + real case-study link**

```bash
curl -s -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Do you have experience with dental practices? What results have you gotten?"}]}'
```

Expected: JSON response whose `reply` field mentions SmileCenter.com's real result (5x patient inquiry increase or similar) and includes a markdown link to `/work/smile-center-dentistry`.

- [ ] **Step 8: Verify grounded process answer**

```bash
curl -s -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What is your process for fixing a Google traffic drop?"}]}'
```

Expected: `reply` reflects the real recovery process (diagnose the drop → build the recovery plan → execute the fix → monitor recovery, from `lib/outcomes.js`'s `recovery.process`), not a generic answer, and links to `/outcomes/recovery` when relevant.

- [ ] **Step 9: Verify the grounding rule declines out-of-scope claims**

```bash
curl -s -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Do you produce TV commercials?"}]}'
```

Expected: `reply` does not claim Gobiya offers TV production (not in the knowledge base or company facts), and points to `/contact` or lists the real service lines instead.

- [ ] **Step 10: Verify lead capture still fires**

```bash
curl -s -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"I want a quote for SEO services. My name is Test User and my email is test@example.com"}]}'
```

Expected: `reply` does not contain the literal string `[LEAD_DATA]` (it should be stripped before returning), and the server log (visible in the background dev server output) shows no unhandled error from the Resend call.

- [ ] **Step 11: Stop the dev server**

Stop the background `npm run dev` process.

- [ ] **Step 12: Commit**

```bash
git add app/api/chat/route.js
git commit -m "feat: ground chat assistant in real site content via CHAT_KNOWLEDGE"
```

- [ ] **Step 13: Push**

```bash
git push
```

---

## Self-Review

**Spec coverage:**
- Corpus module with the 5 specified extraction rules → Task 1.
- HTML stripping → `stripHtml()` in Task 1, verified by the "no leftover HTML tags" check.
- Real URLs on every doc → every `*Doc()` function's heading line, verified by the URL-substring checks.
- Case studies limited to `dek`/`answer`/`metrics`/`takeaways`, excluding `body` → `caseStudyDoc()` in Task 1 never reads `study.body`.
- Only the 9 case studies with `study` → `CASE_STUDIES.filter((c) => c.study)`, verified by the "exactly 9 case study docs" check.
- Extended linking rule → Task 2 Step 2.
- Grounding/anti-hallucination rule → Task 2 Step 3, verified by Task 2 Step 9.
- Manual verification per the spec's 4 scenarios → Task 2 Steps 7–10.
- No frontend changes → confirmed, no file under `components/` touched.

**Type/name consistency:** `CHAT_KNOWLEDGE` is the export name used consistently in Task 1's export and Task 2's import. Field names in every `*Doc()` function (`title`, `slug`, `blurb`, `lede`, `problem.statement`, `capabilities[].title/desc`, `process[].title/desc`, `faqs[].q/a`, `metaDescription`, `intro`, `faq`/`faqs`, `stats[].value/suffix/prefix/label`, `client`, `tag`, `result`, `study.dek/answer/metrics/takeaways`) were checked directly against the actual contents of `lib/services.js`, `lib/industries.js`, `lib/locations.js`, `lib/outcomes.js`, and `lib/work.js` read earlier in this session — no placeholders or assumed shapes.

**Placeholder scan:** No TBD/TODO. Every step shows the actual code or exact command.
