"use client";

/**
 * Adapted from React Bits AnimatedContent (reactbits.dev/animations/animated-content).
 * Accessibility adaptations per project spec:
 * - SSR content is rendered visible; initial hidden state is applied only on
 *   the client, immediately before the reveal (no invisible-without-JS copy).
 * - prefers-reduced-motion renders the final static state immediately.
 * - Reveals run exactly once; no looping, blur, or scale theatrics.
 */
import { useRef, type ReactNode, type HTMLAttributes } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, reducedMotionQuery } from "@/lib/motion";

interface AnimatedContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Translation distance in px — keep within the 8–16px spec range */
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  threshold?: number;
  delay?: number;
  /** "scroll" reveals on entry (default); "load" plays on mount for the hero */
  startOn?: "scroll" | "load";
  onComplete?: () => void;
}

export default function AnimatedContent({
  children,
  distance = motion.distance,
  direction = "vertical",
  reverse = false,
  duration = motion.revealDuration,
  ease = motion.ease,
  initialOpacity = 0,
  animateOpacity = true,
  threshold = 0.12,
  delay = 0,
  startOn = "scroll",
  onComplete,
  className = "",
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia(reducedMotionQuery).matches) {
        onComplete?.();
        return;
      }

      const axis = direction === "horizontal" ? "x" : "y";
      const offset = reverse ? -distance : distance;

      gsap.set(el, {
        [axis]: offset,
        opacity: animateOpacity ? initialOpacity : 1,
        willChange: "transform, opacity",
      });

      gsap.to(el, {
        [axis]: 0,
        opacity: 1,
        duration,
        ease,
        delay,
        /**
         * Return the wrapper to a clean style state once the reveal is done.
         * A residual transform would make this element the containing block
         * for absolutely positioned descendants, and pins text to a
         * composited layer where some browsers render it softly.
         */
        clearProps: "transform,opacity,willChange",
        onComplete,
        scrollTrigger:
          startOn === "load"
            ? undefined
            : {
                trigger: el,
                start: `top ${(1 - threshold) * 100}%`,
                once: true,
              },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
