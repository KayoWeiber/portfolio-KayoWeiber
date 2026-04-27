import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaProjectDiagram,
  FaReact,
  FaServer,
} from "react-icons/fa";
import { SiNodered } from "react-icons/si";

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = useMemo(
    () => [
      {
        icon: FaCode,
        title: t("services.webDev"),
        description: t("services.webDesc"),
      },
      {
        icon: FaReact,
        title: t("services.frontend"),
        description: t("services.frontendDesc"),
      },
      {
        icon: FaServer,
        title: t("services.backendDev"),
        description: t("services.backendDesc"),
      },
      {
        icon: FaProjectDiagram,
        title: t("services.apiIntegration"),
        description: t("services.apiDesc"),
      },
      {
        icon: SiNodered,
        title: t("services.automation"),
        description: t("services.automationDesc"),
      },
      {
        icon: FaDatabase,
        title: t("services.dbDesign"),
        description: t("services.dbDesignDesc"),
      },
    ],
    [t]
  );

  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-slate-950 text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">
            {t("services.subtitle")}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent">
            {t("nav.services")}
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                className="group relative overflow-hidden rounded-lg border border-sky-500/20 bg-slate-900/70 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:bg-slate-900"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-300 to-teal-300 opacity-70" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10 text-sky-300 shadow-inner shadow-sky-950/30 transition group-hover:bg-sky-400/20">
                  <Icon size={26} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sky-100/85">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
