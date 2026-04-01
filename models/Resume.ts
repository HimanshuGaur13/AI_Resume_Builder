import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    data: Object, // flexible JSON structure
    template: String,
  },
  { timestamps: true }
);

export default mongoose.models.Resume ||
  mongoose.model("Resume", ResumeSchema);