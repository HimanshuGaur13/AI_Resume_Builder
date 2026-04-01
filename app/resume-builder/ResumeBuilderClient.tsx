"use client";

import { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import Editor from "./components/editor/Editor";
import Preview from "./components/preview/Preview";
import PreviewToolbar from "./components/preview/PreviewToolbar";

import { useResumeStore } from "@/store/useResumeStore";

export default function ResumeBuilder() {
  const searchParams = useSearchParams();

  const { setData, setTemplate, setResumeId } = useResumeStore();

  useEffect(() => {
    const loadResume = async () => {
      const id = searchParams.get("id");
      console.log("Loading resume with ID:", id);

      // ✅ EDIT MODE (OPEN FROM HISTORY)
      if (id) {
        try {
          const res = await axios.get(`/api/resume/${id}`);
          const resume = res.data.resume;
          console.log("Fetched resume in component:", res);

          if (!resume) return;

          setData(resume.data);
          setTemplate(resume.template || "modern");
          setResumeId(resume._id);

          return;
        } catch (err) {
          console.error("Error loading resume:", err);
        }
      }

      // ✅ NEW RESUME MODE
      setResumeId(null);

      setData({
        name: "",
        role: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        portfolio: "",
        summary: "",
        skills: [],
        experience: [],
        education: [],
        certifications: [],
        languages: [],
      });

      setTemplate("modern");
    };

    loadResume();
  }, [searchParams]);

  return (
    <div className="h-screen flex bg-[#f4f6f8] text-zinc-900">

      {/* LEFT PANEL */}
      <div className="w-[420px] flex flex-col border-r bg-white">
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <h1 className="text-sm font-semibold">
            Resume Editor
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Editor />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col">

        <div className="h-14 border-b bg-white">
          <PreviewToolbar />
        </div>

        <div className="flex-1 overflow-auto flex justify-center py-6 bg-[#f4f6f8]">
          <Preview />
        </div>
      </div>
    </div>
  );
}