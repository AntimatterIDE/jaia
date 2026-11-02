"use client";

/**
 * Home-hero partnership diagram. Open branded composition — not a bordered
 * dashboard card — so JAIA’s symbol and capability pillars read as the visual.
 */

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { JaiaSymbol } from "@/components/jaia-symbol";

export interface HeroPillar {
  label: string;
  detail: string;
  icon: LucideIcon;
}

const paths = [
  "M50 8 C50 40 200 28 200 62",
  "M150 8 C150 36 200 34 200 62",
  "M250 8 C250 36 200 34 200 62",
  "M350 8 C350 40 200 28 200 62",
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroPartnershipVisual({
  pillars,
  title,
  body,
}: {
  pillars: readonly HeroPillar[];
  title: string;
  body: string;
}) {
  const reduce = useReducedMotion();
  const detailId = useId();
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = pillars.slice(0, 4);
  const active = hovered === null ? null : shown[hovered];
  const detail = active?.detail ?? body;

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_50%_30%,rgba(135,205,236,0.45),transparent_62%),radial-gradient(ellipse_at_80%_80%,rgba(39,111,145,0.14),transparent_55%)] blur-sm sm:-inset-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(234,245,251,0.92)_0%,rgba(255,255,255,0.55)_48%,rgba(234,245,251,0.75)_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(39,111,145,0.16)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_40%,#000_25%,transparent_78%)]" />
        <JaiaSymbol className="text-brand-sky absolute -right-10 -bottom-16 size-[22rem] opacity-[0.14] sm:size-[26rem]" />
      </div>

      <div className="relative px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto grid max-w-[28rem] grid-cols-2 gap-2.5 sm:max-w-none sm:grid-cols-4 sm:gap-3">
          {shown.map((pillar, index) => {
            const Icon = pillar.icon;
            const on = hovered === index;
            return (
              <motion.button
                key={pillar.label}
                type="button"
                aria-describedby={detailId}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 + index * 0.06, ease }}
                whileHover={reduce ? undefined : { y: -3 }}
                className={
                  on
                    ? "border-brand-action bg-white text-brand-ink shadow-soft flex flex-col items-center gap-2 rounded-2xl border px-2.5 py-3.5 text-center transition-[border-color,background-color,box-shadow,color] duration-200"
                    : "border-white/70 bg-white/55 text-brand-ink hover:border-brand-sky hover:bg-white/90 flex flex-col items-center gap-2 rounded-2xl border px-2.5 py-3.5 text-center backdrop-blur-sm transition-[border-color,background-color,box-shadow,color] duration-200"
                }
              >
                <span
                  className={
                    on
                      ? "bg-brand-action text-white flex size-9 items-center justify-center rounded-xl"
                      : "bg-brand-sky-soft text-brand-action flex size-9 items-center justify-center rounded-xl"
                  }
                >
                  <Icon className="size-4.5" strokeWidth={1.75} />
                </span>
                <span className="font-display text-[0.6875rem] font-semibold tracking-[0.04em] sm:text-xs">
                  {pillar.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <svg
          viewBox="0 0 400 70"
          className="text-brand-action/55 mx-auto mt-1 hidden h-14 w-full max-w-[28rem] sm:block"
          aria-hidden="true"
        >
          {shown.map((pillar, index) => (
            <motion.path
              key={pillar.label}
              d={paths[index]}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              initial={false}
              animate={{
                opacity: hovered === null || hovered === index ? 1 : 0.22,
                strokeWidth: hovered === index ? 2.35 : 1.35,
              }}
              transition={{ duration: reduce ? 0 : 0.28, ease }}
            />
          ))}
        </svg>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.28, ease }}
          className="border-brand-sky/50 from-brand-action to-brand-action-deep relative mx-auto mt-1 flex size-[5.25rem] items-center justify-center rounded-full border-2 bg-gradient-to-b text-white shadow-[0_12px_40px_rgba(39,111,145,0.35)] sm:mt-0 sm:size-[5.75rem]"
        >
          <JaiaSymbol className="size-10 text-[var(--brand-sky)] sm:size-11" />
          <span className="sr-only">JAIA</span>
        </motion.div>

        <div className="mx-auto mt-6 max-w-md text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.36, ease }}
            className="font-display text-brand-ink text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {title}
          </motion.p>
          <div
            id={detailId}
            aria-live="polite"
            className="relative mt-3 flex min-h-[4.25rem] items-start justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={detail}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: reduce ? 0 : 0.22, ease }}
                className="text-brand-slate absolute inset-x-0 text-sm leading-relaxed sm:text-[0.9375rem]"
              >
                {detail}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
