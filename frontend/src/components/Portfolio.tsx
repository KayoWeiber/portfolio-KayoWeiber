import React, { useEffect, useState, useRef } from "react";
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
  const [imgIndex, setImgIndex] = useState(0);

  const handleSwitch = (dir: "prev" | "next") => {
    const total = project.images.length;
    setImgIndex((prev) =>
      dir === "next" ? (prev + 1) % total : (prev - 1 + total) % total
    );
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: "rgba(15,23,42,0.80)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div
          className="relative bg-gradient-to-br from-blue-900/60 to-slate-900/80 rounded-2xl shadow-2xl p-8 max-w-3xl w-full text-white border border-blue-400/30"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white text-2xl hover:text-blue-400 transition"
            aria-label="Fechar"
          >
            ✖
          </button>
          <h2 className="text-3xl font-extrabold mb-6 tracking-tight">
            {project.title}
          </h2>
          <div className="relative flex justify-center items-center mb-6">
            <img
              src={project.images[imgIndex]}
              onClick={() => window.open(project.images[imgIndex], "_blank")}
              className="max-h-60 object-contain rounded-xl shadow-lg border-2 border-blue-800/40 cursor-zoom-in transition hover:scale-[1.02]"
              alt={`Imagem ${imgIndex + 1}`}
            />
            {project.images.length > 1 && (
              <>
                <button
                  onClick={() => handleSwitch("prev")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-blue-800/70 p-2 rounded-full"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => handleSwitch("next")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-blue-800/70 p-2 rounded-full"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>
          <p className="text-base text-blue-100 mb-6">{project.description}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white font-bold shadow-md"
            >
              Ver Projeto
            </a>
          )}
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
  const [transitioning, setTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTransitioning(true);
    setTimeout(() => {
      const projectData = t("portfolio.projects", { returnObjects: true }) as Project[];
      setProjects(projectData || []);
      setTransitioning(false);
    }, 300);
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
  
  const handleNavScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="portfolio"
      className="py-24 px-6 md:px-16 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#172554] min-h-screen text-white"
    >
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold mb-20 text-center tracking-tight bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        {t("nav.portfolio")}
      </motion.h2>

      <div className="relative group/nav">
        <AnimatePresence mode="wait">
          {!transitioning && (
            <motion.div
              ref={scrollContainerRef}
              className="flex gap-12 overflow-x-auto snap-x pb-8 scroll-smooth scrollbar-hide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {projects.map((proj, index) => (
                <motion.div
                  key={index}
                  className="relative group min-w-[340px] md:min-w-[440px] bg-gradient-to-br from-blue-800/40 to-blue-900/60 border border-blue-500/20 rounded-3xl overflow-hidden hover:scale-[1.03] transition-transform duration-500 snap-center shadow-xl"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                >
                  <div className="relative w-full h-72 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImg[index]}
                        src={proj.images[currentImg[index]]}
                        alt={`project-${index}`}
                        className="w-full h-full object-cover transition-all duration-300 rounded-t-3xl"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.4 }}
                      />
                    </AnimatePresence>
                    {proj.images.length > 1 && (
                      <>
                        <button
                          onClick={() => handleImageSwitch(index, "prev")}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-blue-800/70 p-2 rounded-full transition"
                        >
                          <FaArrowLeft />
                        </button>
                        <button
                          onClick={() => handleImageSwitch(index, "next")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-blue-800/70 p-2 rounded-full transition"
                        >
                          <FaArrowRight />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                          {proj.images.map((_, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentImg[index] === i
                                  ? "bg-blue-400 scale-125"
                                  : "bg-blue-900/40"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-7 flex flex-col gap-3 backdrop-blur-md bg-blue-900/20 group-hover:bg-blue-900/40 transition duration-300 h-48">
                    <h3 className="text-2xl font-bold">{proj.title}</h3>
                    <p
                      className="text-base text-blue-100 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        maxHeight: "3em",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {proj.description}
                    </p>
                    <motion.button
                      onClick={() => setSelectedProject(proj)}
                      className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition self-start shadow-sm"
                      whileTap={{ scale: 0.96 }}
                      whileHover={{ scale: 1.04 }}
                    >
                      Ver Detalhes
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => handleNavScroll('left')} 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-800/50 text-white p-3 rounded-full hover:bg-blue-700/80 transition-all opacity-0 group-hover/nav:opacity-100 z-10"
          aria-label="Anterior"
        >
          <FaArrowLeft />
        </button>
        <button 
          onClick={() => handleNavScroll('right')} 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-slate-800/50 text-white p-3 rounded-full hover:bg-blue-700/80 transition-all opacity-0 group-hover/nav:opacity-100 z-10"
          aria-label="Próximo"
        >
          <FaArrowRight />
        </button>
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