import { useState, useEffect } from "react";

type TypingEffectParams = {
  text: string;
  speed?: number;
  reverse?: boolean;
};

export function useTypingEffect({ text, speed = 60, reverse = false }: TypingEffectParams) {
  const [displayed, setDisplayed] = useState(reverse ? text : "");
  useEffect(() => {
    let current = reverse ? text.length : 0;
    let interval: number; // <-- Corrigido aqui

    function type() {
      setDisplayed(prev =>
        reverse
          ? prev.slice(0, -1)
          : text.slice(0, current + 1)
      );
      current = reverse ? current - 1 : current + 1;
      if ((!reverse && current >= text.length) || (reverse && current <= 0)) {
        clearInterval(interval);
      }
    }

    interval = window.setInterval(type, speed);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [text, reverse]);
  return displayed;
}
