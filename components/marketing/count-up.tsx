"use client";

import { useEffect, useRef } from "react";
import { animate, inView } from "motion/react";

import { useMotionAllowed } from "@/lib/use-motion-allowed";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  suffix?: string;
  /** Seconds */
  duration?: number;
  className?: string;
}

/**
 * Counts a figure up from zero the first time it scrolls into view. The
 * final value is what renders on the server, for screen readers, and under
 * reduced motion; an invisible copy reserves its width so neighbouring text
 * never shifts while the digits change.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionAllowed = useMotionAllowed();
  const final = `${value}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !motionAllowed) return;

    let controls: ReturnType<typeof animate> | undefined;
    node.textContent = `0${suffix}`;

    const stop = inView(
      node,
      () => {
        controls = animate(0, value, {
          duration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => {
            node.textContent = `${Math.round(latest)}${suffix}`;
          },
        });
        stop();
      },
      { amount: 0.6 },
    );

    return () => {
      stop();
      controls?.stop();
      node.textContent = final;
    };
  }, [motionAllowed, value, suffix, duration, final]);

  return (
    <span className={cn("inline-grid tabular-nums", className)}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {final}
      </span>
      <span ref={ref} aria-hidden="true" className="col-start-1 row-start-1">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
