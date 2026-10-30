"use client";

import { Children, type ReactNode } from "react";

import AnimatedContent from "@/components/AnimatedContent";

/** Reveals each block of a prose column in order. Copy stays in the DOM. */
export function ProseReveal({ children }: { children: ReactNode }) {
  return (
    <>
      {Children.map(children, (child, index) => (
        <AnimatedContent key={index} delay={index * 0.05}>
          {child}
        </AnimatedContent>
      ))}
    </>
  );
}
