import { NextResponse } from "next/server";
import { improveText } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json();

    const improved = await improveText(text, type);

    return NextResponse.json({ success: true, data: improved });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "AI error" },
      { status: 500 }
    );
  }
}