import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SYSTEM_PROMPT = `You are a friendly, knowledgeable AI chat assistant for Gobiya, a premier SEO and Digital Marketing Agency based in Los Angeles. 
Your goal is to assist visitors, answer questions about SEO, AI, and digital marketing, and convert them into leads.

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
5. LEAD CAPTURE INSTRUCTION (CRITICAL):
   - If a user expresses interest in our services, wants a quote, or wants to talk to a human, casually ask for their Name and Email address.
   - Once they have provided BOTH their name and their email address, you MUST append this exact data tag to the VERY END of your response:
     [LEAD_DATA] name="their name" email="their email"
   - Example response from you: "Thanks John! Our team will reach out to john@example.com shortly to discuss your SEO needs. [LEAD_DATA] name="John" email="john@example.com""
`;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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

    // Gemini requires the conversation history to start with a 'user' message.
    // Our frontend injects a hardcoded 'model' greeting at the start, so we must remove it.
    if (formattedContents.length > 0 && formattedContents[0].role === 'model') {
      formattedContents.shift();
    }

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

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response as JSON. Raw response:', responseText);
      return NextResponse.json({
        error: 'Failed to parse Gemini response',
        rawResponse: responseText,
        status: response.status
      }, { status: 500 });
    }

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return NextResponse.json({ 
        error: 'Failed to generate response', 
        details: data,
        status: response.status
      }, { status: 500 });
    }

    let assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I am sorry, I am having trouble responding right now. Please try again.';

    // Intercept and process Lead Data
    const leadMatch = assistantMessage.match(/\[LEAD_DATA\]\s+name="([^"]+)"\s+email="([^"]+)"/i);
    
    if (leadMatch) {
      const name = leadMatch[1];
      const email = leadMatch[2];

      // Strip the tag so the user doesn't see it
      assistantMessage = assistantMessage.replace(/\[LEAD_DATA\].*/i, '').trim();

      // Send lead to CRM via Resend
      const html = `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;">
          <h1 style="font-size:18px;font-weight:600;color:#2b2b2b;margin-bottom:4px;">New AI Chat Assistant Lead</h1>
          <p style="font-size:13px;color:#8a8a8a;margin-bottom:20px;">Captured automatically by Gobiya AI Assistant</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;vertical-align:top;">Name</td>
              <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#2b2b2b;font-size:14px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;vertical-align:top;">Email</td>
              <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#2b2b2b;font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#e41613;">${escapeHtml(email)}</a></td>
            </tr>
          </table>
          <p style="font-size:13px;color:#8a8a8a;margin-top:20px;">Review the chat window for the full context of their request.</p>
        </div>`;

      // Fail silently for the user, but log it on the server if email fails
      try {
        await resend.emails.send({
          from: process.env.ONBOARDING_FROM_EMAIL || 'Gobiya AI Lead <onboarding@gobiya.com>',
          to: 'banmart@gmail.com',
          replyTo: email,
          subject: `New Chat Lead — ${name}`,
          html,
        });
      } catch (emailErr) {
        console.error('Failed to send AI Lead email:', emailErr);
      }
    }

    return NextResponse.json({ reply: assistantMessage });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
