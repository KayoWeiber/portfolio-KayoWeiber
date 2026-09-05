import { useTranslation } from "react-i18next";
import type { ResumeBuilderData } from "../types/resumeBuilder";
import { measureResumeContent } from "../utils/content";

export const ContentIndicator = ({ data }: { data: ResumeBuilderData }) => {
  const { t } = useTranslation();
  const { level, percentage } = measureResumeContent(data);
  const colors = {
    comfortable: "bg-emerald-400",
    attention: "bg-amber-400",
    overflow: "bg-red-400",
  } as const;

  return (
    <div className="rounded-xl border border-slate-700/80 bg-slate-950/55 p-4">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-slate-200">{t("resumeBuilder.content.title")}</span>
        <span className={level === "comfortable" ? "text-emerald-300" : level === "attention" ? "text-amber-300" : "text-red-300"}>
          {t(`resumeBuilder.content.${level}`)}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full rounded-full transition-all duration-500 ${colors[level]}`} style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{t(`resumeBuilder.content.${level}Description`)}</p>
    </div>
  );
};
