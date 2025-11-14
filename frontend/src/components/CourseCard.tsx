// src/components/CourseCard.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface Course {
  imageSrc: string;
  title: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
  langKey: number;
  onCardClick: (course: Course) => void; 
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index, langKey, onCardClick }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      key={`${langKey}-${index}`}
      onClick={() => onCardClick(course)} // Aciona o modal
      className="group bg-blue-950/40 rounded-xl h-full overflow-hidden border border-blue-800/50 shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-700 hover:scale-[1.02] cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      layout // Adiciona uma animação suave ao reordenar
    >
      <img
        src={course.imageSrc}
        alt={t("coursesPage.certificateAlt", { title: course.title })}
        className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
        <p className="text-blue-200/90 leading-relaxed">{course.description}</p>
      </div>
    </motion.div>
  );
};

export default CourseCard;