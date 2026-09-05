export type ResumeTemplateId = "professional" | "modern" | "minimal";
export type PhotoSize = "small" | "medium" | "large";
export type OptionalSection = "summary" | "courses" | "languages" | "projects";

export interface ResumeLink {
  id: string;
  label: string;
  url: string;
}

export interface PersonalInformation {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  links: ResumeLink[];
  photoDataUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  responsibilities: string;
  results: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  course: string;
  degreeType: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface CourseCertification {
  id: string;
  name: string;
  institution: string;
  date: string;
  workload: string;
  credentialUrl: string;
}

export interface ResumeLanguage {
  id: string;
  name: string;
  level: "basic" | "intermediate" | "advanced" | "fluent" | "native";
}

export interface PersonalProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  projectUrl: string;
  repositoryUrl: string;
}

export interface ResumeSettings {
  template: ResumeTemplateId;
  includePhoto: boolean;
  photoSize: PhotoSize;
  visibleSections: Record<OptionalSection, boolean>;
}

export interface ResumeBuilderData {
  version: 1;
  personal: PersonalInformation;
  summary: string;
  experiences: Experience[];
  education: Education[];
  courses: CourseCertification[];
  skills: string[];
  languages: ResumeLanguage[];
  projects: PersonalProject[];
  settings: ResumeSettings;
}

export type ResumeListKey = "experiences" | "education" | "courses" | "languages" | "projects";

export interface ResumeDocumentLabels {
  contact: string;
  summary: string;
  experience: string;
  education: string;
  courses: string;
  skills: string;
  languages: string;
  projects: string;
  current: string;
  present: string;
  responsibilities: string;
  results: string;
  technologies: string;
  languageLevels: Record<ResumeLanguage["level"], string>;
}
