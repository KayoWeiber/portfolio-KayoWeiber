import React, { useMemo, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, useInView, easeInOut } from "framer-motion";
import type { IconType } from "react-icons";
import { FaBolt, FaCode, FaCodeBranch, FaDatabase, FaLaptopCode, FaLayerGroup, FaServer, FaStar } from "react-icons/fa";
import { technologies } from "../data/technologies";
import { useGitHubLanguageStats } from "../hooks/useGitHubLanguageStats";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import { BIRTH_DATE, calculateAge } from "../utils/calculateAge";
import Timeline from "./Timeline";

function formatRepoSize(sizeKb: number) {
  if (sizeKb < 1024) return `${sizeKb} KB`;
  return `${(sizeKb / 1024).toFixed(1)} MB`;
}

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

type TranslationStat = {
  number: string;
  label: string;
};

type TranslationFocusArea = {
  title: string;
  description: string;
};

const focusIcons: IconType[] = [FaLaptopCode, FaServer, FaBolt];

const focusThemes = [
  "border-sky-400/30 bg-sky-400/10 text-sky-200",
  "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  "border-amber-400/30 bg-amber-400/10 text-amber-200",
] as const;

const statThemes = [
  "from-sky-400/25 to-cyan-300/10 text-sky-200 border-sky-300/20",
  "from-emerald-400/25 to-teal-300/10 text-emerald-200 border-emerald-300/20",
  "from-amber-400/25 to-orange-300/10 text-amber-200 border-amber-300/20",
] as const;

const About: React.FC = () => {
  const { t, i18n, ready } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const age = calculateAge(BIRTH_DATE);
  const stats = t("About.stats", { returnObjects: true }) as TranslationStat[];
  const focusAreas = t("About.focusAreas", {
    returnObjects: true,
  }) as TranslationFocusArea[];

  const { languages: githubLanguageStats, isLoading: isLoadingLanguageStats } =
    useGitHubLanguageStats();
  const { repos: githubRepos, isLoading: isLoadingRepos } = useGitHubRepos();

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

  const safeStats = Array.isArray(stats) ? stats : [];
  const safeFocusAreas = Array.isArray(focusAreas) ? focusAreas : [];

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
      className="relative min-h-screen overflow-hidden bg-[#07111f] py-20 px-4 scroll-mt-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),transparent_34%),linear-gradient(225deg,rgba(16,185,129,0.12),transparent_30%),linear-gradient(180deg,#07111f_0%,#0f172a_52%,#111827_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
              <FaLayerGroup className="text-emerald-300" />
              {t("About.subtitle")}
            </span>

            <h2 className="max-w-3xl text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
              <Trans i18nKey="About.title">
                Full Stack{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-200">
                  Developer
                </span>
              </Trans>
            </h2>

            <div className="max-w-2xl space-y-5 text-base md:text-lg leading-8 text-slate-300">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {safeStats.map((stat, index) => {
                const theme = statThemes[index % statThemes.length] ?? statThemes[0];

                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className={`rounded-2xl border bg-gradient-to-br ${theme} p-4 shadow-lg shadow-slate-950/20`}
                  >
                    <div className="text-3xl font-bold text-white">
                      {stat.number}
                    </div>

                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-current">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-4"
            >
              {safeFocusAreas.map((area, index) => {
                const Icon = focusIcons[index % focusIcons.length] ?? FaCode;
                const theme = focusThemes[index % focusThemes.length] ?? focusThemes[0];

                return (
                  <motion.div
                    key={area.title}
                    variants={itemVariants}
                    className={`rounded-2xl border p-5 ${theme}`}
                    whileHover={{ y: -6 }}
                  >
                    <Icon size={22} />

                    <h3 className="mt-4 text-base font-semibold text-white">
                      {area.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {area.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:p-7 shadow-2xl shadow-slate-950/40 backdrop-blur"
          >
            <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <motion.h3 className="text-2xl md:text-3xl font-bold text-white">
                {t("About.stack")}
              </motion.h3>

              <span className="text-sm font-medium text-slate-400">
                {t("About.mainLangs")}
              </span>
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
                    className="group relative flex aspect-square items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-900/70 transition-all hover:border-sky-300/60 hover:bg-slate-800/80"
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
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium flex items-center gap-2">
                        <Icon size={16} style={{ color }} />
                        {language.name}
                      </span>

                      <span className="text-sky-300 text-sm font-semibold">
                        {isLoadingLanguageStats
                          ? t("About.loadingStats")
                          : language.percentage}
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${color}66, ${color})`,
                        }}
                        initial={{ width: 0 }}
                        animate={
                          isInView
                            ? { width: language.percentage }
                            : { width: 0 }
                        }
                        transition={{
                          delay: index * 0.1 + 0.8,
                          duration: 1.2,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        {!isLoadingRepos && githubRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12"
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              {t("About.githubActivity")}
            </h4>

            <div className="grid gap-4 md:grid-cols-3">
              {githubRepos.map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-xl border border-slate-700/70 bg-slate-900/70 p-4 transition-all hover:border-sky-300/60 hover:bg-slate-800/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-semibold text-white group-hover:text-sky-300">
                      {repo.name}
                    </span>

                    <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-300">
                      <FaStar className="text-amber-300" aria-hidden="true" />
                      {repo.stars}
                    </span>
                  </div>

                  {repo.language && (
                    <span className="mt-2 inline-flex w-fit rounded-full border border-sky-500/30 px-2 py-0.5 text-xs font-medium text-sky-200">
                      {repo.language}
                    </span>
                  )}

                  {repo.description && (
                    <p className="mt-3 line-clamp-2 text-sm text-slate-400">
                      {repo.description}
                    </p>
                  )}

                  {repo.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium text-slate-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs text-slate-400">
                    <span>
                      {t("About.githubCreatedAt", {
                        date: new Intl.DateTimeFormat(i18n.resolvedLanguage, {
                          month: "short",
                          year: "numeric",
                        }).format(new Date(repo.createdAt)),
                      })}
                    </span>

                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <FaDatabase aria-hidden="true" />
                        {formatRepoSize(repo.sizeKb)}
                      </span>

                      <span className="flex items-center gap-1">
                        <FaCodeBranch aria-hidden="true" />
                        {repo.forks}
                      </span>
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        <Timeline />
      </div>
    </section>
  );
};

export default About;