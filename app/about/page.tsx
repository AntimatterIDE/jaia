import type { Metadata } from "next";
import AnimatedContent from "@/components/AnimatedContent";
import { AboutHero } from "@/components/marketing/about-hero";
import { CompanyTimeline } from "@/components/marketing/company-timeline";
import { CtaButton } from "@/components/marketing/cta";
import { JaiaPartnershipInfographic } from "@/components/marketing/jaia-partnership-infographic";
import { aboutPage, primaryCta } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.intro,
  alternates: { canonical: "/about" },
};

/**
 * Reserved for approved team records. No client-approved team data has been
 * supplied, so the section renders nothing rather than inventing people.
 */
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: { src: string; alt: string };
}
const teamMembers: readonly TeamMember[] = [];

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Partnership model */}
      <section
        aria-labelledby="model-heading"
        className="section-wash section-wash-mist"
      >
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <AnimatedContent>
            <div className="flex max-w-xl flex-col items-start gap-5">
              <h2
                id="model-heading"
                className="font-display text-h2 text-brand-ink font-semibold text-balance"
              >
                {aboutPage.modelHeading}
              </h2>
              <p className="measure text-brand-slate text-[1.0625rem] leading-relaxed">
                {aboutPage.modelBody}
              </p>
              <p className="measure text-brand-slate text-[1.0625rem] leading-relaxed">
                {aboutPage.modelContinue}
              </p>
            </div>
          </AnimatedContent>
          <AnimatedContent delay={0.08}>
            <JaiaPartnershipInfographic />
          </AnimatedContent>
        </div>
      </section>

      {/* Company timeline — draft milestones, see content/timeline.ts */}
      <section
        id="timeline"
        aria-labelledby="timeline-heading"
        className="bg-canvas"
      >
        <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24">
          <CompanyTimeline />
        </div>
      </section>

      {/* Team — renders only when approved records exist */}
      {teamMembers.length > 0 ? (
        <section aria-labelledby="team-heading" className="bg-canvas">
          <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8">
            <h2
              id="team-heading"
              className="font-display text-h2 text-brand-ink font-semibold"
            >
              The team
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <li key={member.name}>{member.name}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Contact CTA */}
      <section aria-labelledby="about-cta-heading" className="bg-canvas">
        <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24">
          <AnimatedContent>
            <div className="flex max-w-2xl flex-col items-start gap-6">
              <h2
                id="about-cta-heading"
                className="font-display text-h2 text-brand-ink font-semibold text-balance"
              >
                Talk with JAIA about your practice.
              </h2>
              <p className="measure text-lead text-brand-slate">
                Tell us where you want to grow. JAIA will help you map the right
                next conversation.
              </p>
              <CtaButton
                href={primaryCta.href}
                withArrow
                className="w-full justify-center min-[26rem]:w-auto"
              >
                {primaryCta.label}
              </CtaButton>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  );
}
