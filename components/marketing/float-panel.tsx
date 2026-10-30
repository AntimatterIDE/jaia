"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useMotionAllowed } from "@/lib/use-motion-allowed";

/**
 * A slow vertical drift for decorative diagrams. Content stays put until
 * motion is allowed, so the first paint matches the server HTML.
 */
export function FloatPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const allowed = useMotionAllowed();

  return (
    <motion.div
      className={className}
      initial={false}
      animate={allowed ? { y: [0, -10, 0] } : { y: 0 }}
      transition={
        allowed
          ? { duration: 7.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}
