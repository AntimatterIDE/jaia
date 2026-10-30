"use client";

/**
 * React Bits Pro `bento-1`: sources feeding a central node.
 * Demo record counts are not used.
 */

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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
];

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
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = sources.slice(0, 4);

  return (
    <article className="border-brand-mist flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-3xl border bg-white">
      <div className="relative min-h-[220px] flex-1">
        <div aria-hidden="true" className="dot-grid absolute inset-0" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 py-8">
          <div className="grid w-full max-w-[420px] grid-cols-2 gap-2 sm:grid-cols-4">
            {shown.map((source, index) => {
              const Icon = source.icon;
              const active = hovered === index;
              return (
                <button
                  key={source.label}
                  type="button"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center ${
                    active ? "border-brand-action bg-brand-sky-soft" : "border-brand-mist bg-white"
                  }`}
                >
                  <Icon className="text-brand-action size-5" strokeWidth={1.75} />
                  <span className="text-brand-ink text-xs font-semibold">{source.label}</span>
                </button>
              );
            })}
          </div>
          <svg viewBox="0 0 400 70" className="text-brand-sky mt-1 h-12 w-full max-w-[420px]" aria-hidden="true">
            {shown.map((source, index) => (
              <motion.path
                key={source.label}
                d={paths[index]}
                fill="none"
                stroke="currentColor"
                strokeWidth={hovered === index ? 2 : 1.25}
                initial={false}
                animate={{ opacity: hovered === null || hovered === index ? 1 : 0.35 }}
              />
            ))}
          </svg>
          <div className="bg-brand-action -mt-2 flex size-16 items-center justify-center rounded-full text-sm font-semibold text-white shadow-lg">
            {hub}
          </div>
          <p className="text-brand-slate mt-4 max-w-xs text-center text-sm leading-relaxed">
            {hovered === null ? body : shown[hovered].detail}
          </p>
        </div>
      </div>
      <div className="px-6 pt-2 pb-6">
        <h3 className="font-display text-brand-ink text-lg font-semibold">{title}</h3>
        {reduce ? <p className="text-brand-slate mt-2 text-sm">{body}</p> : null}
      </div>
    </article>
  );
}
