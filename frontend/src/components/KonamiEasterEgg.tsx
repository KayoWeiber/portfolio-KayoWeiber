import { useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

const CHARACTERS = "01{}<>/;KW=>const dev";
const COLUMN_COUNT = 24;
const AUTO_DISMISS_MS = 4000;

function buildColumnText(seed: number) {
  let text = "";
  for (let i = 0; i < 18; i += 1) {
    text += CHARACTERS[(seed * (i + 1) * 7) % CHARACTERS.length];
  }
  return text;
}

const KonamiEasterEgg = ({ onDismiss }: { onDismiss: () => void }) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const columns = useMemo(
    () => Array.from({ length: COLUMN_COUNT }, (_, index) => ({
      left: `${(index / COLUMN_COUNT) * 100}%`,
      delay: (index % 6) * 0.15,
      duration: 2.5 + (index % 5) * 0.4,
      text: buildColumnText(index + 1),
    })),
    []
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timeoutId);
  }, [onDismiss]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60] overflow-hidden bg-slate-950/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">{t("easterEgg.activated")}</span>

        {!prefersReducedMotion &&
          columns.map((column, index) => (
            <motion.div
              key={index}
              className="absolute top-0 font-mono text-sm text-emerald-400/70"
              style={{ left: column.left, writingMode: "vertical-rl" }}
              initial={{ y: "-100%" }}
              animate={{ y: "100vh" }}
              transition={{
                duration: column.duration,
                delay: column.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {column.text}
            </motion.div>
          ))}

        <motion.div
          className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 px-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="rounded-full border border-emerald-400/40 bg-slate-950/80 px-5 py-2 font-mono text-sm font-semibold text-emerald-300">
            {t("easterEgg.message")}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default KonamiEasterEgg;
