"use client";

/**
 * React Bits Pro `bento-16`: a layer stack that spreads on hover.
 * Demo infrastructure counts are not used.
 */

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export interface BentoLayer {
  label: string;
  detail: string;
  icon: LucideIcon;
  title?: string;
}

export function Bento16({
  layers,
  title,
  body,
}: {
  layers: readonly BentoLayer[];
  title: string;
  body: string;
}) {
  const reduce = useReducedMotion();
  const [spread, setSpread] = useState(true);
  const [hot, setHot] = useState<number | null>(null);
  const shown = layers.slice(0, 4).map((layer) => ({
    ...layer,
    label: layer.label || layer.title || "",
  }));

  return (
    <article
      className="border-brand-mist relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-3xl border bg-white"
      onPointerEnter={() => setSpread(true)}
      onPointerLeave={() => {
        setSpread(true);
        setHot(null);
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(135,205,236,0.24),transparent_55%)]"
      />
      <div className="relative min-h-[280px] flex-1 px-6 py-8">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto flex max-w-sm flex-col items-stretch gap-3">
          {shown.map((layer, index) => {
            const Icon = layer.icon;
            const lit = hot === index || (hot === null && index === 0);
            return (
              <motion.button
                key={layer.label}
                type="button"
                onMouseEnter={() => setHot(index)}
                onFocus={() => setHot(index)}
                initial={false}
                animate={{
                  y: reduce || spread ? 0 : index * -12,
                  scale: reduce || spread ? 1 : 1 - index * 0.02,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-2xl border px-4 py-3.5 text-left shadow-sm transition-[border-color,background-color,color] duration-200 ${
                  lit
                    ? "border-brand-action bg-brand-action text-white"
                    : "border-brand-mist bg-white text-brand-ink"
                }`}
                style={{ zIndex: shown.length - index }}
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                  <span className="text-sm font-semibold">{layer.label}</span>
                </span>
                <span
                  className={`mt-1.5 block text-xs leading-relaxed ${
                    lit ? "text-white/90" : "text-brand-slate"
                  }`}
                >
                  {layer.detail}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="px-6 pt-2 pb-6">
        <h3 className="font-display text-brand-ink text-lg font-semibold">{title}</h3>
        <p className="text-brand-slate mt-1.5 text-sm leading-relaxed">{body}</p>
      </div>
    </article>
  );
}
