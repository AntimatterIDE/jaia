import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaLink } from "@/components/marketing/cta";
import { approach, primaryCta, type ApproachStep } from "@/content/site";

interface ApproachProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  steps?: readonly ApproachStep[];
  /** Closing line beside the CTA */
  footnote?: string;
}

/**
 * Approach — the four engagement steps as one connected sequence rather than
 * four detached cards. A rail runs between the numbered markers (horizontal
 * when the steps sit side by side, vertical once they stack) so the order is
 * legible at a glance, which is the entire point of the section.
 *
 * Service pages pass the same four steps with service-specific bodies, so the
 * process reads identically everywhere while the detail stays relevant.
 */
export function Approach({
  id = "approach-heading",
  eyebrow = approach.eyebrow,
  heading = approach.heading,
  steps = approach.steps,
  footnote = "Every engagement starts by understanding the practice you already run.",
}: ApproachProps = {}) {
  return (
    <section aria-labelledby={id} className="bg-canvas">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
        <AnimatedContent>
          <SectionHeading id={id} eyebrow={eyebrow} title={heading} />
        </AnimatedContent>

        <ol className="mt-14 grid gap-8 sm:mt-16 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.step}
              className="approach-step relative pl-16 lg:pt-16 lg:pl-0"
            >
              {/* Marker sits outside the reveal wrapper: GSAP leaves a
                  transform there, which would capture absolute positioning. */}
              <span
                aria-hidden="true"
                className="border-brand-sky text-brand-action shadow-soft absolute top-0 left-0 z-10 flex size-12 items-center justify-center rounded-full border bg-white"
              >
                <step.icon className="size-5" strokeWidth={1.75} />
              </span>

              <AnimatedContent delay={index * 0.09} className="h-full">
                <SpotlightCard className="lift border-brand-mist hover:border-brand-sky hover:shadow-lift h-full rounded-2xl border bg-white p-6">
                  <p className="font-display text-brand-slate text-xs font-semibold tracking-[0.16em]">
                    STEP {step.step}
                  </p>
                  <h3 className="font-display text-h3 text-brand-ink mt-2 font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-brand-slate mt-3 text-[0.9375rem] leading-relaxed">
                    {step.body}
                  </p>
                </SpotlightCard>
              </AnimatedContent>
            </li>
          ))}
        </ol>

        <AnimatedContent delay={0.12}>
          <div className="relative mt-14 flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-canvas before:via-brand-mist before:to-canvas">
            <p className="measure text-brand-slate text-[1.0625rem] leading-relaxed">
              {footnote}
            </p>
            <CtaLink href={primaryCta.href} className="shrink-0">
              {primaryCta.label}
            </CtaLink>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
