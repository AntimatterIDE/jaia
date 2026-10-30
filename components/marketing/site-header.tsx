"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { CtaButton } from "@/components/marketing/cta";
import { HomeLink } from "@/components/marketing/home-link";
import {
  pauseLenis,
  resumeLenis,
} from "@/components/marketing/smooth-scroll";
import { services, serviceUrl } from "@/content/services";
import { primaryCta } from "@/content/site";
import { reducedMotionQuery } from "@/lib/motion";
import { cn } from "@/lib/utils";

const topLevelLinks = [
  { href: "/case-studies", label: "Case studies" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Distance scrolled before the header is allowed to recede */
const HIDE_AFTER = 96;

/**
 * Shared desktop nav treatment. No filled background in any state — the
 * header is translucent, so a solid pill would read as a floating chip. The
 * current page is marked with an underline under the label instead.
 */
const navItemClass =
  "group/nav relative inline-flex h-11 items-center rounded-sm px-3 text-[0.9375rem] font-medium text-brand-ink transition-colors duration-150 hover:text-brand-action data-active:text-brand-action data-section-active:text-brand-action " +
  // The shadcn navigation-menu primitives ship filled hover/active states.
  // Neutralize every variant they define so tailwind-merge drops them.
  "hover:bg-transparent focus:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent";

function NavIndicator() {
  return (
    <span
      aria-hidden="true"
      className="bg-brand-action pointer-events-none absolute -bottom-1 inset-x-px h-0.5 rounded-full opacity-0 transition-opacity duration-200 group-hover/nav:opacity-35 group-data-active/nav:opacity-100 group-data-section-active/nav:opacity-100 motion-reduce:transition-none"
    />
  );
}

function NavLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <NavIndicator />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);
  const onServicePage = pathname.startsWith("/services/");

  /**
   * Recede on downward scroll, return on upward scroll. Reads are batched
   * into an animation frame so the listener never lays out synchronously.
   * Mobile keeps the header pinned so the burger menu stays reachable —
   * hiding it made the trigger intermittently unavailable.
   */
  React.useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const reduceMotion = window.matchMedia(reducedMotionQuery);
    // Match the `lg:` breakpoint used for desktop nav / burger visibility
    const desktopNav = window.matchMedia("(min-width: 64rem)");

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);
      // Pin when reduced-motion is on, or when the burger is the only nav
      if (reduceMotion.matches || !desktopNav.matches) {
        setHidden(false);
        return;
      }
      // Ignore rubber-band overscroll at either end
      if (y < 0) return;
      if (y <= HIDE_AFTER) setHidden(false);
      else if (Math.abs(y - last) > 6) setHidden(y > last);
      last = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    reduceMotion.addEventListener("change", update);
    desktopNav.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      reduceMotion.removeEventListener("change", update);
      desktopNav.removeEventListener("change", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Never hide while a menu is open or something inside has keyboard focus
  const pinned = sheetOpen || navOpen;
  const receded = hidden && !pinned;

  // Pause Lenis while the sheet is open — nested overflow alone is not enough
  // when the document scroller still owns wheel/touch through Lenis.
  React.useEffect(() => {
    if (!sheetOpen) return;
    pauseLenis();
    return () => {
      resumeLenis();
    };
  }, [sheetOpen]);

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "fixed top-0 left-0 z-50 w-full max-w-[100vw] transition-transform duration-300 ease-out motion-reduce:transition-none",
        receded ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        aria-hidden="true"
        className="header-veil"
        data-scrolled={scrolled}
      />

      <div className="relative mx-auto flex h-[var(--header-height)] w-full max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8">
        <HomeLink
          className="inline-flex min-h-11 shrink-0 items-center rounded-sm"
          aria-label="JAIA Health — home"
        >
          <Image
            src="/brand/jaia-logo-horizontal.png"
            alt="JAIA Health"
            width={491}
            height={209}
            loading="eager"
            className="h-9 w-auto sm:h-10"
          />
        </HomeLink>

        {/* Desktop navigation */}
        <NavigationMenu
          className="hidden lg:flex"
          aria-label="Primary"
          onValueChange={(value) => setNavOpen(Boolean(value))}
        >
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                data-section-active={onServicePage || undefined}
                className={navItemClass}
              >
                <NavLabel>Services</NavLabel>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[34rem] grid-cols-2 gap-1 p-3">
                  {services.map((service) => {
                    const href = serviceUrl(service.slug);
                    const active = pathname === href;
                    return (
                      <li key={service.slug}>
                        <NavigationMenuLink
                          asChild
                          active={active}
                          className="hover:bg-brand-sky-soft focus:bg-brand-sky-soft data-active:bg-brand-sky-soft data-active:hover:bg-brand-sky-soft data-active:focus:bg-brand-sky-soft flex items-start gap-3 rounded-xl p-3 transition-colors duration-150"
                        >
                          <Link
                            href={href}
                            aria-current={active ? "page" : undefined}
                          >
                            <span
                              aria-hidden="true"
                              className="bg-brand-sky-soft text-brand-action mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg"
                            >
                              <service.icon
                                className="size-4.5"
                                strokeWidth={1.75}
                              />
                            </span>
                            <span className="flex flex-col gap-0.5">
                              <span className="text-brand-ink text-sm font-semibold">
                                {service.shortName}
                              </span>
                              <span className="text-brand-slate text-[0.8125rem] leading-snug">
                                {service.category}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {topLevelLinks.map((link) => {
              const active =
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);
              return (
                <NavigationMenuItem key={link.href}>
                  {/* className goes on the primitive so its own filled
                      states are merged away rather than concatenated */}
                  <NavigationMenuLink
                    asChild
                    active={active}
                    className={navItemClass}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                    >
                      <NavLabel>{link.label}</NavLabel>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <CtaButton
            href={primaryCta.href}
            size="compact"
            className="hidden md:inline-flex"
          >
            {primaryCta.label}
          </CtaButton>

          {/* Mobile navigation — always in the DOM under lg; header stays
              pinned on those widths so this trigger cannot scroll away. */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={sheetOpen}
                className="text-brand-ink hover:bg-canvas-soft relative z-10 inline-flex size-11 items-center justify-center rounded-lg transition-colors duration-150 lg:hidden"
              >
                <Menu
                  aria-hidden="true"
                  className="size-6"
                  strokeWidth={1.75}
                />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              className="bg-canvas z-[100] flex h-dvh max-h-dvh w-full max-w-sm min-h-0 flex-col gap-0 overflow-hidden px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <SheetHeader className="shrink-0 p-0 text-left">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation and contact actions
                </SheetDescription>
                <Image
                  src="/brand/jaia-logo-horizontal.png"
                  alt="JAIA Health"
                  width={491}
                  height={209}
                  className="h-9 w-auto self-start"
                />
              </SheetHeader>

              <nav
                aria-label="Mobile"
                data-lenis-prevent
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
                onWheel={(event) => event.stopPropagation()}
                className="mt-6 flex min-h-0 flex-1 touch-pan-y flex-col overflow-y-auto overscroll-contain [overflow-anchor:none]"
              >
                <p className="text-brand-slate text-xs font-semibold tracking-[0.14em] uppercase">
                  Services
                </p>
                <ul className="mt-2 flex flex-col">
                  {services.map((service) => {
                    const href = serviceUrl(service.slug);
                    const active = pathname === href;
                    return (
                      <li key={service.slug}>
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setSheetOpen(false)}
                          className={cn(
                            "text-brand-ink hover:bg-brand-sky-soft relative flex min-h-12 items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors duration-150",
                            active &&
                              "text-brand-action before:bg-brand-action before:absolute before:top-2 before:bottom-2 before:left-0 before:w-0.5 before:rounded-full before:content-['']",
                          )}
                        >
                          <service.icon
                            aria-hidden="true"
                            className="text-brand-action size-5"
                            strokeWidth={1.75}
                          />
                          {service.shortName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <Separator className="my-4" />

                <ul className="flex flex-col pb-2">
                  {topLevelLinks.map((link) => {
                    const active =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setSheetOpen(false)}
                          className={cn(
                            "text-brand-ink hover:bg-brand-sky-soft relative flex min-h-12 items-center rounded-lg px-3 py-3 text-base font-medium transition-colors duration-150",
                            active &&
                              "text-brand-action before:bg-brand-action before:absolute before:top-2 before:bottom-2 before:left-0 before:w-0.5 before:rounded-full before:content-['']",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-brand-mist mt-4 shrink-0 border-t pt-4">
                <CtaButton
                  href={primaryCta.href}
                  className="w-full"
                  onClick={() => setSheetOpen(false)}
                >
                  {primaryCta.label}
                </CtaButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
