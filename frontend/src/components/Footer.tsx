import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0f172a] text-gray-400 py-8 text-center border-t border-blue-700/20">
      <div className="text-sm">
        © {new Date().getFullYear()} Kayo Weiber. {t("footer.rights")}.
      </div>
      <div className="mt-2">
        <a
          href="https://github.com/KayoWeiber"
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
