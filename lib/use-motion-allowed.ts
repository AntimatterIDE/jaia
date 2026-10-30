"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const emptySubscribe = () => () => {};

/**
 * True only after hydration, and only when the user has not asked for
 * reduced motion. Server HTML and the hydration pass always get `false`, so
 * scroll-linked styles never cause a hydration mismatch and the static
 * (fully visible) state is what renders without JavaScript.
 */
export function useMotionAllowed() {
  const reduce = useReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  return mounted && reduce === false;
}
