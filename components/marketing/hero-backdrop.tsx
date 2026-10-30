"use client";

import { useEffect, useId, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { SYMBOL_PATH, SYMBOL_VIEW_BOX } from "@/components/jaia-symbol";

/**
 * HeroBackdrop — the JAIA mark rendered as a window onto a slow aurora.
 *
 * The symbol is used as a clip path rather than a drawn logo: coloured blobs
 * drift underneath and are only visible through the mark, so the shape reads
 * as a shifting field of brand colour instead of a stamped watermark. Two
 * much fainter whole marks drift behind it for depth.
 *
 * Decorative only — always aria-hidden and non-interactive. Everything
 * animated here is transform/opacity, and the whole thing collapses to a
 * static composition under prefers-reduced-motion.
 */

interface Blob {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity: number;
  /** Drift keyframes in viewBox units — deliberately small and slow */
  x: number[];
  y: number[];
  scale: number[];
  duration: number;
}

/** Coordinates live in the symbol viewBox (-6 24 300 300) */
const BLOBS: readonly Blob[] = [
  {
    cx: 90,
    cy: 130,
    r: 125,
    color: "var(--brand-sky)",
    opacity: 0.85,
    x: [0, 18, -10, 0],
    y: [0, -14, 12, 0],
    scale: [1, 1.12, 0.96, 1],
    duration: 26,
  },
  {
    cx: 210,
    cy: 205,
    r: 115,
    color: "var(--brand-action)",
    opacity: 0.5,
    x: [0, -20, 14, 0],
    y: [0, 16, -10, 0],
    scale: [1, 0.94, 1.1, 1],
    duration: 34,
  },
  {
    cx: 145,
    cy: 300,
    r: 135,
    color: "var(--brand-sky)",
    opacity: 0.7,
    x: [0, 12, -16, 0],
    y: [0, -18, 8, 0],
    scale: [1, 1.08, 0.98, 1],
    duration: 30,
  },
  {
    cx: 245,
    cy: 85,
    r: 95,
    color: "var(--brand-sky-soft)",
    opacity: 0.9,
    x: [0, -14, 10, 0],
    y: [0, 10, -14, 0],
    scale: [1, 1.14, 1, 1],
    duration: 22,
  },
];

interface Ghost {
  className: string;
  x: number[];
  y: number[];
  rotate: number[];
  duration: number;
}

/** Faint whole-mark copies drifting behind the clipped one */
const GHOSTS: readonly Ghost[] = [
  {
    className: "right-[6%] top-[-14%] w-[42%]",
    x: [0, 14, 0],
    y: [0, -18, 0],
    rotate: [0, 4, 0],
    duration: 38,
  },
  {
    className: "right-[52%] bottom-[-22%] w-[30%]",
    x: [0, -12, 0],
    y: [0, 14, 0],
    rotate: [0, -5, 0],
    duration: 46,
  },
];

export default function HeroBackdrop() {
  const prefersReducedMotion = useReducedMotion();
  const rawId = useId();
  // useId embeds punctuation that is awkward inside url(#...) references
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `hero-mark-${uid}`;
  const [inView, setInView] = useState(true);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 22, mass: 0.8 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 22, mass: 0.8 });
  // Pointer travel is mapped to a few viewBox units so the parallax reads as
  // depth rather than as the artwork following the cursor
  const driftX = useTransform(springX, [-1, 1], [10, -10]);
  const driftY = useTransform(springY, [-1, 1], [8, -8]);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
        pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pointerX, pointerY, prefersReducedMotion, inView]);

  // Freeze drift when off-screen so Lenis scroll is not fighting hero loops
  const still = Boolean(prefersReducedMotion) || !inView;

  return (
    <div
      ref={setNode}
      aria-hidden="true"
      data-hero-backdrop=""
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Ghost marks: plain flat fills, well below the clipped mark */}
      {GHOSTS.map((ghost, index) => (
        <motion.svg
          key={index}
          viewBox={SYMBOL_VIEW_BOX}
          className={`text-brand-sky absolute aspect-square opacity-[0.05] ${ghost.className}`}
          animate={
            still ? undefined : { x: ghost.x, y: ghost.y, rotate: ghost.rotate }
          }
          transition={{
            duration: ghost.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path d={SYMBOL_PATH} fill="currentColor" />
        </motion.svg>
      ))}

      {/*
        The hero mark. Oversized and bled off the right edge so it acts as a
        compositional field rather than a centred logo.
      */}
      <svg
        viewBox={SYMBOL_VIEW_BOX}
        className={[
          "absolute aspect-square",
          // Small screens: tucked into the top-right corner and faded well
          // back, since the content stack runs the full width underneath
          "top-[-16%] right-[-30%] w-[72%] opacity-35",
          "sm:top-[-10%] sm:right-[-18%] sm:w-[56%] sm:opacity-50",
          // Wide: vertically centred against the spread, bleeding off the edge
          "lg:top-1/2 lg:right-[-5%] lg:w-[52%] lg:max-w-[44rem] lg:-translate-y-1/2 lg:opacity-100",
        ].join(" ")}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={SYMBOL_PATH} />
          </clipPath>

          {BLOBS.map((blob, index) => (
            <radialGradient key={index} id={`${clipId}-blob-${index}`}>
              <stop
                offset="0%"
                stopColor={blob.color}
                stopOpacity={blob.opacity}
              />
              <stop
                offset="60%"
                stopColor={blob.color}
                stopOpacity={blob.opacity * 0.45}
              />
              <stop offset="100%" stopColor={blob.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {/*
            Base tint keeps the mark readable where no blob currently sits over
            it. Held well back so the blobs, not the flat fill, carry the colour.
          */}
          <rect
            x="-6"
            y="24"
            width="300"
            height="300"
            fill="var(--brand-sky-soft)"
            opacity="0.55"
          />

          {/*
            Parallax layer. The listener is never attached on coarse pointers
            or under reduced motion, so these values simply stay at zero.
          */}
          <motion.g style={{ x: driftX, y: driftY }}>
            {BLOBS.map((blob, index) => (
              <motion.g
                key={index}
                data-blob=""
                animate={
                  still
                    ? undefined
                    : { x: blob.x, y: blob.y, scale: blob.scale }
                }
                transition={{
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ originX: `${blob.cx}px`, originY: `${blob.cy}px` }}
              >
                <circle
                  cx={blob.cx}
                  cy={blob.cy}
                  r={blob.r}
                  fill={`url(#${clipId}-blob-${index})`}
                />
              </motion.g>
            ))}
          </motion.g>
        </g>
      </svg>

      {/*
        Legibility scrim. Hero copy runs across the artwork, so the canvas
        colour is washed back over it from the left and bottom. The horizontal
        ramp stays fully opaque through the headline column and only releases
        under the right-hand block, where the body copy sits.
      */}
      <div className="from-canvas via-canvas/75 absolute inset-0 bg-gradient-to-r from-26% via-55% to-transparent" />
      <div className="from-canvas absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
    </div>
  );
}
