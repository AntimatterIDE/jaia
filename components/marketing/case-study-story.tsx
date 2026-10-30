import Link from "next/link";

import AnimatedContent from "@/components/AnimatedContent";
import type { CaseStudyRecord } from "@/content/case-studies";
import { serviceUrl, type ServiceRecord } from "@/content/services";

export function CaseStudyStory({
  study,
  services,
}: {
  study: CaseStudyRecord;
  services: readonly ServiceRecord[];
}) {
  const narrative = study.narrative;
  if (!narrative) return null;

  return (
    <section
      id="study-story"
      aria-label="Case study"
      className="section-wash section-wash-mist"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20">
        {narrative.quote ? (
          <AnimatedContent>
            <blockquote className="border-brand-sky max-w-3xl border-l-2 pl-5 sm:pl-6">
              <p className="text-brand-ink font-serif text-xl leading-relaxed text-pretty italic sm:text-[1.375rem]">
                &ldquo;{narrative.quote.text}&rdquo;
              </p>
              <footer className="text-brand-slate mt-4 text-sm">
                <cite className="not-italic">
                  <span className="text-brand-ink font-semibold">
                    {narrative.quote.attribution}
                  </span>
                  <span aria-hidden="true"> · </span>
                  {narrative.quote.role}
                </cite>
              </footer>
            </blockquote>
          </AnimatedContent>
        ) : null}

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <AnimatedContent delay={0.06}>
            <h2 className="font-display text-brand-ink text-xl font-semibold">
              {narrative.situationHeading}
            </h2>
            <p className="measure text-brand-slate mt-4 text-[1.0625rem] leading-relaxed">
              {narrative.situation}
            </p>
          </AnimatedContent>

          <AnimatedContent delay={0.1}>
            <h2 className="font-display text-brand-ink text-xl font-semibold">
              {narrative.workHeading}
            </h2>
            <ul className="mt-4 space-y-3">
              {narrative.work.map((item) => (
                <li
                  key={item}
                  className="text-brand-slate flex gap-3 text-[1.0625rem] leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="bg-brand-sky mt-2.5 size-1.5 shrink-0 rounded-full"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedContent>
        </div>

        <AnimatedContent delay={0.08}>
          <h2 className="font-display text-brand-ink mt-14 text-xl font-semibold">
            {narrative.resultsHeading}
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {narrative.results.map((stat) => (
              <div
                key={stat.label}
                className="border-brand-mist flex flex-col rounded-[1.5rem] border bg-white px-5 py-6"
              >
                <dt className="text-brand-slate order-2 mt-3 text-sm leading-snug">
                  {stat.label}
                </dt>
                <dd className="font-display text-brand-ink order-1 text-[1.75rem] leading-none font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          {narrative.resultsNote ? (
            <p className="text-brand-slate mt-5 max-w-3xl text-sm leading-relaxed">
              {narrative.resultsNote}
            </p>
          ) : null}
        </AnimatedContent>

        <AnimatedContent delay={0.1}>
          <h2 className="font-display text-brand-ink mt-14 text-xl font-semibold">
            Programs in this engagement
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={serviceUrl(service.slug)}
                  className="border-brand-mist text-brand-action hover:border-brand-sky hover:bg-brand-sky-soft active:bg-brand-sky-soft inline-flex min-h-10 items-center gap-2 rounded-full border bg-white px-3.5 text-[0.8125rem] font-semibold transition-colors duration-150"
                >
                  <service.icon
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.75}
                  />
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedContent>
      </div>
    </section>
  );
}
