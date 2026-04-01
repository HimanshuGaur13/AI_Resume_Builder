"use client";

import { ResumeData } from "@/types/resume";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white w-[794px] min-h-[1123px] p-8 text-gray-900 shadow">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="text-blue-600 text-sm">{data.role}</p>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold border-b pb-1">Summary</h2>
          <p className="mt-2 text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold border-b pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-100 border px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold border-b pb-1">
            Experience
          </h2>

          <div className="mt-3 space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <p className="font-semibold">
                  {exp.role}{" "}
                  <span className="text-gray-600">
                    - {exp.company}
                  </span>
                </p>

                <p className="text-xs text-gray-500">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>

                <p className="text-sm mt-1 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}