import React, { useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaPython, FaJs, FaJava, FaHtml5, FaCss3Alt, FaReact, FaNodeJs,
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiNextdotjs,
  SiExpress, SiMongodb, SiPostgresql, SiMysql,
} from "react-icons/si";

// Mapeamento de cores permitidas no Tailwind
const colorMap: Record<string, string> = {
  blue: "blue",
  purple: "purple",
  green: "green",
};

// Dados das tecnologias
const technologies = [
  { name: "Python", icon: FaPython, color: "#3776AB", percentage: "35.35%" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E", percentage: "17.50%" },
  { name: "Java", icon: FaJava, color: "#ED8B00", percentage: "9.26%" },
  { name: "HTML", icon: FaHtml5, color: "#E34F26", percentage: "8.36%" },
  { name: "CSS", icon: FaCss3Alt, color: "#1572B6", percentage: "7.06%" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", percentage: "85%" },
  { name: "React", icon: FaReact, color: "#61DAFB", percentage: "90%" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933", percentage: "80%" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", percentage: "75%" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", percentage: "85%" },
  { name: "Express.js", icon: SiExpress, color: "#000000", percentage: "70%" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", percentage: "65%" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", percentage: "70%" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", percentage: "75%" },
];

// Animações
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const About: React.FC = () => {
  const { t, i18n, ready } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const stats = t("About.stats", { returnObjects: true }) || [];

  if (!ready) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <span className="text-white text-xl">Loading...</span>
      </section>
    );
  }

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-[#0a2342] via-[#181818] to-[#1e293b] py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i18n.language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <motion.span
                className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium uppercase tracking-wider border border-blue-500/30"
                whileHover={{ scale: 1.05 }}
              >
                {t("About.subtitle", "About Me")}
              </motion.span>

              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white leading-tight"
              >
                <Trans i18nKey="About.title">
                  Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Developer</span>
                </Trans>
              </motion.h2>

              <motion.div variants={itemVariants} className="space-y-6 text-gray-300">
                <p className="text-lg">
                  <Trans i18nKey="About.p1">
                    My name is <strong className="text-blue-300">Kayo Weiber</strong>, an Information Systems undergraduate at UEMG and a full-stack developer passionate about creating impactful software.
                  </Trans>
                </p>
                <p className="text-lg">{t("About.p2")}</p>
                <p className="text-lg">
                  <Trans i18nKey="About.p3">
                    I'm deepening my skills with <strong className="text-blue-300">Java</strong> and Spring-Boot, aiming to become a <strong className="text-purple-300">better</strong> developer.
                  </Trans>
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
                {(Array.isArray(stats) ? stats : []).map((stat) => {
                  const color = colorMap[stat.color] || "gray";
                  return (
                    <motion.div
                      key={stat.label}
                      className={`text-center p-4 bg-${color}-500/10 rounded-lg border border-${color}-500/20`}
                      whileHover={{ scale: 1.08 }}
                    >
                      <div className={`text-2xl font-bold text-${color}-400`}>{stat.number}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div variants={itemVariants} className="space-y-8">
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-white text-center"
            >
              {t("About.stack")}
            </motion.h3>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-4 md:grid-cols-5 gap-4 md:gap-6"
            >
              {technologies.map((tech) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    variants={iconVariants}
                    className="group relative flex flex-col items-center p-3 md:p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <Icon size={32} style={{ color: tech.color }} />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {tech.name}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div className="space-y-4 mt-12">
              <h4 className="text-xl font-semibold text-white mb-6 text-center">
                {t("About.mainLangs")}
              </h4>
              {technologies.slice(0, 6).map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        <Icon size={16} style={{ color: tech.color }} />
                        {tech.name}
                      </span>
                      <span className="text-blue-400 text-sm font-semibold">
                        {tech.percentage}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${tech.color}66, ${tech.color})`,
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: tech.percentage } : { width: 0 }}
                        transition={{ delay: index * 0.1 + 0.8, duration: 1.2 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
