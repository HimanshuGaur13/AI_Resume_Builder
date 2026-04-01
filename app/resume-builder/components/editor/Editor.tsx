"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import SkillsInput from "./SkillsInput";
import ExperienceSection from "./ExperienceSection";

/* ================= SECTION COMPONENT (OUTSIDE) ================= */
function Section({
  id,
  title,
  openSection,
  toggleSection,
  children,
}: {
  id: string;
  title: string;
  openSection: string;
  toggleSection: (id: string) => void;
  children: React.ReactNode;
}) {
  const isOpen = openSection === id;

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between px-4 py-3 bg-zinc-50 cursor-pointer hover:bg-zinc-100"
      >
        <span className="text-sm font-medium text-zinc-800">{title}</span>

        <span className="text-zinc-500 text-sm">{isOpen ? "−" : "+"}</span>
      </div>

      {/* Content */}
      {isOpen && <div className="p-4 space-y-3">{children}</div>}
    </div>
  );
}

/* ================= MAIN EDITOR ================= */
export default function Editor() {
  // ✅ FIX: use selectors (IMPORTANT)
  const data = useResumeStore((state) => state.data);
  const updateField = useResumeStore((state) => state.updateField);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryNotice, setSummaryNotice] = useState("");
  const [openSection, setOpenSection] = useState<string>("personal");
  const [enhanceNotice, setEnhanceNotice] = useState("");
  const [enhancing, setEnhancing] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [skillsNotice, setSkillsNotice] = useState("");
  const [loadingATS, setLoadingATS] = useState(false);
  const [atsResult, setATSResult] = useState<any>(null);
  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? "" : section));
  };
  
  const handleImproveSummary = async () => {
    if (loadingSummary) return;

    try {
      if (!data.summary?.trim()) {
        setSummaryNotice("Add a summary first, then try AI improve.");
        return;
      }

      setSummaryNotice("");
      setLoadingSummary(true);

      const res = await fetch("/api/ai/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.summary,
          type: "professional summary",
        }),
      });

      const result = await res.json();

      if (result.success) {
        updateField("summary", result.data);
        setSummaryNotice("✨ Summary improved successfully.");
      } else {
        setSummaryNotice(
          result.message || "Unable to improve summary right now.",
        );
      }
    } catch (error) {
      console.error("AI Summary Error:", error);
      setSummaryNotice("Something went wrong while improving the summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

 const handleEnhanceResume = async () => {
  if (enhancing) return;

  try {
    if (!data.summary && !data.experience?.length) {
      setEnhanceNotice("Add some data before using Enhance.");
      return;
    }

    setEnhancing(true);
    setEnhanceNotice("");

    const res = await fetch("/api/ai/enhance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success && result.data) {
      const updates = result.data;

      // ✅ SMART MERGE
      (Object.keys(updates) as (keyof typeof data)[]).forEach((key) => {
        const newValue = updates[key];
        const currentValue = data[key];

        // 🔥 STRING (summary)
        if (typeof newValue === "string") {
          updateField(key, newValue);
        }

        // 🔥 ARRAY (skills)
        else if (Array.isArray(newValue) && key === "skills") {
          const merged = Array.from(
            new Set([...(currentValue || []), ...newValue])
          );
          updateField(key, merged);
        }

        // 🔥 EXPERIENCE (merge descriptions only)
        else if (key === "experience" && Array.isArray(newValue)) {
        const currentExp = (currentValue || []) as typeof data.experience;

        const merged = currentExp.map((exp: any, i: number) => ({
          ...exp,
          description: newValue[i]?.description || exp.description,
        }));

        updateField("experience", merged);
      }
      });

      setEnhanceNotice("⚡ Smart enhancement applied!");
    } else {
      setEnhanceNotice("No improvements found.");
    }
  } catch (error) {
    console.error(error);
    setEnhanceNotice("Enhancement failed.");
  } finally {
    setEnhancing(false);
  }
};
  const handleImproveSkills = async () => {
    if (loadingSkills) return;

    try {
      if (!data.skills || data.skills.length === 0) {
        setSkillsNotice("Add some skills first.");
        return;
      }

      setSkillsNotice("");
      setLoadingSkills(true);

      const res = await fetch("/api/ai/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: data.skills,
        }),
      });

      const result = await res.json();

      if (result.success) {
        const updatedSkills = result.data
          .split(",")
          .map((s: string) => s.trim());

        updateField("skills", updatedSkills);

        setSkillsNotice("💡 Skills improved!");
      } else {
        setSkillsNotice("Failed to improve skills.");
      }
    } catch (error) {
      console.error(error);
      setSkillsNotice("Something went wrong.");
    } finally {
      setLoadingSkills(false);
    }
  };
  const handleATSCheck = async () => {
    if (loadingATS) return;

    try {
      setLoadingATS(true);

      const res = await fetch("/api/ai/ats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setATSResult(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingATS(false);
    }
  };
  return (
    <div className="p-5 space-y-5">
      {/* HEADER */}
      <div className="mb-2">
        <h2 className="text-base font-semibold tracking-tight">
          Resume Editor
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Fill in your details to build your resume
        </p>
      </div>

      {/* ================= PERSONAL ================= */}
      <Section
        id="personal"
        title="Personal Information"
        openSection={openSection}
        toggleSection={toggleSection}
      >
        <input
          className="input"
          placeholder="Full Name"
          value={data.name || ""}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <input
          className="input"
          placeholder="Role"
          value={data.role || ""}
          onChange={(e) => updateField("role", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            className="input"
            placeholder="Email"
            value={data.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <input
            className="input"
            placeholder="Phone"
            value={data.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        <input
          className="input"
          placeholder="Location"
          value={data.location || ""}
          onChange={(e) => updateField("location", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            className="input"
            placeholder="LinkedIn"
            value={data.linkedin || ""}
            onChange={(e) => updateField("linkedin", e.target.value)}
          />

          <input
            className="input"
            placeholder="Portfolio"
            value={data.portfolio || ""}
            onChange={(e) => updateField("portfolio", e.target.value)}
          />
        </div>
      </Section>

      {/* ================= SUMMARY ================= */}
      <Section
        id="summary"
        title="Summary"
        openSection={openSection}
        toggleSection={toggleSection}
      >
        <textarea
          className="input min-h-[110px]"
          placeholder="Write your summary..."
          value={data.summary || ""}
          onChange={(e) => updateField("summary", e.target.value)}
        />

        {/* ✅ AI BUTTON */}
        <div className="flex justify-end mt-2">
          <button
            onClick={handleImproveSummary}
            disabled={loadingSummary}
            className="inline-flex items-center gap-2 text-xs bg-black text-white px-3 py-1 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingSummary && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/40 border-t-white" />
            )}
            {loadingSummary ? "Improving..." : "✨ Improve with AI"}
          </button>
        </div>

        {summaryNotice && (
          <p className="text-xs text-zinc-500 mt-2">{summaryNotice}</p>
        )}
      </Section>

      {/* ================= SKILLS ================= */}
      <Section
        id="skills"
        title="Skills"
        openSection={openSection}
        toggleSection={toggleSection}
      >
        <SkillsInput />
      </Section>

      {/* ================= EXPERIENCE ================= */}
      <Section
        id="experience"
        title="Experience"
        openSection={openSection}
        toggleSection={toggleSection}
      >
        <ExperienceSection />
      </Section>

      {/* ================= AI ================= */}
      <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4 shadow-sm space-y-4">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">AI Assistant</h3>
        </div>

        {/* BUTTON GRID */}
        <div className="grid grid-cols-2 gap-2">
          {/* SUMMARY */}
          <button
            onClick={handleImproveSummary}
            disabled={loadingSummary}
            className="btn flex items-center justify-center gap-2"
          >
            {loadingSummary && <span className="loader" />}
            {loadingSummary ? "Improving..." : "✨ Summary"}
          </button>

          {/* ENHANCE */}
          <button
            onClick={handleEnhanceResume}
            disabled={enhancing}
            className="btn flex items-center justify-center gap-2"
          >
            {enhancing && <span className="loader" />}
            {enhancing ? "Enhancing..." : "⚡ Enhance"}
          </button>

          {/* SKILLS */}
          <button
            onClick={handleImproveSkills}
            disabled={loadingSkills}
            className="btn flex items-center justify-center gap-2"
          >
            {loadingSkills && <span className="loader" />}
            {loadingSkills ? "Improving..." : "💡 Skills"}
          </button>

          {/* ATS */}
          <button
            onClick={handleATSCheck}
            disabled={loadingATS}
            className="btn flex items-center justify-center gap-2"
          >
            {loadingATS && <span className="loader" />}
            {loadingATS ? "Checking..." : "🎯 ATS"}
          </button>
        </div>

        {/* NOTICES */}
        {(summaryNotice || enhanceNotice || skillsNotice) && (
          <div className="text-xs text-zinc-500 space-y-1">
            {summaryNotice && <p>{summaryNotice}</p>}
            {enhanceNotice && <p>{enhanceNotice}</p>}
            {skillsNotice && <p>{skillsNotice}</p>}
          </div>
        )}

        {/* ATS RESULT (SEPARATE BLOCK) */}
        {atsResult && (
          <div className="p-3 border rounded-lg bg-white space-y-3">
            {/* SCORE */}
            <p
              className={`text-sm font-bold ${
                atsResult.score > 80
                  ? "text-green-600"
                  : atsResult.score > 60
                    ? "text-yellow-600"
                    : "text-red-600"
              }`}
            >
              ATS Score: {atsResult.score}/100
            </p>

            {/* KEYWORDS */}
            <div>
              <p className="text-xs font-medium">Missing Keywords:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {atsResult.missingKeywords.map((k: string, i: number) => (
                  <span
                    key={i}
                    className="text-[10px] bg-zinc-100 px-2 py-1 rounded"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* SUGGESTIONS */}
            <div>
              <p className="text-xs font-medium">Suggestions:</p>
              <ul className="text-xs list-disc ml-4">
                {atsResult.suggestions.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* JOB DESCRIPTION */}
        <textarea className="input" placeholder="Paste job description..." />

        <button className="btn-primary w-full">Optimize for Job</button>
      </div>
    </div>
  );
}
