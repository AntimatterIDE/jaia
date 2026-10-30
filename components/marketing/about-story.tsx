import Image from "next/image";
import AnimatedContent from "@/components/AnimatedContent";
import StaggeredText from "@/components/react-bits/staggered-text";
import { CtaLink } from "@/components/marketing/cta";
import { aboutStory } from "@/content/site";

export function AboutStory() {
  return (
    <section aria-labelledby="about-story-heading" className="bg-canvas">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
        {/* Side-by-side on large screens; the overlapping panel only applies
            once there is room for it to overlap without crowding the copy. */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-0">
          <AnimatedContent>
            <div className="shadow-lift ring-brand-ink/5 relative overflow-hidden rounded-[1.75rem] ring-1">
              <Image
                src="/images/about-team-collaboration.jpg"
                alt="A physician, a practice administrator, and a clinical staff member reviewing performance charts together on a monitor"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 55vw, calc(100vw - 2.5rem)"
                className="img-tone aspect-4/3 w-full object-cover sm:aspect-16/10"
              />
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.1}>
            <div className="border-brand-mist shadow-lift relative z-10 rounded-[1.5rem] border bg-white p-7 sm:p-9 lg:-ml-16 lg:p-10">
              <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
                {aboutStory.eyebrow}
              </p>
              <StaggeredText
                as="h2"
                id="about-story-heading"
                text={aboutStory.heading}
                segmentBy="words"
                delay={45}
                duration={0.55}
                easing={[0.22, 1, 0.36, 1]}
                from={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="font-display text-h2 text-brand-ink mt-4 font-semibold text-balance"
              />
              <p className="measure text-brand-slate mt-5 text-[1.0625rem] leading-relaxed">
                {aboutStory.body}
              </p>
              <CtaLink href={aboutStory.cta.href} className="mt-6">
                {aboutStory.cta.label}
              </CtaLink>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
