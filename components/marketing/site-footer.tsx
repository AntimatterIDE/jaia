import Link from "next/link";
import Image from "next/image";
import { HomeLink } from "@/components/marketing/home-link";
import { services, serviceUrl } from "@/content/services";
import { siteConfig } from "@/content/site";

/**
 * Site footer — JAIA-branded adaptation of React Bits Pro `footer-5`
 * (`@reactbits-pro/footer-5`): full-bleed ink panel, 9-column height
 * gradient, left brand + blurb + socials, right link columns, copyright
 * inside the panel.
 *
 * Server component: the bar overlay is static CSS. Social icons render
 * without an `<a>` until `siteConfig.socials[].href` is a real URL.
 */

const companyLinks = [
  { href: "/case-studies", label: "Case studies" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;

/**
 * lucide-react 1.x no longer exports brand marks (`Linkedin`, `Instagram`).
 * These match the former Lucide 24×24 stroke glyphs.
 */
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
} as const;

/** Geometry from Footer5; fills retinted as black + sky washes on ink. */
const GRADIENT_BARS = Array.from({ length: 9 }, (_, i) => {
  const distFromCenter = Math.abs(i - 4);
  const t = Math.max(0.1, 1 - distFromCenter * 0.2);
  return {
    height: `${Math.max(20, 90 - distFromCenter * 15)}%`,
    background: `linear-gradient(to top, rgba(0,0,0,${t * 0.4}) 0%, rgba(135, 205, 236, ${t * 0.14}) 48%, rgba(0,0,0,0) 100%)`,
  };
});

function FooterBarGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex flex-row items-end justify-center"
    >
      {GRADIENT_BARS.map((bar, i) => (
        <div
          key={i}
          className="relative flex-1"
          style={{ height: bar.height, background: bar.background }}
        />
      ))}
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:text-brand-sky inline-flex min-h-9 items-center text-[0.9375rem] text-white/90 transition-colors duration-150"
    >
      {children}
    </Link>
  );
}

const socialButtonClass =
  "inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white/90 transition-colors duration-150";

function FooterSocials() {
  const linked = siteConfig.socials.filter((social) => social.href);
  if (linked.length === 0) return null;

  return (
    <ul className="flex items-center gap-3" aria-label="Social">
      {linked.map((social) => {
        const Icon = SOCIAL_ICONS[social.network];

        return (
          <li key={social.network}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`${socialButtonClass} hover:text-brand-sky hover:border-brand-sky`}
            >
              <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink relative w-full overflow-hidden">
      <FooterBarGradient />

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col space-y-6 sm:space-y-8">
            <HomeLink
              className="inline-flex w-fit rounded-sm"
              aria-label="JAIA Health — home"
            >
              <Image
                src="/brand/jaia-logo-stacked.svg"
                alt="JAIA Health"
                width={288}
                height={432}
                unoptimized
                className="h-auto w-[6.5rem]"
              />
            </HomeLink>

            <p className="measure-narrow max-w-sm text-base leading-relaxed font-medium text-white/90 sm:text-lg">
              {siteConfig.description}
            </p>

            <FooterSocials />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <nav aria-label="Services" className="flex flex-col space-y-4">
              <h2 className="text-brand-sky text-sm font-semibold tracking-[0.14em] uppercase">
                Services
              </h2>
              <ul className="space-y-1">
                {services.map((service) => (
                  <li key={service.slug}>
                    <FooterLink href={serviceUrl(service.slug)}>
                      {service.shortName}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Company" className="flex flex-col space-y-4">
              <h2 className="text-brand-sky text-sm font-semibold tracking-[0.14em] uppercase">
                Company
              </h2>
              <ul className="space-y-1">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-[0.9375rem] leading-relaxed text-white/90">
          Information on this site is for general business purposes and is not
          medical, legal or billing advice.
        </p>
        <p className="mt-6 border-t border-white/10 pt-8 text-sm font-medium text-white/70 sm:text-base">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
