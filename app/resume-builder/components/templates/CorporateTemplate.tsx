"use client";

import { ResumeData } from "@/types/resume";

export default function CorporateTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white w-[794px] min-h-[1123px] p-10 font-serif text-gray-900 shadow">

      {/* HEADER */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          {data.name}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{data.role}</p>
      </div>

      {/* SUMMARY */}
      {data.summary && (
        <div className="mt-6">
          <h2 className="text-md font-bold text-blue-700 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-800">
            {data.summary}
          </p>
        </div>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-md font-bold text-blue-700 uppercase tracking-wide">
            Core Skills
          </h2>

          <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {data.skills.map((skill, i) => (
              <p key={i} className="before:content-['•'] before:mr-2">
                {skill}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-md font-bold text-blue-700 uppercase tracking-wide">
            Professional Experience
          </h2>

          <div className="mt-3 space-y-5">
            {data.experience.map((exp, i) => (
              <div key={i}>
                
                {/* ROLE + COMPANY */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">
                    {exp.role} — {exp.company}
                  </p>

                  <p className="text-xs text-gray-500">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm mt-1 leading-relaxed text-gray-800">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION (if exists) */}
      {/* {data.education?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-md font-bold text-blue-700 uppercase tracking-wide">
            Education
          </h2>

          <div className="mt-3 space-y-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <p className="font-semibold text-sm">
                  {edu.degree} — {edu.institution}
                </p>
                <p className="text-xs text-gray-500">
                  {edu.startDate} - {edu.endDate || ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}