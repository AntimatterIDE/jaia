import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero1 } from "@/components/blocks/hero-1";
import { CaseStudyStory } from "@/components/marketing/case-study-story";
import { CtaLink } from "@/components/marketing/cta";
import {
  caseStudies,
  caseStudyComingSoon,
  caseStudyMeta,
  caseStudyServices,
  caseStudyUrl,
  getCaseStudy,
} from "@/content/case-studies";
import { primaryCta, siteConfig } from "@/content/site";
import { serviceUrl } from "@/content/services";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.name} — Case study`,
    description: study.intro,
    alternates: { canonical: caseStudyUrl(study.slug) },
    openGraph: {
      title: `${study.name} | ${siteConfig.name}`,
      description: study.intro,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const studyServices = caseStudyServices(study);
  const others = caseStudies.filter((item) => item.slug !== study.slug);
  const subtitle = study.narrative
    ? [
        study.narrative.practice,
        study.location,
        study.narrative.engagement,
      ]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <article>
      <Hero1
        eyebrow={study.comingSoon ? "Coming soon" : study.narrative ? "Case study" : caseStudyMeta(study)}
        heading={study.name}
        headingId="study-heading"
        body={
          study.comingSoon
            ? `${study.intro} ${caseStudyComingSoon.body}`
            : subtitle
              ? `${subtitle}. ${study.intro}`
              : `${studyServices.map((service) => service.shortName).join(" · ")}. ${study.intro}`
        }
        primary={
          study.comingSoon
            ? caseStudyComingSoon.cta
            : study.narrative
              ? { label: "Read the story", href: "#study-story" }
              : studyServices.length === 1
                ? { label: "Read the capability", href: serviceUrl(studyServices[0].slug) }
                : { label: "See the work", href: "#study-services" }
        }
        secondary={primaryCta}
        image={{ src: study.image.src, alt: study.image.alt }}
      />

      {study.narrative ? (
        <CaseStudyStory study={study} services={studyServices} />
      ) : (
        <section
          id="study-services"
          aria-labelledby="study-services-heading"
          className="section-wash section-wash-mist"
        >
          <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24">
            <h2
              id="study-services-heading"
              className="font-display text-h2 text-brand-ink font-semibold text-balance"
            >
              {studyServices.length === 1
                ? "What this work includes"
                : "What JAIA supports here"}
            </h2>
            {studyServices.length === 1 ? (
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studyServices[0].page.detail.map((item) => (
                  <li
                    key={item.label}
                    className="border-brand-mist rounded-[1.5rem] border bg-white p-6"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="text-brand-action size-6"
                      strokeWidth={1.75}
                    />
                    <h3 className="text-brand-ink mt-4 text-lg font-semibold">
                      {item.label}
                    </h3>
                    <p className="text-brand-slate mt-2 text-[0.9375rem] leading-relaxed">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studyServices.map((service) => (
                  <li
                    key={service.slug}
                    className="border-brand-mist flex flex-col rounded-[1.5rem] border bg-white p-6"
                  >
                    <service.icon
                      aria-hidden="true"
                      className="text-brand-action size-6"
                      strokeWidth={1.75}
                    />
                    <h3 className="text-brand-ink mt-4 text-lg font-semibold">
                      {service.shortName}
                    </h3>
                    <p className="text-brand-slate mt-2 flex-1 text-[0.9375rem] leading-relaxed">
                      {service.summary}
                    </p>
                    <div className="mt-5">
                      <CtaLink href={serviceUrl(service.slug)}>
                        Read the capability
                      </CtaLink>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="more-studies-heading" className="bg-canvas">
        <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24">
          <h2
            id="more-studies-heading"
            className="font-display text-brand-ink text-xl font-semibold"
          >
            More studies
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <CtaLink href={caseStudyUrl(item.slug)}>{item.name}</CtaLink>
                <p className="text-brand-slate mt-1 text-sm">
                  {caseStudyMeta(item)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
