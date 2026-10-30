"use client";

/**
 * React Bits Pro `cta-1`: a centered close with drifting cards.
 * Stock portraits and the username form are replaced with JAIA clinic stills
 * and the real conversation link.
 */

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

import { CtaButton } from "@/components/marketing/cta";
import { finalCta } from "@/content/site";

const cards = [
  { src: "/images/care-management-coordinator.jpg", x: "8%", y: "12%", rotation: -10, intensity: 0.02 },
  { src: "/images/hrv-assessment-clinic.jpg", x: "72%", y: "8%", rotation: 8, intensity: 0.03 },
  { src: "/images/iv-therapy-suite.jpg", x: "28%", y: "58%", rotation: 12, intensity: 0.025 },
  { src: "/images/billing-rcm-workspace.jpg", x: "70%", y: "62%", rotation: -8, intensity: 0.02 },
  { src: "/images/lab-office-bench.jpg", x: "48%", y: "34%", rotation: -6, intensity: 0.015 },
  { src: "/images/about-team-collaboration.jpg", x: "6%", y: "64%", rotation: 6, intensity: 0.03 },
];

function DriftCard({
  card,
  mouseX,
  mouseY,
}: {
  card: (typeof cards)[number];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const x = useTransform(mouseX, [-1, 1], [-18 * card.intensity * 80, 18 * card.intensity * 80]);
  const y = useTransform(mouseY, [-1, 1], [-12 * card.intensity * 80, 12 * card.intensity * 80]);
  return (
    <motion.div className="absolute hidden sm:block" style={{ left: card.x, top: card.y, x, y, rotate: card.rotation }}>
      <img src={card.src} alt="" className="size-36 rounded-2xl object-cover opacity-25 md:size-44" />
    </motion.div>
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
        {cards.map((card) => (
          <DriftCard key={card.src} card={card} mouseX={smoothX} mouseY={smoothY} />
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
