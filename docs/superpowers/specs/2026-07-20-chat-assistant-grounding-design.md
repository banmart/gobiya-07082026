# Chat assistant grounding — design

## Problem

`app/api/chat/route.js` calls Gemini 2.5 Flash with a static, hand-written
system prompt: a short paragraph of company facts (phone, address, founder,
a bare list of six service names) and a fixed set of five internal links.
It has no access to the actual content of the site — the FAQs, capabilities,
process steps, and real client outcomes that live in `lib/services.js`,
`lib/industries.js`, `lib/locations.js`, `lib/outcomes.js`, and
`lib/work.js`. Visitors asking anything specific ("do you work with dental
practices?", "what's your process?", "what results have you gotten?") get
generic or invented answers instead of the real, already-written, in some
cases client-approved content sitting one file away.

## Goal

Ground the assistant in that real content so it can answer specific
questions accurately and make evidence-based pitches — citing real
capabilities, FAQs, and (with client approval already given, per the
comment in `lib/work.js`) real client names and numbers — and link to the
specific page it just cited, not just a fixed five-link menu.

## Scope (v1)

Included: services, industries, locations, outcomes, work/case studies.
Excluded: the 34 insights articles — mostly educational long-form content,
not sales-directed, and by far the largest content set. Revisit if/when
insights get added to scope (see "Future: retrieval" below).

## Architecture

### New module: `lib/chatKnowledge.js`

Exports one precomputed constant, `CHAT_KNOWLEDGE` — a single text string
built once at module load time from the five `lib/*.js` data sources above.
Module-level, not per-request: it's pure synchronous string work over data
that's already in memory, so there's no reason to rebuild it on every chat
message.

Each source is walked and turned into a heading + a flat text block:

```
### SEO & Discoverability — /services/seo-discoverability
Crawlability, structured data, and Core Web Vitals — the technical
foundation search and AI crawlers actually read.
Problem: A site can look finished and still be functionally invisible...
Capabilities: Server-side rendering: We fix client-side-only React/JS
sites...; Algorithm & penalty recovery: ...
FAQ: How do we know if our traffic drop is an algorithm update or
something we did? — We check the drop date against known Google update
rollouts...
```

Extraction per source type:

| Source | Fields included | URL pattern |
|---|---|---|
| `SERVICES` (8) | title, blurb, lede, problem, capabilities, process, faqs | `/services/{slug}` |
| `INDUSTRIES` (4) | eyebrow, title, metaDescription, lede, problem, capabilities, process, faqs | `/industries/{slug}` |
| `LOCATIONS` (18) | name, region, intro, faq/faqs | `/industries/local-service/{slug}` |
| `OUTCOMES` (4) | title, lede, capabilities, faqs, **stats** (the real proof numbers) | `/outcomes/{slug}` |
| `CASE_STUDIES` (9 with `study`) | client, result, `study.dek`, `study.answer`, `study.metrics`, `study.takeaways` | `/work/{slug}` |

Case studies deliberately exclude the long narrative `body` paragraphs
(the marketing prose written for the page itself) — `dek` + `answer` +
`metrics` + `takeaways` already carry every sales-relevant fact concisely,
and skipping the prose keeps the corpus lean.

All HTML is stripped: `<a href="...">text</a>` becomes plain `text` (the
corpus is meant to be read as prose by the model, not parsed as markup);
other tags are removed outright.

Estimated corpus size after trimming: ~15–20K tokens. At Gemini 2.5 Flash
pricing this is sub-cent per request and has no meaningful latency impact.

### `app/api/chat/route.js` changes

- Import `CHAT_KNOWLEDGE` from `lib/chatKnowledge.js`.
- Append it to `systemInstruction`, after the existing `SYSTEM_PROMPT`,
  under a clearly delimited `GOBIYA KNOWLEDGE BASE:` header, so the model
  can distinguish "rules to follow" from "reference data to draw on."
- Extend the linking rule: the bot may link to **any** specific
  service/industry/outcome/case-study page named in the knowledge base
  when it's directly relevant to the conversation, using the existing
  `[text](/path)` format — not only the fixed five-link menu. The fixed
  menu (onboarding, contact, tools hub) remains as an always-available
  baseline, since those pages aren't part of the corpus.
- Add an explicit grounding rule: only state facts, numbers, or client
  names that appear in the knowledge base or the static company-facts
  block. If asked something outside that, say so honestly and point to
  `/contact` rather than guessing.

No changes to `components/AIChatBubble.js` — the client already renders
`[text](/path)` markdown links from any assistant response, so links to
new pages (e.g. `/work/smile-center-dentistry`) render correctly with no
frontend work needed.

## Error handling

No new failure modes. Corpus construction is synchronous, has no network
or file I/O (it operates on already-imported JS objects), and can't fail
at runtime — a malformed `lib/*.js` entry would be a build-time issue,
caught the same way it is today for the pages themselves.

## Testing

No existing automated test suite for the chat route. Verification plan:
run the dev server, open the live chat bubble, and manually check a
handful of representative questions:

1. "Do you work with dental practices?" → should surface SmileCenter.com's
   5x patient inquiry increase with a working `/work/smile-center-dentistry`
   link.
2. "What's your process for fixing a traffic drop?" → should reflect the
   real diagnose → remediate → cleanup → reconsideration steps from the
   `recovery` outcome, not a generic answer.
3. A question with no grounding (e.g. "do you do TV ads?") → should
   decline honestly rather than inventing a service, and point to
   `/contact`.
4. Confirm existing lead-capture flow (`[LEAD_DATA]` tag → Resend email)
   still fires correctly with the larger system prompt.

## Future: retrieval

If insights articles get added to scope, or the corpus otherwise grows
several times larger, full context-stuffing stops being the right choice.
At that point, add a lightweight keyword-scoring retrieval step (score
each document against the user's latest message by term overlap, inject
only the top ~5–8 matches) as a contained addition — `lib/chatKnowledge.js`
already returns discrete per-page documents internally before flattening
to a string, so this is a scoring function in front of the existing
extraction logic, not a rewrite.
