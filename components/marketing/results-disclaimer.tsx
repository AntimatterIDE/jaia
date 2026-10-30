import { cn } from "@/lib/utils";

/** Shared wording for every published performance figure. Edit it here only. */
export const RESULTS_DISCLAIMER =
  "Results shown reflect the experience of individual practices and are reported by those practices and their billing partner. They are not a guarantee of future results. Outcomes vary based on practice size, payer mix, patient population, staffing and program adoption.";

export function ResultsDisclaimer({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "on-ink";
}) {
  return (
    <p
      className={cn(
        "max-w-3xl text-[0.9375rem] leading-relaxed",
        tone === "on-ink" ? "text-white/90" : "text-brand-slate",
        className,
      )}
    >
      {RESULTS_DISCLAIMER}
    </p>
  );
}
