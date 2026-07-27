import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaTerminal } from "react-icons/fa";
import { useModalA11y } from "../hooks/useModalA11y";
import { useTerminalCommands } from "../hooks/useTerminalCommands";
import type { TerminalLine } from "../types/terminal";

const TerminalPanel = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const commands = useTerminalCommands(t);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: t("terminal.welcome") },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useModalA11y(true, onClose, dialogRef);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const runCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const inputLine: TerminalLine = { type: "input", content: trimmed };

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const command = commands[trimmed.toLowerCase()];

    if (!command) {
      setLines((prev) => [
        ...prev,
        inputLine,
        { type: "error", content: t("terminal.notFound", { command: trimmed }) },
      ]);
      return;
    }

    const output = command.run().map<TerminalLine>((content) => ({
      type: "output",
      content,
    }));

    setLines((prev) => [...prev, inputLine, ...output]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runCommand(input);
    setCommandHistory((prev) => (input.trim() ? [...prev, input.trim()] : prev));
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-end p-0 sm:items-center sm:justify-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ background: "rgba(15,23,42,0.6)" }}
      >
        <motion.div
          ref={dialogRef}
          className="flex h-[100dvh] w-full max-w-2xl flex-col overflow-hidden border border-sky-400/30 bg-slate-950/95 shadow-2xl sm:h-[70vh] sm:rounded-lg"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={t("terminal.title")}
          onAnimationComplete={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" aria-hidden="true" />

            <span className="ml-2 flex-1 truncate text-center text-xs font-medium text-slate-400">
              {t("terminal.title")}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-400 transition hover:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
              aria-label={t("modal.close")}
            >
              ×
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm leading-6"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, index) => (
              <div
                key={index}
                className={
                  line.type === "input"
                    ? "text-sky-200"
                    : line.type === "error"
                      ? "text-red-300"
                      : "whitespace-pre-wrap text-slate-300"
                }
              >
                {line.type === "input" ? `> ${line.content}` : line.content}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-800 px-4 py-3">
            <span className="font-mono text-sm text-sky-300">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 bg-transparent font-mono text-base text-white outline-none placeholder:text-slate-400"
              placeholder={t("terminal.placeholder")}
              aria-label={t("terminal.title")}
            />
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

const Terminal: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/40 bg-slate-950/90 text-sky-300 shadow-lg shadow-sky-950/40 transition hover:scale-105 hover:border-sky-300/70 hover:text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
        aria-label={t("terminal.open")}
        title={t("terminal.open")}
      >
        <FaTerminal size={18} aria-hidden="true" />
      </button>

      {isOpen && <TerminalPanel onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Terminal;
