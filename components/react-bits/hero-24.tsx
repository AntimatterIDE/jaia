"use client";

/**
 * React Bits Pro `hero-24`, restyled for JAIA.
 *
 * Kept from the block: left-aligned reading stack, NeuroNoise filament
 * field, staggered Motion entrance, pinging status chip, dual CTAs, and
 * a footer metric/logo row. Video (or a still, where no clip exists)
 * replaces the solid shader canvas; the noise sits as a low-opacity
 * texture. Demo copy, dark-mode flipping, and invented partner names are
 * not used — the logo row only takes confirmed partner lockups.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { NeuroNoise } from "@paper-design/shaders-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

import { CtaButton, CtaLink } from "@/components/marketing/cta";
import { useMotionAllowed } from "@/lib/use-motion-allowed";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface Hero24Fact {
  value: string;
  label: string;
}

export interface Hero24Cta {
  label: string;
  href: string;
}

export interface Hero24Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** In-page anchor or route for the logo chip */
  href?: string;
}

export interface Hero24Props {
  eyebrow: string;
  heading: string;
  headingId?: string;
  body: string;
  primaryCta: Hero24Cta;
  secondaryCta: Hero24Cta;
  facts?: readonly Hero24Fact[];
  /** Footer logo row, shown instead of facts */
  logos?: { label: string; items: readonly Hero24Logo[] };
  videoSrc?: string;
  /** Still background, used when `videoSrc` is not set */
  image?: { src: string; position?: string };
  /** Drift the backdrop and ease the copy out as the hero scrolls away */
  parallax?: boolean;
  className?: string;
}

function HeroVideo({
  src,
  reduceMotion,
}: {
  src: string;
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Only play once we know reduced motion is off — a null first read
    // would otherwise autoplay before the preference hydrates.
    if (reduceMotion !== false) {
      video.pause();
      return;
    }

    const tryPlay = () => {
      if (!visibleRef.current) return;
      void video.play().catch(() => {
        /* Autoplay can be blocked; the first frame stays on screen. */
      });
    };

    const sync = () => {
      if (visibleRef.current) tryPlay();
      else video.pause();
    };

    // Pause when scrolled away so a looping ~3MB hero is not decoding off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        sync();
      },
      { rootMargin: "80px" },
    );
    observer.observe(video);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      sync();
    } else {
      video.addEventListener("canplay", sync, { once: true });
    }

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", sync);
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
      src={src}
      muted
      playsInline
      loop
      preload="metadata"
    />
  );
}

