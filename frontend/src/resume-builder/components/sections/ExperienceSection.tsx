import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { createExperience } from "../../data/defaultResume";
import type { Experience } from "../../types/resumeBuilder";
import { EditorCard } from "../EditorCard";
import { Field, SectionIntro, TextArea, TextInput } from "../FormControls";
import { TagInput } from "../TagInput";
import { moveItem, type ResumeSectionProps } from "./sectionTypes";

export const ExperienceSection = ({ data, setData }: ResumeSectionProps) => {
  const { t } = useTranslation();
  const update = (id: string, patch: Partial<Experience>) =>
    setData((current) => ({
      ...current,
      experiences: current.experiences.map((item) => item.id === id ? { ...item, ...patch } : item),
    }));

  return (
    <div>
      <SectionIntro title={t("resumeBuilder.experience.title")} description={t("resumeBuilder.experience.description")} />
      <div className="space-y-5">
        {data.experiences.length === 0 && <p className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">{t("resumeBuilder.experience.empty")}</p>}
        {data.experiences.map((experience, index) => (
          <EditorCard
            key={experience.id}
            title={experience.role || t("resumeBuilder.experience.item", { number: index + 1 })}
            index={index}
            total={data.experiences.length}
            onMove={(direction) => setData((current) => ({ ...current, experiences: moveItem(current.experiences, index, direction) }))}
            onRemove={() => setData((current) => ({ ...current, experiences: current.experiences.filter((item) => item.id !== experience.id) }))}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("resumeBuilder.fields.company")}><TextInput value={experience.company} onChange={(event) => update(experience.id, { company: event.target.value })} placeholder={t("resumeBuilder.placeholders.company")} /></Field>
              <Field label={t("resumeBuilder.fields.role")}><TextInput value={experience.role} onChange={(event) => update(experience.id, { role: event.target.value })} placeholder={t("resumeBuilder.placeholders.role")} /></Field>
              <Field label={t("resumeBuilder.fields.startDate")}><TextInput type="month" value={experience.startDate} onChange={(event) => update(experience.id, { startDate: event.target.value })} /></Field>
              <Field label={t("resumeBuilder.fields.endDate")}><TextInput type="month" value={experience.endDate} disabled={experience.current} onChange={(event) => update(experience.id, { endDate: event.target.value })} /></Field>
              <Field label={t("resumeBuilder.fields.location")}><TextInput value={experience.location} onChange={(event) => update(experience.id, { location: event.target.value })} placeholder={t("resumeBuilder.placeholders.location")} /></Field>
              <label className="flex items-center gap-3 self-end rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
                <input type="checkbox" checked={experience.current} onChange={(event) => update(experience.id, { current: event.target.checked, endDate: event.target.checked ? "" : experience.endDate })} className="h-4 w-4 accent-sky-400" />
                {t("resumeBuilder.fields.currentJob")}
              </label>
            </div>
            <div className="mt-5 space-y-5">
              <Field label={t("resumeBuilder.fields.description")}><TextArea maxLength={800} value={experience.description} onChange={(event) => update(experience.id, { description: event.target.value })} placeholder={t("resumeBuilder.placeholders.experienceDescription")} /></Field>
              <Field label={t("resumeBuilder.fields.responsibilities")} hint={t("resumeBuilder.hints.separateLines")}><TextArea maxLength={800} value={experience.responsibilities} onChange={(event) => update(experience.id, { responsibilities: event.target.value })} placeholder={t("resumeBuilder.placeholders.responsibilities")} /></Field>
              <Field label={t("resumeBuilder.fields.results")} hint={t("resumeBuilder.hints.separateLines")}><TextArea maxLength={800} value={experience.results} onChange={(event) => update(experience.id, { results: event.target.value })} placeholder={t("resumeBuilder.placeholders.results")} /></Field>
              <Field label={t("resumeBuilder.fields.technologies")}><TagInput values={experience.technologies} onChange={(technologies) => update(experience.id, { technologies })} placeholder={t("resumeBuilder.placeholders.skill")} /></Field>
            </div>
          </EditorCard>
        ))}
      </div>
      <button type="button" onClick={() => setData((current) => ({ ...current, experiences: [...current.experiences, createExperience()] }))} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-bold text-sky-200 transition hover:bg-sky-400/20">
        <FaPlus aria-hidden="true" /> {t("resumeBuilder.actions.addExperience")}
      </button>
    </div>
  );
};
