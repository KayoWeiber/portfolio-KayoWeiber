import { FaPlus, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { createLanguage } from "../../data/defaultResume";
import type { ResumeLanguage } from "../../types/resumeBuilder";
import { Field, SectionIntro, TextInput } from "../FormControls";
import { TagInput } from "../TagInput";
import type { ResumeSectionProps } from "./sectionTypes";

export const SkillsLanguagesSection = ({ data, setData }: ResumeSectionProps) => {
  const { t } = useTranslation();
  const updateLanguage = (id: string, patch: Partial<ResumeLanguage>) => setData((current) => ({
    ...current,
    languages: current.languages.map((item) => item.id === id ? { ...item, ...patch } : item),
  }));

  return (
    <div>
      <SectionIntro title={t("resumeBuilder.skills.title")} description={t("resumeBuilder.skills.description")} />
      <Field label={t("resumeBuilder.fields.skills")} hint={t("resumeBuilder.skills.hint")}>
        <TagInput values={data.skills} onChange={(skills) => setData((current) => ({ ...current, skills }))} placeholder={t("resumeBuilder.placeholders.skill")} />
      </Field>
      <div className="mt-9 border-t border-slate-800 pt-7">
        <div className="mb-5 flex items-center justify-between">
          <div><h3 className="text-xl font-bold text-white">{t("resumeBuilder.languages.title")}</h3><p className="mt-1 text-sm text-slate-400">{t("resumeBuilder.languages.description")}</p></div>
          <button type="button" onClick={() => setData((current) => ({ ...current, languages: [...current.languages, createLanguage()] }))} className="inline-flex items-center gap-2 text-sm font-bold text-sky-300 hover:text-sky-200"><FaPlus />{t("resumeBuilder.actions.addLanguage")}</button>
        </div>
        <div className="space-y-3">
          {data.languages.map((language) => (
            <div key={language.id} className="grid grid-cols-[1fr_1fr_auto] gap-3 rounded-lg border border-slate-700 bg-slate-900/50 p-3">
              <TextInput value={language.name} onChange={(event) => updateLanguage(language.id, { name: event.target.value })} placeholder={t("resumeBuilder.placeholders.language")} />
              <select value={language.level} onChange={(event) => updateLanguage(language.id, { level: event.target.value as ResumeLanguage["level"] })} className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 text-sm text-white outline-none focus:border-sky-400">
                {(["basic", "intermediate", "advanced", "fluent", "native"] as const).map((level) => <option key={level} value={level}>{t(`resumeBuilder.languageLevels.${level}`)}</option>)}
              </select>
              <button type="button" onClick={() => setData((current) => ({ ...current, languages: current.languages.filter((item) => item.id !== language.id) }))} className="px-2 text-slate-400 hover:text-red-300" aria-label={t("resumeBuilder.actions.remove")}><FaTrash /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
