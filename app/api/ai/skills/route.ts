import { NextResponse } from "next/server";
import { improveText } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { skills } = await req.json();

    const prompt = `
Expand and improve the following resume skills.

STRICT RULES:
- Return ONLY a comma-separated list
- No explanation
- No bullet points
- Add relevant modern skills

Skills:
${skills.join(", ")}
`;

    const improved = await improveText(prompt, "skills");

    return NextResponse.json({
      success: true,
      data: improved,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}