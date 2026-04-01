"use client";

import { templates } from "./templates";
import { ResumeData } from "@/types/resume";

export default function ResumeThumbnail({
  data,
  template,
}: {
  data: ResumeData;
  template: string;
}) {
  const SelectedTemplate =
    templates[template as keyof typeof templates];

  if (!SelectedTemplate) return null;

  return (
    <div className="w-full h-[200px] overflow-hidden border rounded-md bg-white">
      <div className="scale-[0.25] origin-top-left">
        <SelectedTemplate data={data} />
      </div>
    </div>
  );
}