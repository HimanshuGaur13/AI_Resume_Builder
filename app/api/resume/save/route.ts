import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { data, template, resumeId } = await req.json();

    // ✅ UPDATE
    if (resumeId) {
      const updated = await Resume.findByIdAndUpdate(
        resumeId,
        { data, template },
        { new: true }
      );

      return Response.json({
        success: true,
        type: "updated",
        resume: updated,
      });
    }

    // ✅ CREATE
    const newResume = await Resume.create({
      userId: "demo-user",
      data,
      template,
      title: "Resume " + new Date().toLocaleString(),
    });

    return Response.json({
      success: true,
      type: "created",
      resume: newResume,
    });
  } catch (error) {
    return Response.json({ success: false });
  }
}
export async function GET() {
  try {
    await connectDB();

    const resumes = await Resume.find({ userId: "demo-user" })
      .sort({ createdAt: -1 });

    return Response.json({ success: true, resumes });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}