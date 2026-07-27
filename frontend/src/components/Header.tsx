import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import TextTransition, { presets } from "react-text-transition";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data/navigation";

const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [active, setActive] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEnglish = i18n.resolvedLanguage === "en-US";

  const sectionLinks = useMemo(
    () => navLinks.filter((link) => link.href.startsWith("/#")),
    []
  );

  const handleLangSwitch = () => {
    void i18n.changeLanguage(isEnglish ? "pt-BR" : "en-US");
  };

  const handleMobileMenuToggle = () => setMobileMenuOpen((open) => !open);

  useEffect(() => {
    const currentPathWithHash = location.pathname + location.hash;
    const matchedLink = navLinks.find((link) => link.href === currentPathWithHash);

    if (matchedLink) {
      setActive(matchedLink.label);
      return;
    }

    if (location.pathname === "/") {
      setActive("Home");
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matchedLink = sectionLinks.find(
              (link) => link.href === `/#${entry.target.id}`
            );

            if (matchedLink) {
              setActive(matchedLink.label);
            }
          }
        });
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    if (location.pathname === "/") {
      sectionLinks.forEach((link) => {
        const element = document.querySelector(link.href.replace("/", ""));

        if (element) {
          observer.observe(element);
        }
      });
    }

    return () => observer.disconnect();
  }, [location.pathname, sectionLinks]);

  const isActive = (href: string, label: string) => {
    if (location.pathname !== "/") {
      return location.pathname === href;
    }

    return active === label;
  };

  const LanguageToggle = ({ className = "" }: { className?: string }) => (
    <button
      type="button"
      className={`flex items-center bg-slate-950/60 rounded-full border border-sky-400/70 px-1 select-none transition-all shadow-sm hover:shadow-sky-500/20 focus:outline-none focus:ring-2 focus:ring-sky-300 ${className} cursor-pointer`}
      style={{ height: "44px", minWidth: "108px" }}
      onClick={handleLangSwitch}
      aria-label={t("language.switch")}
      title={t("language.switch")}
    >
      <span
        className={`px-3 py-1 rounded-full font-bold text-xs transition-all ${
          !isEnglish ? "bg-sky-400 text-slate-950 shadow" : "text-sky-200"
        }`}
        style={{ minWidth: "56px", textAlign: "center" }}
      >
        PT-BR
      </span>

      <span className="text-sky-300 font-bold px-1 text-xs">|</span>

      <span
        className={`px-3 py-1 rounded-full font-bold text-xs transition-all ${
          isEnglish ? "bg-sky-400 text-slate-950 shadow" : "text-sky-200"
        }`}
        style={{ minWidth: "36px", textAlign: "center" }}
      >
        EN
      </span>
    </button>
  );

  return (
    <header className="w-full fixed top-0 left-0 z-30 font-sans bg-gradient-to-r from-slate-950/95 via-slate-950/90 to-sky-950/85 shadow-lg border-b border-sky-500/20 backdrop-blur-md transition-colors duration-500">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-sky-700 text-white px-3 py-2 rounded shadow"
      >
        {t("accessibility.skipContent")}
      </a>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-3 relative">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t("accessibility.backToTop")}
          title={t("accessibility.backToTop")}
          className="cursor-pointer text-2xl md:text-3xl font-extrabold tracking-tight select-none text-sky-300 drop-shadow-[0_2px_8px_rgba(56,189,248,0.25)] bg-transparent border-0 p-0"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <TypeAnimation
            sequence={["KW", 1000]}
            speed={1}
            cursor={true}
            repeat={0}
            style={{
              display: "inline-block",
              fontFamily: "'Montserrat', sans-serif",
            }}
          />
        </button>

        <nav
          className="hidden md:flex items-center gap-7"
          aria-label={t("nav.mainMenu")}
        >
          {navLinks.map((link) =>
            link.label === "Contact" ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => {
                  setActive(link.label);
                  setMobileMenuOpen(false);
                }}
                className="rounded-md bg-sky-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-md transition hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <TextTransition springConfig={presets.gentle} inline>
                  {t(link.translationKey)}
                </TextTransition>
              </Link>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => {
                  setActive(link.label);
                  setMobileMenuOpen(false);
                }}
                aria-current={isActive(link.href, link.label) ? "page" : undefined}
                className={`relative px-2 py-1 text-base font-medium transition-all duration-200 group ${
                  isActive(link.href, link.label)
                    ? "text-sky-100"
                    : "text-slate-200 hover:text-sky-300"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <TextTransition springConfig={presets.gentle} inline>
                  {t(link.translationKey)}
                </TextTransition>

                <span
                  className={`absolute left-1/2 -bottom-2 -translate-x-1/2 h-1.5 rounded bg-sky-400/80 transition-all duration-300 ${
                    isActive(link.href, link.label)
                      ? "w-6 opacity-100"
                      : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-60"
                  }`}
                />
              </Link>
            )
          )}
        </nav>

        <LanguageToggle className="hidden md:flex" />

        <button
          type="button"
          className="md:hidden text-white hover:text-sky-300 transition text-3xl ml-2 p-2 z-[999]"
          aria-label={mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={mobileMenuOpen}
          onClick={handleMobileMenuToggle}
        >
          {mobileMenuOpen ? (
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          className="absolute top-full left-0 w-full bg-slate-950 shadow-lg md:hidden z-40 transition-all"
          aria-label={t("nav.mobileMenu")}
        >
          <div className="flex flex-col gap-2 px-6 py-4">
            {navLinks.map((link) =>
              link.label === "Contact" ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    setActive(link.label);
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-md bg-sky-500 px-3 py-2 text-lg font-bold text-slate-950 text-center shadow-md transition hover:bg-sky-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t(link.translationKey)}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    setActive(link.label);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-lg font-semibold py-2 px-3 rounded transition ${
                    isActive(link.href, link.label)
                      ? "bg-sky-500/20 text-sky-100"
                      : "text-slate-200 hover:bg-sky-500/10 hover:text-sky-300"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {t(link.translationKey)}
                </Link>
              )
            )}

            <div className="mt-4">
              <LanguageToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;