export function Hero24({
  eyebrow,
  heading,
  headingId = "hero-24-heading",
  body,
  primaryCta,
  secondaryCta,
  facts = [],
  logos,
  videoSrc,
  image,
  parallax = false,
  className,
}: Hero24Props) {
  const reduceMotion = useReducedMotion();
  const motionAllowed = useMotionAllowed();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Backdrop trails the scroll (moves down slower than the page moves up),
  // so its top edge can never show; overflow-hidden clips the bottom.
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const copyOpacity = useTransform(scrollYProgress, [0.2, 0.9], [1, 0]);
  const drift = parallax && motionAllowed;

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const item: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      };

  const headline: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, filter: "blur(0px)" },
        show: { opacity: 1, filter: "blur(0px)" },
      }
    : {
        hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.85, ease: EASE },
        },
      };

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className={cn(
        "bg-canvas-soft relative flex min-h-[100svh] w-full flex-col overflow-hidden",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        className={cn("absolute inset-0", drift && "will-change-transform")}
        style={drift ? { y: mediaY, scale: mediaScale } : undefined}
      >
        {videoSrc ? (
          <HeroVideo src={videoSrc} reduceMotion={reduceMotion} />
        ) : image ? (
          <Image
            src={image.src}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="img-tone object-cover"
            style={{ objectPosition: image.position ?? "70% center" }}
          />
        ) : null}
      </motion.div>

      <NeuroNoise
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40 mix-blend-soft-light"
        style={{ width: "100%", height: "100%" }}
        colorBack="#ffffff"
        colorMid="#87cdec"
        colorFront="#276f91"
        brightness={0.55}
        contrast={0.38}
        scale={1.15}
        offsetX={0.42}
        /* Slower shader loop — paired with video, 0.45 felt heavy on desktop */
        speed={reduceMotion ? 0 : 0.22}
      />

      {/* Readability scrims: light left wash for ink type (WCAG AA),
          bottom fade so the next canvas section does not hard-cut. */}
      <div
        aria-hidden="true"
        className="bg-brand-ink/20 pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.96)_12%,rgb(255_255_255/0.86)_36%,rgb(255_255_255/0.42)_58%,rgb(255_255_255/0)_84%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_255_255/0)_58%,rgb(255_255_255/0.92))]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={drift ? { y: copyY, opacity: copyOpacity } : undefined}
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[90rem] flex-1 flex-col px-5 sm:px-8"
      >
        <div className="flex flex-1 flex-col justify-center pt-[calc(var(--header-height)+2.5rem)] pb-8 sm:pt-[calc(var(--header-height)+4rem)] sm:pb-10 lg:pt-[calc(var(--header-height)+5rem)] [@media(max-height:44rem)]:pt-[calc(var(--header-height)+1.25rem)] [@media(max-height:44rem)]:pb-4">
          <div className="flex max-w-xl flex-col items-start gap-6 text-left sm:gap-8 [@media(max-height:44rem)]:gap-4">
            <div className="flex flex-col gap-4 sm:gap-5 [@media(max-height:44rem)]:gap-3">
              <motion.div
                variants={item}
                className="border-brand-mist/80 text-brand-ink inline-flex w-fit self-start items-center gap-2 rounded-full border bg-white/70 px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md"
              >
                <span className="relative flex size-2">
                  {/* Hidden with CSS, not unmounted: the server cannot know
                      the motion preference, so a conditional node would
                      fail hydration for reduced-motion visitors. */}
                  <span className="bg-brand-action absolute inline-flex size-full animate-ping rounded-full opacity-70 motion-reduce:hidden" />
                  <span className="bg-brand-action relative inline-flex size-2 rounded-full" />
                </span>
                {eyebrow}
              </motion.div>

              <motion.h1
                id={headingId}
                variants={headline}
                className="font-display text-brand-ink text-[clamp(2.25rem,1.75rem+1.5vw,3rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance"
              >
                {heading}
              </motion.h1>
            </div>

            <motion.p
              variants={item}
              className="text-lead text-brand-slate max-w-[42ch]"
            >
              {body}
            </motion.p>

            <motion.div
              variants={item}
              className="flex w-full flex-col items-start gap-3 min-[26rem]:w-auto min-[26rem]:flex-row min-[26rem]:items-center min-[26rem]:gap-x-6"
            >
              <CtaButton href={primaryCta.href} withArrow>
                {primaryCta.label}
              </CtaButton>
              <CtaLink href={secondaryCta.href}>{secondaryCta.label}</CtaLink>
            </motion.div>
          </div>
        </div>

        {logos && logos.items.length > 0 ? (
          <motion.div
            variants={item}
            className="border-brand-mist/70 mt-auto flex max-w-xl shrink-0 flex-col gap-3 border-t py-5 sm:flex-row sm:items-center sm:gap-6 sm:py-6 [@media(max-height:44rem)]:gap-2 [@media(max-height:44rem)]:py-3"
          >
            <p className="text-brand-slate shrink-0 text-xs font-semibold tracking-[0.14em] uppercase">
              {logos.label}
            </p>
            <ul className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {logos.items.map((logo) => {
                const mark = (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-6 w-auto sm:h-7"
                  />
                );
                const chip =
                  "border-brand-mist/80 inline-flex h-12 items-center rounded-full border bg-white/80 px-4 shadow-sm backdrop-blur-md sm:px-5 [@media(max-height:44rem)]:h-10 [@media(max-height:44rem)]:px-3.5";
                return (
                  <li key={logo.src}>
                    {logo.href ? (
                      <a
                        href={logo.href}
                        className={cn(
                          chip,
                          "lift hover:border-brand-sky hover:shadow-lift",
                        )}
                      >
                        {mark}
                      </a>
                    ) : (
                      <span className={chip}>{mark}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : facts.length > 0 ? (
          <motion.dl
            variants={item}
            className="border-brand-mist/70 mt-auto flex max-w-xl shrink-0 gap-10 border-t py-5 sm:py-6"
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-display text-brand-ink text-xl font-semibold tracking-tight sm:text-2xl">
                  {fact.value}
                </dd>
                <dd className="text-brand-slate mt-1 text-sm">{fact.label}</dd>
              </div>
            ))}
          </motion.dl>
        ) : null}
      </motion.div>
    </section>
  );
}

export default Hero24;
