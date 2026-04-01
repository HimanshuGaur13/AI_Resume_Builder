import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function GET() {
  await connectDB();

  const resume = await Resume.findOne({ userId: "demo-user" });

  if (resume) {
    return Response.json({
      data: resume.data,
      template: resume.template,
    });
  }

  // fallback default
  return Response.json({
    data: {
      name: "",
      role: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      skills: [],
      experience: [],
      education: [],
    },
    template: "modern",
  });
}