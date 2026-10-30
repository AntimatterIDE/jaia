import type { Metadata } from "next";
import { Montserrat, Lato, Noto_Serif } from "next/font/google";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ScrollToTop } from "@/components/marketing/scroll-to-top";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { SalesAgent } from "@/components/marketing/sales-agent";
import UserCursor from "@/components/react-bits/user-cursor";
import { siteConfig } from "@/content/site";
import "./globals.css";

const shareImage = {
  url: "/og/jaia-health-lockup-20260820.png",
  width: 1200,
  height: 630,
  alt: "JAIA Health — A trusted partner for the modern private practice",
  type: "image/png",
} as const;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "JAIA Health — A trusted partner for the modern private practice",
    template: "%s | JAIA Health",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "JAIA Health — A trusted partner for the modern private practice",
    description: siteConfig.description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "JAIA Health — A trusted partner for the modern private practice",
    description: siteConfig.description,
    images: [shareImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${lato.variable} ${notoSerif.variable} h-full`}
    >
      <body className="bg-canvas text-foreground flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        {/* Site cursor: brand-action fill (--brand-action), no user-name
            label, fixed arrow angle (no direction-aware tilt). Renders
            nothing on coarse pointers and under prefers-reduced-motion. */}
        <UserCursor
          fullScreen
          trigger="always"
          showLabel={false}
          color="#276f91"
          size={26}
          tilt={18}
          directionAwareTilt={false}
          pressScale={0.9}
          /* Above sales-agent panel (z-40) and sheets (z-100). The layer is
             pointer-events: none, so it never blocks clicks — only paints. */
          zIndex={110}
          spring={{ stiffness: 1100, damping: 55, mass: 0.28 }}
        />
        <SmoothScroll />
        <ScrollToTop />
        <SalesAgent />
      </body>
    </html>
  );
}
