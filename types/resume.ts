export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate?: string;
}

export interface ResumeData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;

  summary: string;

  skills: string[];

  experience: Experience[];

  education: Education[];

  certifications?: string[];

  languages?: string[];
}