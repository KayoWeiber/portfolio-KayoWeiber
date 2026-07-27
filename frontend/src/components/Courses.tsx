import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import CourseCard from "./CourseCard";
import CourseModal from "./CourseModal";
import type { Course, CourseCategory } from "../types/course";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const categoryOrder: CourseCategory[] = ["all", "backend", "cloud", "frontend", "data", "fundamentals"];

const Courses: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [langKey, setLangKey] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>("all");

  useDocumentMeta(t("coursesPage.metaTitle"), t("coursesPage.metaDescription"));

  useEffect(() => {
    setLangKey((prev) => prev + 1);
  }, [i18n.language]);

  const courses = useMemo(
    () => (t("coursesPage.list", { returnObjects: true }) as Course[]) || [],
    [t]
  );

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "all") return courses;
    return courses.filter((course) => course.category === selectedCategory);
  }, [courses, selectedCategory]);

  return (
    <>
      <section id="courses" className="pb-20 pt-8 px-6 md:px-12 bg-slate-950 text-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300 rounded"
          >
            <FaArrowLeft aria-hidden="true" />
            {t("coursesPage.backHome")}
          </Link>

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">
              {t("coursesPage.subtitle")}
            </span>
            <h1
              id="courses-heading"
              className="mt-3 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-300"
            >
              {t("coursesPage.title")}
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-slate-300">
              {t("coursesPage.description")}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-400">
              {t("coursesPage.count", { count: courses.length })}
            </p>
          </motion.div>

          <div className="mb-10 flex flex-wrap gap-2" role="list" aria-label={t("coursesPage.filterLabel")}>
            {categoryOrder.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                  selectedCategory === category
                    ? "border-sky-300 bg-sky-400 text-slate-950"
                    : "border-sky-500/30 text-sky-100 hover:bg-sky-400/10"
                }`}
                aria-pressed={selectedCategory === category}
              >
                {t(`coursesPage.categories.${category}`)}
              </button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" aria-labelledby="courses-heading">
            {filteredCourses.map((course, index) => (
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
