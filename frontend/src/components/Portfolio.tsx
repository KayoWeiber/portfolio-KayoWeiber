import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useModalA11y } from "../hooks/useModalA11y";
import type { Project } from "../types/project";

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [imgIndex, setImgIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalA11y(true, onClose);

  const handleSwitch = (dir: "prev" | "next") => {
    const total = project.images.length;
    setImgIndex((prev) =>
      dir === "next" ? (prev + 1) % total : (prev - 1 + total) % total
    );
  };

  const demoLink = project.demoLink || project.link;
  const sourceLink = project.sourceLink || project.link;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          background: "rgba(15,23,42,0.80)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          className="relative bg-slate-950/95 rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl w-full text-white border border-sky-400/30"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
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
          <h2 id="project-modal-title" className="text-2xl md:text-3xl font-extrabold mb-6 tracking-tight pr-8">
            {project.title}
          </h2>
          <div className="relative flex justify-center items-center mb-6">
            <a href={project.images[imgIndex]} target="_blank" rel="noopener noreferrer">
              <img
                src={project.images[imgIndex]}
                loading="lazy"
                className="max-h-72 object-contain rounded-lg shadow-lg border-2 border-sky-800/40 cursor-zoom-in transition hover:scale-[1.02]"
                alt={t("portfolio.imageAlt", { title: project.title, index: imgIndex + 1 })}
              />
            </a>
            {project.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => handleSwitch("prev")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-sky-800/80 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300"
                  aria-label={t("portfolio.previousImage")}
                >
                  <FaArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitch("next")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-sky-800/80 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300"
                  aria-label={t("portfolio.nextImage")}
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>
          <p className="text-base text-sky-100 mb-5">{project.description}</p>
          {project.technologies && (
            <div className="mb-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded-full border border-sky-500/30 px-3 py-1 text-xs font-semibold text-sky-100">
                  {technology}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-sky-500 hover:bg-sky-300 transition text-slate-950 font-bold shadow-md"
              >
                <FaExternalLinkAlt aria-hidden="true" />
                {t("portfolio.viewProject")}
              </a>
            )}
            {sourceLink && (
              <a
                href={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-sky-300/70 hover:bg-sky-300/10 transition text-sky-100 font-bold"
              >
                <FaGithub aria-hidden="true" />
                {t("portfolio.viewCode")}
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentImg, setCurrentImg] = useState<number[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const projectData = t("portfolio.projects", { returnObjects: true }) as Project[];
    setProjects(projectData || []);
  }, [i18n.language, t]);

  useEffect(() => {
    setCurrentImg(projects.map(() => 0));
  }, [projects]);

  const handleImageSwitch = (projIndex: number, direction: "prev" | "next") => {
    setCurrentImg((prev) =>
      prev.map((val, idx) => {
        if (idx !== projIndex) return val;
        const total = projects[projIndex].images.length;
        return direction === "next"
          ? (val + 1) % total
          : (val - 1 + total) % total;
      })
    );
  };

  return (
    <section
      id="portfolio"
      className="py-24 px-6 md:px-16 bg-slate-950 min-h-screen text-white"
    >
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold mb-14 text-center tracking-tight bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        {t("nav.portfolio")}
      </motion.h2>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((proj, index) => {
          const imageIndex = currentImg[index] ?? 0;

          return (
          <motion.article
            key={proj.title}
            className="group overflow-hidden rounded-lg border border-sky-500/20 bg-slate-900/70 shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:border-sky-400/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            <div className="relative w-full h-64 overflow-hidden bg-slate-950">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIndex}
                  src={proj.images[imageIndex]}
                  loading="lazy"
                  alt={t("portfolio.imageAlt", { title: proj.title, index: imageIndex + 1 })}
                  className="w-full h-full object-cover transition-all duration-300"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              {proj.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => handleImageSwitch(index, "prev")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-sky-800/80 p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-sky-300"
                    aria-label={t("portfolio.previousImage")}
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleImageSwitch(index, "next")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-sky-800/80 p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-sky-300"
                    aria-label={t("portfolio.nextImage")}
                  >
                    <FaArrowRight />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    {proj.images.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          imageIndex === i
                            ? "bg-sky-300 scale-125"
                            : "bg-slate-950/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="p-6 flex min-h-72 flex-col gap-4">
              <h3 className="text-2xl font-bold">{proj.title}</h3>
              <p className="text-base text-sky-100/90 leading-relaxed">{proj.description}</p>
              {proj.technologies && (
                <div className="flex flex-wrap gap-2">
                  {proj.technologies.map((technology) => (
                    <span key={technology} className="rounded-full border border-sky-500/30 px-3 py-1 text-xs font-semibold text-sky-100">
                      {technology}
                    </span>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setSelectedProject(proj)}
                className="mt-auto self-start rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
              >
                {t("portfolio.viewDetails")}
              </button>
            </div>
          </motion.article>
          );
        })}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Portfolio;
