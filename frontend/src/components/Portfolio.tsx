import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { createPortal } from "react-dom";

// Tipagem dos projetos
interface Project {
  images: string[];
  title: string;
  description: string;
  link?: string;
}

// Modal com efeito glassmorphism e animação de entrada/saída
const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
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
          className="relative bg-gradient-to-br from-blue-900/60 to-slate-900/80 rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-white border border-blue-400/30"
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
          <h2 className="text-3xl font-extrabold mb-6 tracking-tight">{project.title}</h2>
          <div className="flex gap-3 overflow-x-auto mb-6">
            {project.images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                className="h-40 rounded-xl shadow-lg border-2 border-blue-900/30 hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.07 }}
                alt={`Imagem ${idx + 1} do projeto`}
              />
            ))}
          </div>
          <motion.p
            className="text-base mb-6 text-blue-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.description}
          </motion.p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white font-bold shadow-md"
            >
              🔗 Ver Projeto
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

// Componente principal do portfólio
const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentImg, setCurrentImg] = useState<number[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects([
      {
        images: ["/portfolio-KayoWeiber/projeto2/projeto2-1.png", "/portfolio-KayoWeiber/projeto2/projeto2-2.png"],
        title: t("portfolio.proj2.title"),
        description: t("portfolio.proj2.desc"),
        link: "https://kayoweiber.github.io/Volumetria/",
      },
      {
        images: ["/assets/projeto1-1.png", "/assets/projeto1-2.png"],
        title: t("portfolio.proj1.title"),
        description: t("portfolio.proj1.desc"),
        link: "https://github.com/KayoWeiber/projeto1",
      }
      
    ]);
  }, [i18n.language, t]);

  useEffect(() => {
    setCurrentImg(projects.map(() => 0));
  }, [projects]);

  // Troca de imagem com animação de fade
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

      <motion.div
        className="flex gap-12 overflow-x-auto snap-x pb-8 scroll-smooth"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
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
                  {/* Indicadores de imagem */}
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
                  WebkitLineClamp: 2, // Limita a 2 linhas
                  WebkitBoxOrient: "vertical",
                  maxHeight: "3em",    // Ajuste conforme o tamanho da fonte
                  textOverflow: "ellipsis",
                }}
              >
                {proj.description}
              </p>
              <motion.button
                onClick={() => setSelectedProject(proj)}
                className="mt-2 text-base text-blue-400 hover:text-blue-200 underline self-start font-semibold"
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                🔍 Ver Detalhes
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal animado */}
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
