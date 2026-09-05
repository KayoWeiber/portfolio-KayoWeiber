import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { ResumeSectionProps } from "./sections/sectionTypes";
import { PersonalSection } from "./sections/PersonalSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { SkillsLanguagesSection } from "./sections/SkillsLanguagesSection";
import { CoursesProjectsSection } from "./sections/CoursesProjectsSection";
import { SettingsSection } from "./sections/SettingsSection";

const steps = ["personal", "experience", "education", "skills", "extras", "settings"] as const;
export type BuilderStep = (typeof steps)[number];

interface BuilderFormProps extends ResumeSectionProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export const BuilderForm = ({ data, setData, currentStep, onStepChange }: BuilderFormProps) => {
  const { t } = useTranslation();
  const sections = [
    <PersonalSection data={data} setData={setData} />,
    <ExperienceSection data={data} setData={setData} />,
    <EducationSection data={data} setData={setData} />,
    <SkillsLanguagesSection data={data} setData={setData} />,
    <CoursesProjectsSection data={data} setData={setData} />,
    <SettingsSection data={data} setData={setData} />,
  ];

  return (
    <div>
      <nav className="mb-8 overflow-x-auto pb-2" aria-label={t("resumeBuilder.steps.label")}>
        <ol className="flex min-w-max gap-2">
          {steps.map((step, index) => (
            <li key={step}>
              <button type="button" onClick={() => onStepChange(index)} aria-current={currentStep === index ? "step" : undefined} className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${currentStep === index ? "border-sky-300 bg-sky-400 text-slate-950" : index < currentStep ? "border-sky-500/30 bg-sky-400/10 text-sky-200" : "border-slate-700 text-slate-400 hover:text-white"}`}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10">{index + 1}</span>{t(`resumeBuilder.steps.${step}`)}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <div key={steps[currentStep]}>{sections[currentStep]}</div>
      <div className="mt-9 flex items-center justify-between border-t border-slate-800 pt-6">
        <button type="button" onClick={() => onStepChange(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:invisible"><FaArrowLeft />{t("resumeBuilder.actions.previous")}</button>
        {currentStep < steps.length - 1 && <button type="button" onClick={() => onStepChange(currentStep + 1)} className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-sky-300">{t("resumeBuilder.actions.next")}<FaArrowRight /></button>}
      </div>
    </div>
  );
};
