import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDownload, FaFilePdf } from "react-icons/fa";
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
        className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-300/70 px-5 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-300/10 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-wait disabled:opacity-70 cursor-pointer"
        aria-describedby={state === "error" ? "resume-download-error" : undefined}
      >
        {state === "generating" ? <FaFilePdf className="animate-pulse" /> : <FaDownload />}
        {state === "generating" ? t("resume.generating") : t("resume.download")}
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
