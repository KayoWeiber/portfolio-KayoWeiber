import type {
  CourseCertification,
  Education,
  Experience,
  PersonalProject,
  ResumeBuilderData,
  ResumeLanguage,
  ResumeLink,
} from "../types/resumeBuilder";

export const createId = () => crypto.randomUUID();

export const createExperience = (): Experience => ({
  id: createId(),
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  current: false,
  location: "",
  description: "",
  responsibilities: "",
  results: "",
  technologies: [],
});

export const createEducation = (): Education => ({
  id: createId(),
  institution: "",
  course: "",
  degreeType: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
});

export const createCourse = (): CourseCertification => ({
  id: createId(),
  name: "",
  institution: "",
  date: "",
  workload: "",
  credentialUrl: "",
});

export const createLanguage = (): ResumeLanguage => ({
  id: createId(),
  name: "",
  level: "intermediate",
});

export const createProject = (): PersonalProject => ({
  id: createId(),
  name: "",
  description: "",
  technologies: [],
  projectUrl: "",
  repositoryUrl: "",
});

export const createLink = (): ResumeLink => ({ id: createId(), label: "", url: "" });

export const createDefaultResume = (): ResumeBuilderData => ({
  version: 1,
  personal: {
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    links: [],
    photoDataUrl: "",
  },
  summary: "",
  experiences: [],
  education: [],
  courses: [],
  skills: [],
  languages: [],
  projects: [],
  settings: {
    template: "professional",
    includePhoto: true,
    photoSize: "medium",
    visibleSections: {
      summary: true,
      courses: true,
      languages: true,
      projects: true,
    },
  },
});
