import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * 🚀 Gemini Init
 */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * 🔥 Simple in-memory cache
 */
const cache = new Map<string, any>();

function getCache(key: string) {
  return cache.get(key);
}

function setCache(key: string, value: any) {
  cache.set(key, value);
}

/**
 * ⏱ Retry wrapper for rate limit (429)
 */
async function generateWithRetry(model: any, prompt: string) {
  try {
    return await model.generateContent(prompt);
  } catch (error: any) {
    if (error?.status === 429) {
      console.warn("⚠️ Rate limited. Retrying in 60s...");
      await new Promise((res) => setTimeout(res, 60000));
      return await model.generateContent(prompt);
    }
    throw error;
  }
}

/**
 * 🧠 Main AI function
 */
export async function improveText(input: string, type?: string) {
  /**
   * 🔑 Cache Key
   */
  const cacheKey = `${type}-${input}`;

  const cached = getCache(cacheKey);
  if (cached) return cached;

  /**
   * 💡 Use cheaper + stable model
   */
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // 🔥 better for free tier
  });

  let prompt = input;

  /**
   * ✅ SKILLS (LOW TOKEN)
   */
  if (type === "skills") {
    prompt = `
Expand these resume skills.

Rules:
- Comma-separated only
- No explanation
- No duplicates
- Keep concise

Skills:
${input.slice(0, 300)}
`;
  }

  /**
   * ✅ ATS (MINIMAL DATA)
   */
  else if (type === "ats") {
    prompt = `
Analyze resume for ATS.

Return JSON ONLY:

{
  "score": number,
  "missingKeywords": [],
  "suggestions": []
}

Resume:
${input.slice(0, 1000)}
`;
  }

  /**
   * ✅ GENERAL IMPROVE (SHORT)
   */
  else if (type) {
    prompt = `
Improve this ${type} for resume.

Rules:
- Final text only
- No explanation
- Max 2–3 lines
- Strong tone

Text:
${input.slice(0, 500)}
`;
  }

  /**
   * 🚀 CALL AI (WITH RETRY)
   */
  const result = await generateWithRetry(model, prompt);
  const response = await result.response;

  let text = response.text();

  /**
   * 🧹 CLEAN OUTPUT
   */
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\*\*/g, "")
    .replace(/^>\s?/gm, "")
    .replace(/\n+/g, " ")
    .trim();

  /**
   * ✅ ATS SAFE PARSE
   */
  if (type === "ats") {
    try {
      const parsed = JSON.parse(text);
      setCache(cacheKey, parsed);
      return parsed;
    } catch {
      const fallback = {
        score: 70,
        missingKeywords: [],
        suggestions: ["Could not analyze properly"],
      };
      setCache(cacheKey, fallback);
      return fallback;
    }
  }

  /**
   * 💾 CACHE RESULT
   */
  setCache(cacheKey, text);

  return text;
}