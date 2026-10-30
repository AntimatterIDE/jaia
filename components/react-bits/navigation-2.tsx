"use client";

/**
 * React Bits Pro `Navigation2`, restyled for JAIA.
 * The demo product, community, pricing, and login items are not used.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Building2, Handshake, Menu, NotebookPen, X, type LucideIcon } from "lucide-react";

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
    icon: NotebookPen,
    title: "Case studies",
    description: "How practices put JAIA to work",
    href: "/case-studies",
  },
  {
    icon: Handshake,
    title: "Partners",
    description: "Billing, consulting, and technology partners",
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

export function Navigation2() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    pauseLenis();
    return () => resumeLenis();
  }, [mobileMenuOpen]);

  const linkClass = (href: string) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium text-brand-slate hover:text-brand-ink",
      pathname === href && "text-brand-action",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <nav aria-label="Primary" className="mx-auto w-full max-w-[1400px]">
        <div
          className="relative mx-auto hidden w-fit lg:block"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="border-brand-mist overflow-hidden rounded-3xl border bg-white/75 shadow-xl backdrop-blur-2xl">
            <div className="flex items-center gap-2 py-2.5 pr-3 pl-5">
              <HomeLink aria-label="JAIA Health — home" className="mr-4 flex items-center">
                <Image
                  src="/brand/jaia-logo-horizontal.png"
                  alt=""
                  width={128}
                  height={36}
                  priority
                  className="h-8 w-auto"
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
                    className="text-brand-slate hover:text-brand-ink rounded-full px-4 py-2 text-sm font-medium"
                  >
                    {key}
                  </button>
                ))}
              </div>

              <Link
                href={primaryCta.href}
                onMouseEnter={() => setActiveMenu(null)}
                className="bg-brand-ink hover:bg-brand-action-deep ml-4 rounded-xl px-5 py-2 text-sm font-semibold text-white"
              >
                {primaryCta.label}
              </Link>
            </div>

            <AnimatePresence>
              {activeMenu ? (
                <motion.div
                  initial={{ height: 0, opacity: 1 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 1 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="w-[640px] p-3 pt-0">
                    <MenuCards items={menus[activeMenu]} />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="border-brand-mist overflow-hidden rounded-3xl border bg-white/80 shadow-xl backdrop-blur-2xl">
            <div className="flex items-center justify-between py-2.5 pr-2.5 pl-4">
              <HomeLink aria-label="JAIA Health — home" className="flex items-center">
                <Image
                  src="/brand/jaia-logo-horizontal.png"
                  alt=""
                  width={112}
                  height={32}
                  priority
                  className="h-7 w-auto"
                />
              </HomeLink>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="bg-brand-ink flex size-10 items-center justify-center rounded-lg text-white"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>

            <AnimatePresence>
              {mobileMenuOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 1 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 1 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  data-lenis-prevent
                  data-lenis-prevent-wheel
                  data-lenis-prevent-touch
                  className="overflow-hidden"
                >
                  <div className="max-h-[min(70dvh,32rem)] touch-pan-y space-y-5 overflow-y-auto overscroll-contain px-4 pt-1 pb-4 [overflow-anchor:none]">
                    <Link
                      href={primaryCta.href}
                      className="bg-brand-ink block rounded-full px-6 py-2.5 text-center text-sm font-semibold text-white"
                    >
                      {primaryCta.label}
                    </Link>
                    {(Object.keys(menus) as MenuKey[]).map((key) => (
                      <div key={key}>
                        <p className="text-brand-ink mb-2 px-1 text-sm font-semibold">{key}</p>
                        <MenuCards items={menus[key]} />
                      </div>
                    ))}
                    <Link href="/contact" className={linkClass("/contact")}>
                      Contact
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation2;
