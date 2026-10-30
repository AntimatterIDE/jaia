"use client";

/**
 * Adapted from React Bits SpotlightCard (reactbits.dev/components/spotlight-card).
 * Accessibility adaptations per project spec:
 * - The pointer-following light is decorative only: aria-hidden, pointer-fine
 *   devices only, and fully disabled under prefers-reduced-motion.
 * - Focus indication is provided by real focus-visible rings on interactive
 *   content — never by the spotlight alone.
 */
import { useRef, type ReactNode, type MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(135, 205, 236, 0.35)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const canTrack = () =>
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || !lightRef.current || !canTrack()) return;
    const rect = divRef.current.getBoundingClientRect();
    lightRef.current.style.background = `radial-gradient(circle at ${
      e.clientX - rect.left
    }px ${e.clientY - rect.top}px, ${spotlightColor}, transparent 75%)`;
    lightRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (lightRef.current) lightRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 motion-reduce:hidden"
      />
      {children}
    </div>
  );
}
