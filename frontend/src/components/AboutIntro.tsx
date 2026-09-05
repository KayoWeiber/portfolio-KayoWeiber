import { useTranslation, Trans } from "react-i18next";
import { motion, easeInOut } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaBolt,
  FaCode,
  FaLaptopCode,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaServer,
} from "react-icons/fa";
import { profileInfo } from "../data/profile";

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

const AboutIntro = ({ age }: { age: number }) => {
  const { t } = useTranslation();

  const stats = t("About.stats", { returnObjects: true }) as TranslationStat[];
  const focusAreas = t("About.focusAreas", { returnObjects: true }) as TranslationFocusArea[];

  const safeStats = Array.isArray(stats) ? stats : [];
  const safeFocusAreas = Array.isArray(focusAreas) ? focusAreas : [];

  return (
    <motion.div variants={itemVariants} className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
          <FaLayerGroup className="text-emerald-300" />
          {t("About.subtitle")}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300">
          <FaMapMarkerAlt className="text-sky-300" aria-hidden="true" />
          <span className="sr-only">{t("About.locationLabel")}:</span>
          {profileInfo.location}
        </span>
      </div>

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
              <div className="text-3xl font-bold text-white">{stat.number}</div>

              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-current">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-4">
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

              <h3 className="mt-4 text-base font-semibold text-white">{area.title}</h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">{area.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default AboutIntro;
