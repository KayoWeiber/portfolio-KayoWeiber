import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import { contactInfo } from "../data/contactLinks";

const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL ||
  "https://portfolio-contact-backend-no6y.onrender.com/api/contact";

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

    if (!CONTACT_API_URL) {
      setStatus("error");
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Erro ao enviar");

      setStatus("success");
      form.current.reset();
    } catch (error) {
      console.error("Contact form request failed:", error);
      setStatus("error");
    }
  };

  const contactLinks = [
    {
      icon: FaEnvelope,
      label: t("contact.emailLabel"),
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: FaLinkedin,
      label: t("contact.linkedinLabel"),
      value: contactInfo.linkedinHandle,
      href: contactInfo.linkedinUrl,
    },
    {
      icon: FaGithub,
      label: t("contact.githubLabel"),
      value: contactInfo.githubHandle,
      href: contactInfo.githubUrl,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 px-6 md:px-16 bg-gradient-to-br from-slate-950 via-[#071827] to-sky-950 text-white scroll-mt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.18),transparent_32rem)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">
            {t("contact.subtitle")}
          </span>
          <h2 className="mt-3 text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-sky-200 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
            {t("contact.title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-slate-300">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.aside
            className="space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {contactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-lg border border-sky-500/20 bg-slate-950/55 p-5 transition hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300 ring-1 ring-sky-400/25 transition group-hover:bg-sky-400/20">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-400">
                      {item.label}
                    </span>
                    <span className="block truncate text-base font-bold text-white">
                      {item.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </motion.aside>

          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className="grid grid-cols-1 gap-5 rounded-lg border border-sky-400/20 bg-slate-950/70 p-6 shadow-2xl shadow-sky-950/30 backdrop-blur md:p-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white">{t("contact.formTitle")}</h3>
              <p className="mt-2 text-sm text-slate-400">{t("contact.formDescription")}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="user_name">
                  {t("contact.name")}
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  placeholder={t("contact.namePlaceholder")}
                  autoComplete="name"
                  required
                  className="w-full rounded-md border border-sky-500/20 bg-slate-900/90 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="user_email">
                  {t("contact.email")}
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  placeholder={t("contact.emailPlaceholder")}
                  autoComplete="email"
                  required
                  type="email"
                  className="w-full rounded-md border border-sky-500/20 bg-slate-900/90 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="message">
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                placeholder={t("contact.messagePlaceholder")}
                required
                className="h-40 w-full resize-none rounded-md border border-sky-500/20 bg-slate-900/90 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30"
              />
            </div>

            {status !== "idle" && (
              <motion.div
                className={`flex items-start gap-3 rounded-md border p-4 text-sm ${
                  status === "success"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                    : status === "error"
                      ? "border-red-400/30 bg-red-400/10 text-red-100"
                      : "border-sky-400/30 bg-sky-400/10 text-sky-100"
                }`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                aria-live="polite"
              >
                {status === "success" ? (
                  <FaCheckCircle className="mt-0.5 shrink-0" aria-hidden="true" />
                ) : status === "error" ? (
                  <FaExclamationCircle className="mt-0.5 shrink-0" aria-hidden="true" />
                ) : (
                  <span className="mt-1 h-3 w-3 shrink-0 animate-pulse rounded-full bg-sky-300" />
                )}
                <span>
                  {status === "success"
                    ? t("contact.success")
                    : status === "error"
                      ? (
                        <>
                          {t("contact.fallback")}{" "}
                          <a href={`mailto:${contactInfo.email}`} className="font-bold underline">
                            {contactInfo.email}
                          </a>
                        </>
                      )
                      : t("contact.waitMessage")}
                </span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-sky-400 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-sky-950/30 transition hover:bg-cyan-300 disabled:cursor-wait disabled:bg-sky-700 disabled:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-200 cursor-pointer "
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
            >
              <FaPaperPlane aria-hidden="true" />
              {status === "sending" ? t("contact.sending") : t("contact.send")}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
