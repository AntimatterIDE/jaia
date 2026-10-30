"use client";

/**
 * React Bits Pro `bento-7`: cards that fan out on hover.
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
  const [center, left, right] = items;
  const sides = [
    left ? { item: left, rotate: -7, x: "-42%" } : null,
    right ? { item: right, rotate: 7, x: "42%" } : null,
  ].filter((side): side is { item: BentoChannel; rotate: number; x: string } => side !== null);

  return (
    <article className="group border-brand-mist flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-3xl border bg-white">
      <div className="relative min-h-[230px] flex-1">
        <div aria-hidden="true" className="dot-grid absolute inset-0" />
        <div className="relative flex h-full items-center justify-center px-6 py-10">
          {sides.map((side) => {
            const Icon = side.item.icon;
            return (
              <motion.div
                key={side.item.title}
                className="border-brand-mist absolute w-[46%] max-w-[210px] rounded-2xl border bg-white p-4 shadow-md"
                initial={false}
                animate={{
                  x: side.x,
                  rotate: reduce ? 0 : side.rotate,
                }}
                whileHover={reduce ? undefined : { y: -8, rotate: 0 }}
              >
                <Icon className="text-brand-action size-5" strokeWidth={1.75} />
                <p className="text-brand-ink mt-3 text-sm font-semibold">{side.item.title}</p>
                <p className="text-brand-slate mt-1 line-clamp-3 text-xs leading-relaxed">{side.item.detail}</p>
              </motion.div>
            );
          })}
          {center ? (
            <div className="border-brand-action relative z-10 w-[52%] max-w-[230px] rounded-2xl border bg-white p-4 shadow-lg">
              <center.icon className="text-brand-action size-5" strokeWidth={1.75} />
              <p className="text-brand-ink mt-3 text-sm font-semibold">{center.title}</p>
              <p className="text-brand-slate mt-1 line-clamp-4 text-xs leading-relaxed">{center.detail}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="px-6 pt-2 pb-6">
        <h3 className="font-display text-brand-ink text-lg font-semibold">{title}</h3>
        <p className="text-brand-slate mt-1.5 text-sm leading-relaxed">{body}</p>
      </div>
    </article>
  );
}
