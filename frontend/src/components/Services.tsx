import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TextTransition, { presets } from "react-text-transition";
import {
  FaCode, FaServer, FaProjectDiagram, FaJava, FaReact, FaDatabase
} from "react-icons/fa";
//import { SiSpringboot, SiTypescript } from "react-icons/si";

const Services: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [langKey, setLangKey] = useState(0);

  // Atualiza o key dos textos quando muda idioma (ativa animação de transição)
  useEffect(() => {
    setLangKey((prev) => prev + 1);
  }, [i18n.language]);

  const services = [
    {
      icon: <FaCode size={28} className="text-blue-400" />,
      title: t("services.webDev"),
      description: t("services.webDesc"),
    },
    {
      icon: <FaServer size={28} className="text-blue-400" />,
      title: t("services.backendDev"),
      description: t("services.backendDesc"),
    },
    {
      icon: <FaProjectDiagram size={28} className="text-blue-400" />,
      title: t("services.apiIntegration"),
      description: t("services.apiDesc"),
    },
    {
      icon: <FaJava size={28} className="text-blue-400" />,
      title: t("services.javaSpring"),
      description: t("services.javaSpringDesc"),
    },
    {
      icon: <FaReact size={28} className="text-blue-400" />,
      title: t("services.frontend"),
      description: t("services.frontendDesc"),
    },
    {
      icon: <FaDatabase size={28} className="text-blue-400" />,
      title: t("services.dbDesign"),
      description: t("services.dbDesignDesc"),
    },
  ];

  return (
    <section id="services" className="py-16 px-6 md:px-12 bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TextTransition springConfig={presets.gentle} inline>
            {t("nav.services")}
          </TextTransition>
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={`${langKey}-${index}`}
              className="group bg-blue-900/30 hover:bg-blue-800/40 p-6 rounded-2xl border border-blue-500/20 shadow-md hover:shadow-blue-500/10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {service.icon}
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
