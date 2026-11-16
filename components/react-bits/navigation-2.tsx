"use client";

/**
 * React Bits Pro `Navigation2`, restyled for JAIA.
 * The demo product, community, pricing, and login items are not used.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Building2, ChevronDown, Handshake, Mail, Menu, X, type LucideIcon } from "lucide-react";

import { HomeLink } from "@/components/marketing/home-link";
import { pauseLenis, resumeLenis } from "@/components/marketing/smooth-scroll";
import { services, serviceUrl } from "@/content/services";
import { primaryCta } from "@/content/site";
import { cn } from "@/lib/utils";

type MenuKey = "Services" | "Company";

interface MenuEntry {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const companyItems: MenuEntry[] = [
  {
    icon: Handshake,
    title: "Case studies & partners",
    description: "How practices and partners work with JAIA",
    href: "/partners",
  },
  {
    icon: Building2,
    title: "About",
    description: "Built from inside independent practice",
    href: "/about",
  },
];

function serviceItems(): MenuEntry[] {
  return services.map((service) => ({
    icon: service.icon,
    title: service.shortName,
    description: service.category,
    href: serviceUrl(service.slug),
  }));
}

const menus: Record<MenuKey, MenuEntry[]> = {
  Services: serviceItems(),
  Company: companyItems,
};

const mobileCompanyItems: MenuEntry[] = [
  ...companyItems,
  {
    icon: Mail,
    title: "Contact",
    description: "Start a conversation",
    href: "/contact",
  },
];

function MenuCards({ items }: { items: readonly MenuEntry[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 1, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04 }}
          >
            <Link
              href={item.href}
              className="group border-brand-mist hover:border-brand-sky hover:bg-brand-sky-soft/60 flex items-start gap-3 rounded-2xl border bg-white/80 p-4"
            >
              <span className="bg-brand-sky-soft text-brand-action shrink-0 rounded-lg p-2">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="text-brand-ink block text-sm font-semibold">
                  {item.title}
                </span>
                <span className="text-brand-slate mt-0.5 block text-xs leading-snug">
                  {item.description}
                </span>
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

function MobileNavLink({ item, pathname }: { item: MenuEntry; pathname: string }) {
  const Icon = item.icon;
  const active = pathname === item.href;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold",
        active
          ? "bg-brand-sky-soft text-brand-ink"
          : "text-brand-ink hover:bg-brand-sky-soft/70",
      )}
    >
      <span className="bg-brand-sky/40 text-brand-ink shrink-0 rounded-lg p-1.5">
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      {item.title}
    </Link>
  );
}

function MobileNavDrawer({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollMore, setCanScrollMore] = useState(false);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = [
        ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      setCanScrollMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const transition = {
    duration: reduceMotion ? 0 : 0.42,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
        className="bg-brand-ink/25 fixed inset-0 z-[70]"
        onClick={onClose}
        aria-hidden
      />
      <motion.aside
        ref={panelRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        initial={{ clipPath: "inset(0% 0% 100% 0% round 1.5rem)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
        exit={{ clipPath: "inset(0% 0% 100% 0% round 1.5rem)" }}
        transition={transition}
        className="border-brand-sky/40 fixed top-3 right-4 left-4 z-[80] mx-auto flex max-h-[calc(100dvh-2.25rem-env(safe-area-inset-bottom))] max-w-[1400px] origin-top flex-col overflow-hidden rounded-3xl border bg-white shadow-xl sm:right-6 sm:left-6"
      >
        <div className="bg-brand-sky flex shrink-0 items-center justify-between py-2.5 pr-2.5 pl-4">
          <HomeLink aria-label="JAIA Health — home" className="flex items-center">
            <Image
              src="/brand/jaia-logo-horizontal.png"
              alt=""
              width={112}
              height={32}
              className="h-7 w-auto brightness-0"
            />
          </HomeLink>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="bg-brand-ink flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-brand-ink/90"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="shrink-0 px-4 pt-4 pb-3">
          <Link
            href={primaryCta.href}
            className="bg-brand-ink hover:bg-brand-ink/90 block rounded-full px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors"
          >
            {primaryCta.label}
          </Link>
        </div>

        <div className="relative min-h-0">
          <div
            ref={scrollerRef}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            className="max-h-[calc(100dvh-2.25rem-env(safe-area-inset-bottom)-10rem)] touch-pan-y overflow-y-auto overscroll-contain px-3 pb-6"
          >
            <div className="space-y-4">
              <div>
                <p className="text-brand-slate mb-1 px-3 text-xs font-semibold tracking-wide uppercase">
                  Services
                </p>
                <ul>
                  {menus.Services.map((item) => (
                    <li key={item.href}>
                      <MobileNavLink item={item} pathname={pathname} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-brand-slate mb-1 px-3 text-xs font-semibold tracking-wide uppercase">
                  Company
                </p>
                <ul>
                  {mobileCompanyItems.map((item) => (
                    <li key={item.href}>
                      <MobileNavLink item={item} pathname={pathname} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {canScrollMore ? (
            <div className="pointer-events-none absolute inset-x-3 bottom-0 flex items-end justify-center rounded-b-3xl bg-gradient-to-t from-white via-white to-transparent pt-10 pb-3">
              <span className="text-brand-ink flex items-center gap-1 text-xs font-semibold">
                Scroll for more
                <ChevronDown className="size-4" aria-hidden />
              </span>
            </div>
          ) : null}
        </div>
      </motion.aside>
    </>,
    document.body,
  );
}

export function Navigation2() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    pauseLenis();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      resumeLenis();
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <nav aria-label="Primary" className="mx-auto w-full max-w-[1400px]">
        <div
          className="relative mx-auto hidden w-fit lg:block"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="border-brand-sky/40 bg-brand-sky rounded-3xl border shadow-xl">
            <div className="flex items-center gap-2 py-2.5 pr-3 pl-5">
              <HomeLink aria-label="JAIA Health — home" className="mr-4 flex items-center">
                <Image
                  src="/brand/jaia-logo-horizontal.png"
                  alt=""
                  width={128}
                  height={36}
                  priority
                  className="h-8 w-auto brightness-0"
                />
              </HomeLink>

              <div className="flex items-center">
                {(Object.keys(menus) as MenuKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-expanded={activeMenu === key}
                    onMouseEnter={() => setActiveMenu(key)}
                    onFocus={() => setActiveMenu(key)}
                    onClick={() => setActiveMenu(key)}
                    className={cn(
                      "text-brand-ink/75 hover:text-brand-ink rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      activeMenu === key && "text-brand-ink",
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <Link
                href={primaryCta.href}
                onMouseEnter={() => setActiveMenu(null)}
                className="bg-brand-ink hover:bg-brand-ink/90 ml-4 rounded-xl px-5 py-2 text-sm font-semibold text-white transition-colors"
              >
                {primaryCta.label}
              </Link>
            </div>
          </div>

          <AnimatePresence>
            {activeMenu ? (
              <motion.div
                initial={{ opacity: 1, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 8 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-full left-1/2 z-50 w-[40rem] -translate-x-1/2 pt-2"
              >
                <div className="border-brand-mist rounded-3xl border bg-white/95 p-3 shadow-xl backdrop-blur-2xl">
                  <MenuCards items={menus[activeMenu]} />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="lg:hidden">
          <div className="border-brand-sky/40 bg-brand-sky overflow-hidden rounded-3xl border shadow-xl">
            <div className="flex items-center justify-between py-2.5 pr-2.5 pl-4">
              <HomeLink aria-label="JAIA Health — home" className="flex items-center">
                <Image
                  src="/brand/jaia-logo-horizontal.png"
                  alt=""
                  width={112}
                  height={32}
                  priority
                  className="h-7 w-auto brightness-0"
                />
              </HomeLink>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="bg-brand-ink flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-brand-ink/90"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? <MobileNavDrawer key="mobile-nav" onClose={closeMobileMenu} /> : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navigation2;
