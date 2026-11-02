"use client";

/**
 * React Bits Pro `bento-7`: three capability cards, always fully visible.
 * Demo avatars, handles, and subscriber counts are not used.
 */

import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export interface BentoChannel {
  title: string;
  detail: string;
  icon: LucideIcon;
}

export function Bento7({
  items,
  title,
  body,
}: {
  items: readonly BentoChannel[];
  title: string;
  body: string;
}) {
  const reduce = useReducedMotion();
  const shown = items.slice(0, 3);

  return (
    <article className="border-brand-mist relative flex w-full flex-col overflow-visible rounded-3xl border bg-white shadow-soft">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(135,205,236,0.34),transparent_58%)]"
      />
      <div aria-hidden="true" className="dot-grid absolute inset-0 rounded-3xl opacity-50" />

      <div className="relative flex flex-col gap-3 px-5 py-7 sm:gap-3.5 sm:px-6 sm:py-8">
        {shown.map((item, index) => {
          const Icon = item.icon;
          const featured = index === 0;
          return (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -3 }}
              className={
                featured
                  ? "border-brand-action bg-brand-sky-soft/80 shadow-soft rounded-2xl border p-4 sm:p-4.5"
                  : "border-brand-mist rounded-2xl border bg-white/95 p-4 shadow-sm sm:p-4.5"
              }
            >
              <div className="flex items-start gap-3">
                <span
                  className={
                    featured
                      ? "bg-brand-action text-white flex size-9 shrink-0 items-center justify-center rounded-xl"
                      : "bg-brand-sky-soft text-brand-action flex size-9 shrink-0 items-center justify-center rounded-xl"
                  }
                >
                  <Icon className="size-4.5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-brand-ink text-sm font-semibold">{item.title}</p>
                  <p className="text-brand-slate mt-1 text-xs leading-relaxed sm:text-[0.8125rem]">
                    {item.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="border-brand-mist relative border-t px-6 py-5">
        <h3 className="font-display text-brand-ink text-lg font-semibold">{title}</h3>
        <p className="text-brand-slate mt-1.5 text-sm leading-relaxed">{body}</p>
      </div>
    </article>
  );
}
