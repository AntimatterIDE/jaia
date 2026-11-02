"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Soft JAIA-blue atmosphere for heroes and section bands.
 * Opacity-only drifts; paused under prefers-reduced-motion.
 */
export function SkyAtmosphere({
  tone = "hero",
}: {
  tone?: "hero" | "section";
}) {
  const reduce = useReducedMotion();
  const strong = tone === "hero";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={
          strong
            ? "absolute inset-0 bg-[radial-gradient(ellipse_at_90%_-5%,rgba(135,205,236,0.72),transparent_48%),radial-gradient(ellipse_at_5%_90%,rgba(39,111,145,0.22),transparent_46%),radial-gradient(ellipse_at_40%_110%,rgba(234,245,251,0.9),transparent_50%),linear-gradient(185deg,rgba(135,205,236,0.28)_0%,transparent_38%)]"
            : "absolute inset-0 bg-[radial-gradient(ellipse_at_90%_0%,rgba(135,205,236,0.42),transparent_48%),radial-gradient(ellipse_at_0%_100%,rgba(234,245,251,0.85),transparent_52%)]"
        }
      />
      <div
        className={
          strong
            ? "absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(39,111,145,0.14)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_60%_at_80%_20%,#000_20%,transparent_75%)]"
            : "absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(39,111,145,0.12)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_60%_50%_at_90%_0%,#000_10%,transparent_70%)]"
        }
      />
      <motion.div
        className="absolute -top-8 right-[2%] size-64 rounded-full bg-[radial-gradient(circle,rgba(135,205,236,0.7)_0%,transparent_68%)] blur-2xl sm:size-[22rem]"
        animate={reduce ? undefined : { x: [0, -32, 0], y: [0, 22, 0], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[28%] right-[28%] size-40 rounded-full bg-[radial-gradient(circle,rgba(39,111,145,0.22)_0%,transparent_70%)] blur-3xl sm:size-56"
        animate={reduce ? undefined : { x: [0, 18, 0], y: [0, -20, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.div
        className="absolute bottom-[-4rem] left-[2%] size-56 rounded-full bg-[radial-gradient(circle,rgba(39,111,145,0.28)_0%,transparent_70%)] blur-3xl sm:size-72"
        animate={reduce ? undefined : { x: [0, 28, 0], y: [0, -18, 0], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
    </div>
  );
}
