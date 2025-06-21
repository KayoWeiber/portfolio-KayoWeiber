import React from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import Avatar from "../assets/Avatar.jpg";


const Hero: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section
            id="home"
            className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-10 px-6 pt-32"
        >
            {/* Texto principal */}
            <div className="flex-1 flex flex-col items-start gap-6 max-w-xl">
                <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                    <TypeAnimation
                        sequence={[t("hero.greeting"), 1000]}
                        speed={20}
                        cursor={true}
                        repeat={0}
                        style={{
                            display: "inline-block",
                            fontFamily: "'Montserrat', sans-serif",
                        }}
                    />
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
                    {t("hero.role")}
                </h2>
                <p className="text-gray-300 text-base md:text-lg">{t("hero.description")}</p>
                <div className="flex gap-4 mt-2">
                    <a
                        href="#contact"
                        className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition"
                    >
                        {t("hero.cta_contact")}
                    </a>
                    <a
                        href="/cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 rounded-full border-2 border-blue-400 text-blue-400 font-bold hover:bg-blue-400 hover:text-white transition"
                    >
                        {t("hero.cta_cv")}
                    </a>
                </div>
            </div>
            {/* Foto/avatar */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-800 to-blue-400 p-1 shadow-2xl">
                    <img
                        src={Avatar}
                        alt="Kayo Weiber"
                        className="w-full h-full object-cover rounded-full border-4 border-[#181818]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
