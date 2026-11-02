"use client";

/**
 * React Bits Pro `bento-1`: sources feeding a central node.
 * Demo record counts are not used.
 */

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export interface BentoSource {
  label: string;
  detail: string;
  icon: LucideIcon;
}

const paths = [
  "M50 0 C50 44 200 22 200 64",
  "M150 0 C150 40 200 30 200 64",
  "M250 0 C250 40 200 30 200 64",
  "M350 0 C350 44 200 22 200 64",
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Bento1({
  sources,
  hub = "JAIA",
  title,
  body,
}: {
  sources: readonly BentoSource[];
  hub?: string;
  title: string;
  body: string;
}) {
  const reduce = useReducedMotion();
  const detailId = useId();
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = sources.slice(0, 4);
  const active = hovered === null ? null : shown[hovered];
  const detail = active?.detail ?? body;
  const columns =
    shown.length <= 1
      ? "grid-cols-1"
      : shown.length === 2
        ? "grid-cols-2"
        : shown.length === 3
          ? "grid-cols-3"
          : "grid-cols-2 sm:grid-cols-4";

  return (
    <article className="border-brand-mist flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-3xl border bg-white">
      <div className="relative min-h-[220px] flex-1">
        <div aria-hidden="true" className="dot-grid absolute inset-0" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 py-8">
          <div className={`grid w-full max-w-[420px] gap-2 ${columns}`}>
            {shown.map((source, index) => {
              const Icon = source.icon;
              const on = hovered === index;
              return (
                <button
                  key={source.label}
                  type="button"
                  aria-describedby={detailId}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center transition-[border-color,background-color,box-shadow] duration-200 ease-out ${
                    on
                      ? "border-brand-action bg-brand-sky-soft shadow-sm"
                      : "border-brand-mist bg-white hover:border-brand-sky"
                  }`}
                >
                  <Icon className="text-brand-action size-5" strokeWidth={1.75} />
                  <span className="text-brand-ink text-xs font-semibold">{source.label}</span>
                </button>
              );
            })}
          </div>
          <svg
            viewBox="0 0 400 70"
            className="text-brand-sky mt-1 h-12 w-full max-w-[420px]"
            aria-hidden="true"
          >
            {shown.map((source, index) => (
              <motion.path
                key={source.label}
                d={paths[index]}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                initial={false}
                animate={{
                  opacity: hovered === null || hovered === index ? 1 : 0.28,
                  strokeWidth: hovered === index ? 2.25 : 1.25,
                }}
                transition={{ duration: reduce ? 0 : 0.28, ease }}
              />
            ))}
          </svg>
          <div className="bg-brand-action -mt-2 flex size-16 items-center justify-center rounded-full text-sm font-semibold text-white shadow-lg">
            {hub}
          </div>
          <div
            id={detailId}
            aria-live="polite"
            className="relative mt-4 flex min-h-[3.25rem] w-full max-w-xs items-start justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={detail}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: reduce ? 0 : 0.22, ease }}
                className="text-brand-slate absolute inset-x-0 text-center text-sm leading-relaxed"
              >
                {detail}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="px-6 pt-2 pb-6">
        <h3 className="font-display text-brand-ink text-lg font-semibold">{title}</h3>
        {reduce ? <p className="text-brand-slate mt-2 text-sm">{body}</p> : null}
      </div>
    </article>
  );
}
