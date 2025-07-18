import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    setStatus("sending");

    try {
      const response = await fetch("https://portfolio-contact-backend-no6y.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      setStatus("success");
      form.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white scroll-mt-24"
    >
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t("contact.title")}
      </motion.h2>

      <motion.form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-3xl mx-auto grid grid-cols-1 gap-6 bg-blue-900/20 p-8 rounded-xl shadow-lg backdrop-blur border border-blue-400/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          name="user_name"
          placeholder={t("contact.name")}
          required
          className="p-4 rounded-md bg-slate-800 placeholder:text-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="user_email"
          placeholder={t("contact.email")}
          required
          type="email"
          className="p-4 rounded-md bg-slate-800 placeholder:text-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          placeholder={t("contact.message")}
          required
          className="p-4 h-40 rounded-md bg-slate-800 placeholder:text-blue-200 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-md transition"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
        >
          {status === "sending"
            ? t("contact.sending")
            : status === "success"
            ? t("contact.success")
            : status === "error"
            ? t("contact.error")
            : t("contact.send")}
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
