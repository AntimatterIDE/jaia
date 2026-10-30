"use client";

/**
 * React Bits "user-cursor" (@reactbits-starter/user-cursor-tw), with minimal
 * JAIA adaptations, each marked with a `JAIA:` comment:
 * - respects prefers-reduced-motion (renders nothing; the shipped component
 *   does not handle it),
 * - touch gating checks `(pointer: fine)` per site QA requirements,
 * - in fullScreen mode the native cursor is hidden via a
 *   `has-custom-cursor` class on <html> (the shipped inline `cursor: none`
 *   sits on a `display: contents` wrapper with no children, so it never
 *   applies) — see the companion block at the end of app/globals.css, which
 *   keeps native cursors on form fields,
 * - the arrow enlarges over links/buttons to convey affordance,
 * - the fixed layer clips overflow so the arrow can never widen the page,
 * - leaving the viewport hides the glyph and restores the system cursor
 *   (otherwise the last clamped point leaves a stuck arrow on the edge),
 * - pointer moves are rAF-batched; velocity / label springs are skipped when
 *   unused so the override stays snappy on desktop.
 */

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type SVGProps,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type SpringOptions,
} from "motion/react";

import { cn } from "@/lib/utils";

export type UserCursorTrigger = "always" | "hover" | "press";

export interface UserCursorClassNames {
  /** Root wrapper (the surface the cursor lives in). */
  root?: string;
  /** The motion layer that follows the pointer. */
  cursor?: string;
  /** The arrow / glyph element. */
  arrow?: string;
  /** The label pill. */
  label?: string;
  /** Inner text node of the label. */
  labelText?: string;
}

export interface UserCursorProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Wrapped content. The custom cursor is shown over this region. */
  children?: ReactNode;
  /** Text rendered inside the label pill. */
  name?: string;
  /** Replace the default arrow with custom JSX. Receives the resolved color. */
  arrow?: ReactNode | ((color: string) => ReactNode);
  /** Replace the default label with custom JSX. */
  label?: ReactNode;
  /** Solid fill color for the arrow + label. */
  color?: string;
  /** Text color used inside the label. */
  textColor?: string;
  /** Arrow size in px (square bounding box). */
  size?: number;
  /** Visual tilt of the arrow in degrees. Used as the resting angle when `directionAwareTilt` is on. */
  tilt?: number;
  /** Smoothly rotate the arrow + label to point in the direction of pointer movement. */
  directionAwareTilt?: boolean;
  /** Maximum rotation applied to the label when `directionAwareTilt` is on, in degrees. */
  labelTiltStrength?: number;
  /** When the cursor should be visible. */
  trigger?: UserCursorTrigger;
  /** Show or hide the label pill. */
  showLabel?: boolean;
  /** Hide the OS / browser cursor inside the surface. */
  hideNativeCursor?: boolean;
  /** Render the cursor in a fixed full-viewport layer instead of the surface. */
  fullScreen?: boolean;
  /** Spring config for the cursor body. Lower stiffness = floatier. */
  spring?: SpringOptions;
  /** Spring config for the label pill (defaults to a slightly laggier spring). */
  labelSpring?: SpringOptions;
  /** Pixel offset from the pointer to the cursor's anchor. */
  offset?: { x?: number; y?: number };
  /** Pixel offset from the cursor's anchor to the label pill. */
  labelOffset?: { x?: number; y?: number };
  /** Scale applied while the pointer is pressed. */
  pressScale?: number;
  /** Granular className overrides. */
  classNames?: UserCursorClassNames;
  /** Render nothing on touch / coarse-pointer devices. Defaults to true. */
  hideOnTouch?: boolean;
  /** z-index applied to the cursor layer. */
  zIndex?: number;
}

interface ArrowGlyphProps extends SVGProps<SVGSVGElement> {
  color: string;
  size: number;
}

const ArrowGlyph = ({ color, size, ...rest }: ArrowGlyphProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...rest}
  >
    <path
      d="M5.2 3.4c-.7-.3-1.5.4-1.2 1.1l5.7 14.8c.3.8 1.5.8 1.8 0l2.4-6 6-2.4c.8-.3.8-1.5 0-1.8L5.2 3.4Z"
      fill={color}
      /* JAIA: light stroke so the deep-blue arrow stays visible on the dark
         final-CTA band; effectively invisible on white. */
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
  </svg>
);

// JAIA: snappier than the shipped React Bits defaults — lag was the top
// desktop complaint alongside video/animation cost.
const DEFAULT_SPRING: SpringOptions = {
  stiffness: 900,
  damping: 48,
  mass: 0.35,
};

const DEFAULT_LABEL_SPRING: SpringOptions = {
  stiffness: 520,
  damping: 38,
  mass: 0.45,
};

