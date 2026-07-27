import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useModalA11y } from "../hooks/useModalA11y";
import type { Course } from "../types/course";

const CourseModal = ({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useModalA11y(true, onClose, dialogRef);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          background: "rgba(15, 23, 42, 0.80)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          ref={dialogRef}
          className="relative bg-slate-950/95 rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl w-full text-white border border-sky-400/30"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-modal-title"
          onAnimationComplete={() => closeButtonRef.current?.focus()}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-white text-2xl hover:text-sky-300 transition focus:outline-none focus:ring-2 focus:ring-sky-300 rounded"
            aria-label={t("modal.close")}
          >
            ×
          </button>
          <h2 id="course-modal-title" className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight pr-8">
            {course.title}
          </h2>
          <div className="relative flex justify-center items-center mb-6">
            <a href={course.imageSrc} target="_blank" rel="noopener noreferrer">
              <img
                src={course.imageSrc}
                className="max-h-96 object-contain rounded-lg shadow-lg border-2 border-sky-800/40 cursor-zoom-in transition hover:scale-[1.02]"
                alt={t("coursesPage.certificateAlt", { title: course.title })}
              />
            </a>
          </div>
          <p className="text-base text-sky-100">{course.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default CourseModal;
