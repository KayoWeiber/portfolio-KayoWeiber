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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLangSwitch = () => {
    const nextLang = lang ? "pt-BR" : "en-US";
    i18n.changeLanguage(nextLang);
    setLang(!lang);
  };

  const handleMobileMenuToggle = () => setMobileMenuOpen((open) => !open);

  return (
    <header className="w-full fixed top-0 left-0 z-30 font-sans bg-gradient-to-r from-[#0a2342cc] via-[#181818cc] to-[#2563ebcc] shadow-lg border-b border-blue-700/30 backdrop-blur-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-3 relative">
        <span
          className="text-2xl md:text-3xl font-extrabold tracking-tight select-none text-blue-400 drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <TypeAnimation
            sequence={["KW", 1000]}
            speed={1}
            cursor={true}
            repeat={0}
            style={{ display: "inline-block", fontFamily: "'Montserrat', sans-serif" }}
          />
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={`relative px-2 py-1 text-base font-medium transition-all duration-200
                ${active === link.label ? "text-blue-200" : "text-gray-200 hover:text-blue-400"}
                group
               `}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <TextTransition springConfig={presets.gentle} inline>
                {lang ? link.label : link.pt}
              </TextTransition>
              <span className={`
                absolute left-1/2 -bottom-2 -translate-x-1/2 h-1.5 rounded bg-blue-500/80 transition-all duration-300
                ${active === link.label ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-60"}
              `}/>
            </a>
          ))}
        </nav>

        <div
          className="ml-4 flex items-center bg-blue-900/50 rounded-full border border-blue-400 px-1 py-0.5 cursor-pointer select-none transition-all shadow-sm hover:shadow-blue-500/20"
          style={{ height: "32px", minWidth: "100px" }}
          onClick={handleLangSwitch}
          title="Switch Language"
        >
          <span
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all
              ${!lang ? "bg-blue-400 text-white shadow" : "text-blue-200"}
            `}
            style={{ minWidth: "56px", textAlign: "center" }}
          >
            PT-BR
          </span>
          <span className="text-blue-300 font-bold px-1 text-xs">|</span>
          <span
            className={`px-3 py-1 rounded-full font-bold text-xs transition-all
              ${lang ? "bg-blue-400 text-white shadow" : "text-blue-200"}
            `}
            style={{ minWidth: "36px", textAlign: "center" }}
          >
            EN
          </span>
        </div>

        <button
          className="md:hidden text-blue-300 hover:text-blue-400 transition text-2xl ml-2 z-50"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={handleMobileMenuToggle}
        >
          {mobileMenuOpen ? (
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-gradient-to-b from-[#0a2342] via-[#181818] to-[#2563eb] shadow-lg md:hidden z-40 transition-all">
          <div className="flex flex-col gap-2 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActive(link.label);
                  setMobileMenuOpen(false);
                }}
                className={`text-lg font-semibold py-2 px-3 rounded transition
                  ${active === link.label ? "bg-blue-500/20 text-blue-200" : "text-gray-200 hover:bg-blue-500/10 hover:text-blue-400"}`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {lang ? link.label : link.pt}
              </a>
            ))}
            <div className="mt-4">
              <div
                className="flex items-center bg-blue-900/50 rounded-full border border-blue-400 px-1 py-0.5 cursor-pointer select-none transition-all shadow-sm hover:shadow-blue-500/20"
                style={{ height: "32px", minWidth: "100px" }}
                onClick={handleLangSwitch}
                title="Switch Language"
              >
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs transition-all
                    ${!lang ? "bg-blue-400 text-white shadow" : "text-blue-200"}
                  `}
                  style={{ minWidth: "56px", textAlign: "center" }}
                >
                  PT-BR
                </span>
                <span className="text-blue-300 font-bold px-1 text-xs">|</span>
                <span
                  className={`px-3 py-1 rounded-full font-bold text-xs transition-all
                    ${lang ? "bg-blue-400 text-white shadow" : "text-blue-200"}
                  `}
                  style={{ minWidth: "36px", textAlign: "center" }}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;