// JAIA: inert subscription for the useSyncExternalStore "mounted" check.
const emptySubscribe = () => () => {};

const UserCursor = forwardRef<HTMLDivElement, UserCursorProps>(
  function UserCursor(
    {
      children,
      name = "Sophie",
      arrow,
      label,
      color = "#F39C2A",
      textColor = "#ffffff",
      size = 28,
      tilt = -14,
      directionAwareTilt = false,
      labelTiltStrength = 8,
      trigger = "hover",
      showLabel = true,
      hideNativeCursor = true,
      fullScreen = false,
      spring,
      labelSpring,
      offset,
      labelOffset,
      pressScale = 0.92,
      classNames,
      hideOnTouch = true,
      zIndex = 50,
      className,
      style,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      onPointerDown,
      onPointerUp,
      ...rest
    },
    ref,
  ) {
    const surfaceRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(
      trigger === "always" && !fullScreen,
    );
    const visibleRef = useRef(false);
    const [pressed, setPressed] = useState(false);
    const [coarsePointer, setCoarsePointer] = useState(false);
    // JAIA: the shipped component does not handle prefers-reduced-motion.
    const reducedMotion = useReducedMotion() ?? false;
    // JAIA: enlarge the arrow over interactive elements for affordance.
    const [interactive, setInteractive] = useState(false);
    // JAIA: with no children the overlay is pure client-side decoration;
    // skip SSR entirely so the reduced-motion/coarse-pointer null-render
    // can never mismatch the server HTML during hydration.
    const mounted = useSyncExternalStore(
      emptySubscribe,
      () => true,
      () => false,
    );

    const offsetX = offset?.x ?? 0;
    const offsetY = offset?.y ?? 0;
    const labelOffsetX = labelOffset?.x ?? size * 0.9;
    const labelOffsetY = labelOffset?.y ?? size * 0.2 + 6;
    // JAIA: site layout ships without a label and with a fixed tilt — skip
    // the velocity / label spring graph so each move only drives one spring.
    const trackLabel = showLabel;
    const trackDirection = directionAwareTilt;

    const cursorSpring = { ...DEFAULT_SPRING, ...spring };
    const pillSpring = { ...DEFAULT_LABEL_SPRING, ...labelSpring };

    // JAIA: start just offscreen (was -9999) so the first pointermove does
    // not send the springs on a violent cross-screen sweep.
    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);

    const cursorX = useSpring(rawX, cursorSpring);
    const cursorY = useSpring(rawY, cursorSpring);
    const labelX = useSpring(rawX, trackLabel ? pillSpring : DEFAULT_SPRING);
    const labelY = useSpring(rawY, trackLabel ? pillSpring : DEFAULT_SPRING);

    const velocityX = useVelocity(rawX);
    const velocityY = useVelocity(rawY);
    const smoothVx = useSpring(velocityX, {
      stiffness: trackDirection ? 120 : 1,
      damping: 26,
      mass: 0.5,
    });
    const smoothVy = useSpring(velocityY, {
      stiffness: trackDirection ? 120 : 1,
      damping: 26,
      mass: 0.5,
    });

    const ARROW_NATURAL_DEG = -138;
    const VELOCITY_FULL = 600;
    const VELOCITY_MIN = 40;

    const arrowRotate = useTransform<number, number>(
      [smoothVx, smoothVy],
      ([vx, vy]) => {
        if (!trackDirection) return tilt;
        const speed = Math.hypot(vx, vy);
        if (speed < VELOCITY_MIN) return tilt;
        const k = Math.min(
          1,
          (speed - VELOCITY_MIN) / (VELOCITY_FULL - VELOCITY_MIN),
        );
        const dir = (Math.atan2(vy, vx) * 180) / Math.PI;
        const target = dir - ARROW_NATURAL_DEG;
        let delta = target - tilt;
        delta = ((delta + 540) % 360) - 180;
        return tilt + delta * k;
      },
    );

    const labelRotate = useTransform<number, number>(
      [smoothVx, smoothVy],
      ([vx, vy]) => {
        if (!trackDirection || !trackLabel) return 0;
        const speed = Math.hypot(vx, vy);
        if (speed < VELOCITY_MIN) return 0;
        const k = Math.min(
          1,
          (speed - VELOCITY_MIN) / (VELOCITY_FULL - VELOCITY_MIN),
        );
        const horizShare = Math.abs(vx) / (speed + 1e-3);
        const sway =
          Math.sign(vy) * horizShare * labelTiltStrength * k +
          Math.sign(vx) * (1 - horizShare) * (labelTiltStrength * 0.4) * k;
        return sway;
      },
    );

    const smoothArrowRotate = useSpring(arrowRotate, {
      stiffness: trackDirection ? 220 : 1,
      damping: 24,
      mass: 0.5,
    });
    const smoothLabelRotate = useSpring(labelRotate, {
      stiffness: trackDirection && trackLabel ? 160 : 1,
      damping: 22,
      mass: 0.6,
    });

    useEffect(() => {
      if (typeof window === "undefined" || !hideOnTouch) return;
      // JAIA: gate on (pointer: fine) — anything else counts as touch/coarse.
      const mq = window.matchMedia("(pointer: fine)");
      const update = () => setCoarsePointer(!mq.matches);
      update();
      mq.addEventListener?.("change", update);
      return () => mq.removeEventListener?.("change", update);
    }, [hideOnTouch]);

    // JAIA: in fullScreen mode the wrapper is `display: contents` with no
    // children, so the shipped inline cursor style never applies. Hide the
    // native cursor via a class on <html> instead (form-field carve-outs
    // live in app/globals.css), and only while the custom cursor is actually
    // on-screen — otherwise `cursor: none` outlives the glyph at the edge.
    useEffect(() => {
      if (
        !fullScreen ||
        !hideNativeCursor ||
        coarsePointer ||
        reducedMotion ||
        !visible
      )
        return;
      document.documentElement.classList.add("has-custom-cursor");
      return () => {
        document.documentElement.classList.remove("has-custom-cursor");
      };
    }, [fullScreen, hideNativeCursor, coarsePointer, reducedMotion, visible]);

    useEffect(() => {
      // JAIA: also bail under reduced motion.
      if (!fullScreen || coarsePointer || reducedMotion) return;

      let moveFrame = 0;
      let pendingX = 0;
      let pendingY = 0;
      let pendingInside = false;
      let overFrame = 0;
      let pendingInteractive = false;

      const pointerInsideViewport = (e: PointerEvent | MouseEvent) =>
        e.clientX >= 0 &&
        e.clientY >= 0 &&
        e.clientX <= window.innerWidth &&
        e.clientY <= window.innerHeight;

      const hide = () => {
        if (moveFrame) {
          cancelAnimationFrame(moveFrame);
          moveFrame = 0;
        }
        visibleRef.current = false;
        setVisible(false);
        setPressed(false);
        setInteractive(false);
      };

      const flushMove = () => {
        moveFrame = 0;
        if (!pendingInside) {
          hide();
          return;
        }
        const x = pendingX;
        const y = pendingY;
        // Re-entering from chrome would otherwise spring from the last edge.
        if (!visibleRef.current) {
          rawX.jump(x);
          rawY.jump(y);
          cursorX.jump(x);
          cursorY.jump(y);
          if (trackLabel) {
            labelX.jump(x);
            labelY.jump(y);
          }
        } else {
          rawX.set(x);
          rawY.set(y);
        }
        if (trigger !== "press") {
          visibleRef.current = true;
          setVisible(true);
        }
      };

      const move = (e: PointerEvent) => {
        // Last move is often clamped to the edge; treat out-of-bounds as leave
        // so the glyph cannot sit there after the OS cursor has already gone.
        pendingInside = pointerInsideViewport(e);
        pendingX = e.clientX + offsetX;
        pendingY = e.clientY + offsetY;
        if (!moveFrame) moveFrame = requestAnimationFrame(flushMove);
      };
      // JAIA: track interactive targets on a rAF so closest() is not per-event.
      const over = (e: PointerEvent) => {
        const target = e.target instanceof Element ? e.target : null;
        pendingInteractive = Boolean(
          target?.closest('a, button, [role="button"]'),
        );
        if (!overFrame) {
          overFrame = requestAnimationFrame(() => {
            overFrame = 0;
            setInteractive(pendingInteractive);
          });
        }
      };
      const down = () => trigger === "press" && setVisible(true);
      const up = () => {
        setPressed(false);
        if (trigger === "press") setVisible(false);
      };
      const leaveDocument = (e: PointerEvent | MouseEvent) => {
        const next = e.relatedTarget;
        if (next instanceof Node && document.documentElement.contains(next)) {
          return;
        }
        hide();
      };

      const onVisibilityChange = () => {
        if (document.hidden) hide();
      };

      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerover", over, { passive: true });
      window.addEventListener("pointerdown", down);
      window.addEventListener("pointerup", up);
      window.addEventListener("blur", hide);
      document.documentElement.addEventListener("pointerleave", hide);
      document.documentElement.addEventListener("mouseleave", hide);
      document.addEventListener("mouseout", leaveDocument);
      document.addEventListener("visibilitychange", onVisibilityChange);
      return () => {
        if (moveFrame) cancelAnimationFrame(moveFrame);
        if (overFrame) cancelAnimationFrame(overFrame);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", over);
        window.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("blur", hide);
        document.documentElement.removeEventListener("pointerleave", hide);
        document.documentElement.removeEventListener("mouseleave", hide);
        document.removeEventListener("mouseout", leaveDocument);
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }, [
      fullScreen,
      coarsePointer,
      reducedMotion,
      offsetX,
      offsetY,
      rawX,
      rawY,
      cursorX,
      cursorY,
      labelX,
      labelY,
      trackLabel,
      trigger,
    ]);

    const handlePointerEnter = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!fullScreen && trigger !== "always") setVisible(true);
        onPointerEnter?.(e);
      },
      [fullScreen, trigger, onPointerEnter],
    );

    const handlePointerLeave = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!fullScreen && trigger !== "always") setVisible(false);
        setPressed(false);
        onPointerLeave?.(e);
      },
      [fullScreen, trigger, onPointerLeave],
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (fullScreen) {
          onPointerMove?.(e);
          return;
        }
        const rect = surfaceRef.current?.getBoundingClientRect();
        if (rect) {
          rawX.set(e.clientX - rect.left + offsetX);
          rawY.set(e.clientY - rect.top + offsetY);
        }
        onPointerMove?.(e);
      },
      [fullScreen, offsetX, offsetY, onPointerMove, rawX, rawY],
    );

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        setPressed(true);
        if (trigger === "press") setVisible(true);
        onPointerDown?.(e);
      },
      [trigger, onPointerDown],
    );

    const handlePointerUp = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        setPressed(false);
        if (trigger === "press" && !fullScreen) setVisible(false);
        onPointerUp?.(e);
      },
      [trigger, fullScreen, onPointerUp],
    );

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        surfaceRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    const renderedArrow =
      typeof arrow === "function"
        ? arrow(color)
        : (arrow ?? <ArrowGlyph color={color} size={size} />);

    // JAIA: reduced motion renders nothing; with no children there is
    // nothing to wrap either, so drop the whole subtree.
    if (!children && (!mounted || coarsePointer || reducedMotion)) return null;

    const surfaceStyle: CSSProperties = {
      // JAIA: inline cursor hiding only for the surface (non-fullScreen)
      // mode; fullScreen uses the has-custom-cursor class instead.
      ...(hideNativeCursor && !fullScreen && !coarsePointer && !reducedMotion
        ? { cursor: "none" }
        : null),
      ...style,
    };

    // JAIA: overflow hidden so the arrow can never widen the page at the
    // viewport edges (site QA fails on any horizontal overflow).
    const layerStyle: CSSProperties = fullScreen
      ? {
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex,
        }
      : { position: "absolute", inset: 0, pointerEvents: "none", zIndex };

    const showCursor = !coarsePointer && !reducedMotion && visible;

    return (
      <div
        ref={setRefs}
        className={cn(
          "relative",
          fullScreen ? "contents" : null,
          classNames?.root,
          className,
        )}
        style={surfaceStyle}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        {...rest}
      >
        {children}

        <div style={layerStyle} aria-hidden data-site-cursor>
          <AnimatePresence>
            {showCursor && (
              <>
                <motion.div
                  key="user-cursor-arrow"
                  className={cn(
                    "absolute left-0 top-0 select-none will-change-transform",
                    classNames?.cursor,
                  )}
                  style={{
                    x: cursorX,
                    y: cursorY,
                    // JAIA: fixed tilt skips the velocity spring chain.
                    rotate: trackDirection ? smoothArrowRotate : tilt,
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    // JAIA: enlarge over links/buttons for affordance.
                    scale: pressed ? pressScale : interactive ? 1.2 : 1,
                    opacity: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.6, transition: { duration: 0 } }}
                  transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={cn("block", classNames?.arrow)}>
                    {renderedArrow}
                  </div>
                </motion.div>

                {showLabel && (
                  <motion.div
                    key="user-cursor-label"
                    className={cn(
                      "absolute left-0 top-0 select-none will-change-transform",
                      classNames?.label,
                    )}
                    style={{
                      x: labelX,
                      y: labelY,
                      rotate:
                        trackDirection && trackLabel ? smoothLabelRotate : 0,
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: 1,
                      scale: pressed ? pressScale : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {label ?? (
                      <div
                        className={cn(
                          "inline-flex items-center rounded-full font-medium leading-none shadow-[0_2px_10px_rgba(0,0,0,0.15)]",
                          classNames?.labelText,
                        )}
                        style={
                          {
                            background: color,
                            color: textColor,
                            fontSize: `${size * 0.5}px`,
                            paddingInline: `${size * 0.43}px`,
                            paddingBlock: `${size * 0.18}px`,
                            transform: `translate(${labelOffsetX}px, ${labelOffsetY}px)`,
                          } as CSSProperties
                        }
                      >
                        {name}
                      </div>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
);

export default UserCursor;
