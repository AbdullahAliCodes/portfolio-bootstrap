"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 6 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

type BlurFadeProps = {
  children: React.ReactNode;
  /** Stagger index; delay = 0.04 * index. */
  index?: number;
  className?: string;
  /**
   * Above-the-fold content: animate with CSS on first paint instead of waiting for
   * hydration + IntersectionObserver (keeps LCP fast and works without JS).
   */
  immediate?: boolean;
};

/**
 * Sanyi-style reveal: opacity 0→1, blur 6px→0, y 6→0, once, when scrolled into view.
 * Reduced motion: the root <MotionConfig reducedMotion="user"> drops the movement, and the
 * CSS variant is disabled in globals.css.
 */
export function BlurFade({ children, index = 0, className, immediate = false }: BlurFadeProps) {
  const delay = 0.04 * index;

  if (immediate) {
    return (
      <div className={cn("animate-blur-fade", className)} style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
