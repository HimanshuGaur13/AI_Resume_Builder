"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ResumeThumbnail from "../resume-builder/components/ResumeThumbnail";

export default function ResumeHistory() {
  const [resumes, setResumes] = useState<any[]>([]);
  const router = useRouter();

  const fetchResumes = async () => {
    try {
      const res = await axios.get("/api/resume/list");
      setResumes(res.data.resumes || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // ✅ FIXED
  const loadResume = (resume: any) => {
    router.push(`/resume-builder?id=${resume._id}`);
  };

  const deleteResume = async (id: string) => {
    await axios.post("/api/resume/delete", { id });
    fetchResumes();
  };

  const renameResume = async (id: string) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;

    await axios.post("/api/resume/rename", {
      id,
      title: newName,
    });

    fetchResumes();
  };

  const duplicateResume = async (id: string) => {
    await axios.post("/api/resume/duplicate", { id });
    fetchResumes();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl text-blue-600  font-semibold">Your Resumes</h1>
            <p className="text-sm text-blue-500 mt-1">
              Manage, edit and organize your resumes
            </p>
          </div>

          <button
            onClick={() => router.push("/resume-builder")}
            className="btn-primary"
          >
            + New Resume
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
            >
              <div
                onClick={() => loadResume(resume)}
                className="cursor-pointer"
              >
                <ResumeThumbnail
                  data={resume.data}
                  template={resume.template}
                />
              </div>

              <h2 className="mt-3 font-semibold text-sm text-green-800">
                {resume.title}
              </h2>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => loadResume(resume)}
                  className="btn text-blue-500"
                >
                  Open
                </button>

                <button
                  onClick={() => deleteResume(resume._id)}
                  className="btn text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}