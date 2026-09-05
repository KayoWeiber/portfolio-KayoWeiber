import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { TextInput } from "./FormControls";

interface TagInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}

export const TagInput = ({ values, onChange, placeholder }: TagInputProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const addValue = () => {
    const normalized = value.trim();
    if (!normalized || values.some((item) => item.toLowerCase() === normalized.toLowerCase())) return;
    onChange([...values, normalized]);
    setValue("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <TextInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addValue();
            }
          }}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addValue}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-sky-400/30 bg-sky-400/10 px-4 text-sm font-semibold text-sky-200 transition hover:bg-sky-400/20"
        >
          <FaPlus aria-hidden="true" />
          <span className="hidden sm:inline">{t("resumeBuilder.actions.add")}</span>
        </button>
      </div>
      {values.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((item) => (
            <span key={item} className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
              {item}
              <button
                type="button"
                onClick={() => onChange(values.filter((valueItem) => valueItem !== item))}
                className="text-slate-400 transition hover:text-red-300"
                aria-label={t("resumeBuilder.actions.removeItem", { item })}
              >
                <FaTimes aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
