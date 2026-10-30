"use client";

import { forwardRef, useImperativeHandle } from "react";

export interface StaggeredTextHandle {
  replay: () => void;
  exit: () => void;
}

export interface StaggeredTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  id?: string;
  initialDelay?: number;
  segmentBy?: "chars" | "words" | "lines";
  separator?: string;
  delay?: number;
  duration?: number;
  easing?: unknown;
  threshold?: number;
  rootMargin?: string;
  direction?: "top" | "bottom" | "left" | "right";
  blur?: boolean;
  from?: Record<string, string | number>;
  to?: Record<string, string | number> | Record<string, string | number>[];
  staggerDirection?: "forward" | "reverse" | "center";
  respectReducedMotion?: boolean;
  exitOnScrollOut?: boolean;
  onAnimationComplete?: () => void;
  onExitComplete?: () => void;
}

/**
 * Headlines render as one phrase. The words are not split or hidden, so the
 * line is readable on first paint and assistive technology announces it once.
 */
const StaggeredText = forwardRef<StaggeredTextHandle, StaggeredTextProps>(
  ({ text, className = "", as = "p", id }, ref) => {
    useImperativeHandle(ref, () => ({
      replay: () => {},
      exit: () => {},
    }));

    if (!text) return null;

    const Wrapper = as;

    return (
      <Wrapper id={id} className={className}>
        {text}
      </Wrapper>
    );
  },
);

StaggeredText.displayName = "StaggeredText";

export default StaggeredText;
