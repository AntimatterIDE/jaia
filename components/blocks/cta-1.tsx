"use client";

/**
 * React Bits Pro `cta-1`: a centered close with drifting cards.
 * Stock portraits and the username form are replaced with JAIA clinic stills
 * and the real conversation link.
 *
 * Kept deliberately light (canvas + sky accents) so it does not visually
 * merge into the deep-blue footer below.
 */

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

import { CtaButton } from "@/components/marketing/cta";
import { finalCta } from "@/content/site";

const orbs = [
  { x: "6%", y: "10%", size: "10rem", color: "var(--brand-sky)" },
  { x: "74%", y: "6%", size: "8rem", color: "var(--brand-sky-soft)" },
  { x: "16%", y: "70%", size: "7rem", color: "rgba(39,111,145,0.35)" },
  { x: "78%", y: "62%", size: "9rem", color: "var(--brand-sky)" },
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
      className="absolute hidden rounded-full opacity-45 blur-2xl sm:block"
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
      className="bg-canvas relative flex w-full items-center overflow-hidden border-b border-[color-mix(in_srgb,var(--brand-sky)_35%,var(--brand-mist))] px-5 py-20 sm:px-8 sm:py-28"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(135,205,236,0.38),transparent_50%),radial-gradient(ellipse_at_90%_90%,rgba(234,245,251,0.9),transparent_45%)]"
      />
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
