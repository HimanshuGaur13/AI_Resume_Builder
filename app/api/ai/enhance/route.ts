import { NextResponse } from "next/server";
import { improveText } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const minimalData = {
  summary: data.summary,
  skills: data.skills,
  experience: data.experience?.map((e: any) => ({
    role: e.role,
    description: e.description,
  })),
};

    const prompt = `
Improve this resume.

STRICT RULES:
- Return ONLY JSON
- Only include fields that NEED improvement
- Do NOT rewrite everything
- Keep structure same

FORMAT:
{
  "summary": "...",
  "skills": ["..."],
  "experience": [...]
}

Resume:
${JSON.stringify(minimalData)}
`;

    const result = await improveText(prompt);

    let parsed;

    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = {};
    }

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
