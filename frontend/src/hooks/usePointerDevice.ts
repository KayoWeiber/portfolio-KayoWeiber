import { useEffect, useState } from "react";

export function usePointerDevice() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    setHasFinePointer(query.matches);

    const handleChange = (event: MediaQueryListEvent) => setHasFinePointer(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return hasFinePointer;
}
