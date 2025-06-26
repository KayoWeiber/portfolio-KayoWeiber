import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { createPortal } from "react-dom";

interface Project {
  images: string[];
  title: string;
  description: string;
  link?: string;
}

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[#1e293b] max-w-2xl w-full rounded-xl shadow-lg p-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <div className="flex gap-2 overflow-x-auto mb-4">
          {project.images.map((img, idx) => (
            <img key={idx} src={img} className="h-40 rounded-lg" />
          ))}
        </div>
        <p className="text-sm mb-4">{project.description}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            🔗 Ver Projeto
          </a>
        )}
      </div>
    </div>,
    document.body
  );
};

const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentImg, setCurrentImg] = useState<number[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects([
      {
        images: ["/assets/projeto1-1.png", "/assets/projeto1-2.png"],
        title: t("portfolio.proj1.title"),
        description: t("portfolio.proj1.desc"),
        link: "https://github.com/KayoWeiber/projeto1",
      },
      {
        images: ["/assets/projeto2-1.png", "/assets/projeto2-2.png"],
        title: t("portfolio.proj2.title"),
        description: t("portfolio.proj2.desc"),
        link: "https://github.com/KayoWeiber/projeto2",
      },
    ]);
  }, [i18n.language, t]);

  useEffect(() => {
    setCurrentImg(projects.map(() => 0));
  }, [projects]);

  const handleImageSwitch = (
    projIndex: number,
    direction: "prev" | "next"
  ) => {
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
    <section id="portfolio" className="py-20 px-6 md:px-12 bg-[#020617] text-white">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t("nav.portfolio")}
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={i18n.language}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex gap-10 overflow-x-auto snap-x pb-4 scroll-smooth"
        >
          {projects.map((proj, index) => (
            <motion.div
              key={index}
              className="relative group min-w-[320px] md:min-w-[420px] bg-gradient-to-br from-blue-800/40 to-blue-900/40 border border-blue-500/20 rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-500 snap-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={proj.images[currentImg[index]]}
                  alt={`project-${index}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {proj.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageSwitch(index, "prev")}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      onClick={() => handleImageSwitch(index, "next")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60"
                    >
                      <FaArrowRight />
                    </button>
                  </>
                )}
              </div>

              <div className="p-6 flex flex-col gap-2 backdrop-blur-md bg-blue-900/20 group-hover:bg-blue-900/30 transition duration-300">
                <h3 className="text-2xl font-bold">{proj.title}</h3>
                <p className="text-sm text-blue-100">{proj.description}</p>
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline self-start"
                >
                  🔍 Ver Detalhes
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

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
