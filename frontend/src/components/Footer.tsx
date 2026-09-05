import React from "react";
import { useTranslation } from "react-i18next";
import { contactInfo } from "../data/contactLinks";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-8 pb-24 text-center border-t border-sky-700/20">
      <div className="text-sm">
        © {new Date().getFullYear()} {t("hero.name")}. {t("footer.rights")}.
      </div>
      <div className="mt-2">
        <a
          href={contactInfo.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
