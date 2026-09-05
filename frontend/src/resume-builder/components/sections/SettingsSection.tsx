import { useTranslation } from "react-i18next";
import { resumeTemplates } from "../../templates/templateRegistry";
import type { OptionalSection, PhotoSize } from "../../types/resumeBuilder";
import { SectionIntro } from "../FormControls";
import { ContentIndicator } from "../ContentIndicator";
import type { ResumeSectionProps } from "./sectionTypes";

export const SettingsSection = ({ data, setData }: ResumeSectionProps) => {
  const { t } = useTranslation();
  const updateSettings = (patch: Partial<typeof data.settings>) => setData((current) => ({ ...current, settings: { ...current.settings, ...patch } }));
  const optionalSections: OptionalSection[] = ["summary", "courses", "languages", "projects"];

  return (
    <div>
      <SectionIntro title={t("resumeBuilder.settings.title")} description={t("resumeBuilder.settings.description")} />
      <div className="grid gap-4 sm:grid-cols-3">
        {resumeTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => updateSettings({ template: template.id })}
            aria-pressed={data.settings.template === template.id}
            className={`rounded-xl border p-4 text-left transition ${data.settings.template === template.id ? "border-sky-300 bg-sky-400/10 ring-2 ring-sky-400/15" : "border-slate-700 bg-slate-900/50 hover:border-slate-500"}`}
          >
            <span className="mb-4 block h-1.5 w-12 rounded-full" style={{ backgroundColor: template.accent }} />
            <span className="block font-bold text-white">{t(template.nameKey)}</span>
            <span className="mt-2 block text-xs leading-5 text-slate-400">{t(template.descriptionKey)}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 border-t border-slate-800 pt-7 sm:grid-cols-2">
        <div>
          <h3 className="font-bold text-white">{t("resumeBuilder.settings.photo")}</h3>
          <label className="mt-4 flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={data.settings.includePhoto} onChange={(event) => updateSettings({ includePhoto: event.target.checked })} className="h-4 w-4 accent-sky-400" />{t("resumeBuilder.settings.includePhoto")}</label>
          <div className="mt-4 flex gap-2">
            {(["small", "medium", "large"] as PhotoSize[]).map((size) => <button key={size} type="button" onClick={() => updateSettings({ photoSize: size })} className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${data.settings.photoSize === size ? "border-sky-300 bg-sky-400/15 text-sky-100" : "border-slate-700 text-slate-400 hover:text-white"}`}>{t(`resumeBuilder.photoSizes.${size}`)}</button>)}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">{t("resumeBuilder.settings.sections")}</h3>
          <div className="mt-4 space-y-3">
            {optionalSections.map((section) => <label key={section} className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={data.settings.visibleSections[section]} onChange={(event) => updateSettings({ visibleSections: { ...data.settings.visibleSections, [section]: event.target.checked } })} className="h-4 w-4 accent-sky-400" />{t(`resumeBuilder.documentSections.${section}`)}</label>)}
          </div>
        </div>
      </div>
      <div className="mt-8"><ContentIndicator data={data} /></div>
    </div>
  );
};
