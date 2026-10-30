import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ScrollToTop } from "@/components/marketing/scroll-to-top";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { SalesAgent } from "@/components/marketing/sales-agent";
import { siteConfig } from "@/content/site";
import "./globals.css";

const shareImage = {
  url: "/og/jaia-health-lockup-20260820.png",
  width: 1200,
  height: 630,
  alt: "JAIA Health — A trusted partner for the modern private practice",
  type: "image/png",
} as const;

/**
 * Self-hosted so production builds do not download Google Fonts. Next.js
 * fails the Turbopack build when Google answers with extensionless font URLs.
 */
const montserrat = localFont({
  src: [
    { path: "./fonts/montserrat-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/montserrat-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/montserrat-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const lato = localFont({
  src: [
    { path: "./fonts/lato-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lato-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lato",
  display: "swap",
});

const notoSerif = localFont({
  src: [
    { path: "./fonts/noto-serif-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-serif-500.woff2", weight: "500", style: "normal" },
    {
      path: "./fonts/noto-serif-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/noto-serif-500-italic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
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
        <SmoothScroll />
        <ScrollToTop />
        <SalesAgent />
      </body>
    </html>
  );
}
