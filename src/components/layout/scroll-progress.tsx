"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin fixed bar at the very top showing page scroll progress in the four PS colours. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="ps-gradient-x pointer-events-none fixed inset-x-0 top-0 z-60 h-[3px] origin-left"
    />
  );
}
