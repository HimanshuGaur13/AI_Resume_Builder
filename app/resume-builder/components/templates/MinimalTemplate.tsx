"use client";

import { ResumeData } from "@/types/resume";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white w-[794px] min-h-[1123px] p-12 text-gray-800">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-medium tracking-tight">
          {data.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{data.role}</p>
      </div>

      {/* SUMMARY */}
      {data.summary && (
        <div className="mt-8">
          <p className="text-sm leading-relaxed text-gray-700">
            {data.summary}
          </p>
        </div>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Skills
          </h2>

          <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-700">
            {data.skills.map((skill, i) => (
              <span key={i}>
                {skill}
                {i !== data.skills.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Experience
          </h2>

          <div className="mt-4 space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                
                {/* ROLE */}
                <p className="text-sm font-medium">
                  {exp.role}
                </p>

                {/* COMPANY + DATE */}
                <p className="text-xs text-gray-500">
                  {exp.company} · {exp.startDate} — {exp.endDate || "Present"}
                </p>

                {/* DESCRIPTION */}
                <p className="text-sm mt-1 text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {/* {data.education?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Education
          </h2>

          <div className="mt-4 space-y-4">
            {data.education.map((edu, i) => (
              <div key={i}>
                <p className="text-sm font-medium">
                  {edu.degree}
                </p>
                <p className="text-xs text-gray-500">
                  {edu.institution} · {edu.startDate} — {edu.endDate || ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}