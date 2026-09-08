import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaDownload, FaEye, FaPen, FaShieldAlt, FaTrash } from "react-icons/fa";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { BuilderForm } from "../components/BuilderForm";
import { ContentIndicator } from "../components/ContentIndicator";
import { ResumePreview } from "../components/ResumePreview";
import { useResumeBuilder } from "../hooks/useResumeBuilder";
import type { ResumeDocumentLabels } from "../types/resumeBuilder";
import { downloadVisitorResume } from "../utils/downloadResume";
import { validateResume } from "../utils/content";

type MobileView = "form" | "preview";
type DownloadStatus = "idle" | "generating" | "error";

const ResumeBuilderPage = () => {
  const { t, i18n } = useTranslation();
  const { data, setData, saveStatus, clearResume } = useResumeBuilder();
  const [previewData, setPreviewData] = useState(data);
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileView, setMobileView] = useState<MobileView>("form");
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>("idle");
  const [showValidation, setShowValidation] = useState(false);
  const locale = i18n.resolvedLanguage || "pt-BR";

  useDocumentMeta(t("resumeBuilder.metaTitle"), t("resumeBuilder.metaDescription"));

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setPreviewData(data), 350);
    return () => window.clearTimeout(timeoutId);
  }, [data]);

  const labels = useMemo<ResumeDocumentLabels>(() => ({
    contact: t("resumeBuilder.documentSections.contact"),
    summary: t("resumeBuilder.documentSections.summary"),
    experience: t("resumeBuilder.documentSections.experience"),
    education: t("resumeBuilder.documentSections.education"),
    courses: t("resumeBuilder.documentSections.courses"),
    skills: t("resumeBuilder.documentSections.skills"),
    languages: t("resumeBuilder.documentSections.languages"),
    projects: t("resumeBuilder.documentSections.projects"),
    current: t("resumeBuilder.document.current"),
    present: t("resumeBuilder.document.present"),
    responsibilities: t("resumeBuilder.document.responsibilities"),
    results: t("resumeBuilder.document.results"),
    technologies: t("resumeBuilder.document.technologies"),
    languageLevels: {
      basic: t("resumeBuilder.languageLevels.basic"),
      intermediate: t("resumeBuilder.languageLevels.intermediate"),
      advanced: t("resumeBuilder.languageLevels.advanced"),
      fluent: t("resumeBuilder.languageLevels.fluent"),
      native: t("resumeBuilder.languageLevels.native"),
    },
  }), [t]);

  const handleDownload = async () => {
    const validation = validateResume(data);
    if (!validation.fullName || !validation.professionalTitle || !validation.email) {
      setShowValidation(true);
      setCurrentStep(0);
      setMobileView("form");
      return;
    }

    setDownloadStatus("generating");
    try {
      await downloadVisitorResume(data, labels, locale);
      setDownloadStatus("idle");
    } catch (error) {
      console.error("Visitor resume generation failed:", error);
      setDownloadStatus("error");
    }
  };

  const handleClear = () => {
    if (window.confirm(t("resumeBuilder.clearConfirmation"))) {
      clearResume();
      setCurrentStep(0);
      setMobileView("form");
      setShowValidation(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-x-clip bg-[#07111f] px-3 py-6 text-white sm:px-6 sm:py-10 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.15),transparent_28rem),linear-gradient(180deg,#07111f_0%,#0f172a_100%)]" />
      <div className="relative mx-auto min-w-0 max-w-[1600px]">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-5 sm:mb-8">
          <div className="min-w-0">
            <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-sky-300"><FaArrowLeft />{t("resumeBuilder.backHome")}</Link>
            <span className="block text-sm font-bold uppercase tracking-[0.22em] text-sky-300">{t("resumeBuilder.eyebrow")}</span>
            <h1 className="mt-2 break-words text-3xl font-extrabold sm:text-4xl lg:text-5xl">{t("resumeBuilder.title")}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">{t("resumeBuilder.description")}</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <span className={`rounded-full border px-3 py-2 text-xs font-semibold ${saveStatus === "error" ? "border-red-400/30 text-red-300" : saveStatus === "saving" ? "border-amber-400/30 text-amber-300" : "border-emerald-400/30 text-emerald-300"}`} role="status">{t(`resumeBuilder.saveStatus.${saveStatus}`)}</span>
            <button type="button" onClick={handleClear} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-400 transition hover:border-red-400/40 hover:text-red-300"><FaTrash />{t("resumeBuilder.actions.clear")}</button>
          </div>
        </div>

        <div className="sticky top-20 z-20 mb-5 flex rounded-xl border border-slate-700 bg-slate-950/95 p-1 shadow-lg backdrop-blur lg:hidden">
          <button type="button" onClick={() => setMobileView("form")} className={`flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-sm font-bold transition ${mobileView === "form" ? "bg-sky-500 text-slate-950" : "text-slate-400"}`}><FaPen />{t("resumeBuilder.mobile.form")}</button>
          <button type="button" onClick={() => setMobileView("preview")} className={`flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-sm font-bold transition ${mobileView === "preview" ? "bg-sky-500 text-slate-950" : "text-slate-400"}`}><FaEye />{t("resumeBuilder.mobile.preview")}</button>
        </div>

        {showValidation && (
          <div className="mb-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100" role="alert">{t("resumeBuilder.validation.required")}</div>
        )}

        <div className="grid min-w-0 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.82fr)]">
          <div className={`${mobileView === "preview" ? "hidden" : "block"} min-w-0 rounded-2xl border border-slate-700/70 bg-slate-950/55 p-3 shadow-2xl shadow-black/20 backdrop-blur sm:p-7 lg:block`}>
            <BuilderForm data={data} setData={setData} currentStep={currentStep} onStepChange={setCurrentStep} />
          </div>

          <aside className={`${mobileView === "form" ? "hidden" : "block"} min-w-0 lg:sticky lg:top-24 lg:block`} aria-label={t("resumeBuilder.preview.title")}>
            <div className="mb-4 lg:hidden"><ContentIndicator data={data} /></div>
            <div className="h-[calc(100svh-12rem)] min-h-[420px] overflow-hidden rounded-2xl border border-slate-600/70 bg-slate-800 shadow-2xl shadow-black/35 sm:h-[72vh] sm:min-h-[560px] lg:h-[calc(100vh-8rem)]">
              <ResumePreview data={previewData} labels={labels} locale={locale} />
            </div>
          </aside>
        </div>

        <div className="z-20 mt-7 flex min-w-0 flex-col items-stretch gap-4 rounded-2xl border border-sky-400/20 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl sm:sticky sm:bottom-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3 text-xs leading-5 text-slate-400 sm:flex-1 sm:text-sm"><FaShieldAlt className="mt-1 shrink-0 text-emerald-300" /><span>{t("resumeBuilder.privacy")}</span></div>
          <button type="button" onClick={() => void handleDownload()} disabled={downloadStatus === "generating"} className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-sky-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300 disabled:cursor-wait disabled:opacity-70 sm:w-auto">
            {downloadStatus === "generating" ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" /> : <FaDownload />}
            {downloadStatus === "generating" ? t("resumeBuilder.actions.generating") : t("resumeBuilder.actions.download")}
          </button>
          {downloadStatus === "error" && <p className="w-full text-right text-sm text-red-300" role="alert">{t("resumeBuilder.downloadError")}</p>}
        </div>
      </div>
    </section>
  );
};

export default ResumeBuilderPage;
