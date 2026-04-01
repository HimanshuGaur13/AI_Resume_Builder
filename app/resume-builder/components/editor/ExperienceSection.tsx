"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export default function ExperienceSection() {
  const { data, updateField } = useResumeStore();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const addExperience = () => {
    const newExp = {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    updateField("experience", [...(data.experience || []), newExp]);
  };

  const updateExperience = (
    index: number,
    key: string,
    value: string
  ) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [key]: value };
    updateField("experience", updated);
  };

  const removeExperience = (index: number) => {
    const updated = data.experience.filter((_, i) => i !== index);
    updateField("experience", updated);
  };

  // ✅ AI FUNCTION (FIXED)
  const handleAIImprove = async (index: number) => {
    try {
      setLoadingIndex(index);

      const text = data.experience[index].description;

      if (!text) return;

      const res = await fetch("/api/ai/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          type: "experience description",
        }),
      });

      const result = await res.json();

      if (result.success) {
        updateExperience(index, "description", result.data);
      }
    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* LIST */}
      {data.experience?.map((exp, index) => (
        <div
          key={index}
          className="border border-zinc-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-zinc-800">
              Experience {index + 1}
            </h4>

            <button
              onClick={() => removeExperience(index)}
              className="text-xs text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>

          {/* ROLE + COMPANY */}
          <div className="grid grid-cols-2 gap-2">
            <input
              className="input"
              placeholder="Role"
              value={exp.role}
              onChange={(e) =>
                updateExperience(index, "role", e.target.value)
              }
            />

            <input
              className="input"
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                updateExperience(index, "company", e.target.value)
              }
            />
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input
              className="input"
              type="month"
              value={exp.startDate}
              onChange={(e) =>
                updateExperience(index, "startDate", e.target.value)
              }
            />

            <input
              className="input"
              type="month"
              value={exp.endDate}
              onChange={(e) =>
                updateExperience(index, "endDate", e.target.value)
              }
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            className="input mt-2 min-h-[90px]"
            placeholder="Describe your responsibilities..."
            value={exp.description}
            onChange={(e) =>
              updateExperience(index, "description", e.target.value)
            }
          />

          {/* ✅ AI BUTTON (CORRECT PLACE) */}
          <div className="mt-2 flex justify-end">
            <button
              onClick={() => handleAIImprove(index)}
              disabled={loadingIndex === index}
              className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-zinc-800 disabled:opacity-50"
            >
              {loadingIndex === index ? "Improving..." : "✨ Improve with AI"}
            </button>
          </div>
        </div>
      ))}

      {/* ADD BUTTON */}
      <button
        onClick={addExperience}
        className="w-full border border-dashed border-zinc-300 rounded-xl py-3 text-sm text-zinc-600 hover:bg-zinc-100 hover:border-zinc-400 transition"
      >
        + Add Experience
      </button>
    </div>
  );
}