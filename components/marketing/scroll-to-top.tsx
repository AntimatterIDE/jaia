"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/components/marketing/smooth-scroll";

/**
 * Next.js 16 App Router keeps the previous scroll offset when the new page's
 * first node is still considered in the viewport after a shared-layout
 * transition. CSS `scroll-behavior: smooth` on `<html>` also turns
 * `html.scrollTop = 0` into an interruptible animation (Next.js only disables
 * that when `data-scroll-behavior="smooth"` is set).
 *
 * Pathname-only navigations jump to (0, 0) instantly. Hash fragments are left
 * alone so in-page jumps such as `/#capabilities` still work.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;

    const html = document.documentElement;

    const toTop = () => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        return;
      }
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      html.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      html.style.scrollBehavior = previous;
    };

    toTop();
    // Lenis may mount a tick later; re-assert top so shared-layout nav
    // from interior pages does not leave the previous scroll offset.
    const frame = requestAnimationFrame(toTop);
    const timer = window.setTimeout(toTop, 50);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
