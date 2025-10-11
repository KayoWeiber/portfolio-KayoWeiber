import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useTypingEffect } from "../hooks/useTypingEffect";
//import Avatar from "../assets/Avatar.jpg";

const roles = {
  "pt-BR": "Desenvolvedor de Software",
  "en-US": "Software Developer",
};

const Hero: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [reverse, setReverse] = useState(false);
  const [lang, setLang] = useState(i18n.resolvedLanguage);

  const [roleText, setRoleText] = useState(roles[lang as keyof typeof roles]);
  const displayedRole = useTypingEffect({ text: roleText, speed: 40, reverse });

  useEffect(() => {
    if (lang !== i18n.resolvedLanguage) {
      setReverse(true);
      setTimeout(() => {
        setRoleText(roles[i18n.resolvedLanguage as keyof typeof roles]);
        setReverse(false);
        setLang(i18n.resolvedLanguage);
      }, (roleText.length + 1) * 40);
    }
    // eslint-disable-next-line
  }, [i18n.resolvedLanguage]);

  return (
    <section
      id="home"
      className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-12 px-4 pt-28"
    >
      {/* Texto */}
      <div className="flex flex-col items-start justify-start gap-6 max-w-lg">
        <span className="uppercase text-blue-400 font-bold tracking-widest text-base mb-1">
          {t("hero.hello")}
        </span>
        <h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-1 text-left"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Kayo Weiber,
        </h1>
        <h2
          className="text-3xl md:text-4xl font-semibold text-blue-200 h-12 mb-1 text-left"
          style={{ minHeight: 48 }}
        >
          {displayedRole}
          <span className="text-blue-400 animate-pulse">|</span>
        </h2>
        <div className="flex gap-4 mt-2">
          <a
            href="https://www.linkedin.com/in/kayo-weiber-134067280/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition text-3xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/KayoWeiber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition text-3xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Imagem */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 animate-float-y shadow-2xl flex items-center justify-center transition-transform duration-700">
            <img
              src="/Avatar.jpg"
              alt="Foto de perfil de Kayo Weiber"
              loading="lazy"
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
