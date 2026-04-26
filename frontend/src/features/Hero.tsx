import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTypingEffect } from "../hooks/useTypingEffect";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const displayedRole = useTypingEffect({ text: t("hero.role"), speed: 40 });

  return (
    <section
      id="home"
      className="hero-depth min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-12 px-4 pt-28"
    >
      <div className="flex flex-col items-start justify-start gap-6 max-w-xl">
        <span className="uppercase text-sky-300 font-bold tracking-widest text-base mb-1">
          {t("hero.hello")}
        </span>
        <h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-1 text-left"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Kayo Weiber,
        </h1>
        <h2
          className="text-3xl md:text-4xl font-semibold text-sky-100 h-12 mb-1 text-left"
          style={{ minHeight: 48 }}
        >
          {displayedRole}
          <span className="text-sky-300 animate-pulse">|</span>
        </h2>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/#portfolio"
            className="inline-flex items-center justify-center rounded-md bg-sky-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-950/30 transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
          >
            {t("hero.viewProjects")}
          </Link>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center rounded-md border border-sky-300/70 px-5 py-3 text-sm font-bold text-sky-100 transition hover:bg-sky-300/10 focus:outline-none focus:ring-2 focus:ring-sky-200"
          >
            {t("hero.contactMe")}
          </Link>
        </div>

        <div className="flex gap-4 mt-2">
          <a
            href="https://www.linkedin.com/in/kayo-weiber-134067280/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-300 hover:text-sky-200 transition text-3xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/KayoWeiber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-300 hover:text-sky-200 transition text-3xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-sky-800 via-blue-600 to-teal-300 animate-float-y shadow-2xl flex items-center justify-center transition-transform duration-700">
            <img
              src="/Avatar.jpg"
              alt={t("hero.avatarAlt")}
              loading="eager"
              width={256}
              height={256}
              className="w-44 h-44 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#181818] shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
