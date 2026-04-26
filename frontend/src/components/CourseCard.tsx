import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Course } from "../types/course";

interface CourseCardProps {
  course: Course;
  index: number;
  langKey: number;
  onCardClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index, langKey, onCardClick }) => {
  const { t } = useTranslation();

  return (
    <motion.button
      type="button"
      key={`${langKey}-${index}`}
      onClick={() => onCardClick(course)}
      className="group bg-slate-950/50 rounded-lg h-full overflow-hidden border border-sky-800/40 shadow-lg transition-all duration-300 hover:shadow-sky-500/20 hover:border-sky-600 hover:scale-[1.02] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-sky-300"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      layout
      aria-label={t("coursesPage.certificateAriaLabel", { title: course.title })}
    >
      <img
        src={course.imageSrc}
        alt={t("coursesPage.certificateAlt", { title: course.title })}
        className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="p-6">
        <span className="mb-3 inline-flex rounded-full border border-sky-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-200">
          {t(`coursesPage.categories.${course.category}`)}
        </span>
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-sky-100/90 leading-relaxed">{course.description}</p>
      </div>
    </motion.button>
  );
};

export default CourseCard;
