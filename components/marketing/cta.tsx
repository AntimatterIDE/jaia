"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tone = "ink" | "sky" | "outline";
type Size = "default" | "compact";

interface ToneStyle {
  /** Resting surface and label colour */
  base: string;
  /** Colour the liquid fill sweeps in */
  fill: string;
  /** Click ripple, tinted to stay subtle against `fill` */
  ripple: string;
  /**
   * Reduced-motion fallback. The fill layer is hidden in that mode, so the
   * hover colour has to come back as a plain background swap.
   */
  reduced: string;
}

/**
 * Every tone transitions light-to-light or dark-to-dark, so the label keeps
 * its contrast ratio at every frame of the fill — not just at the endpoints.
 * Fill colours are chosen to be clearly distinguishable from the base, or the
 * growing circle is imperceptible and only the full-button drain on leave
 * reads as an effect. White on brand-action is 5.5:1, ink on sky/40 is ~9:1.
 *
 * Hover backgrounds match the resting surface so the shadcn default
 * `hover:bg-primary/80` cannot flatten the fill into a single-step fade.
 */
const toneStyles: Record<Tone, ToneStyle> = {
  ink: {
    base: "bg-brand-ink text-white hover:bg-brand-ink",
    fill: "bg-brand-action",
    ripple: "bg-white/25",
    reduced: "motion-reduce:hover:bg-brand-action",
  },
  sky: {
    base: "bg-brand-sky text-brand-ink hover:bg-brand-sky",
    fill: "bg-white",
    ripple: "bg-brand-ink/10",
    reduced: "motion-reduce:hover:bg-white",
  },
  outline: {
    base: "border-brand-mist bg-white text-brand-ink hover:border-brand-sky hover:bg-white",
    fill: "bg-brand-sky/40",
    ripple: "bg-brand-action/10",
    reduced: "motion-reduce:hover:bg-brand-sky/40",
  },
};

const sizeStyles: Record<Size, string> = {
  default: "h-12 px-6 text-base",
  /** Fits the 4.5rem header bar without matching hero CTA scale */
  compact: "h-11 px-5 text-[0.9375rem]",
};

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
  /** Renders a trailing arrow that nudges on hover */
  withArrow?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/**
 * Primary call to action. Centralized so every CTA shares one hit area,
 * hover lift, and press state — the press feedback is what makes a click
 * feel acknowledged before navigation resolves.
 *
 * On hover a circular fill grows from wherever the pointer crossed the edge
 * and retracts toward wherever it leaves, so the button reads as filling with
 * liquid rather than switching colour. A faster ripple fires on press.
 *
 * The hit target does not translate on hover: a 2px lift used to move the
 * box out from under an entering pointer (especially from the bottom edge),
 * which cancelled the enter fill and left only the drain on leave visible.
 */
export function CtaButton({
  href,
  children,
  tone = "ink",
  size = "default",
  className,
  withArrow = false,
}: CtaButtonProps) {
  const styles = toneStyles[tone];
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.5 });
  const [filled, setFilled] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const enterFrame = useRef(0);

  /** Pointer position as a fraction of the button box */
  const readOrigin = useCallback((event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return { x: 0.5, y: 0.5 };
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  }, []);

  const cancelEnter = useCallback(() => {
    if (enterFrame.current) {
      cancelAnimationFrame(enterFrame.current);
      enterFrame.current = 0;
    }
  }, []);

  const handleEnter = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const next = readOrigin(event);
      cancelEnter();
      // Paint a 0-radius circle at the entry point first, then grow it —
      // otherwise React batches origin + filled and the enter interpolation
      // is skipped (leave still animates because the circle is already large).
      setOrigin(next);
      setFilled(false);
      enterFrame.current = requestAnimationFrame(() => {
        enterFrame.current = requestAnimationFrame(() => {
          enterFrame.current = 0;
          setFilled(true);
        });
      });
    },
    [cancelEnter, readOrigin],
  );

  const handleLeave = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      cancelEnter();
      setOrigin(readOrigin(event));
      setFilled(false);
    },
    [cancelEnter, readOrigin],
  );

  const handleDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const { x, y } = readOrigin(event);
      rippleId.current += 1;
      setRipples((current) => [...current, { id: rippleId.current, x, y }]);
    },
    [readOrigin],
  );

  const dropRipple = useCallback((id: number) => {
    setRipples((current) => current.filter((ripple) => ripple.id !== id));
  }, []);

  useEffect(() => () => cancelEnter(), [cancelEnter]);

  return (
    <Button
      asChild
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerDown={handleDown}
      className={cn(
        "group/cta relative isolate overflow-hidden rounded-full font-semibold",
        "shadow-soft transition-[box-shadow,background-color,border-color] duration-200 ease-out",
        "hover:shadow-lift",
        "motion-reduce:transition-none",
        sizeStyles[size],
        styles.base,
        styles.reduced,
        className,
      )}
    >
      <Link href={href}>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 motion-reduce:hidden",
            styles.fill,
          )}
          style={{
            clipPath: filled
              ? `circle(150% at ${origin.x * 100}% ${origin.y * 100}%)`
              : `circle(0% at ${origin.x * 100}% ${origin.y * 100}%)`,
            transition: filled
              ? "clip-path 520ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "clip-path 340ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            aria-hidden="true"
            onAnimationEnd={() => dropRipple(ripple.id)}
            className={cn(
              "cta-ripple pointer-events-none absolute aspect-square w-[260%] rounded-full",
              styles.ripple,
            )}
            style={{ left: `${ripple.x * 100}%`, top: `${ripple.y * 100}%` }}
          />
        ))}

        <span className="relative z-10 inline-flex items-center gap-1">
          {children}
          {withArrow ? (
            <ArrowRight
              aria-hidden="true"
              className="ml-1 size-4 transition-transform duration-200 group-hover/cta:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0"
            />
          ) : null}
        </span>
      </Link>
    </Button>
  );
}

/**
 * Secondary, lower-emphasis action. The underline grows from the left on
 * hover so the affordance reads as a link rather than a disguised button.
 */
export function CtaLink({
  href,
  children,
  className,
  tone = "action",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "action" | "onDark";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex min-h-11 items-center gap-2 rounded-sm text-base font-semibold transition-colors duration-150",
        tone === "action"
          ? "text-brand-action hover:text-brand-action-deep"
          : "hover:text-brand-sky text-white",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100 motion-reduce:transition-none"
        />
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0"
      />
    </Link>
  );
}
