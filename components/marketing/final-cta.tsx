"use client";

import { Cta1 } from "@/components/blocks/cta-1";
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
  return <Cta1 heading={heading} body={body} ctaLabel={ctaLabel} ctaHref={ctaHref} />;
}
