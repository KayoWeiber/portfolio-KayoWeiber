import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import CourseCard from "./CourseCard";
import CourseModal from "./CourseModal";

interface Course {
  imageSrc: string;
  title: string;
  description: string;
}

const Courses: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [langKey, setLangKey] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    setLangKey((prev) => prev + 1);
  }, [i18n.language]);

  const courses = (t("coursesPage.list", { returnObjects: true }) as Course[]) || [];

  return (
    <>
      <section id="courses" className="py-20 px-6 md:px-12 bg-[#0f172a] text-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* ## INÍCIO DA CORREÇÃO ## */}
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("coursesPage.title")}
          </motion.h2>
          {/* ## FIM DA CORREÇÃO ## */}

          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" aria-labelledby="courses-heading">
            {courses.map((course, index) => (
              <CourseCard
                key={course.title}
                course={course}
                index={index}
                langKey={langKey}
                onCardClick={setSelectedCourse}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCourse && (
          <CourseModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Courses;