import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import TextTransition, { presets } from "react-text-transition";

const navLinks = [
  { href: "#home", label: "Home", pt: "Início" },
  { href: "#about", label: "About Me", pt: "Sobre Mim" },
  { href: "#services", label: "Services", pt: "Serviços" },
  { href: "#portfolio", label: "Portfolio", pt: "Portfólio" },
  { href: "#contact", label: "Contact", pt: "Contato" },
];

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const [active, setActive] = useState("Home");
  const [lang, setLang] = useState(i18n.resolvedLanguage === "en-US");

  // Troca idioma e atualiza estado
  const handleLangSwitch = () => {
    const nextLang = lang ? "pt-BR" : "en-US";
    i18n.changeLanguage(nextLang);
    setLang(!lang);
  };

  return (
    <header className="w-full bg-[#181818] shadow-lg fixed top-0 left-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        {/* Nome à esquerda com animação de digitação */}
        <span
          className="text-2xl md:text-3xl font-extrabold tracking-tight select-none text-blue-600"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <TypeAnimation
            sequence={["Kayo Weiber", 1000]}
            speed={20}
            cursor={true}
            repeat={0}
            style={{
              display: "inline-block",
              fontFamily: "'Montserrat', sans-serif",
            }}
          />
        </span>

        {/* Navegação central com transição animada */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`relative px-2 py-1 text-base font-medium transition-colors duration-200
                ${active === link.label ? "text-white" : "text-gray-300 hover:text-blue-400"}
              `}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <TextTransition
                springConfig={presets.gentle}
                inline
              >
                {lang ? link.label : link.pt}
              </TextTransition>
              {active === link.label && (
                <span
                  className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-6 h-1.5"
                  style={{
                    background: "#2563eb", // azul escuro
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Switch de idioma à direita igual ao anexo */}
        <div
          className="ml-4 flex items-center bg-[#181818] rounded-full border border-blue-400 px-1 py-0.5 cursor-pointer select-none transition-all"
          style={{ height: "32px", minWidth: "100px" }}
          onClick={handleLangSwitch}
        >
          <span
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all
              ${!lang ? "bg-blue-400 text-white shadow" : "text-white"}
            `}
            style={{ minWidth: "56px", textAlign: "center" }}
          >
            PT-BR
          </span>
          <span className="text-blue-300 font-bold px-1 text-xs">|</span>
          <span
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all
              ${lang ? "bg-blue-400 text-white shadow" : "text-white"}
            `}
            style={{ minWidth: "36px", textAlign: "center" }}
          >
            EN
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
