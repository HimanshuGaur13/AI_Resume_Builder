import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function GET() {
  try {
    await connectDB();

    const resumes = await Resume.find({ userId: "demo-user" })
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      resumes: [],
    });
  }
}