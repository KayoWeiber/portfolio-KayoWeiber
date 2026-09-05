import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { createEducation } from "../../data/defaultResume";
import type { Education } from "../../types/resumeBuilder";
import { EditorCard } from "../EditorCard";
import { Field, SectionIntro, TextArea, TextInput } from "../FormControls";
import { moveItem, type ResumeSectionProps } from "./sectionTypes";

export const EducationSection = ({ data, setData }: ResumeSectionProps) => {
  const { t } = useTranslation();
  const update = (id: string, patch: Partial<Education>) => setData((current) => ({
    ...current,
    education: current.education.map((item) => item.id === id ? { ...item, ...patch } : item),
  }));

  return (
    <div>
      <SectionIntro title={t("resumeBuilder.education.title")} description={t("resumeBuilder.education.description")} />
      <div className="space-y-5">
        {data.education.length === 0 && <p className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">{t("resumeBuilder.education.empty")}</p>}
        {data.education.map((education, index) => (
          <EditorCard key={education.id} title={education.course || t("resumeBuilder.education.item", { number: index + 1 })} index={index} total={data.education.length} onMove={(direction) => setData((current) => ({ ...current, education: moveItem(current.education, index, direction) }))} onRemove={() => setData((current) => ({ ...current, education: current.education.filter((item) => item.id !== education.id) }))}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("resumeBuilder.fields.institution")}><TextInput value={education.institution} onChange={(event) => update(education.id, { institution: event.target.value })} placeholder={t("resumeBuilder.placeholders.institution")} /></Field>
              <Field label={t("resumeBuilder.fields.course")}><TextInput value={education.course} onChange={(event) => update(education.id, { course: event.target.value })} placeholder={t("resumeBuilder.placeholders.course")} /></Field>
              <Field label={t("resumeBuilder.fields.degreeType")}><TextInput value={education.degreeType} onChange={(event) => update(education.id, { degreeType: event.target.value })} placeholder={t("resumeBuilder.placeholders.degreeType")} /></Field>
              <div />
              <Field label={t("resumeBuilder.fields.startDate")}><TextInput type="month" value={education.startDate} onChange={(event) => update(education.id, { startDate: event.target.value })} /></Field>
              <Field label={t("resumeBuilder.fields.endDate")}><TextInput type="month" value={education.endDate} disabled={education.current} onChange={(event) => update(education.id, { endDate: event.target.value })} /></Field>
            </div>
            <label className="mt-5 flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={education.current} onChange={(event) => update(education.id, { current: event.target.checked, endDate: event.target.checked ? "" : education.endDate })} className="h-4 w-4 accent-sky-400" />{t("resumeBuilder.fields.currentEducation")}</label>
            <div className="mt-5"><Field label={t("resumeBuilder.fields.optionalDescription")}><TextArea maxLength={600} value={education.description} onChange={(event) => update(education.id, { description: event.target.value })} placeholder={t("resumeBuilder.placeholders.educationDescription")} /></Field></div>
          </EditorCard>
        ))}
      </div>
      <button type="button" onClick={() => setData((current) => ({ ...current, education: [...current.education, createEducation()] }))} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-bold text-sky-200 transition hover:bg-sky-400/20"><FaPlus />{t("resumeBuilder.actions.addEducation")}</button>
    </div>
  );
};
