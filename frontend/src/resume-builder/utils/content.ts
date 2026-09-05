import type { ResumeBuilderData } from "../types/resumeBuilder";

export type ContentLevel = "comfortable" | "attention" | "overflow";

export const measureResumeContent = (data: ResumeBuilderData) => {
  const visible = data.settings.visibleSections;
  const characters =
    (visible.summary ? data.summary.length : 0) +
    data.experiences.reduce(
      (total, item) => total + item.description.length + item.responsibilities.length + item.results.length,
      0
    ) +
    data.education.reduce((total, item) => total + item.description.length, 0) +
    (visible.projects
      ? data.projects.reduce((total, item) => total + item.description.length, 0)
      : 0);

  const score =
    characters / 700 +
    data.experiences.length * 1.1 +
    data.education.length * 0.65 +
    (visible.courses ? data.courses.length * 0.38 : 0) +
    (visible.languages ? data.languages.length * 0.25 : 0) +
    (visible.projects ? data.projects.length * 0.65 : 0) +
    data.skills.length * 0.08;

  const level: ContentLevel = score > 9 ? "overflow" : score > 6.5 ? "attention" : "comfortable";
  return { level, percentage: Math.min(100, Math.round((score / 9) * 100)) };
};

export const validateResume = (data: ResumeBuilderData) => ({
  fullName: data.personal.fullName.trim().length > 1,
  professionalTitle: data.personal.professionalTitle.trim().length > 1,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email),
});
