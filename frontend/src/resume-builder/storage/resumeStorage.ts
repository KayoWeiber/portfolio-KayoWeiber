import { createDefaultResume } from "../data/defaultResume";
import type { ResumeBuilderData } from "../types/resumeBuilder";

export const RESUME_STORAGE_KEY = "portfolio:visitor-resume:v1";

export const loadResume = (): ResumeBuilderData => {
  try {
    const stored = localStorage.getItem(RESUME_STORAGE_KEY);
    if (!stored) return createDefaultResume();

    const parsed = JSON.parse(stored) as Partial<ResumeBuilderData>;
    if (parsed.version !== 1 || !parsed.personal || !parsed.settings) {
      return createDefaultResume();
    }

    const defaults = createDefaultResume();
    return {
      ...defaults,
      ...parsed,
      personal: { ...defaults.personal, ...parsed.personal },
      settings: {
        ...defaults.settings,
        ...parsed.settings,
        visibleSections: {
          ...defaults.settings.visibleSections,
          ...parsed.settings.visibleSections,
        },
      },
      experiences: Array.isArray(parsed.experiences) ? parsed.experiences : [],
      education: Array.isArray(parsed.education) ? parsed.education : [],
      courses: Array.isArray(parsed.courses) ? parsed.courses : [],
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      languages: Array.isArray(parsed.languages) ? parsed.languages : [],
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
    };
  } catch {
    return createDefaultResume();
  }
};

export const saveResume = (data: ResumeBuilderData) => {
  localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(data));
};

export const removeStoredResume = () => localStorage.removeItem(RESUME_STORAGE_KEY);
