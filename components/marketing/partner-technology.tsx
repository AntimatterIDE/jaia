import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeading } from "@/components/marketing/section-heading";
import { partnersPage } from "@/content/partner-spotlights";
import { servicePartners } from "@/content/partners";
import { getService, serviceUrl } from "@/content/services";

const technologyPartners = Object.entries(servicePartners).flatMap(
  ([slug, partner]) => (partner ? [{ slug, partner }] : []),
);

/** Confirmed technology partners, reusing their service-page records. */
export function PartnerTechnology() {
  if (technologyPartners.length === 0) return null;
  const { technology } = partnersPage;

  return (
    <section
      id={technology.anchor}
      aria-labelledby={`${technology.anchor}-heading`}
      className="bg-canvas"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
        <AnimatedContent>
          <SectionHeading
            id={`${technology.anchor}-heading`}
            eyebrow={technology.eyebrow}
            title={technology.heading}
          />
        </AnimatedContent>

        <ul className="mt-12 flex flex-col gap-6 sm:mt-14">
          {technologyPartners.map(({ slug, partner }, index) => {
            const service = getService(slug);
            return (
              <li key={partner.name}>
                <AnimatedContent delay={index * 0.08}>
                  <SpotlightCard className="border-brand-mist shadow-soft hover:border-brand-sky grid overflow-hidden rounded-[2rem] border bg-white transition-colors duration-200 lg:grid-cols-12">
                    <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-sky-soft via-white to-brand-sky-soft px-8 py-14 lg:col-span-5 lg:py-0">
                      <div aria-hidden="true" className="dot-grid absolute inset-0" />
                      <span className="shadow-soft relative inline-flex items-center rounded-2xl border border-white bg-white px-8 py-6">
                        <Image
                          src={partner.logo.src}
                          alt={partner.logo.alt}
                          width={partner.logo.width}
                          height={partner.logo.height}
                          className="h-12 w-auto sm:h-14"
                        />
                      </span>
                    </div>

                    <div className="p-7 sm:p-10 lg:col-span-7 lg:p-12">
                      {service ? (
                        <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
                          With {service.shortName}
                        </p>
                      ) : null}
                      <h3 className="font-display text-h3 text-brand-ink mt-3 font-semibold text-balance">
                        {partner.heading}
                      </h3>
                      <p className="measure text-brand-slate mt-4 text-[1.0625rem] leading-relaxed">
                        {partner.body}
                      </p>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {partner.points.map((point) => (
                          <li
                            key={point.title}
                            className="bg-brand-sky-soft text-brand-action-deep inline-flex items-center gap-1.5 rounded-full py-1.5 pr-3.5 pl-3 text-[0.8125rem] font-semibold"
                          >
                            <point.icon
                              aria-hidden="true"
                              className="size-3.5"
                              strokeWidth={2}
                            />
                            {point.title}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
                        <a
                          href={partner.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/ext text-brand-action hover:text-brand-action-deep inline-flex min-h-11 items-center gap-2 rounded-sm text-base font-semibold"
                        >
                          {partner.ctaLabel}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 transition-transform duration-200 group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5 motion-reduce:transition-none"
                          />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        {service ? (
                          <Link
                            href={serviceUrl(service.slug)}
                            className="text-brand-slate hover:text-brand-action inline-flex min-h-11 items-center text-[0.9375rem] font-semibold transition-colors duration-150"
                          >
                            Explore {service.shortName}
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
