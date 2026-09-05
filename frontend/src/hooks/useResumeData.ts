import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { contactInfo } from "../data/contactLinks";
import { profileInfo } from "../data/profile";
import { technologies } from "../data/technologies";
import type { Course, CourseCategory } from "../types/course";
import type { Project } from "../types/project";
import type { ResumeData } from "../types/resume";
import type { TimelineMilestone } from "../types/timeline";
import { BIRTH_DATE, calculateAge } from "../utils/calculateAge";

const compactText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  const shortened = text.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const cutAt = lastSpace > maxLength * 0.7 ? lastSpace : shortened.length;
  return `${shortened.slice(0, cutAt).trim()}…`;
};

const removeTranslationMarkup = (text: string) => text.replace(/<\/?\d+>/g, "");

const selectDiverseCourses = (courses: Course[], limit: number) => {
  const selected: Course[] = [];
  const categories = new Set<CourseCategory>();

  courses.forEach((course) => {
    if (selected.length < limit && !categories.has(course.category)) {
      selected.push(course);
      categories.add(course.category);
    }
  });

  courses.forEach((course) => {
    if (selected.length < limit && !selected.includes(course)) selected.push(course);
  });

  return selected;
};

export const useResumeData = (): ResumeData => {
  const { t } = useTranslation();

  return useMemo(() => {
    const translatedMilestones = t("timeline.milestones", {
      returnObjects: true,
    }) as TimelineMilestone[];
    const translatedProjects = t("portfolio.projects", {
      returnObjects: true,
    }) as Project[];
    const translatedCourses = t("coursesPage.list", {
      returnObjects: true,
    }) as Course[];

    const milestones = Array.isArray(translatedMilestones) ? translatedMilestones : [];
    const projects = Array.isArray(translatedProjects) ? translatedProjects : [];
    const courses = Array.isArray(translatedCourses) ? translatedCourses : [];
    const location = milestones.find(
      (milestone) => milestone.type === "work" && milestone.location
    )?.location;
    const avatarUrl = new URL(
      profileInfo.avatarPath.replace(/^\//, ""),
      `${window.location.origin}${import.meta.env.BASE_URL}`
    ).href;

    const toResumeEntry = (milestone: TimelineMilestone, index: number) => ({
      title: milestone.title,
      organization: milestone.organization,
      period: milestone.period,
      description: compactText(milestone.description, index === 0 ? 230 : 155),
    });

    return {
      profile: {
        name: t("hero.name"),
        role: t("hero.role"),
        avatarUrl,
        summary: compactText(
          removeTranslationMarkup(t("About.p1", { age: calculateAge(BIRTH_DATE) })),
          260
        ),
        location,
      },
      contacts: [
        {
          label: t("contact.emailLabel"),
          value: contactInfo.email,
          href: `mailto:${contactInfo.email}`,
        },
        {
          label: t("contact.linkedinLabel"),
          value: contactInfo.linkedinHandle,
          href: contactInfo.linkedinUrl,
        },
        {
          label: t("contact.githubLabel"),
          value: contactInfo.githubHandle,
          href: contactInfo.githubUrl,
        },
        {
          label: t("resume.website"),
          value: profileInfo.websiteLabel,
          href: profileInfo.websiteUrl,
        },
      ],
      experience: milestones
        .filter((milestone) => milestone.type === "work")
        .slice(0, 3)
        .map(toResumeEntry),
      education: milestones
        .filter((milestone) => milestone.type === "education")
        .slice(0, 2)
        .map((milestone, index) => ({
          ...toResumeEntry(milestone, index),
          description: compactText(milestone.description, 115),
        })),
      skills: technologies.slice(0, 14).map((technology) => technology.name),
      projects: projects.slice(0, 2).map((project) => ({
        title: project.title,
        description: compactText(project.description, 125),
        technologies: project.technologies?.slice(0, 5) ?? [],
        href: project.demoLink || project.sourceLink || project.link,
      })),
      courses: selectDiverseCourses(courses, 4).map((course) =>
        compactText(course.title, 62)
      ),
      labels: {
        profile: t("resume.sections.profile"),
        contacts: t("resume.sections.contacts"),
        experience: t("resume.sections.experience"),
        education: t("resume.sections.education"),
        skills: t("resume.sections.skills"),
        projects: t("resume.sections.projects"),
        courses: t("resume.sections.courses"),
        location: t("resume.location"),
      },
    };
  }, [t]);
};
