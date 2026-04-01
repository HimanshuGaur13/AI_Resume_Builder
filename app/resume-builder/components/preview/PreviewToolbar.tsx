"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";

export default function PreviewToolbar() {
  const {
    template,
    setTemplate,
    data,
    resumeId,
    setResumeId,
  } = useResumeStore();

  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const templates = ["modern", "corporate", "minimal"];

  const handleSave = async () => {
    try {
      setSaving(true);
      setSuccess(false);

      const res = await axios.post("/api/resume/save", {
        data,
        template,
        userId: "demo-user",
        resumeId, // 🔥 important for update
      });

      // ✅ If new resume created → store ID
      if (res.data.type === "created") {
        setResumeId(res.data.resume._id);
      }

      setSaving(false);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Save error:", err);
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">

      {/* LEFT: Title + Templates */}
      <div className="flex items-center gap-4">
        
        {/* Title */}
        <h2 className="text-sm font-semibold text-zinc-800">
          Resume Builder
        </h2>

        {/* Template Tabs */}
        <div className="flex gap-1 bg-zinc-100 p-1 rounded-md">
          {templates.map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`px-3 py-1 text-xs rounded-md capitalize transition ${
                template === t
                  ? "bg-white shadow text-blue-600 font-medium"
                  : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3">

        {/* History Button */}
        <button
          onClick={() => router.push("/resume-history")}
          className="px-3 py-1 text-xs rounded-md bg-zinc-100 hover:bg-zinc-200"
        >
          History
        </button>

        {/* Status */}
        {saving && (
          <span className="text-xs text-zinc-500 animate-pulse">
            Saving...
          </span>
        )}

        {success && (
          <span className="text-xs text-green-600">
            Saved ✓
          </span>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-4 py-2 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          {resumeId ? "Update Resume" : "Save Resume"}
        </button>

      </div>
    </div>
  );
}