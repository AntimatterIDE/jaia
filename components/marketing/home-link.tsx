"use client";

/**
 * Logo / home control that always reaches the top of the homepage.
 *
 * Next.js Link is a no-op when the pathname is already `/`, so a same-route
 * click left the visitor stranded mid-page. Lenis owns scroll when mounted,
 * so we drive it (or native scroll) instead of relying on the router alone.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { getLenis } from "@/components/marketing/smooth-scroll";

type HomeLinkProps = Omit<ComponentProps<typeof Link>, "href">;

function scrollHomeToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  html.style.scrollBehavior = previous;
}

export function HomeLink({ onClick, ...props }: HomeLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (pathname !== "/") return;
    event.preventDefault();
    scrollHomeToTop();
  };

  return <Link href="/" onClick={handleClick} {...props} />;
}
