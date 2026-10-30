"use client";

/**
 * Site-wide Lenis. Mounts as a sibling in the root layout (no nested
 * scroll wrapper). Not instanced when the user prefers reduced motion.
 */

import { useEffect } from "react";
import type Lenis from "lenis";
import { reducedMotionQuery } from "@/lib/motion";
import "lenis/dist/lenis.css";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

function headerOffset() {
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 104;
}

export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);
    let generation = 0;
    let teardown = () => {};

    const start = async () => {
      const gen = ++generation;
      teardown();
      teardown = () => {};

      if (media.matches) return;

      const { default: Lenis } = await import("lenis");
      if (gen !== generation || media.matches) return;

      const offset = headerOffset();
      // Snappier lerp — 0.08 felt floaty alongside hero video / cursor work
      const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.14,
        anchors: { offset, duration: 0.9 },
        stopInertiaOnNavigate: true,
        allowNestedScroll: true,
      });

      // Lenis animates native scroll; dispatch so window/document listeners
      // (ScrollStack, others) keep receiving scroll while it interpolates.
      // Only for Lenis's own smooth scrolls: on native scrolls (keyboard,
      // scrollbar, touch) Lenis emits from inside its window `scroll`
      // listener, so re-dispatching would re-enter it until the stack overflows.
      const unsubScroll = lenis.on("scroll", () => {
        if (lenis.isScrolling !== "smooth") return;
        window.dispatchEvent(new Event("scroll"));
      });

      lenisInstance = lenis;

      const skip = document.querySelector<HTMLAnchorElement>("a.skip-link");
      const onSkip = () => {
        window.requestAnimationFrame(() => {
          document
            .getElementById("main-content")
            ?.focus({ preventScroll: true });
        });
      };
      skip?.addEventListener("click", onSkip);

      const onDocClick = (event: MouseEvent) => {
        const anchor = (event.target as Element | null)?.closest("a");
        if (!(anchor instanceof HTMLAnchorElement)) return;
        if (anchor.classList.contains("skip-link")) return;
        if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
          return;
        }
        const href = anchor.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        let url: URL;
        try {
          url = new URL(anchor.href, window.location.href);
        } catch {
          return;
        }
        if (url.origin !== window.location.origin) return;
        if (url.pathname !== window.location.pathname) return;
        if (!url.hash) return;

        event.preventDefault();
        lenis.scrollTo(url.hash, { offset, duration: 0.9 });
      };
      document.addEventListener("click", onDocClick);

      teardown = () => {
        skip?.removeEventListener("click", onSkip);
        document.removeEventListener("click", onDocClick);
        unsubScroll();
        lenis.destroy();
        if (lenisInstance === lenis) lenisInstance = null;
      };
    };

    void start();
    media.addEventListener("change", start);
    return () => {
      generation += 1;
      media.removeEventListener("change", start);
      teardown();
    };
  }, []);

  return null;
}
