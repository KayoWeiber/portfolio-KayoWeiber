import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import type { TimelineMilestone } from "../types/timeline";
import { BIRTH_DATE, calculateAge } from "../utils/calculateAge";

const typeStyles = {
  work: "border-sky-400/40 bg-sky-400/10 text-sky-200",
  education: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
} as const;

const Timeline: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const milestones = t("timeline.milestones", { returnObjects: true }) as TimelineMilestone[];
  const safeMilestones = Array.isArray(milestones) ? milestones : [];

  if (safeMilestones.length === 0) return null;

  return (
    <div ref={ref} className="mt-12">
      <h4 className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        {t("About.timelineTitle")}
      </h4>

      <ol className="relative space-y-8 border-l border-slate-700/70 pl-8">
        {safeMilestones.map((milestone, index) => {
          const Icon = milestone.type === "education" ? FaGraduationCap : FaBriefcase;
          const isCurrent = milestone.period.toLowerCase().includes(
            t("timeline.current").toLowerCase()
          );
          const ageAtMilestone = calculateAge(BIRTH_DATE, new Date(milestone.startDate));

          return (
            <motion.li
              key={`${milestone.organization}-${milestone.title}`}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.12, duration: 0.5 }}
            >
              <span
                className={`absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border ${typeStyles[milestone.type]}`}
              >
                <Icon size={14} aria-hidden="true" />
              </span>

              <div className="rounded-xl border border-slate-700/70 bg-slate-900/70 p-4 transition-all hover:border-sky-300/60 hover:bg-slate-800/80">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-sky-300">
                    {milestone.period}
                  </span>

                  <span className="text-xs font-medium text-slate-500">
                    · {t("timeline.ageAt", { age: ageAtMilestone })}
                  </span>

                  {isCurrent && (
                    <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                      {t("timeline.current")}
                    </span>
                  )}
                </div>

                <h5 className="mt-2 text-lg font-bold text-white">{milestone.title}</h5>

                <p className="text-sm font-medium text-slate-300">
                  {milestone.organization}
                  {milestone.location && ` · ${milestone.location}`}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {milestone.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
};

export default Timeline;
