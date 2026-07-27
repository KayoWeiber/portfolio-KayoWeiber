import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { BIRTH_DATE, calculateAge } from "../utils/calculateAge";
import AboutIntro from "./AboutIntro";
import TechStackPanel from "./TechStackPanel";
import GitHubActivityPanel from "./GitHubActivityPanel";
import Timeline from "./Timeline";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const About: React.FC = () => {
  const { ready } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const age = calculateAge(BIRTH_DATE);

  if (!ready) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <span className="text-white text-xl">Loading...</span>
      </section>
    );
  }

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#07111f] py-20 px-4 scroll-mt-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),transparent_34%),linear-gradient(225deg,rgba(16,185,129,0.12),transparent_30%),linear-gradient(180deg,#07111f_0%,#0f172a_52%,#111827_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-center"
        >
          <AboutIntro age={age} />
          <TechStackPanel isInView={isInView} />
        </motion.div>

        <GitHubActivityPanel isInView={isInView} />

        <Timeline />
      </div>
    </section>
  );
};

export default About;
