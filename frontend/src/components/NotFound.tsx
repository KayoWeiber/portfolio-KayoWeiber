import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  useDocumentMeta(t("notFound.metaTitle"), t("notFound.description"));

  useEffect(() => {
    const robotsTag = document.createElement("meta");
    robotsTag.name = "robots";
    robotsTag.content = "noindex";
    document.head.appendChild(robotsTag);

    return () => {
      document.head.removeChild(robotsTag);
    };
  }, []);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center text-white">
      <motion.span
        className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-300 md:text-9xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.span>

      <motion.h1
        className="mt-4 text-2xl font-bold md:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        {t("notFound.title")}
      </motion.h1>

      <motion.p
        className="mt-3 max-w-md text-base text-slate-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        {t("notFound.description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-950/30 transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
        >
          <FaHome aria-hidden="true" />
          {t("notFound.backHome")}
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;
