import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  const location = useLocation();
  const hash = useMemo(() => location.hash.replace("#", ""), [location.hash]);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }, 100);
      }

      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [hash, location.pathname]);

  return null;
};

export default ScrollToHashElement;
