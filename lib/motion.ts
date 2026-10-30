/**
 * Shared motion constants — restrained, spec §11.
 * Keep movement to 8–16px, opacity-based, single-run.
 */
export const motion = {
  /** Entry translation distance in px */
  distance: 12,
  /** Hero first-load sequence budget: ~600–900ms total */
  heroDuration: 0.55,
  heroStagger: 0.09,
  /** Scroll reveals */
  revealDuration: 0.7,
  ease: "power3.out",
  /** Hover/focus transitions: 150–220ms */
  hoverMs: 180,
} as const;

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
