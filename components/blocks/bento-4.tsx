"use client";

/**
 * React Bits Pro `bento-4`: a step sequence.
 * Demo contacts, emails, and timings are not used.
 */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface BentoStep {
  title: string;
  body: string;
}

export function Bento4({
  steps,
  title,
  body,
  headingId,
}: {
  steps: readonly BentoStep[];
  title: string;
  body: string;
  headingId?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % steps.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduce, steps.length]);

  const active = reduce ? 0 : index;

  return (
    <article className="border-brand-mist flex h-full w-full flex-col overflow-hidden rounded-3xl border bg-white">
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        <h2 id={headingId} className="font-display text-brand-ink text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
        <p className="text-brand-slate mt-3 max-w-2xl text-base leading-relaxed">{body}</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, stepIndex) => {
            const on = stepIndex === active;
            return (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => setIndex(stepIndex)}
                  className={`h-full w-full rounded-2xl border p-4 text-left ${
                    on ? "border-brand-action bg-brand-sky-soft" : "border-brand-mist bg-canvas"
                  }`}
                  aria-current={on ? "step" : undefined}
                >
                  <span className="bg-brand-action inline-flex size-8 items-center justify-center rounded-full text-sm font-semibold text-white">
                    {stepIndex + 1}
                  </span>
                  <span className="font-display text-brand-ink mt-3 block text-lg font-semibold">
                    {step.title}
                  </span>
                  <span className="text-brand-slate mt-2 block text-sm leading-relaxed">{step.body}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="bg-brand-mist mt-6 h-1 overflow-hidden rounded-full" aria-hidden="true">
          <motion.div
            className="bg-brand-action h-full"
            initial={false}
            animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          />
        </div>
      </div>
    </article>
  );
}
