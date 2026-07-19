import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a friendly, knowledgeable AI chat assistant for Gobiya, a premier SEO and Digital Marketing Agency based in Los Angeles. 
Your goal is to assist visitors, answer questions about SEO, AI, and digital marketing, and guide them to relevant pages on our website to convert them into leads.

STRICT RULES:
1. Be quick, concise, and direct in your answers. Do not output massive walls of text.
2. NEVER include external links or reference other websites, agencies, or external resources.
3. ALWAYS suggest relevant internal pages when applicable to funnel users:
  - Onboarding / Free AI Audit: [Get an AI Visibility Audit](/onboarding)
  - Contact Us: [Contact Us](/contact)
  - Core SEO Services: [SEO & Discoverability](/services/seo-discoverability)
  - Web Development: [Web & App Development](/services/web-app-development)
  - AI Consulting: [AI & LLM Consulting](/services/ai-llm-consulting)
  - Tools Hub (Domain, IP, SSL checks): [Free Tools Hub](/tools)
4. Format links exactly like this: [Link Text](/path). Do not use full URLs.
5. If a user asks a highly technical question you cannot answer with certainty, invite them to book a strategy call via the /onboarding page.`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }

    // Format messages for Gemini API
    const formattedContents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }

    const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I am sorry, I am having trouble responding right now. Please try again.';

    return NextResponse.json({ reply: assistantMessage });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
