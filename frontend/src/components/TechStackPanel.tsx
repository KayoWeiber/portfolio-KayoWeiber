import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
    transition: { duration: 0.5 },
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

const TechStackPanel = ({ isInView }: { isInView: boolean }) => {
  const { t } = useTranslation();
  const { languages: githubLanguageStats, isLoading: isLoadingLanguageStats } =
    useGitHubLanguageStats();

  const technologyByName = useMemo(
    () =>
      new Map<string, (typeof technologies)[number]>(
        technologies.map((tech) => [tech.name, tech])
      ),
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

  const languageRanking =
    githubLanguageStats.length > 0 ? githubLanguageStats : fallbackLanguageStats;

  return (
    <motion.div
      variants={itemVariants}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7 shadow-2xl shadow-slate-950/40 backdrop-blur"
    >
      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <motion.h3 className="text-2xl md:text-3xl font-bold text-white">
          {t("About.stack")}
        </motion.h3>

        <span className="text-sm font-medium text-slate-400">{t("About.mainLangs")}</span>
      </div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-4"
      >
        {technologies.map((tech) => {
          const Icon = tech.icon;

          return (
            <motion.div
              key={tech.name}
              variants={iconVariants}
              className="group relative aspect-square"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <button
                type="button"
                className="flex h-full w-full items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-900/70 transition-all hover:border-sky-300/60 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <Icon size={32} style={{ color: tech.color }} aria-hidden="true" />
                <span className="sr-only">{tech.name}</span>
              </button>

              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                {tech.name}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div className="space-y-4 mt-12">
        {languageRanking.map((language, index) => {
          const tech = technologyByName.get(language.name);
          const Icon = tech?.icon ?? FaCode;
          const color = tech?.color ?? "#94A3B8";

          return (
            <motion.div
              key={language.name}
              className="space-y-2"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2 font-medium text-slate-300">
                  <Icon size={16} style={{ color }} className="shrink-0" />
                  <span className="truncate">{language.name}</span>
                </span>

                <span className="shrink-0 text-sm font-semibold text-sky-300">
                  {isLoadingLanguageStats ? t("About.loadingStats") : language.percentage}
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
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
  );
};

export default TechStackPanel;
