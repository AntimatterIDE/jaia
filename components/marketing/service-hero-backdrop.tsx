"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * NeonReveal is a three.js shader from `@reactbits-starter/neon-reveal-tw`,
 * so it is split out of the initial bundle and only ever rendered on the client.
 */
const NeonReveal = dynamic(
  () => import("@/components/react-bits/neon-reveal"),
  { ssr: false },
);

/**
 * ServiceHeroBackdrop — React Bits NeonReveal as a top-edge light.
 *
 * Short band: NeonReveal's root is `h-full`, so the parent must have height.
 * The bar sits on the header's lower edge; bloom is a hairline, not a wash.
 */
export function ServiceHeroBackdrop() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-neon-reveal=""
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[calc(var(--header-height)+3.25rem)] min-h-[7.5rem] bg-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,black_56%,transparent_68%)] select-none"
    >
      {prefersReducedMotion ? (
        <div className="absolute inset-x-0 top-[calc(var(--header-height)-0.2rem)] h-5 bg-[linear-gradient(to_bottom,rgba(186,224,242,0.22)_0%,transparent_100%)]" />
      ) : nearViewport ? (
        <NeonReveal
          className="absolute inset-0 h-full w-full bg-transparent"
          color={199}
          direction="horizontal"
          verticalOffset={0.46}
          expandFrom="center"
          barWidth={1}
          intensity={1.2}
          glowSpread={2.15}
          revealDuration={2200}
        />
      ) : null}
    </div>
  );
}
