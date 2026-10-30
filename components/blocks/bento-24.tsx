"use client";

/**
 * React Bits Pro `bento-24`: a live waveform.
 * The trace is an illustration. It is not a patient recording, and the
 * demo transcript is not used.
 */

import { motion, useReducedMotion } from "motion/react";

const wave = "M0 40 C 20 40 20 12 40 12 C 60 12 60 68 80 68 C 100 68 100 28 120 28 C 140 28 140 52 160 52 C 180 52 180 18 200 18 C 220 18 220 64 240 64 C 260 64 260 36 280 36 C 300 36 300 48 320 48";

export function Bento24({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const reduce = useReducedMotion();

  return (
    <article className="border-brand-mist flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-3xl border bg-white">
      <div className="relative flex min-h-[200px] flex-1 items-center px-4">
        <div aria-hidden="true" className="dot-grid absolute inset-0" />
        <svg viewBox="0 0 320 80" className="relative w-full" role="img" aria-label="Illustration of a heart-rate trace">
          <path d={wave} fill="none" stroke="var(--brand-mist)" strokeWidth="3" strokeLinecap="round" />
          <motion.path
            d={wave}
            fill="none"
            stroke="var(--brand-action)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1] }}
            transition={reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <div className="px-6 pt-2 pb-6">
        <p className="text-brand-action text-xs font-semibold tracking-[0.14em] uppercase">Illustration</p>
        <h3 className="font-display text-brand-ink mt-2 text-lg font-semibold">{title}</h3>
        <p className="text-brand-slate mt-1.5 text-sm leading-relaxed">{body}</p>
      </div>
    </article>
  );
}
