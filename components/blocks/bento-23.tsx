"use client";

/**
 * React Bits Pro `bento-23`: cards that stack and expand.
 * Demo notifications are not used.
 */

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export interface BentoNote {
  title: string;
  detail: string;
  icon: LucideIcon;
}

export function Bento23({
  items,
  title,
  body,
}: {
  items: readonly BentoNote[];
  title: string;
  body: string;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const shown = items.slice(0, 4);

  return (
    <article
      className="border-brand-mist flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-3xl border bg-white"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
    >
      <div className="relative min-h-[220px] flex-1">
        <div aria-hidden="true" className="dot-grid absolute inset-0" />
        <div className="relative flex h-full flex-col justify-center gap-3 px-6 py-8">
          {shown.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={false}
                animate={{
                  y: open || reduce ? 0 : index * -18,
                  scale: open || reduce ? 1 : 1 - index * 0.03,
                }}
                className="border-brand-mist rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Icon className="text-brand-action mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
                  <div>
                    <p className="text-brand-ink text-sm font-semibold">{item.title}</p>
                    <p className="text-brand-slate mt-1 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
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
