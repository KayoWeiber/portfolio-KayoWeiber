import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { createCourse, createProject } from "../../data/defaultResume";
import type { CourseCertification, PersonalProject } from "../../types/resumeBuilder";
import { EditorCard } from "../EditorCard";
import { Field, SectionIntro, TextArea, TextInput } from "../FormControls";
import { TagInput } from "../TagInput";
import { moveItem, type ResumeSectionProps } from "./sectionTypes";

export const CoursesProjectsSection = ({ data, setData }: ResumeSectionProps) => {
  const { t } = useTranslation();
  const updateCourse = (id: string, patch: Partial<CourseCertification>) => setData((current) => ({ ...current, courses: current.courses.map((item) => item.id === id ? { ...item, ...patch } : item) }));
  const updateProject = (id: string, patch: Partial<PersonalProject>) => setData((current) => ({ ...current, projects: current.projects.map((item) => item.id === id ? { ...item, ...patch } : item) }));

  return (
    <div>
      <SectionIntro title={t("resumeBuilder.courses.title")} description={t("resumeBuilder.courses.description")} />
      <div className="space-y-5">
        {data.courses.map((course, index) => (
          <EditorCard key={course.id} title={course.name || t("resumeBuilder.courses.item", { number: index + 1 })} index={index} total={data.courses.length} onMove={(direction) => setData((current) => ({ ...current, courses: moveItem(current.courses, index, direction) }))} onRemove={() => setData((current) => ({ ...current, courses: current.courses.filter((item) => item.id !== course.id) }))}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("resumeBuilder.fields.certificationName")}><TextInput value={course.name} onChange={(event) => updateCourse(course.id, { name: event.target.value })} placeholder={t("resumeBuilder.placeholders.certificationName")} /></Field>
              <Field label={t("resumeBuilder.fields.institution")}><TextInput value={course.institution} onChange={(event) => updateCourse(course.id, { institution: event.target.value })} placeholder={t("resumeBuilder.placeholders.institution")} /></Field>
              <Field label={t("resumeBuilder.fields.date")}><TextInput type="month" value={course.date} onChange={(event) => updateCourse(course.id, { date: event.target.value })} /></Field>
              <Field label={t("resumeBuilder.fields.workload")}><TextInput value={course.workload} onChange={(event) => updateCourse(course.id, { workload: event.target.value })} placeholder={t("resumeBuilder.placeholders.workload")} /></Field>
              <div className="sm:col-span-2"><Field label={t("resumeBuilder.fields.credentialUrl")}><TextInput type="url" value={course.credentialUrl} onChange={(event) => updateCourse(course.id, { credentialUrl: event.target.value })} placeholder="https://" /></Field></div>
            </div>
          </EditorCard>
        ))}
      </div>
      <button type="button" onClick={() => setData((current) => ({ ...current, courses: [...current.courses, createCourse()] }))} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-bold text-sky-200 transition hover:bg-sky-400/20"><FaPlus />{t("resumeBuilder.actions.addCourse")}</button>

      <div className="mt-10 border-t border-slate-800 pt-8">
        <SectionIntro title={t("resumeBuilder.projects.title")} description={t("resumeBuilder.projects.description")} />
        <div className="space-y-5">
          {data.projects.map((project, index) => (
            <EditorCard key={project.id} title={project.name || t("resumeBuilder.projects.item", { number: index + 1 })} index={index} total={data.projects.length} onMove={(direction) => setData((current) => ({ ...current, projects: moveItem(current.projects, index, direction) }))} onRemove={() => setData((current) => ({ ...current, projects: current.projects.filter((item) => item.id !== project.id) }))}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("resumeBuilder.fields.projectName")}><TextInput value={project.name} onChange={(event) => updateProject(project.id, { name: event.target.value })} placeholder={t("resumeBuilder.placeholders.projectName")} /></Field>
                <Field label={t("resumeBuilder.fields.projectUrl")}><TextInput type="url" value={project.projectUrl} onChange={(event) => updateProject(project.id, { projectUrl: event.target.value })} placeholder="https://" /></Field>
                <div className="sm:col-span-2"><Field label={t("resumeBuilder.fields.repositoryUrl")}><TextInput type="url" value={project.repositoryUrl} onChange={(event) => updateProject(project.id, { repositoryUrl: event.target.value })} placeholder="https://github.com/" /></Field></div>
                <div className="sm:col-span-2"><Field label={t("resumeBuilder.fields.description")}><TextArea maxLength={700} value={project.description} onChange={(event) => updateProject(project.id, { description: event.target.value })} placeholder={t("resumeBuilder.placeholders.projectDescription")} /></Field></div>
                <div className="sm:col-span-2"><Field label={t("resumeBuilder.fields.technologies")}><TagInput values={project.technologies} onChange={(technologies) => updateProject(project.id, { technologies })} placeholder={t("resumeBuilder.placeholders.skill")} /></Field></div>
              </div>
            </EditorCard>
          ))}
        </div>
        <button type="button" onClick={() => setData((current) => ({ ...current, projects: [...current.projects, createProject()] }))} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-bold text-sky-200 transition hover:bg-sky-400/20"><FaPlus />{t("resumeBuilder.actions.addProject")}</button>
      </div>
    </div>
  );
};
