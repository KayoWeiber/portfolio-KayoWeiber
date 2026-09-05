import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export const Field = ({ label, hint, error, children }: FieldProps) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span>
    {children}
    {error ? (
      <span className="mt-1.5 block text-xs text-red-300" role="alert">{error}</span>
    ) : hint ? (
      <span className="mt-1.5 block text-xs leading-5 text-slate-500">{hint}</span>
    ) : null}
  </label>
);

export const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`${inputClass} ${props.className ?? ""}`} />
);

export const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={`${inputClass} min-h-28 resize-y leading-6 ${props.className ?? ""}`}
  />
);

export const SectionIntro = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-7">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
  </div>
);
