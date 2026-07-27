import { useEffect, useState } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];

export function useKonamiCode() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let progress = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      const expectedKey = KONAMI_SEQUENCE[progress];
      const pressedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (pressedKey === expectedKey) {
        progress += 1;

        if (progress === KONAMI_SEQUENCE.length) {
          setIsActive(true);
          progress = 0;
        }
        return;
      }

      progress = pressedKey === KONAMI_SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const dismiss = () => setIsActive(false);

  return { isActive, dismiss };
}
