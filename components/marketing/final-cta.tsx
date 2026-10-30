import AnimatedContent from "@/components/AnimatedContent";
import StaggeredText from "@/components/react-bits/staggered-text";
import { CtaButton } from "@/components/marketing/cta";
import { JaiaSymbol } from "@/components/jaia-symbol";
import { finalCta as defaultFinalCta } from "@/content/site";

interface FinalCtaProps {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function FinalCta({
  heading = defaultFinalCta.heading,
  body = defaultFinalCta.body,
  ctaLabel = defaultFinalCta.cta.label,
  ctaHref = defaultFinalCta.cta.href,
}: FinalCtaProps = {}) {
  return (
    <section aria-labelledby="final-cta-heading" className="bg-canvas">
      <div className="mx-auto w-full max-w-[90rem] px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="bg-brand-ink relative overflow-hidden rounded-[2rem]">
          {/* Oversized low-opacity symbol line pattern */}
          <JaiaSymbol className="symbol-watermark text-brand-sky absolute -right-28 -bottom-40 size-[30rem] opacity-[0.09] sm:-right-20" />
          <JaiaSymbol className="symbol-watermark text-brand-sky absolute -top-32 -left-24 size-[22rem] opacity-[0.06]" />

          <div className="relative flex flex-col items-start gap-6 px-7 py-14 sm:gap-7 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <StaggeredText
              as="h2"
              id="final-cta-heading"
              text={heading}
              segmentBy="words"
              delay={45}
              duration={0.55}
              easing={[0.22, 1, 0.36, 1]}
              from={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className="font-display text-h2 max-w-xl font-semibold text-balance text-white"
            />
            <AnimatedContent delay={0.08}>
              <p className="measure text-lead max-w-lg text-white/75">
                {body}
              </p>
            </AnimatedContent>
            <AnimatedContent delay={0.16} className="w-full min-[26rem]:w-auto">
              <CtaButton
                href={ctaHref}
                tone="sky"
                withArrow
                className="w-full justify-center px-7 min-[26rem]:w-auto"
              >
                {ctaLabel}
              </CtaButton>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
}
