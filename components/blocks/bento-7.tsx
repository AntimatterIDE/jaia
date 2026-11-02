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

function FanCard({
  item,
  x,
  rotate,
  featured = false,
  reduce,
}: {
  item: BentoChannel;
  x: number;
  rotate: number;
  featured?: boolean;
  reduce: boolean | null;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      className={
        featured
          ? "border-brand-action absolute top-1/2 left-1/2 z-10 w-[48%] max-w-[200px] rounded-2xl border bg-white p-3.5 shadow-lg"
          : "border-brand-mist absolute top-1/2 left-1/2 w-[42%] max-w-[180px] rounded-2xl border bg-white p-3.5 shadow-md"
      }
      initial={false}
      animate={{
        x: `calc(-50% + ${x}px)`,
        y: "calc(-50% + 12px)",
        rotate: reduce ? 0 : rotate,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce || featured ? undefined : { y: "calc(-50% + 4px)", rotate: 0 }}
    >
      <Icon className="text-brand-action size-5" strokeWidth={1.75} />
      <p className="text-brand-ink mt-3 text-sm font-semibold">{item.title}</p>
      <p className="text-brand-slate mt-1 line-clamp-3 text-xs leading-relaxed">{item.detail}</p>
    </motion.div>
  );
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

  return (
    <article className="group border-brand-mist flex h-full min-h-[400px] w-full flex-col overflow-hidden rounded-3xl border bg-white">
      <div className="relative min-h-[340px] flex-1">
        <div aria-hidden="true" className="dot-grid absolute inset-0" />
        <div className="relative h-full min-h-[300px] px-8 py-14">
          {left ? (
            <FanCard item={left} x={-120} rotate={-5} reduce={reduce} />
          ) : null}
          {right ? (
            <FanCard item={right} x={120} rotate={5} reduce={reduce} />
          ) : null}
          {center ? (
            <FanCard item={center} x={0} rotate={0} featured reduce={reduce} />
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
