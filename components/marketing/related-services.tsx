import Link from "next/link";

import AnimatedContent from "@/components/AnimatedContent";
import { SectionHeading } from "@/components/marketing/section-heading";
import { CtaLink } from "@/components/marketing/cta";
import { getService, serviceUrl } from "@/content/services";

/**
 * Cross-links to the services a practice most often considers alongside this
 * one, so a service page is an entry point into the portfolio rather than a
 * dead end.
 */
export function RelatedServices({
  slugs,
  from,
}: {
  slugs: readonly string[];
  from: string;
}) {
  const related = slugs
    .map((slug) => getService(slug))
    .filter((service) => service !== undefined);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="bg-canvas">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
        <AnimatedContent>
          <SectionHeading
            id="related-heading"
            eyebrow="Often considered together"
            title={`What practices explore alongside ${from}.`}
          />
        </AnimatedContent>

        <ul className="mt-10 grid auto-rows-fr gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2">
          {related.map((service, index) => (
            <li key={service.slug}>
              <AnimatedContent delay={index * 0.09} className="h-full">
                <Link
                  href={serviceUrl(service.slug)}
                  className="lift border-brand-mist shadow-soft hover:border-brand-sky hover:shadow-lift focus-visible:border-brand-sky group/related flex h-full flex-col rounded-[1.5rem] border bg-white p-7 sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="bg-brand-sky-soft text-brand-action flex size-12 items-center justify-center rounded-2xl"
                  >
                    <service.icon className="size-5.5" strokeWidth={1.75} />
                  </span>

                  <p className="text-eyebrow font-display text-brand-slate mt-6 font-semibold tracking-[0.16em] uppercase">
                    {service.category}
                  </p>
                  <h3 className="font-display text-h3 text-brand-ink mt-2 font-semibold">
                    {service.shortName}
                  </h3>
                  <p className="text-brand-slate mt-3 text-[1.0625rem] leading-relaxed">
                    {service.summary}
                  </p>

                  <span className="text-brand-action group-hover/related:text-brand-action-deep mt-auto inline-flex items-center gap-2 pt-6 text-[0.9375rem] font-semibold">
                    Explore {service.shortName}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/related:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/related:translate-x-0"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </AnimatedContent>
            </li>
          ))}
        </ul>

        <AnimatedContent delay={0.12}>
          <div className="relative mt-12 pt-8 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-canvas before:via-brand-mist before:to-canvas">
            <CtaLink href="/#capabilities">See all six capabilities</CtaLink>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
