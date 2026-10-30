"use client";

/**
 * React Bits Pro `cta-1`: a centered close with drifting cards.
 * Stock portraits and the username form are replaced with JAIA clinic stills
 * and the real conversation link.
 */

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

import { CtaButton } from "@/components/marketing/cta";
import { finalCta } from "@/content/site";

const orbs = [
  { x: "8%", y: "12%", size: "9rem", color: "var(--brand-sky)" },
  { x: "72%", y: "8%", size: "7rem", color: "var(--brand-sky-soft)" },
  { x: "18%", y: "68%", size: "6rem", color: "var(--brand-action)" },
  { x: "78%", y: "64%", size: "8rem", color: "var(--brand-sky)" },
];

function DriftOrb({
  orb,
  mouseX,
  mouseY,
}: {
  orb: (typeof orbs)[number];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const x = useTransform(mouseX, [-1, 1], [-18, 18]);
  const y = useTransform(mouseY, [-1, 1], [-12, 12]);
  return (
    <motion.div
      aria-hidden="true"
      className="absolute hidden rounded-full opacity-40 blur-2xl sm:block"
      style={{ left: orb.x, top: orb.y, width: orb.size, height: orb.size, background: orb.color, x, y }}
    />
  );
}

interface Cta1Props {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Cta1({
  heading = finalCta.heading,
  body = finalCta.body,
  ctaLabel = finalCta.cta.label,
  ctaHref = finalCta.cta.href,
}: Cta1Props = {}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-canvas relative flex w-full items-center overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {orbs.map((orb) => (
          <DriftOrb key={`${orb.x}-${orb.y}`} orb={orb} mouseX={smoothX} mouseY={smoothY} />
        ))}
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 id="final-cta-heading" className="font-display text-brand-ink text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {heading}
        </h2>
        <p className="text-brand-slate mx-auto mt-6 max-w-xl text-lg leading-relaxed">{body}</p>
        <div className="mt-8 flex justify-center">
          <CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
        </div>
      </div>
    </section>
  );
}
