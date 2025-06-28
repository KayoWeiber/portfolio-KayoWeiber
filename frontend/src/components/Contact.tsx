// src/components/Contact.tsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const { t, } = useTranslation();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus("sending");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setStatus("success");
        form.current?.reset();
      })
      .catch((err) => {
        console.error("Erro ao enviar:", err);
        setStatus("error");
      });
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white"
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <input
          className="p-4 rounded-md bg-slate-800 placeholder:text-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="user_name"
          placeholder={t("contact.name")}
          required
        />
        <input
          className="p-4 rounded-md bg-slate-800 placeholder:text-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          name="user_email"
          placeholder={t("contact.email")}
          required
        />
        <textarea
          className="p-4 h-40 rounded-md bg-slate-800 placeholder:text-blue-200 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="message"
          placeholder={t("contact.message")}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-md transition"
          disabled={status === "sending"}
        >
          {status === "sending"
            ? t("contact.sending")
            : status === "success"
            ? t("contact.success")
            : status === "error"
            ? t("contact.error")
            : t("contact.send")}
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
