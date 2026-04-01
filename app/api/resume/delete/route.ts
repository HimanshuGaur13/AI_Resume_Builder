import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Resume.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}