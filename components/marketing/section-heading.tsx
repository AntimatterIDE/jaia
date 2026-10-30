import StaggeredText from "@/components/react-bits/staggered-text";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
  /** Heading level — keep one h1 per page, sections use h2 */
  as?: "h1" | "h2";
  /** Must be supplied whenever the parent section uses aria-labelledby */
  id?: string;
}

/**
 * Shared section title. The headline reveals word-by-word with a short
 * blur settle (no overshoot) so section entries stay in the same voice as
 * the hero without becoming theatrical.
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-eyebrow font-display text-brand-action font-semibold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <StaggeredText
        as={Heading}
        id={id}
        text={title}
        segmentBy="words"
        delay={45}
        duration={0.55}
        easing={[0.22, 1, 0.36, 1]}
        from={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className={`font-display text-h2 text-brand-ink font-semibold text-balance${
          align === "center" ? " justify-center" : ""
        }`}
      />
      {body ? (
        <p className="measure text-lead text-brand-slate">{body}</p>
      ) : null}
    </div>
  );
}
