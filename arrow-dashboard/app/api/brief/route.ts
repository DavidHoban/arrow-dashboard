import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const store = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const prompt = `You are a sales coach for Arrow Supplements, a Vancouver-based supplement company. Their only product is Magnesium Bisglycinate (180 capsules, 160mg elemental magnesium, MSRP $35, wholesale $20.83). Their key differentiator: every bottle has an NFC tag that links to 3rd-party batch test results â full transparency that no other supplement brand offers.

Generate a pre-call brief in exactly 3 sentences:
1. Who this buyer is and what they care about most
2. The best opening hook for this specific store type
3. What to reference from past contact to build momentum

Store details:
- Name: ${store.name}
- Type: ${store.type}
- Contact: ${store.contactName || 'Unknown'}
- Stage: ${store.stage}
- Last contacted: ${store.lastContacted || 'Never'}
- Notes: ${store.notes || 'None'}
- Units ordered so far: ${store.unitsOrdered || 0}

Be direct and specific. No fluff. Each sentence must be immediately usable on a call.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ brief: data.content[0].text });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate brief' }, { status: 500 });
  }
}
