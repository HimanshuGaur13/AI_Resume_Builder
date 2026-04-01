"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export default function SkillsInput() {
  const { data, updateField } = useResumeStore();
  const [input, setInput] = useState("");

  const addSkill = () => {
    if (!input.trim()) return;

    const updatedSkills = [...(data.skills || []), input.trim()];
    updateField("skills", updatedSkills);
    setInput("");
  };

  const removeSkill = (index: number) => {
    const updatedSkills = data.skills.filter((_, i) => i !== index);
    updateField("skills", updatedSkills);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-700 mb-2">
        Skills
      </h3>

      {/* Input */}
      <div className="flex gap-2">
        <input
          className="border border-zinc-300 rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a skill (e.g. React)"
        />
        <button
          onClick={addSkill}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm rounded-md"
        >
          Add
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {data.skills?.map((skill, i) => (
          <span
            key={i}
            className="bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full text-xs flex items-center gap-2 hover:bg-zinc-200"
          >
            {skill}
            <button
              onClick={() => removeSkill(i)}
              className="text-zinc-500 hover:text-red-500"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}