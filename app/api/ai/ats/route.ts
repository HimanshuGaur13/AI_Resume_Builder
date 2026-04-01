import { NextResponse } from "next/server";
import { improveText } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const prompt = `
Analyze the following resume and give ATS score.

STRICT RULES:
- Return ONLY JSON
- No explanation outside JSON

Format:
{
  "score": number,
  "missingKeywords": [],
  "suggestions": []
}

Resume:
${JSON.stringify(data)}
`;

    const result = await improveText(JSON.stringify(data), "ats");

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
