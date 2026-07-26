const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scorePostingLegitimacy(posting, retries = 3) {
  const prompt = `You are screening an internship posting for legitimacy red flags. Analyze this posting and respond with ONLY a JSON object, no other text, no markdown formatting.

Posting details:
Title: ${posting.title}
Company: ${posting.company}
Description: ${posting.description}
Stipend: ${posting.stipend || 'not specified'}
Location: ${posting.location}

Check specifically for these red flags:
- No verifiable company presence (vague or unknown company name)
- Requests for upfront payment, registration fees, or deposits
- Vague or extremely short job description
- Unrealistic stipend promises relative to the role described
- Urgency/pressure language ("apply now", "limited slots", "DM for details")

Respond with exactly this JSON structure:
{"score": <number 0-100, where 100 is completely trustworthy and 0 is clearly a scam>, "reason": "<one sentence explaining the score>"}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2 },
        }),
      });

      if (response.status === 429) {
        const waitTime = attempt * 8000;
        console.warn(`Rate limited (429). Waiting ${waitTime / 1000}s before retry ${attempt}/${retries}...`);
        await delay(waitTime);
        continue;
      }

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Gemini API responded with status ${response.status}: ${errBody}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      const cleanedText = rawText.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanedText);

      if (typeof parsed.score !== 'number' || typeof parsed.reason !== 'string') {
        throw new Error('Unexpected response shape from AI');
      }

      return { score: Math.round(parsed.score), reason: parsed.reason };
    } catch (err) {
      console.error(`AI scoring attempt ${attempt} failed:`, err.message);
      if (attempt === retries) {
        return { score: null, reason: 'Pending review — automatic scoring unavailable' };
      }
    }
  }

  return { score: null, reason: 'Pending review — automatic scoring unavailable' };
}

module.exports = { scorePostingLegitimacy };