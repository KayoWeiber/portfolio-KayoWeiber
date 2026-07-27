import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { usePointerDevice } from "../hooks/usePointerDevice";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea";

const CustomCursor: React.FC = () => {
  const hasFinePointer = usePointerDevice();
  const prefersReducedMotion = useReducedMotion();
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const isEnabled = hasFinePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsHoveringInteractive(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, [isEnabled, cursorX, cursorY]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border-2 border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHoveringInteractive ? 44 : 20,
        height: isHoveringInteractive ? 44 : 20,
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHoveringInteractive ? "rgba(56,189,248,0.35)" : "transparent",
      }}
      transition={{ duration: 0.18 }}
    />
  );
};

export default CustomCursor;
