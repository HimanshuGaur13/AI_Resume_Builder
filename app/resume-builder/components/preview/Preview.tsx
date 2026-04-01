"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { templates } from "../templates";

export default function Preview() {
  const { data, template } = useResumeStore();
  const SelectedTemplate = templates[template as keyof typeof templates];

  return (
    <div className="flex justify-center w-full py-6 bg-zinc-100">

      {/* A4 Paper */}
      <div className="bg-white w-[794px] min-h-[1123px] shadow-xl rounded-md border border-zinc-200 overflow-hidden">

        {/* Inner padding */}
        <div className="p-8">
          {SelectedTemplate && <SelectedTemplate data={data} />}
        </div>

      </div>
    </div>
  );
}