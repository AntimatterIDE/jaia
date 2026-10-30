import AnimatedContent from "@/components/AnimatedContent";
import { CapabilityPillarsBand } from "@/components/marketing/capability-pillars";
import { partnership } from "@/content/site";

export function PartnershipStrip() {
  return (
    <section aria-label="Partnership overview" className="section-wash section-wash-mist">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20">
        <AnimatedContent>
          <p className="measure text-h3 text-brand-ink mx-auto text-center font-serif text-balance italic">
            {partnership.statement}
          </p>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <div className="mx-auto mt-10 max-w-5xl sm:mt-12">
            <CapabilityPillarsBand />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
