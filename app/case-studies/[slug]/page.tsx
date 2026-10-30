import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CaseStudyStory } from "@/components/marketing/case-study-story";
import { CtaButton, CtaLink } from "@/components/marketing/cta";
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
import { cn } from "@/lib/utils";

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
  if (study.comingSoon) {
    return {
      title: `${study.name} — Coming soon`,
      description: caseStudyComingSoon.body,
      alternates: { canonical: caseStudyUrl(study.slug) },
      robots: { index: false, follow: true },
      openGraph: {
        title: `${study.name} | ${siteConfig.name}`,
        description: caseStudyComingSoon.body,
      },
    };
  }
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

  const studyServices = study.comingSoon ? [] : caseStudyServices(study);
  const others = caseStudies.filter((item) => item.slug !== study.slug);

  return (
    <article>
      <header className="bg-canvas">
        <div className="mx-auto grid w-full max-w-[90rem] gap-10 px-5 pt-[calc(var(--header-height)+2.5rem)] pb-16 sm:px-8 sm:pt-[calc(var(--header-height)+4rem)] sm:pb-20 lg:grid-cols-2 lg:items-end lg:gap-16 lg:pt-[calc(var(--header-height)+5rem)]">
          <div className="flex max-w-xl flex-col items-start gap-5">
            <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
              {study.comingSoon
                ? caseStudyComingSoon.eyebrow
                : study.narrative
                  ? "Case study"
                  : caseStudyMeta(study)}
            </p>
            <h1 className="font-display text-h2 text-brand-ink font-semibold text-balance">
              {study.name}
            </h1>
            {study.comingSoon ? (
              study.location ? (
                <p className="text-brand-slate text-sm font-medium tracking-[0.04em]">
                  {study.location}
                </p>
              ) : null
            ) : study.narrative ? (
              <p className="text-brand-slate text-sm font-medium tracking-[0.04em]">
                {[
                  study.narrative.practice,
                  study.location,
                  study.narrative.engagement,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : (
              <p className="text-brand-slate text-sm font-medium tracking-[0.04em]">
                {studyServices.map((service) => service.shortName).join(" · ")}
              </p>
            )}
            <p className="measure text-lead text-brand-slate">
              {study.comingSoon ? caseStudyComingSoon.body : study.intro}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {study.comingSoon ? (
                <CtaButton href={caseStudyComingSoon.cta.href} withArrow>
                  {caseStudyComingSoon.cta.label}
                </CtaButton>
              ) : study.narrative ? (
                <CtaButton href="#study-story" withArrow>
                  Read the story
                </CtaButton>
              ) : studyServices.length === 1 ? (
                <CtaButton href={serviceUrl(studyServices[0].slug)} withArrow>
                  Read the capability
                </CtaButton>
              ) : (
                <CtaButton href="#study-services" withArrow>
                  See the work
                </CtaButton>
              )}
              <CtaLink href={primaryCta.href}>{primaryCta.label}</CtaLink>
            </div>
          </div>

          <div className="shadow-lift ring-brand-ink/5 relative overflow-hidden rounded-[1.75rem] ring-1">
            {study.comingSoon ? (
              <span className="text-brand-ink shadow-soft absolute top-4 left-4 z-10 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
                Coming soon
              </span>
            ) : null}
            <Image
              src={study.image.src}
              alt={study.image.alt}
              width={study.image.width}
              height={study.image.height}
              priority
              sizes="(min-width: 1024px) 45vw, calc(100vw - 2.5rem)"
              className={cn(
                "aspect-4/3 w-full object-cover",
                study.image.objectPosition,
              )}
            />
          </div>
        </div>
      </header>

      {study.comingSoon ? null : study.narrative ? (
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
