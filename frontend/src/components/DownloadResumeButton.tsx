import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFilePdf } from "react-icons/fa";
import { useResumeData } from "../hooks/useResumeData";

type DownloadState = "idle" | "generating" | "error";

const DownloadResumeButton = () => {
  const { t } = useTranslation();
  const resumeData = useResumeData();
  const [state, setState] = useState<DownloadState>("idle");

  const handleDownload = async () => {
    setState("generating");

    try {
      const { generateResumePdf } = await import("../utils/generateResumePdf");
      await generateResumePdf(resumeData);
      setState("idle");
    } catch (error) {
      console.error("Resume PDF generation failed:", error);
      setState("error");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleDownload}
        disabled={state === "generating"}
        className={`group relative isolate inline-flex h-11 cursor-pointer items-center overflow-hidden rounded-lg border border-slate-400/30 bg-white/[0.04] p-1.5 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur-sm transition-[width,transform,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-sky-300/[0.08] hover:text-white hover:shadow-lg hover:shadow-sky-950/30 focus:outline-none focus:ring-2 focus:ring-sky-300/70 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-65 ${
          state === "generating"
            ? "w-56"
            : "w-11 hover:w-56 focus-visible:w-56"
        }`}
        aria-describedby={state === "error" ? "resume-download-error" : undefined}
        aria-busy={state === "generating"}
        aria-label={state === "generating" ? t("resume.generating") : t("resume.download")}
        title={state === "generating" ? t("resume.generating") : t("resume.download")}
      >
        <span
          className="absolute inset-0 -z-10 translate-x-[-105%] bg-gradient-to-r from-transparent via-sky-300/10 to-transparent transition-transform duration-700 group-hover:translate-x-[105%]"
          aria-hidden="true"
        />
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sky-300/10 text-sky-300 ring-1 ring-inset ring-sky-300/15 transition-all duration-300 group-hover:bg-sky-300/15 group-hover:text-sky-200">
          {state === "generating" ? (
            <span
              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-sky-200/30 border-t-sky-200"
              aria-hidden="true"
            />
          ) : (
            <FaFilePdf
              className="transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          )}
        </span>
        <span
          className={`flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap transition-[max-width,margin,opacity] duration-300 ease-out ${
            state === "generating"
              ? "ml-2.5 max-w-44 opacity-100"
              : "max-w-0 opacity-0 group-hover:ml-2.5 group-hover:max-w-44 group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-44 group-focus-visible:opacity-100"
          }`}
          aria-hidden="true"
        >
          <span>{state === "generating" ? t("resume.generating") : t("resume.download")}</span>
          <span className="rounded border border-slate-500/40 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:border-sky-300/30 group-hover:text-sky-200">
            PDF
          </span>
        </span>
      </button>
      {state === "error" && (
        <p id="resume-download-error" className="mt-2 text-sm text-red-300" role="alert">
          {t("resume.error")}
        </p>
      )}
    </div>
  );
};

export default DownloadResumeButton;
