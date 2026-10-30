"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

import AnimatedContent from "@/components/AnimatedContent";
import { ScrollRailSegment } from "@/components/marketing/scroll-rail";
import { SectionHeading } from "@/components/marketing/section-heading";
import {
  getPartnerSpotlight,
  type PartnerSpotlight,
} from "@/content/partner-spotlights";
import { useMotionAllowed } from "@/lib/use-motion-allowed";
import { cn } from "@/lib/utils";

/**
 * Claim lifecycle, split from the partner's own one-sentence answer into its
 * five stages. The connector draws with scroll — across on wide screens,
 * down the gutter once the stages stack — and each stage lights as the line
 * reaches it. Static and fully lit without JavaScript or with reduced motion.
 */
export function PartnerClaimFlow({ slug }: { slug: string }) {
  const partner = getPartnerSpotlight(slug);
  if (!partner) return null;
  return <ClaimFlow partner={partner} />;
}

function ClaimFlow({ partner }: { partner: PartnerSpotlight }) {
  const { claims } = partner;
  const motionAllowed = useMotionAllowed();
  const flowRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);
  const lastIndex = claims.steps.length - 1;

  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start 82%", "end 52%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next =
      progress <= 0
        ? -1
        : Math.min(lastIndex, Math.floor(progress * lastIndex + 0.02));
    setReached((current) => (current === next ? current : next));
  });

  const headingId = `${partner.anchor}-claims-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className="section-wash section-wash-mist"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <AnimatedContent className="lg:col-span-6">
            <SectionHeading
              id={headingId}
              eyebrow={claims.eyebrow}
              title={claims.heading}
            />
          </AnimatedContent>
          <AnimatedContent delay={0.06} className="lg:col-span-6">
            <p className="measure text-brand-slate text-[1.0625rem] leading-relaxed">
              {claims.body}
            </p>
          </AnimatedContent>
        </div>

        <AnimatedContent delay={0.08}>
          <div className="border-brand-sky/30 shadow-soft relative mt-12 overflow-hidden rounded-[2rem] border bg-gradient-to-b from-white to-brand-sky-soft px-6 py-10 sm:mt-14 sm:px-10 sm:py-14 lg:px-12">
            <div aria-hidden="true" className="dot-grid absolute inset-0" />

            <ol
              ref={flowRef}
              className="relative lg:grid lg:grid-cols-5 lg:gap-6"
            >
              {/* Wide: one rail through the marker centres (column centres
                  sit at 10% and 90% of a five-column track). */}
              <ScrollRailSegment
                progress={scrollYProgress}
                range={[0, 1]}
                animate={motionAllowed}
                axis="x"
                className="top-[27px] right-[10%] left-[10%] hidden h-0.5 rounded-full lg:block"
              />

              {claims.steps.map((step, index) => {
                const lit = !motionAllowed || index <= reached;
                const isLast = index === lastIndex;
                return (
                  <li
                    key={step.title}
                    className={cn(
                      "relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-5 lg:block lg:pb-0 lg:text-center",
                      !isLast && "pb-9",
                    )}
                  >
                    {/* Stacked: marker-to-marker connectors down the gutter */}
                    {isLast ? null : (
                      <ScrollRailSegment
                        progress={scrollYProgress}
                        range={[index / lastIndex, (index + 1) / lastIndex]}
                        animate={motionAllowed}
                        className="top-14 bottom-0 left-[27px] w-0.5 lg:hidden"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative z-10 flex size-14 items-center justify-center rounded-full border-2 transition-[background-color,border-color,color,box-shadow,scale] duration-300 ease-out motion-reduce:transition-none lg:mx-auto",
                        lit
                          ? "border-brand-ink bg-brand-ink text-canvas"
                          : "border-brand-mist text-brand-slate bg-canvas",
                        motionAllowed && index === reached && "scale-110",
                      )}
                    >
                      <step.icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <div className="pt-1.5 lg:mt-6 lg:pt-0">
                      <p
                        className={cn(
                          "font-display text-xs font-semibold tracking-[0.16em] transition-colors duration-300",
                          lit ? "text-brand-action" : "text-brand-slate",
                        )}
                      >
                        STEP {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display text-brand-ink mt-1.5 text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-brand-slate mt-1.5 text-[0.9375rem] leading-relaxed lg:mx-auto lg:max-w-[17ch]">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="border-brand-mist relative mt-10 flex flex-col gap-4 border-t pt-6 sm:mt-12">
              <p className="text-brand-slate text-[1rem] leading-relaxed">
                <span className="font-display text-brand-ink block font-semibold sm:inline">
                  {claims.receivables.label}
                  <span className="hidden sm:inline">: </span>
                </span>
                {claims.receivables.body}
              </p>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
