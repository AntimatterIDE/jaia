import type { Metadata } from "next";
import { AboutHero } from "@/components/marketing/about-hero";
import { CompanyTimeline } from "@/components/marketing/company-timeline";
import { FinalCta } from "@/components/marketing/final-cta";
import { PartnershipFeatures } from "@/components/marketing/partnership-features";
import { aboutPage } from "@/content/site";

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
      <PartnershipFeatures />

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

      <FinalCta
        heading="Talk with JAIA about your practice."
        body="Tell us where you want to grow. JAIA will help you map the right next conversation."
      />
    </>
  );
}
