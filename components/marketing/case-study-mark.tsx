import { HeartPulse, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const MARKS = {
  wellness: Sparkles,
  care: HeartPulse,
} as const;

export function CaseStudyMark({
  icon,
  className,
}: {
  icon: keyof typeof MARKS;
  className?: string;
}) {
  const Icon = MARKS[icon];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-brand-sky-soft flex size-full items-center justify-center",
        className,
      )}
    >
      <span className="border-brand-mist flex size-28 items-center justify-center rounded-full border bg-white shadow-soft sm:size-32">
        <Icon
          aria-hidden="true"
          className="text-brand-action size-12"
          strokeWidth={1.5}
        />
      </span>
    </div>
  );
}
