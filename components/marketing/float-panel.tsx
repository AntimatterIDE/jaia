"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

import { useMotionAllowed } from "@/lib/use-motion-allowed";

/**
 * A slow vertical drift for decorative diagrams. Pauses while the pointer
 * is over the panel so interactive bentos stay easy to aim at.
 */
export function FloatPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const allowed = useMotionAllowed();
  const [paused, setPaused] = useState(false);
  const drifting = allowed && !paused;

  return (
    <motion.div
      className={className}
      initial={false}
      animate={drifting ? { y: [0, -10, 0] } : { y: 0 }}
      transition={
        drifting
          ? { duration: 7.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.35, ease: "easeOut" }
      }
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {children}
    </motion.div>
  );
}
