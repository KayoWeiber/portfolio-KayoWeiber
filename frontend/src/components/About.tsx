import React, { useMemo, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, useInView, AnimatePresence, easeInOut } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { technologies } from "../data/technologies";
import { useGitHubLanguageStats } from "../hooks/useGitHubLanguageStats";

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
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
};

function calculateAge(birthDate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return age;
}

const About: React.FC = () => {
  const { t, i18n, ready } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const age = calculateAge(new Date(2005, 2, 10));
  const stats = t("About.stats", { returnObjects: true }) || [];
  const { languages: githubLanguageStats, isLoading: isLoadingLanguageStats } =
    useGitHubLanguageStats();
  const technologyByName = useMemo(
    () => new Map(technologies.map((tech) => [tech.name, tech])),
    []
  );
  const fallbackLanguageStats = useMemo(
    () =>
      technologies
        .slice(0, 6)
        .map((tech) => ({
          name: tech.name,
          percentage: tech.percentage,
          value: Number.parseInt(tech.percentage, 10),
          bytes: 0,
        }))
        .sort((a, b) => b.value - a.value),
    []
  );
  const languageRanking = githubLanguageStats.length > 0
    ? githubLanguageStats
    : fallbackLanguageStats;

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
      className="min-h-screen bg-gradient-to-br from-[#0a2342] via-[#181818] to-[#1e293b] py-20 px-4 scroll-mt-24"
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
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium uppercase tracking-wider border border-blue-500/30">
                {t("About.subtitle")}
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                <Trans i18nKey="About.title">
                  Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Developer</span>
                </Trans>
              </h2>

              <div className="space-y-6 text-gray-300 text-lg">
                <p>
                  <Trans
                    i18nKey="About.p1"
                    values={{ age }}
                    components={{ 1: <strong className="text-blue-300" /> }}
                  />
                </p>
                <p>{t("About.p2")}</p>
                <p>
                  <Trans
                    i18nKey="About.p3"
                    components={{
                      0: <strong className="text-sky-300" />,
                      1: <strong className="text-blue-300" />,
                      2: <strong className="text-purple-300" />,
                    }}
                  />
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
                {(Array.isArray(stats) ? stats : []).map((stat) => {
                  return (
                    <div
                      key={stat.label}
                      className={"text-center p-4 rounded-lg border bg-blue-500/10 border-blue-500/20"}
                    >
                      <div className={"text-2xl font-bold text-blue-400"}>{stat.number}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div variants={itemVariants} className="space-y-8">
            <motion.h3 className="text-2xl md:text-3xl font-bold text-white text-center">
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
              {languageRanking.map((language, index) => {
                const tech = technologyByName.get(language.name);
                const Icon = tech?.icon || FaCode;
                const color = tech?.color || "#94A3B8";

                return (
                  <motion.div
                    key={language.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        <Icon size={16} style={{ color }} />
                        {language.name}
                      </span>
                      <span className="text-blue-400 text-sm font-semibold">
                        {isLoadingLanguageStats ? t("About.loadingStats") : language.percentage}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${color}66, ${color})`,
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: language.percentage } : { width: 0 }}
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
