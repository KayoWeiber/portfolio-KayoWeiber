import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCamera, FaPlus, FaTrash } from "react-icons/fa";
import { createLink } from "../../data/defaultResume";
import { optimizeResumePhoto } from "../../utils/image";
import { formatPhone } from "../../utils/format";
import { validateResume } from "../../utils/content";
import { Field, SectionIntro, TextArea, TextInput } from "../FormControls";
import type { ResumeSectionProps } from "./sectionTypes";

export const PersonalSection = ({ data, setData }: ResumeSectionProps) => {
  const { t } = useTranslation();
  const fileInput = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState("");
  const validation = validateResume(data);
  const updatePersonal = (field: keyof typeof data.personal, value: string | typeof data.personal.links) =>
    setData((current) => ({
      ...current,
      personal: { ...current.personal, [field]: value },
    }));

  const handlePhoto = async (file?: File) => {
    if (!file) return;
    setPhotoError("");
    try {
      updatePersonal("photoDataUrl", await optimizeResumePhoto(file));
    } catch (error) {
      const code = error instanceof Error ? error.message : "processing";
      setPhotoError(t(`resumeBuilder.photo.errors.${code}`));
    }
  };

  return (
    <div>
      <SectionIntro title={t("resumeBuilder.personal.title")} description={t("resumeBuilder.personal.description")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("resumeBuilder.fields.fullName")} error={!validation.fullName && data.personal.fullName ? t("resumeBuilder.validation.fullName") : undefined}>
          <TextInput value={data.personal.fullName} onChange={(event) => updatePersonal("fullName", event.target.value)} placeholder={t("resumeBuilder.placeholders.fullName")} autoComplete="name" />
        </Field>
        <Field label={t("resumeBuilder.fields.professionalTitle")} error={!validation.professionalTitle && data.personal.professionalTitle ? t("resumeBuilder.validation.professionalTitle") : undefined}>
          <TextInput value={data.personal.professionalTitle} onChange={(event) => updatePersonal("professionalTitle", event.target.value)} placeholder={t("resumeBuilder.placeholders.professionalTitle")} />
        </Field>
        <Field label={t("resumeBuilder.fields.email")} error={!validation.email && data.personal.email ? t("resumeBuilder.validation.email") : undefined}>
          <TextInput type="email" value={data.personal.email} onChange={(event) => updatePersonal("email", event.target.value)} placeholder="nome@exemplo.com" autoComplete="email" />
        </Field>
        <Field label={t("resumeBuilder.fields.phone")}>
          <TextInput value={data.personal.phone} onChange={(event) => updatePersonal("phone", formatPhone(event.target.value))} placeholder="(00) 00000-0000" autoComplete="tel" inputMode="tel" />
        </Field>
        <Field label={t("resumeBuilder.fields.location")}>
          <TextInput value={data.personal.location} onChange={(event) => updatePersonal("location", event.target.value)} placeholder={t("resumeBuilder.placeholders.location")} />
        </Field>
        <Field label="LinkedIn">
          <TextInput type="url" value={data.personal.linkedin} onChange={(event) => updatePersonal("linkedin", event.target.value)} placeholder="linkedin.com/in/seu-perfil" />
        </Field>
        <Field label="GitHub">
          <TextInput type="url" value={data.personal.github} onChange={(event) => updatePersonal("github", event.target.value)} placeholder="github.com/seu-usuario" />
        </Field>
        <Field label={t("resumeBuilder.fields.website")}>
          <TextInput type="url" value={data.personal.website} onChange={(event) => updatePersonal("website", event.target.value)} placeholder="seusite.com" />
        </Field>
      </div>

      <div className="mt-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-bold text-white">{t("resumeBuilder.personal.otherLinks")}</h3>
          <button type="button" onClick={() => updatePersonal("links", [...data.personal.links, createLink()])} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200">
            <FaPlus aria-hidden="true" /> {t("resumeBuilder.actions.addLink")}
          </button>
        </div>
        <div className="space-y-3">
          {data.personal.links.map((link) => (
            <div key={link.id} className="grid grid-cols-[1fr_1.6fr_auto] gap-2">
              <TextInput value={link.label} onChange={(event) => updatePersonal("links", data.personal.links.map((item) => item.id === link.id ? { ...item, label: event.target.value } : item))} placeholder={t("resumeBuilder.placeholders.linkLabel")} />
              <TextInput type="url" value={link.url} onChange={(event) => updatePersonal("links", data.personal.links.map((item) => item.id === link.id ? { ...item, url: event.target.value } : item))} placeholder="https://" />
              <button type="button" onClick={() => updatePersonal("links", data.personal.links.filter((item) => item.id !== link.id))} className="rounded-lg px-3 text-slate-400 hover:bg-red-400/10 hover:text-red-300" aria-label={t("resumeBuilder.actions.remove")}><FaTrash /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-slate-800 pt-7 md:grid-cols-[auto_1fr]">
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-600 bg-slate-950/60">
          {data.personal.photoDataUrl ? <img src={data.personal.photoDataUrl} alt={t("resumeBuilder.photo.previewAlt")} className="h-full w-full object-cover" /> : <FaCamera className="text-3xl text-slate-600" aria-hidden="true" />}
        </div>
        <div>
          <h3 className="font-bold text-white">{t("resumeBuilder.photo.title")}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">{t("resumeBuilder.photo.description")}</p>
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              void handlePhoto(file);
            }}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => fileInput.current?.click()} className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-sky-300">
              {data.personal.photoDataUrl ? t("resumeBuilder.photo.change") : t("resumeBuilder.photo.add")}
            </button>
            {data.personal.photoDataUrl && <button type="button" onClick={() => updatePersonal("photoDataUrl", "")} className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-red-400/50 hover:text-red-300">{t("resumeBuilder.photo.remove")}</button>}
          </div>
          {photoError && <p className="mt-2 text-sm text-red-300" role="alert">{photoError}</p>}
        </div>
      </div>

      <div className="mt-8 border-t border-slate-800 pt-7">
        <Field label={t("resumeBuilder.fields.summary")} hint={t("resumeBuilder.personal.summaryHint")}>
          <TextArea maxLength={1200} value={data.summary} onChange={(event) => setData((current) => ({ ...current, summary: event.target.value }))} placeholder={t("resumeBuilder.placeholders.summary")} />
        </Field>
        <p className="mt-2 text-right text-xs text-slate-500">{data.summary.length}/1200</p>
      </div>
    </div>
  );
};
