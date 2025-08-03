// src/components/CourseModal.tsx

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface Course {
  imageSrc: string;
  title: string;
  description: string;
}

const CourseModal = ({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) => {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Fecha o modal ao clicar no fundo
        style={{
          background: "rgba(15, 23, 42, 0.80)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          className="relative bg-gradient-to-br from-blue-900/60 to-slate-900/80 rounded-2xl shadow-2xl p-8 max-w-3xl w-full text-white border border-blue-400/30"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={(e) => e.stopPropagation()} // Evita que o clique feche o modal
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white text-2xl hover:text-blue-400 transition"
            aria-label="Fechar"
          >
            ✖
          </button>
          <h2 className="text-3xl font-extrabold mb-6 tracking-tight">
            {course.title}
          </h2>
          <div className="relative flex justify-center items-center mb-6">
            <a href={course.imageSrc} target="_blank" rel="noopener noreferrer">
              <img
                src={course.imageSrc}
                className="max-h-96 object-contain rounded-xl shadow-lg border-2 border-blue-800/40 cursor-zoom-in transition hover:scale-[1.02]"
                alt={`Certificado do curso ${course.title}`}
              />
            </a>
          </div>
          <p className="text-base text-blue-100">{course.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default CourseModal;