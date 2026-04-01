import { create } from "zustand";
import { ResumeData } from "@/types/resume";

interface ResumeStore {
  data: ResumeData;
  template: string;
  resumeId: string | null;

  setData: (data: ResumeData) => void;
  setTemplate: (template: string) => void;
  setResumeId: (id: string | null) => void;

  updateField: <K extends keyof ResumeData>(
    key: K,
    value: ResumeData[K]
  ) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  data: {} as ResumeData,
  template: "modern",
  resumeId: null,

  setData: (data) => set({ data }),
  setTemplate: (template) => set({ template }),
  setResumeId: (id) => set({ resumeId: id }),

updateField: (key, value) =>
  set((state) => ({
    data: {
      ...state.data,
      [key]: value,
    },
  })),
}));