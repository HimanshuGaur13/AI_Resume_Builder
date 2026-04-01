import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await ctx.params;

    if (!id) {
      return Response.json({ success: false, resume: null }, { status: 400 });
    }

    const resume = await Resume.findById(id);

    return Response.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Error fetching resume by id:", error);
    return Response.json({ success: false, resume: null }, { status: 500 });
  }
}
