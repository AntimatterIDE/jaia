"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollRailSegmentProps {
  /** Scroll progress (0–1) for the whole sequence the segment belongs to */
  progress: MotionValue<number>;
  /** The slice of `progress` over which this segment fills */
  range: [number, number];
  /** False renders the segment fully filled and static */
  animate: boolean;
  axis?: "x" | "y";
  /** Position and thickness, shared by the track and its fill */
  className: string;
}

/**
 * One connector between two markers in a scroll-drawn sequence: a quiet
 * track with a brand fill that grows across its share of the progress.
 * Per-segment connectors stop exactly at the last marker, which a single
 * container-length rail cannot do when the last entry is taller than it.
 */
export function ScrollRailSegment({
  progress,
  range,
  animate,
  axis = "y",
  className,
}: ScrollRailSegmentProps) {
  const fill = useTransform(progress, range, [0, 1]);
  return (
    <>
      <span
        aria-hidden="true"
        className={cn("bg-brand-mist pointer-events-none absolute", className)}
      />
      <motion.span
        aria-hidden="true"
        className={cn(
          "bg-brand-action pointer-events-none absolute",
          axis === "y" ? "origin-top" : "origin-left",
          className,
        )}
        style={
          animate ? (axis === "y" ? { scaleY: fill } : { scaleX: fill }) : undefined
        }
      />
    </>
  );
}
