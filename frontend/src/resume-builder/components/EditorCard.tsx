import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface EditorCardProps {
  title: string;
  index: number;
  total: number;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
  children: React.ReactNode;
}

export const EditorCard = ({ title, index, total, onMove, onRemove, children }: EditorCardProps) => {
  const { t } = useTranslation();

  return (
    <article className="rounded-xl border border-slate-700/80 bg-slate-900/55 p-5 shadow-lg shadow-slate-950/20">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <h3 className="font-bold text-sky-100">{title}</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            className="rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-25"
            aria-label={t("resumeBuilder.actions.moveUp")}
            title={t("resumeBuilder.actions.moveUp")}
          >
            <FaArrowUp aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className="rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-25"
            aria-label={t("resumeBuilder.actions.moveDown")}
            title={t("resumeBuilder.actions.moveDown")}
          >
            <FaArrowDown aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-md p-2 text-slate-400 transition hover:bg-red-400/10 hover:text-red-300"
            aria-label={t("resumeBuilder.actions.remove")}
            title={t("resumeBuilder.actions.remove")}
          >
            <FaTrash aria-hidden="true" />
          </button>
        </div>
      </div>
      {children}
    </article>
  );
};
